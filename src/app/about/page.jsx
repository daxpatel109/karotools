import About from "../../About";
import { SchemaScript, generateOrganizationSchema, generateBreadcrumbSchema } from "../../lib/schema";

export const metadata = { title: "About Us: Best Tools for Indian Freelancers – KaroTools", description: "Learn about KaroTools, a platform dedicated to empowering Indian freelancers and small businesses with free tax, finance, and productivity tools.", alternates: { canonical: "https://karotools.in/about" }  };

export default function Page() {
  return (
    <>
      <About />
      <SchemaScript schema={generateOrganizationSchema()} />
      <SchemaScript schema={generateBreadcrumbSchema([{name: "Home", url: "https://karotools.in"}, {name: "About Us", url: "https://karotools.in/about"}])} />
    </>
  );
}
