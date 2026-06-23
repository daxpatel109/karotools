"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <nav style={{ position: "sticky", top: 0, zIndex: 100, padding: "10px 5vw", minHeight: "70px", display: "flex", flexWrap: "wrap", gap: "16px", alignItems: "center", justifyContent: "space-between", background: "var(--bg-primary)", backdropFilter: "blur(20px)", borderBottom: "1px solid var(--border-color)" }}>
      <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "10px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" }} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
          <img src="/logo.png" alt="KaroTools Logo" style={{ height: "56px", margin: "0 -24px 0 0", objectFit: "contain", position: "relative", zIndex: 10 }} />
          <span style={{ fontSize: "22px", fontWeight: "800", fontFamily: "'Plus Jakarta Sans',sans-serif", color: "var(--text-primary)" }}>
            Karo<span style={{ background: "linear-gradient(135deg, #0076ff, #005ae6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Tools</span>
          </span>
        </div>
      </Link>
      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "16px", flexShrink: 0 }}>
        <Link href="/blog" style={{ color: "var(--text-secondary)", fontSize: "14px", fontWeight: "600", textDecoration: "none", transition: "color 0.2s", whiteSpace: "nowrap" }}>Blog</Link>
        <Link href="/guides" style={{ color: "var(--text-secondary)", fontSize: "14px", fontWeight: "600", textDecoration: "none", transition: "color 0.2s", whiteSpace: "nowrap" }}>Guides</Link>
        {mounted && (
          <button 
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            style={{ 
              background: "transparent", border: "1px solid var(--border-color)", color: "var(--text-primary)", cursor: "pointer", 
              padding: "6px 10px", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center"
            }}
            aria-label="Toggle Dark Mode"
          >
            {theme === 'dark' ? (
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
            ) : (
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
            )}
          </button>
        )}
        {pathname !== "/" && (
          <Link href="/" style={{ background: "var(--glass-bg)", border: "1px solid var(--border-color)", color: "var(--text-secondary)", padding: "8px 16px", borderRadius: "10px", fontSize: "14px", fontWeight: "600", textDecoration: "none", transition: "all 0.2s", whiteSpace: "nowrap" }}>← Home</Link>
        )}
      </div>
    </nav>
  );
}
