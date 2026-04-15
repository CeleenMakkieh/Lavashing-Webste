import { getServices, getIndustries, getProcessSteps } from "@/lib/wordpress";
import { FALLBACK_SERVICES, FALLBACK_INDUSTRIES, FALLBACK_PROCESS } from "@/lib/fallback-data";
import Work from "../pages/Work";

export default async function WorkPage() {
  const [services, industries, processSteps] = await Promise.all([
    getServices(),
    getIndustries(),
    getProcessSteps(),
  ]);
  return (
    <Work
      services={services?.length ? services : FALLBACK_SERVICES}
      industries={industries?.length ? industries : FALLBACK_INDUSTRIES}
      processSteps={processSteps?.length ? processSteps : FALLBACK_PROCESS}
    />
  );
}
