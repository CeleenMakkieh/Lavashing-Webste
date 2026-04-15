import { getSiteSettings, getClients } from "@/lib/wordpress";
import { FALLBACK_SETTINGS, FALLBACK_CLIENTS } from "@/lib/fallback-data";
import Home from "./pages/Home";

export default async function HomePage() {
  const [settings, clients] = await Promise.all([getSiteSettings(), getClients()]);
  return (
    <Home
      settings={settings ?? FALLBACK_SETTINGS}
      clients={clients ?? FALLBACK_CLIENTS}
    />
  );
}
