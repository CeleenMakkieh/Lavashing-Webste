import { headers } from "next/headers";
import SpecialEventsDesktop from "../pages/SpecialEventsDesktop";
import SpecialEventsMobile from "../pages/SpecialEventsMobile";

export const metadata = {
  title: "Special Events | Lavashing",
  description: "Wedding photography, engagement sessions, and special event coverage by Lavashing.",
};

function isMobileUserAgent(ua: string): boolean {
  return /android|iphone|ipad|ipod|mobile|blackberry|opera mini|iemobile|wpdesktop/i.test(ua);
}

export default async function SpecialEventsPage() {
  const headersList = await headers();
  const ua = headersList.get("user-agent") ?? "";
  const mobile = isMobileUserAgent(ua);
  return mobile ? <SpecialEventsMobile /> : <SpecialEventsDesktop />;
}
