import { generateMetadata } from "../../../lib/seo";

export const metadata = generateMetadata({
  title: "Which ITR Form Should Freelancers Use? ITR-3 vs ITR-4",
  description: "Understand whether freelancers may use ITR-3 or ITR-4, how Section 44ADA fits, and what to check before filing your return.",
  path: "/blog/which-itr-form-for-freelancers-india",
  type: "article"
});

export default function ITRBlogLayout({ children }) {
  return children;
}
