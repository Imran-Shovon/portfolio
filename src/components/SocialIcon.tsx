import { Globe, Mail, UserRound } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/icons";
import type { SocialPlatform } from "@/lib/content-types";

/** Brand color used for hover states, per platform. */
export const SOCIAL_COLORS: Record<SocialPlatform, string> = {
  github: "white",
  linkedin: "var(--color-accent-blue)",
  email: "var(--color-accent-purple)",
  researchgate: "var(--color-accent-cyan)",
  other: "var(--color-accent-cyan)",
};

export function SocialIcon({ platform, size }: { platform: SocialPlatform; size: number }) {
  switch (platform) {
    case "github":
      return <GithubIcon size={size} />;
    case "linkedin":
      return <LinkedinIcon size={size} />;
    case "email":
      return <Mail size={size} />;
    case "researchgate":
      return <UserRound size={size} />;
    default:
      return <Globe size={size} />;
  }
}
