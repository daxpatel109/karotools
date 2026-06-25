import Home from "../Home";
import { SchemaScript, generateOrganizationSchema } from "../lib/schema";

export const metadata = {
  title: "Free Tax, GST & Business Tools for Freelancers – KaroTools",
  description: "KaroTools offers free Indian financial tools like GST calculator, invoice generator, FIRE calculator and more for freelancers and small businesses. No login required.",
  alternates: {
    canonical: "https://karotools.in",
  },
  openGraph: {
    title: "Free Tax, GST & Business Tools for Freelancers – KaroTools",
    description: "KaroTools offers free Indian financial tools like GST calculator, invoice generator, FIRE calculator and more for freelancers and small businesses. No login required.",
    url: "https://karotools.in",
    siteName: "KaroTools",
    locale: "en_IN",
    type: "website",
  },
};

export default function Page() {
  return (
    <>
      <Home />
      <SchemaScript schema={generateOrganizationSchema()} />
    </>
  );
}
