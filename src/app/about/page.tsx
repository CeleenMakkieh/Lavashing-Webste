import { getTeamMembers, getSiteSettings } from "@/lib/wordpress";
import { FALLBACK_TEAM, FALLBACK_SETTINGS } from "@/lib/fallback-data";
import About from "../pages/About";

export default async function AboutPage() {
  const [team, settings] = await Promise.all([getTeamMembers(), getSiteSettings()]);
  return (
    <About
      team={team ?? FALLBACK_TEAM}
      aboutStory={(settings ?? FALLBACK_SETTINGS).aboutStory}
    />
  );
}
