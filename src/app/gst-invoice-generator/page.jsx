export const metadata = {
  title: "GST Invoice Generator | KaroTools",
  description: "Create professional GST-compliant invoices with logo and PDF download. Free invoice generator for Indian freelancers.",
  alternates: {
    canonical: "https://karotools.in/gst-invoice-generator",
  },
};
import InvoiceGenerator from "../../InvoiceGenerator";

export default function Page() {
  return <InvoiceGenerator />;
}
