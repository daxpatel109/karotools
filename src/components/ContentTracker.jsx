"use client";
import { useEffect, useRef } from "react";
import { sendGAEvent } from "@next/third-parties/google";

export default function ContentTracker() {
  const tracked50 = useRef(false);
  const tracked90 = useRef(false);

  useEffect(() => {
    // 1. Scroll Tracking
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      
      if (docHeight <= 0) return;
      const scrollPercent = (scrollTop / docHeight) * 100;

      if (scrollPercent >= 50 && !tracked50.current) {
        tracked50.current = true;
        sendGAEvent("event", "article_scroll_50", { page_path: window.location.pathname });
      }

      if (scrollPercent >= 90 && !tracked90.current) {
        tracked90.current = true;
        sendGAEvent("event", "article_scroll_90", { page_path: window.location.pathname });
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    // 2. Click tracking for FAQs and CTAs via Event Delegation
    const handleClick = (e) => {
      // Find closest element with data-analytics tag
      const ctaTarget = e.target.closest("[data-analytics]");
      if (ctaTarget) {
        const eventName = ctaTarget.getAttribute("data-analytics");
        sendGAEvent("event", eventName, { page_path: window.location.pathname });
      }

      // Track FAQ clicks
      const detailsTarget = e.target.closest("summary");
      if (detailsTarget) {
        const detailsEl = detailsTarget.parentElement;
        // Only track if it's being opened
        if (detailsEl && !detailsEl.open) {
          sendGAEvent("event", "faq_opened", { page_path: window.location.pathname });
        }
      }
    };

    document.addEventListener("click", handleClick);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("click", handleClick);
    };
  }, []);

  return null; // Invisible tracker component
}
