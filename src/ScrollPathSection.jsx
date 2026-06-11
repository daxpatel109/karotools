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

        {/* Desktop SVG Path */}
        <div className="path-svg-wrapper">
          <svg width="1000" height="750" viewBox="0 0 1000 750" fill="none" preserveAspectRatio="xMidYMin slice">
            <defs>
              <linearGradient id="glowGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#0ea5e9" />
                <stop offset="50%" stopColor="#10b981" />
                <stop offset="100%" stopColor="#8b5cf6" />
              </linearGradient>
            </defs>
            <path 
              ref={pathRef}
              className="animated-path"
              d="M 500 0 C 500 100, 200 50, 200 180 C 200 310, 800 280, 800 410 C 800 540, 200 510, 200 640 C 200 750, 500 700, 500 850"
            />
          </svg>
        </div>

        {/* Cards & Mobile Line */}
        <div className="path-items-wrapper">
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
