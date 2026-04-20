import { getValues } from "@/lib/wordpress";
import { FALLBACK_VALUES } from "@/lib/fallback-data";
import About from "../pages/About";

export default async function AboutPage() {
  const values = await getValues();
  return (
    <About
      values={values?.length ? values : FALLBACK_VALUES}
    />
  );
}
