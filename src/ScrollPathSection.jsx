import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import "./ScrollPathSection.css";

// Register ScrollTrigger with GSAP
gsap.registerPlugin(ScrollTrigger);

export default function ScrollPathSection() {
  const containerRef = useRef(null);
  const pathRef = useRef(null);

  useGSAP(() => {
    // Only animate on desktop, mobile has the path hidden via CSS
    if (window.innerWidth <= 768) return;

    const path = pathRef.current;
    if (!path) return;

    // Get the exact length of the SVG path
    const length = path.getTotalLength();

    // Set initial stroke state to be completely hidden
    gsap.set(path, {
      strokeDasharray: length,
      strokeDashoffset: length
    });

    // Animate the strokeDashoffset from length to 0 as user scrolls
    gsap.to(path, {
      strokeDashoffset: 0,
      ease: "none", // Linear animation tied directly to scroll
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top center",       // Animation starts when section top hits screen center
        end: "bottom center+=100", // Animation ends when section bottom hits near screen center
        scrub: 1                   // 1 second delay for smooth follow
      }
    });
  }, { scope: containerRef });

  const cards = [
    {
      title: "Calculate GST",
      text: "Add or remove GST instantly for Indian freelance invoices.",
      align: "left"
    },
    {
      title: "Create Invoice",
      text: "Generate GST invoices online without login or watermark.",
      align: "right"
    },
    {
      title: "Plan Your Taxes",
      text: "Use tax and advance tax calculators made for Indian freelancers.",
      align: "left"
    },
    {
      title: "Work Smarter",
      text: "Use email, bio, contract and rate tools to manage client work.",
      align: "right"
    }
  ];

  return (
    <section className="scroll-path-section" ref={containerRef}>
      <div className="scroll-path-container">
        
        {/* Header */}
        <div className="scroll-path-header">
          <span className="subtitle">Simple Workflow</span>
          <h2>From GST Calculation to<br/>Client-Ready Invoice</h2>
        </div>

        {/* Desktop SVG Path */}
        <div className="path-svg-wrapper">
          <svg width="1000" height="900" viewBox="0 0 1000 900" fill="none" preserveAspectRatio="xMidYMin slice">
            <defs>
              <linearGradient id="glowGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#0ea5e9" />
                <stop offset="50%" stopColor="#10b981" />
                <stop offset="100%" stopColor="#8b5cf6" />
              </linearGradient>
            </defs>
            {/* An elegant S-curve weaving through the center coordinates where cards sit */}
            <path 
              ref={pathRef}
              className="animated-path"
              d="M 500 0 C 500 150, 200 100, 200 250 C 200 400, 800 350, 800 500 C 800 650, 200 600, 200 750 C 200 900, 500 850, 500 1000"
            />
          </svg>
        </div>

        {/* Cards */}
        <div className="path-items-wrapper">
          {cards.map((card, idx) => (
            <div key={idx} className={`path-card path-card-${card.align}`}>
              <div className="path-card-number">{idx + 1}</div>
              <h3>{card.title}</h3>
              <p>{card.text}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
