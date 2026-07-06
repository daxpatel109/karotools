"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Search, Zap, FileText } from "lucide-react";

export default function NotFound() {
  return (
    <div style={{ 
      minHeight: "100vh", 
      background: "#030712", // Very deep dark background
      color: "white", 
      display: "flex", 
      flexDirection: "column", 
      alignItems: "center", 
      justifyContent: "center",
      fontFamily: "'Inter', sans-serif",
      position: "relative",
      overflow: "hidden"
    }}>
      
      {/* Massive Background 404 Text - Parallax/Floating Effect */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.03, scale: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
        style={{
          position: "absolute",
          fontSize: "40vw",
          fontWeight: "900",
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          color: "#38bdf8",
          userSelect: "none",
          pointerEvents: "none",
          zIndex: 0,
          whiteSpace: "nowrap"
        }}
      >
        404
      </motion.div>

      {/* Radar Ping Animation */}
      <motion.div
        animate={{ scale: [1, 2.5, 4], opacity: [0.15, 0.05, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeOut" }}
        style={{
          position: "absolute",
          width: "300px",
          height: "300px",
          borderRadius: "50%",
          border: "2px solid #38bdf8",
          zIndex: 0,
        }}
      />
      <motion.div
        animate={{ scale: [1, 2.5, 4], opacity: [0.15, 0.05, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeOut", delay: 2 }}
        style={{
          position: "absolute",
          width: "300px",
          height: "300px",
          borderRadius: "50%",
          border: "2px solid #38bdf8",
          zIndex: 0,
        }}
      />

      <div style={{ position: "relative", zIndex: 10, textAlign: "center", padding: "0 20px" }}>
        {/* Floating Animated Icon */}
        <motion.div 
          animate={{ y: [0, -15, 0], rotate: [0, -5, 5, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          style={{ display: "inline-flex", padding: "24px", background: "rgba(56,189,248,0.1)", borderRadius: "30px", border: "1px solid rgba(56,189,248,0.3)", boxShadow: "0 0 40px rgba(56,189,248,0.2)", marginBottom: "32px" }}
        >
          <Search size={48} color="#38bdf8" />
        </motion.div>

        {/* Text Reveal Animation */}
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{ fontSize: "48px", fontWeight: "800", marginBottom: "16px", fontFamily: "'Plus Jakarta Sans',sans-serif", background: "linear-gradient(to right, #fff, #9ca3af)", WebkitBackgroundClip: "text", color: "transparent" }}
        >
          Lost in Space
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          style={{ fontSize: "18px", color: "#9ca3af", maxWidth: "500px", margin: "0 auto 48px", lineHeight: "1.6" }}
        >
          The page or tool you're searching for doesn't exist here. Let's redirect your radar back to safety.
        </motion.p>

        {/* Animated Rescue Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "16px" }}
        >
          <Link href="/" style={{ textDecoration: "none" }}>
            <motion.div 
              whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(56,189,248,0.4)" }}
              whileTap={{ scale: 0.95 }}
              style={{ display: "flex", alignItems: "center", gap: "8px", background: "rgba(56,189,248,0.1)", border: "1px solid rgba(56,189,248,0.3)", padding: "16px 24px", borderRadius: "16px", color: "#38bdf8", fontWeight: "600", cursor: "pointer" }}
            >
              <Search size={20} />
              Homepage
            </motion.div>
          </Link>

          <Link href="/tools" style={{ textDecoration: "none" }}>
            <motion.div 
              whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(167,139,250,0.4)" }}
              whileTap={{ scale: 0.95 }}
              style={{ display: "flex", alignItems: "center", gap: "8px", background: "rgba(167,139,250,0.1)", border: "1px solid rgba(167,139,250,0.3)", padding: "16px 24px", borderRadius: "16px", color: "#a78bfa", fontWeight: "600", cursor: "pointer" }}
            >
              <ArrowLeft size={20} />
              All Tools
            </motion.div>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
