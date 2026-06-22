import About from "../../About";
import { SchemaScript, generateOrganizationSchema } from "../../lib/schema";

export const metadata = { title: "About Us: Best Tools for Indian Freelancers – KaroTools", description: "Empowering Indian Freelancers." };

export default function Page() {
  return (
    <>
      <About />
      <SchemaScript schema={generateOrganizationSchema()} />
    </>
  );
}
