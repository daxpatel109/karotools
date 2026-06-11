"use client";
import { GSTCalculator } from "../../GSTCalculator";

export const metadata = { title: "Free Online GST Calculator India", description: "Calculate CGST, SGST & IGST instantly. All slabs, custom rates, round-off toggle, visual breakdown & copy result." };

export default function Page() {
  return <GSTCalculator />;
}
