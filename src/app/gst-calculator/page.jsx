import GSTCalculator from "../../GSTCalculator";

export const metadata = {
  title: "Free GST Calculator India | KaroTools",
  description: "Calculate CGST, SGST and IGST at all GST rates instantly in India. Free GST calculator for freelancers and small businesses.",
  alternates: {
    canonical: "https://karotools.in/gst-calculator",
  },
};

export default function Page() {
  return <GSTCalculator />;
}
