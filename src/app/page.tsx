import { getSiteSettings } from "@/lib/wordpress";
import { FALLBACK_SETTINGS } from "@/lib/fallback-data";
import Home from "./pages/Home";

export default async function HomePage() {
  const settings = (await getSiteSettings()) ?? FALLBACK_SETTINGS;
  return <Home settings={settings} />;
}
