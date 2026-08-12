import { cn } from "@/lib/utils";
import Image from "next/image";

type TheoryFoundryLogoProps = {
  className?: string;
  priority?: boolean;
};

export function TheoryFoundryLogo({ className, priority = false }: TheoryFoundryLogoProps) {
  return (
    <span className={cn("relative block shrink-0 overflow-hidden bg-night", className)}>
      <Image
        alt="Theory Foundry"
        className="object-cover object-[center_48%]"
        fill
        priority={priority}
        sizes="(max-width: 767px) 160px, 192px"
        src="/TheoryFoundryLogoLessMargin.png"
      />
    </span>
  );
}
