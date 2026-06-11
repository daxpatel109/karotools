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
  const mobileLineRef = useRef(null);

  useGSAP(() => {
    // 1. Desktop SVG Animation
    const path = pathRef.current;
    if (path) {
      const length = path.getTotalLength();
      gsap.set(path, {
        strokeDasharray: length,
        strokeDashoffset: length
      });
      gsap.to(path, {
        strokeDashoffset: 0,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top center",
          end: "bottom center+=100",
          scrub: 1
        }
      });
    }

    // 2. Mobile Line Animation (Height 0 to 100%)
    const mobileLine = mobileLineRef.current;
    if (mobileLine) {
      gsap.fromTo(mobileLine, 
        { height: "0%" },
        {
          height: "100%",
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top center",
            end: "bottom center-=100", // Stops a bit earlier so it doesn't overrun the last card
            scrub: 1
          }
        }
      );
    }
  }, { scope: containerRef });

  const cards = [
    {
      title: "Calculate GST",
      text: "Add or remove GST instantly for Indian freelance invoices.",
      align: "left",
      icon: "％"
    },
    {
      title: "Create Invoice",
      text: "Generate GST invoices online without login or watermark.",
      align: "right",
      icon: "📄"
    },
    {
      title: "Plan Your Taxes",
      text: "Use tax and advance tax calculators made for Indian freelancers.",
      align: "left",
      icon: "🧮"
    },
    {
      title: "Work Smarter",
      text: "Use email, bio, contract and rate tools to manage client work.",
      align: "right",
      icon: "💼"
    }
  ];

  return (
    <section className="scroll-path-section" ref={containerRef}>
      <div className="scroll-path-container">
        
        {/* Header */}
        <div className="scroll-path-header">
          <h2>Your Freelance Workflow, Simplified</h2>
          <p className="subtitle-text">Calculate GST, create invoices, plan taxes and manage client work — all with free tools built for Indian freelancers.</p>
        </div>

        {/* Cards, SVG, and Mobile Line */}
        <div className="path-items-wrapper">
          
          {/* Desktop SVG Path (Fluid) */}
          <div className="path-svg-wrapper">
            <svg width="100%" height="100%" viewBox="0 0 1000 1000" preserveAspectRatio="none">
              <defs>
                <linearGradient id="glowGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#0076ff" />
                  <stop offset="50%" stopColor="#6366f1" />
                  <stop offset="100%" stopColor="#005ae6" />
                </linearGradient>
              </defs>
              <path 
                ref={pathRef}
                className="animated-path"
                d="M 500 0 C 500 60, 400 60, 400 125 C 400 250, 600 250, 600 375 C 600 500, 400 500, 400 625 C 400 750, 600 750, 600 875 C 600 950, 500 950, 500 1000"
              />
            </svg>
          </div>

          <div className="mobile-animated-line" ref={mobileLineRef}></div>
          
          {cards.map((card, idx) => (
            <div key={idx} className={`path-card path-card-${card.align}`}>
              <div className="path-card-number">{card.icon}</div>
              <h3>{card.title}</h3>
              <p>{card.text}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
