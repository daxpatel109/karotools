import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import GSTCalculator from "./GSTCalculator";
import InvoiceGenerator from "./InvoiceGenerator";
import BioGenerator from "./BioGenerator";
import EmailGenerator from "./EmailGenerator";
import RateCalculator from "./RateCalculator";

export default function App() {
  return (
   <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/gst-calculator" element={<GSTCalculator />} />
      <Route path="/invoice-generator" element={<InvoiceGenerator />} />
      <Route path="/bio-generator" element={<BioGenerator />} />
      <Route path="/email-generator" element={<EmailGenerator />} />
      <Route path="/rate-calculator" element={<RateCalculator />} />
    </Routes>
  );
}
