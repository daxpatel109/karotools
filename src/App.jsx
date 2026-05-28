import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import GSTCalculator from "./GSTCalculator";
import InvoiceGenerator from "./InvoiceGenerator";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/gst-calculator" element={<GSTCalculator />} />
      <Route path="/invoice-generator" element={<InvoiceGenerator />} />
    </Routes>
  );
}
