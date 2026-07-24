import { permanentRedirect } from "next/navigation";

export default function AboutRedirect() {
  permanentRedirect("/our-process");
}
