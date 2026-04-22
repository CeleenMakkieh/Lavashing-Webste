import { getValues } from "@/lib/wordpress";
import About from "../pages/About";

export default async function AboutPage() {
  const values = await getValues();
  return (
    <About
      values={values?.length ? values : undefined}
    />
  );
}
