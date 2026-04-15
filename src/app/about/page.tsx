import { getTeamMembers, getSiteSettings, getServices, getValues } from "@/lib/wordpress";
import { FALLBACK_TEAM, FALLBACK_SETTINGS, FALLBACK_SERVICES, FALLBACK_VALUES } from "@/lib/fallback-data";
import About from "../pages/About";

export default async function AboutPage() {
  const [team, settings, services, values] = await Promise.all([
    getTeamMembers(),
    getSiteSettings(),
    getServices(),
    getValues(),
  ]);
  const s = settings ?? FALLBACK_SETTINGS;
  return (
    <About
      team={team ?? FALLBACK_TEAM}
      aboutStory={s.aboutStory}
      aboutImageUrl={s.aboutImageUrl}
      services={services?.length ? services : FALLBACK_SERVICES}
      values={values?.length ? values : FALLBACK_VALUES}
    />
  );
}
