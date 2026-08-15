import { spawn, spawnSync } from "node:child_process";
import { cp, mkdtemp, realpath, rm, symlink } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const projectDirectory = path.resolve(scriptDirectory, "..");
const forceIsolated = process.argv.includes("--isolated");
const unknownArguments = process.argv.slice(2).filter((argument) => argument !== "--isolated");

if (unknownArguments.length > 0) {
  console.error(`Unknown argument${unknownArguments.length === 1 ? "" : "s"}: ${unknownArguments.join(", ")}`);
  process.exit(2);
}

const excludedCopyEntries = new Set([
  ".git",
  ".next",
  ".open-next",
  ".pnpm-store",
  ".wrangler",
  "build",
  "coverage",
  "node_modules",
  "out",
]);

function runCommand(command, arguments_, cwd) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, arguments_, {
      cwd,
      env: process.env,
      stdio: "inherit",
    });

    child.once("error", reject);
    child.once("exit", (code, signal) => {
      if (signal) {
        reject(new Error(`${command} ${arguments_.join(" ")} exited after receiving ${signal}`));
        return;
      }

      resolve(code ?? 1);
    });
  });
}

function findNextDevProcesses() {
  const result = spawnSync("ps", ["-axo", "pid=,command="], { encoding: "utf8" });

  if (result.error || result.status !== 0) {
    return { state: "unknown", processes: [] };
  }

  const processes = result.stdout
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const match = line.match(/^(\d+)\s+(.+)$/);
      return match ? { pid: Number(match[1]), command: match[2] } : null;
    })
    .filter(
      (entry) => entry && /(?:^|\s)(?:node\s+\S*next\/dist\/bin\/next|\S*next)\s+dev(?:\s|$)/.test(entry.command),
    );

  if (processes.length === 0) {
    return { state: "inactive", processes: [] };
  }

  let couldNotResolveCwd = false;
  const matchingProcesses = processes.filter((entry) => {
    const result = spawnSync("lsof", ["-a", "-p", String(entry.pid), "-d", "cwd", "-Fn"], { encoding: "utf8" });

    if (result.error || result.status !== 0) {
      couldNotResolveCwd = true;
      return false;
    }

    const cwdLine = result.stdout.split("\n").find((line) => line.startsWith("n"));
    if (!cwdLine) {
      couldNotResolveCwd = true;
      return false;
    }

    return path.resolve(cwdLine.slice(1)) === projectDirectory;
  });

  if (matchingProcesses.length > 0) {
    return { state: "active", processes: matchingProcesses };
  }

  return { state: couldNotResolveCwd ? "unknown" : "inactive", processes: [] };
}

async function runIsolatedBuild(reason) {
  const temporaryDirectory = await mkdtemp(path.join(tmpdir(), `${path.basename(projectDirectory)}-build-`));
  const temporaryProjectDirectory = path.join(temporaryDirectory, "project");
  const keepTemporaryDirectory = process.env.KEEP_ISOLATED_BUILD === "1";

  console.log(`${reason} Building from an isolated copy at ${temporaryProjectDirectory}.`);

  try {
    await cp(projectDirectory, temporaryProjectDirectory, {
      recursive: true,
      preserveTimestamps: true,
      filter(source) {
        const relativePath = path.relative(projectDirectory, source);
        if (!relativePath) return true;

        const [rootEntry] = relativePath.split(path.sep);
        return !excludedCopyEntries.has(rootEntry);
      },
    });

    const nodeModulesDirectory = await realpath(path.join(projectDirectory, "node_modules"));
    await symlink(nodeModulesDirectory, path.join(temporaryProjectDirectory, "node_modules"), "dir");

    return await runCommand("pnpm", ["build"], temporaryProjectDirectory);
  } finally {
    if (keepTemporaryDirectory) {
      console.log(`KEEP_ISOLATED_BUILD=1; retained ${temporaryDirectory}.`);
    } else {
      await rm(temporaryDirectory, { recursive: true, force: true, maxRetries: 3, retryDelay: 100 });
    }
  }
}

const devServer = findNextDevProcesses();
let exitCode;

if (forceIsolated) {
  exitCode = await runIsolatedBuild("Isolation was explicitly requested.");
} else if (devServer.state === "active") {
  const processList = devServer.processes.map(({ pid }) => pid).join(", ");
  exitCode = await runIsolatedBuild(`Detected this repository's Next.js dev server (PID ${processList}).`);
} else if (devServer.state === "unknown") {
  exitCode = await runIsolatedBuild("Could not safely determine whether this repository has a running dev server.");
} else {
  console.log("No Next.js dev server detected for this repository; running the build in place.");
  exitCode = await runCommand("pnpm", ["build"], projectDirectory);
}

process.exitCode = exitCode;
