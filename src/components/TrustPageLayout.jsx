import React from 'react';
import Navbar from './Navbar';
import Link from 'next/link';
import { Calendar, ShieldCheck, ArrowLeft } from 'lucide-react';

export function TrustSectionCard({ title, children, icon: Icon, className = "" }) {
  return (
    <section className={`glass-panel p-6 md:p-10 rounded-3xl border border-[var(--glass-border)] bg-[var(--glass-bg)] hover:border-[rgba(56,189,248,0.3)] transition-colors shadow-sm ${className}`}>
      {title && (
        <h2 className="text-xl md:text-2xl font-bold font-['Plus_Jakarta_Sans'] mb-4 flex items-center gap-3 text-[var(--text-primary)]">
          {Icon && <Icon className="w-6 h-6 text-[#38bdf8] flex-shrink-0" />}
          {title}
        </h2>
      )}
      <div className="text-[var(--text-secondary)] text-base md:text-lg leading-relaxed space-y-4">
        {children}
      </div>
    </section>
  );
}

export default function TrustPageLayout({ 
  title, 
  subtitle, 
  lastUpdated, 
  children,
  badge = "KaroTools Trust Center",
}) {
  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] font-['DM_Sans']">
      <Navbar />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        
        {/* Breadcrumb / Back */}
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center gap-2 text-sm text-[var(--text-secondary)] hover:text-[#38bdf8] transition-colors no-underline">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
        </div>

        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--glass-bg)] border border-[var(--glass-border)] text-xs font-bold text-[#38bdf8] uppercase tracking-wider mb-6">
            <ShieldCheck className="w-4 h-4" />
            {badge}
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold font-['Plus_Jakarta_Sans'] mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-[#818cf8] leading-tight">
            {title}
          </h1>
          {subtitle && (
            <p className="text-[var(--text-secondary)] text-lg md:text-xl leading-relaxed mb-8">
              {subtitle}
            </p>
          )}
          {lastUpdated && (
            <div className="inline-flex items-center gap-2 text-sm text-[var(--text-secondary)] opacity-80">
              <Calendar className="w-4 h-4 text-[#38bdf8]" />
              <span>Last Updated: {lastUpdated}</span>
            </div>
          )}
        </div>

        {/* Main Content Area */}
        <div className="space-y-8">
          {children}
        </div>

        {/* CTA Tools Link */}
        <div className="mt-20 pt-12 border-t border-[var(--border-color)]">
          <h3 className="text-xl font-bold font-['Plus_Jakarta_Sans'] mb-8 text-center text-[var(--text-primary)]">Explore Free Tools</h3>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/gst-calculator" className="glass-panel px-6 py-3 rounded-xl border border-[var(--glass-border)] hover:border-[#38bdf8] transition-colors text-sm font-medium no-underline text-[var(--text-primary)] hover:text-[#38bdf8]">GST Calculator</Link>
            <Link href="/invoice-generator" className="glass-panel px-6 py-3 rounded-xl border border-[var(--glass-border)] hover:border-[#38bdf8] transition-colors text-sm font-medium no-underline text-[var(--text-primary)] hover:text-[#38bdf8]">Invoice Generator</Link>
            <Link href="/44ada-tax-calculator" className="glass-panel px-6 py-3 rounded-xl border border-[var(--glass-border)] hover:border-[#38bdf8] transition-colors text-sm font-medium no-underline text-[var(--text-primary)] hover:text-[#38bdf8]">44ADA Calculator</Link>
            <Link href="/tax-calculator" className="glass-panel px-6 py-3 rounded-xl border border-[var(--glass-border)] hover:border-[#38bdf8] transition-colors text-sm font-medium no-underline text-[var(--text-primary)] hover:text-[#38bdf8]">Income Tax Hub</Link>
          </div>
        </div>

        {/* Trust Navigation */}
        <div className="mt-16 pt-8 border-t border-[var(--border-color)] text-center pb-8">
          <h3 className="text-sm font-bold text-[var(--text-secondary)] uppercase tracking-wider mb-6">Related Trust Pages</h3>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-4 text-sm text-[var(--text-secondary)] font-medium">
            <Link href="/about" className="hover:text-[#38bdf8] transition-colors no-underline text-inherit">About</Link>
            <Link href="/methodology" className="hover:text-[#38bdf8] transition-colors no-underline text-inherit">Methodology</Link>
            <Link href="/sources" className="hover:text-[#38bdf8] transition-colors no-underline text-inherit">Sources</Link>
            <Link href="/editorial-policy" className="hover:text-[#38bdf8] transition-colors no-underline text-inherit">Editorial Policy</Link>
            <Link href="/disclaimer" className="hover:text-[#38bdf8] transition-colors no-underline text-inherit">Disclaimer</Link>
            <Link href="/privacy-policy" className="hover:text-[#38bdf8] transition-colors no-underline text-inherit">Privacy Policy</Link>
            <Link href="/contact" className="hover:text-[#38bdf8] transition-colors no-underline text-inherit">Contact</Link>
          </div>
        </div>

      </main>
    </div>
  );
}
