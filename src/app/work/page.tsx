import { getServices, getIndustries, getProcessSteps, getClients } from "@/lib/wordpress";
import { FALLBACK_SERVICES, FALLBACK_INDUSTRIES, FALLBACK_PROCESS, FALLBACK_CLIENTS } from "@/lib/fallback-data";
import Work from "../pages/Work";

export default async function WorkPage() {
  const [services, industries, processSteps, clients] = await Promise.all([
    getServices(),
    getIndustries(),
    getProcessSteps(),
    getClients(),
  ]);
  return (
    <Work
      services={services?.length ? services : FALLBACK_SERVICES}
      industries={industries?.length ? industries : FALLBACK_INDUSTRIES}
      processSteps={processSteps?.length ? processSteps : FALLBACK_PROCESS}
      clients={clients?.length ? clients : FALLBACK_CLIENTS}
    />
  );
}
