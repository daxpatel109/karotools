import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const CATEGORIES = [
  { id: "cold", label: "🎯 Cold Outreach", desc: "Reach new clients" },
  { id: "followup", label: "🔄 Follow Up", desc: "Chase responses" },
  { id: "payment", label: "💰 Payment", desc: "Invoice & reminders" },
  { id: "proposal", label: "📋 Proposal", desc: "Win projects" },
  { id: "thankyou", label: "🙏 Thank You", desc: "Build relationships" },
  { id: "breakup", label: "👋 Break-Up", desc: "Final follow up" },
  { id: "feedback", label: "⭐ Feedback", desc: "Request reviews" },
  { id: "onboard", label: "🚀 Onboarding", desc: "Welcome clients" },
  { id: "delay", label: "⏰ Delay Notice", desc: "Handle deadlines" },
  { id: "upsell", label: "📈 Upsell", desc: "Grow the project" },
];

const TONES = [
  { id: "professional", label: "💼 Professional" },
  { id: "friendly", label: "😊 Friendly" },
  { id: "confident", label: "🔥 Confident" },
  { id: "formal", label: "🎩 Formal" },
];

const TEMPLATES = {
  cold: {
    professional: {
      subject: "Partnership Opportunity — {yourService} for {clientCompany}",
      body: `Hi {clientName},\n\nI hope this message finds you well.\n\nMy name is {yourName}, and I'm a freelance {yourRole} based in {yourCity}. I came across {clientCompany} and was genuinely impressed by {specificDetail}.\n\nI specialize in {yourService} and have helped clients achieve {result}. I believe I can bring similar value to {clientCompany}.\n\nI'd love to schedule a quick 15-minute call to explore if there's a potential fit.\n\nWould {day1} or {day2} work for you?\n\nLooking forward to connecting.\n\nBest regards,\n{yourName}\n{yourRole} | {yourCity}\n{yourEmail} | {yourPhone}`,
    },
    friendly: {
      subject: "Hey {clientName}! Quick question about {clientCompany} 👋",
      body: `Hey {clientName}!\n\nI was browsing {clientCompany}'s work online and honestly — really loved what you're doing with {specificDetail}.\n\nI'm {yourName}, a {yourRole} who helps businesses like yours with {yourService}. My clients typically see {result} after working with me.\n\nI know you're probably busy, so I'll keep this short — would you be open to a quick 15-min chat? No pitch, just a conversation.\n\nEither way, keep up the great work! 🙌\n\nCheers,\n{yourName}\n{yourEmail}`,
    },
    confident: {
      subject: "{clientCompany} is leaving money on the table — here's how",
      body: `Hi {clientName},\n\nI'll get straight to the point.\n\nI noticed {clientCompany} is {specificDetail}. This is a missed opportunity that I can fix.\n\nI'm {yourName} — a {yourRole} who has helped businesses like yours achieve {result}. I do this through {yourService}.\n\nI'm not looking for a long-term commitment right away. Let me show you what I can do with a small paid pilot project.\n\nInterested? Reply "yes" and I'll send over a quick proposal.\n\n— {yourName}`,
    },
    formal: {
      subject: "Business Proposal: {yourService} Services for {clientCompany}",
      body: `Dear {clientName},\n\nI am writing to introduce myself and explore a potential business collaboration between us.\n\nI am {yourName}, a professional {yourRole} with expertise in {yourService}. After researching {clientCompany}, I identified several opportunities where my services could add significant value, particularly in {specificDetail}.\n\nMy previous clients have experienced {result} through our engagement.\n\nI would be honoured to arrange a formal meeting at your convenience to discuss this further.\n\nYours sincerely,\n{yourName}\n{yourRole}\n{yourEmail} | {yourPhone}`,
    },
  },
  followup: {
    professional: {
      subject: "Following up — {subject}",
      body: `Hi {clientName},\n\nI wanted to follow up on my previous email regarding {subject}.\n\nI understand you're busy, so I'll keep this brief. I'm still very interested in the opportunity to work with {clientCompany} on {yourService}.\n\nWould a quick 10-minute call this week work for you?\n\nBest,\n{yourName}`,
    },
    friendly: {
      subject: "Just checking in! 😊 — {subject}",
      body: `Hey {clientName}!\n\nJust wanted to bump this up in your inbox — no pressure at all!\n\nI sent over a note about {subject} a few days ago and wasn't sure if it got buried. Totally get it if the timing isn't right!\n\nEither way, hope things are going great at {clientCompany}!\n\nCheers,\n{yourName}`,
    },
    confident: {
      subject: "Last follow up — {subject}",
      body: `Hi {clientName},\n\nI've reached out a couple of times about {subject} and haven't heard back.\n\nI'll assume the timing isn't right — and that's completely fine.\n\nIf things change and you'd like to explore {yourService} for {clientCompany}, my door is always open.\n\n— {yourName}`,
    },
    formal: {
      subject: "Reminder: Pending Response — {subject}",
      body: `Dear {clientName},\n\nThis is a courteous follow-up to my earlier correspondence regarding {subject}.\n\nI remain available to address any queries you may have.\n\nRegards,\n{yourName}\n{yourRole}\n{yourEmail}`,
    },
  },
  payment: {
    professional: {
      subject: "Invoice #{invoiceNo} — Payment Due {dueDate}",
      body: `Hi {clientName},\n\nThis is a friendly reminder that Invoice #{invoiceNo} for {amount} is due on {dueDate}.\n\nProject: {projectName}\nAmount Due: {amount}\nDue Date: {dueDate}\n\nPayment via:\n{paymentDetails}\n\nThank you,\n{yourName}`,
    },
    friendly: {
      subject: "Quick reminder — Invoice #{invoiceNo} 🙏",
      body: `Hey {clientName}!\n\nJust a quick heads-up that Invoice #{invoiceNo} for {amount} is due on {dueDate}.\n\nPayment details:\n{paymentDetails}\n\nLet me know if anything looks off! 😊\n\nThanks,\n{yourName}`,
    },
    confident: {
      subject: "OVERDUE: Invoice #{invoiceNo} — {amount} pending",
      body: `Hi {clientName},\n\nInvoice #{invoiceNo} for {amount} was due on {dueDate} and remains unpaid.\n\nPlease process the payment at your earliest via:\n{paymentDetails}\n\n— {yourName}\n{yourPhone}`,
    },
    formal: {
      subject: "Notice of Outstanding Payment — Invoice #{invoiceNo}",
      body: `Dear {clientName},\n\nInvoice #{invoiceNo} amounting to {amount} for {projectName} remains outstanding as of {dueDate}.\n\nKindly arrange payment at the earliest:\n\n{paymentDetails}\n\nYours faithfully,\n{yourName}`,
    },
  },
  proposal: {
    professional: {
      subject: "Project Proposal — {projectName} for {clientCompany}",
      body: `Hi {clientName},\n\nThank you for considering me for {projectName}.\n\nPROJECT OVERVIEW\n{projectDescription}\n\nDELIVERABLES\n• {deliverable1}\n• {deliverable2}\n• {deliverable3}\n\nTIMELINE: {timeline}\nINVESTMENT: {amount}\nREVISIONS: {revisions} rounds\n\nLooking forward to working together!\n\n{yourName}\n{yourRole} | {yourEmail}`,
    },
    friendly: {
      subject: "Here's my proposal for {projectName}! 🚀",
      body: `Hey {clientName}!\n\nSuper excited about {projectName}! Here's what I'm thinking:\n\n🎯 {projectDescription}\n\n✅ {deliverable1}\n✅ {deliverable2}\n✅ {deliverable3}\n\n⏰ Timeline: {timeline}\n💰 Investment: {amount}\n🔄 Revisions: {revisions} rounds\n\nCan't wait!\n{yourName}`,
    },
    confident: {
      subject: "Proposal: Here's exactly how I'll deliver {result}",
      body: `Hi {clientName},\n\nHere's my proposal for {projectName}.\n\nProblem: {projectDescription}\nSolution: {deliverable1}, {deliverable2}, {deliverable3}\nResult: {result}\n\nTimeline: {timeline} | Investment: {amount}\n\nReply "yes" and I'll send the agreement within 24 hours.\n\n— {yourName}`,
    },
    formal: {
      subject: "Formal Proposal Submission — {projectName}",
      body: `Dear {clientName},\n\nSCOPE OF WORK\n{projectDescription}\n\nDELIVERABLES\n1. {deliverable1}\n2. {deliverable2}\n3. {deliverable3}\n\nTIMELINE: {timeline}\nTOTAL COST: {amount}\nREVISIONS: {revisions} included\n\nYours sincerely,\n{yourName}\n{yourRole} | {yourEmail}`,
    },
  },
  thankyou: {
    professional: {
      subject: "Thank you for the opportunity, {clientName}!",
      body: `Hi {clientName},\n\nThank you for choosing me for {projectName}. It was a great experience, especially {specificDetail}.\n\nI'd love to work with {clientCompany} again. A referral would mean the world!\n\nWarm regards,\n{yourName}`,
    },
    friendly: {
      subject: "It was such a pleasure! 🙏",
      body: `Hey {clientName}!\n\nWorking on {projectName} was genuinely amazing! {specificDetail} was my favourite part.\n\nIf you'd be open to leaving a quick review, I'd be forever grateful!\n\nThanks,\n{yourName} 🙌`,
    },
    confident: {
      subject: "Project complete — and here's what's next",
      body: `Hi {clientName},\n\n{projectName} is wrapped. Here's what could be next for {clientCompany}:\n\n• {upsell1}\n• {upsell2}\n\nA short testimonial would go a long way. Just reply with a few words.\n\n— {yourName}`,
    },
    formal: {
      subject: "Project Completion — {projectName}",
      body: `Dear {clientName},\n\n{projectName} has been successfully completed as per the agreed scope.\n\nThank you for entrusting me with this project. I look forward to future collaborations.\n\nYours sincerely,\n{yourName}\n{yourRole} | {yourEmail}`,
    },
  },
  breakup: {
    professional: {
      subject: "Closing the loop — {subject}",
      body: `Hi {clientName},\n\nI've reached out a few times regarding {subject} and understand you may not be interested.\n\nI'll close this conversation. If {yourService} becomes relevant for {clientCompany} in the future, feel free to reach out.\n\nBest,\n{yourName}`,
    },
    friendly: {
      subject: "No worries at all — closing this thread! 😊",
      body: `Hey {clientName}!\n\nNo response needed — I promise this is my last follow-up! 😄\n\nIf you ever need {yourService}, you know where to find me. Rooting for {clientCompany}! 🙌\n\nTake care,\n{yourName}`,
    },
    confident: {
      subject: "Moving on — but the door stays open",
      body: `Hi {clientName},\n\nThis is my last message regarding {subject}.\n\nIf anything changes, I'm one email away. Until then, I wish {clientCompany} continued success.\n\n— {yourName}`,
    },
    formal: {
      subject: "Final Communication — {subject}",
      body: `Dear {clientName},\n\nAs I have not received a response regarding {subject}, I shall consider the matter closed.\n\nShould {yourService} be required in future, I remain available.\n\nRegards,\n{yourName}\n{yourRole}`,
    },
  },
  feedback: {
    professional: {
      subject: "Quick favour — would you share your feedback?",
      body: `Hi {clientName},\n\nI'd really appreciate 2 minutes of your time to share feedback on {projectName}.\n\nLeave a review here: {reviewLink}\n\nOr simply reply to this email.\n\nThank you!\n{yourName}`,
    },
    friendly: {
      subject: "Would mean so much — quick review? ⭐",
      body: `Hey {clientName}!\n\nCould you spare 2 mins to leave a review for {projectName}? 🙏\n\n👉 {reviewLink}\n\nOr just reply here — even 2-3 sentences!\n\nThanks a million,\n{yourName} 😊`,
    },
    confident: {
      subject: "You said you were happy — prove it 😄",
      body: `Hi {clientName},\n\nYou mentioned you were happy with {projectName}. I'd love that in a testimonial.\n\n👉 {reviewLink}\n\nTakes 2 minutes. Would make my day!\n\n— {yourName}`,
    },
    formal: {
      subject: "Request for Testimonial — {projectName}",
      body: `Dear {clientName},\n\nI would be grateful if you could provide a brief testimonial for {projectName}.\n\n{reviewLink}\n\nThank you for your time.\n\nYours sincerely,\n{yourName}`,
    },
  },
  onboard: {
    professional: {
      subject: "Welcome aboard — {projectName} kickoff 🚀",
      body: `Hi {clientName},\n\nWelcome! Here's what happens next:\n\n1. Sign agreement: {agreementLink}\n2. Complete onboarding form: {questionnaireLink}\n3. Initial payment: {amount} via {paymentMethod}\n\nProject Start: {startDate} | Delivery: {deliveryDate}\n\nEmail: {yourEmail} | WhatsApp: {yourPhone}\nHours: {workingHours}\n\nBest,\n{yourName}`,
    },
    friendly: {
      subject: "Let's gooo! Welcome to the team 🎉",
      body: `Hey {clientName}!!\n\nSO excited to work on {projectName}! 🎉\n\n✅ Sign agreement: {agreementLink}\n✅ Onboarding form: {questionnaireLink}\n✅ Payment of {amount} via {paymentMethod}\n\nKickoff: {startDate} | Delivery: {deliveryDate}\n\nWhatsApp me anytime: {yourPhone} 😊\n\n{yourName} 🚀`,
    },
    confident: {
      subject: "We're officially in business — here's what's next",
      body: `Hi {clientName},\n\nACTION ITEMS (within 48 hours):\n1. Sign agreement → {agreementLink}\n2. Onboarding form → {questionnaireLink}\n3. Payment → {amount} via {paymentMethod}\n\nStart: {startDate} | Delivery: {deliveryDate}\n\nContact: {yourEmail} | {yourPhone}\n\n— {yourName}`,
    },
    formal: {
      subject: "Project Commencement Notice — {projectName}",
      body: `Dear {clientName},\n\nKindly complete the following:\n\n1. Agreement: {agreementLink}\n2. Project brief: {questionnaireLink}\n3. Payment: {amount} via {paymentMethod}\n\nStart: {startDate} | Review: {checkinDate} | Delivery: {deliveryDate}\n\nContact: {yourEmail} | {yourPhone} during {workingHours}\n\nYours sincerely,\n{yourName}`,
    },
  },
  delay: {
    professional: {
      subject: "Update on {projectName} — revised timeline",
      body: `Hi {clientName},\n\nDue to {reason}, delivery will be delayed by {delayDays}. New delivery date: {newDeadline}.\n\nWhat I'm doing:\n• {action1}\n• {action2}\n\nNext update: {updateDate}. Apologies for the inconvenience.\n\n{yourName}`,
    },
    friendly: {
      subject: "Important update on {projectName} 🙏",
      body: `Hey {clientName},\n\n{projectName} will take a little longer — new delivery: {newDeadline} (was {originalDeadline}).\n\nReason: {reason}\nFixing it with: {action1} and {action2}\n\nNext update: {updateDate}. Thanks for your understanding! 🙏\n\n{yourName}`,
    },
    confident: {
      subject: "{projectName} — revised delivery: {newDeadline}",
      body: `Hi {clientName},\n\n{projectName} will be delivered on {newDeadline}, not {originalDeadline}.\n\nReason: {reason}\nAction: {action1}, {action2}\n\nNext update: {updateDate}.\n\n— {yourName}`,
    },
    formal: {
      subject: "Notice of Project Delay — {projectName}",
      body: `Dear {clientName},\n\nDue to {reason}, the revised delivery date for {projectName} is {newDeadline} (originally {originalDeadline}).\n\nMeasures taken: {action1} and {action2}.\n\nProgress update: {updateDate}.\n\nYours sincerely,\n{yourName}`,
    },
  },
  upsell: {
    professional: {
      subject: "Taking {clientCompany} to the next level — a quick idea",
      body: `Hi {clientName},\n\nWhile working on {projectName}, I identified an opportunity: {upsellIdea}.\n\nThis could help you {result}.\n\nWhat: {upsellDescription}\nTimeline: {timeline}\nInvestment: {amount}\n\nOpen to a quick call?\n\n{yourName}`,
    },
    friendly: {
      subject: "Had a cool idea for {clientCompany}! 💡",
      body: `Hey {clientName}!\n\nSo I had this idea — what if we tackled {upsellIdea}? It could help you {result}!\n\n💡 {upsellDescription}\n⏰ Timeline: {timeline}\n💰 Investment: {amount}\n\nNo pressure — just worth sharing! 😊\n\n{yourName}`,
    },
    confident: {
      subject: "The obvious next step for {clientCompany}",
      body: `Hi {clientName},\n\n{upsellIdea} is the logical next step. Here's why: {upsellDescription}\n\nResult: {result} | Timeline: {timeline} | Cost: {amount}\n\nI can start next week. Want to move forward?\n\n— {yourName}`,
    },
    formal: {
      subject: "Proposal for Extended Engagement — {clientCompany}",
      body: `Dear {clientName},\n\nI recommend {upsellIdea} — {upsellDescription}.\n\nProjected outcome: {result}\nTimeline: {timeline}\nInvestment: {amount}\n\nYours sincerely,\n{yourName}\n{yourRole} | {yourEmail}`,
    },
  },
};

const FIELDS = {
  cold: ["yourName","yourRole","yourCity","yourEmail","yourPhone","clientName","clientCompany","yourService","specificDetail","result","day1","day2"],
  followup: ["yourName","yourEmail","yourPhone","clientName","clientCompany","yourService","subject"],
  payment: ["yourName","yourEmail","yourPhone","clientName","projectName","invoiceNo","amount","dueDate","paymentDetails"],
  proposal: ["yourName","yourRole","yourEmail","clientName","clientCompany","projectName","projectDescription","deliverable1","deliverable2","deliverable3","timeline","amount","revisions","support","result"],
  thankyou: ["yourName","yourRole","yourEmail","clientName","clientCompany","projectName","specificDetail","upsell1","upsell2"],
  breakup: ["yourName","yourRole","clientName","clientCompany","yourService","subject"],
  feedback: ["yourName","clientName","clientCompany","projectName","reviewLink"],
  onboard: ["yourName","yourEmail","yourPhone","clientName","projectName","amount","paymentMethod","startDate","checkinDate","deliveryDate","workingHours","agreementLink","questionnaireLink"],
  delay: ["yourName","yourEmail","clientName","projectName","reason","delayDays","originalDeadline","newDeadline","action1","action2","updateDate"],
  upsell: ["yourName","yourRole","yourEmail","clientName","clientCompany","projectName","upsellIdea","upsellDescription","result","timeline","amount"],
};

const FIELD_LABELS = {
  yourName:"Your Name", yourRole:"Your Role/Title", yourCity:"Your City",
  yourEmail:"Your Email", yourPhone:"Your Phone/WhatsApp",
  clientName:"Client First Name", clientCompany:"Client Company",
  yourService:"Your Service (e.g. UI Design)", specificDetail:"Something specific about them",
  result:"Result you deliver (e.g. 3x more leads)", day1:"Day Option 1 (e.g. Tuesday 3pm)",
  day2:"Day Option 2 (e.g. Wednesday 10am)", subject:"Email Subject/Topic",
  projectName:"Project Name", invoiceNo:"Invoice Number",
  amount:"Amount (e.g. ₹25,000)", dueDate:"Due Date", paymentDetails:"Bank/UPI Details",
  projectDescription:"Project Description (1-2 lines)", deliverable1:"Deliverable 1",
  deliverable2:"Deliverable 2", deliverable3:"Deliverable 3",
  timeline:"Timeline (e.g. 2 weeks)", revisions:"No. of Revisions (e.g. 2)",
  support:"Support Period (e.g. 7 days)", upsell1:"Next Service Idea 1",
  upsell2:"Next Service Idea 2", reviewLink:"Review/Testimonial Link",
  paymentMethod:"Payment Method (e.g. NEFT/UPI)", startDate:"Project Start Date",
  checkinDate:"First Check-in Date", deliveryDate:"Delivery Date",
  workingHours:"Working Hours (e.g. Mon-Fri 10am-7pm)",
  agreementLink:"Agreement Link", questionnaireLink:"Onboarding Form Link",
  reason:"Reason for Delay", delayDays:"Days of Delay",
  originalDeadline:"Original Deadline", newDeadline:"New Deadline",
  action1:"Action 1 to fix", action2:"Action 2 to fix", updateDate:"Next Update Date",
  upsellIdea:"Upsell Idea (short)", upsellDescription:"Upsell Description",
};

const FAQS = [
  ["How do I write a cold email that gets replies?", "Keep it under 150 words, personalise the first line, focus on their problem and end with one clear low-commitment CTA like a 15-min call."],
  ["How many follow-ups should I send?", "3 follow-ups is the sweet spot — 48hrs, 5 days, and 10 days after the first email. Most deals close on follow-up 2 or 3."],
  ["What's the best time to send freelance emails in India?", "Tuesday–Thursday, 9–11am or 2–4pm. Avoid Mondays and Fridays. Open rates drop 30% on weekends."],
  ["How do I ask for payment professionally?", "Be direct but polite. Reference the invoice number, amount, and due date clearly. Offer payment methods upfront."],
  ["Should I use formal or friendly email tone?", "Match your client's style. Indian corporate clients prefer professional/formal. Startups prefer friendly/casual. When in doubt, start professional."],
];

function buildEmail(category, tone, fields) {
  const template = TEMPLATES[category]?.[tone] || TEMPLATES[category]?.professional;
  if (!template) return { subject: "", body: "" };
  let subject = template.subject;
  let body = template.body;
  Object.entries(fields).forEach(([key, val]) => {
    const filled = val || `[${FIELD_LABELS[key] || key}]`;
    subject = subject.replace(new RegExp(`{${key}}`, "g"), filled);
    body = body.replace(new RegExp(`{${key}}`, "g"), filled);
  });
  return { subject, body };
}

function FocusInput({ label, value, onChange, placeholder, multiline = false }) {
  const base = { width: "100%", padding: "12px 16px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 12, fontSize: 14, color: "#f1f5f9", outline: "none", boxSizing: "border-box", fontFamily: "'DM Sans',sans-serif", transition: "all 0.2s" };
  const h = {
    onFocus: e => { e.target.style.borderColor = "rgba(14,165,233,0.5)"; e.target.style.boxShadow = "0 0 0 4px rgba(14,165,233,0.08)"; e.target.style.background = "rgba(255,255,255,0.06)"; },
    onBlur: e => { e.target.style.borderColor = "rgba(255,255,255,0.08)"; e.target.style.boxShadow = "none"; e.target.style.background = "rgba(255,255,255,0.04)"; }
  };
  return (
    <div>
      <label style={{ display: "block", fontSize: 11, fontWeight: 700, color: "#475569", marginBottom: 6, letterSpacing: "0.08em", textTransform: "uppercase" }}>{label}</label>
      {multiline
        ? <textarea value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} rows={3} style={{ ...base, resize: "vertical" }} {...h} />
        : <input value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} style={base} {...h} />}
    </div>
  );
}

export default function EmailGenerator() {
  const [category, setCategory] = useState("cold");
  const [tone, setTone] = useState("professional");
  const [fields, setFields] = useState({});
  const [email, setEmail] = useState(null);
  const [copiedS, setCopiedS] = useState(false);
  const [copiedB, setCopiedB] = useState(false);
  const [copiedAll, setCopiedAll] = useState(false);

  const updateField = (key, val) => setFields(p => ({ ...p, [key]: val }));

  // SEO
  useEffect(() => {
    document.title = "Free Business Email Generator for Indian Freelancers | KaroTools";
    const setMeta = (name, content) => {
      let el = document.querySelector(`meta[name="${name}"]`);
      if (!el) { el = document.createElement("meta"); el.name = name; document.head.appendChild(el); }
      el.content = content;
    };
    setMeta("description", "Generate professional business emails instantly — cold outreach, follow-up, payment reminder, proposal & more. 10 email types, 4 tones. Free, no login required.");
    setMeta("keywords", "free email generator india, business email generator freelancer, cold email template india, payment reminder email india, freelance proposal email, karotools email generator");
    setMeta("robots", "index, follow");

    const schema = {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": "KaroTools Email Generator",
      "url": "https://karotools.in/email-generator",
      "description": "Free business email generator for Indian freelancers. 10 email types, 4 tones. No login required.",
      "applicationCategory": "BusinessApplication",
      "offers": { "@type": "Offer", "price": "0", "priceCurrency": "INR" }
    };
    let sc = document.querySelector("#ld-email");
    if (!sc) { sc = document.createElement("script"); sc.id = "ld-email"; sc.type = "application/ld+json"; document.head.appendChild(sc); }
    sc.text = JSON.stringify(schema);
  }, []);

  const handleGenerate = () => {
    const result = buildEmail(category, tone, fields);
    setEmail(result);
    setTimeout(() => document.getElementById("email-result")?.scrollIntoView({ behavior: "smooth", block: "start" }), 100);
  };

  const copy = (text, setter) => {
    navigator.clipboard.writeText(text);
    setter(true);
    setTimeout(() => setter(false), 2000);
  };

  const currentFields = FIELDS[category] || [];
  const yourFields = currentFields.filter(f => f.startsWith("your"));
  const clientFields = currentFields.filter(f => f.startsWith("client"));
  const otherFields = currentFields.filter(f => !f.startsWith("your") && !f.startsWith("client"));
  const wordCount = email ? email.body.split(/\s+/).filter(Boolean).length : 0;

  const card = { background: "rgba(255,255,255,0.025)", backdropFilter: "blur(20px)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 20, padding: 28, marginBottom: 16 };

  return (
    <div style={{ minHeight: "100vh", background: "#020617", fontFamily: "'DM Sans',sans-serif", color: "#f1f5f9" }}>
      <link href="https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;600&display=swap" rel="stylesheet" />
      <style>{`
        * { box-sizing: border-box; }
        input::placeholder, textarea::placeholder { color: #1e293b; }
        textarea { resize: vertical; }
        @keyframes fadeInUp { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
        @keyframes fadeIn { from{opacity:0} to{opacity:1} }
        @keyframes pulse { 0%,100%{opacity:0.5;transform:scale(1)} 50%{opacity:1;transform:scale(1.2)} }
        @keyframes shimmer { 0%{background-position:-200% center} 100%{background-position:200% center} }
        .cat-btn { transition: all 0.2s; }
        .cat-btn:hover { border-color: rgba(14,165,233,0.4) !important; color: #38bdf8 !important; }
        .tone-btn:hover { border-color: rgba(14,165,233,0.4) !important; }
        .faq-item:hover { border-color: rgba(14,165,233,0.2) !important; background: rgba(14,165,233,0.03) !important; }

        @media (max-width: 640px) {
          .cat-grid { grid-template-columns: 1fr 1fr !important; }
          .fields-grid { grid-template-columns: 1fr !important; }
          .stats-grid { grid-template-columns: 1fr 1fr !important; }
          .tone-grid { flex-wrap: wrap !important; }
          .hero-title { font-size: 28px !important; }
          .main-pad { padding: 80px 16px 60px !important; }
          .nav-pad { padding: 0 16px !important; }
        }
      `}</style>

      {/* Ambient BG */}
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0 }}>
        <div style={{ position: "absolute", top: "-20%", left: "-10%", width: "60%", height: "60%", background: "radial-gradient(circle, rgba(14,165,233,0.07) 0%, transparent 65%)", filter: "blur(80px)" }} />
        <div style={{ position: "absolute", bottom: "-20%", right: "-10%", width: "55%", height: "55%", background: "radial-gradient(circle, rgba(20,184,166,0.05) 0%, transparent 65%)", filter: "blur(80px)" }} />
      </div>

      {/* Dot grid */}
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0, backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.02) 1px, transparent 1px)", backgroundSize: "28px 28px" }} />

      {/* Navbar */}
      <nav className="nav-pad" style={{ position: "sticky", top: 0, zIndex: 100, height: 68, display: "flex", alignItems: "center", padding: "0 40px", justifyContent: "space-between", background: "rgba(2,6,23,0.92)", backdropFilter: "blur(24px)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 34, height: 34, borderRadius: 10, background: "linear-gradient(135deg,#0ea5e9,#14b8a6)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, boxShadow: "0 0 16px rgba(14,165,233,0.3)" }}>⚡</div>
          <span style={{ fontSize: 20, fontWeight: 800, fontFamily: "'Syne',sans-serif", background: "linear-gradient(135deg,#0ea5e9,#14b8a6,#0ea5e9)", backgroundSize: "200% auto", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", animation: "shimmer 4s linear infinite" }}>KaroTools</span>
        </div>
        <Link to="/" style={{ padding: "9px 18px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 10, color: "#94a3b8", fontSize: 14, fontWeight: 600, textDecoration: "none", display: "inline-flex", alignItems: "center", transition: "all 0.2s" }}
          onMouseEnter={e => { e.currentTarget.style.background = "rgba(14,165,233,0.1)"; e.currentTarget.style.borderColor = "rgba(14,165,233,0.3)"; e.currentTarget.style.color = "#38bdf8"; }}
          onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.04)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; e.currentTarget.style.color = "#94a3b8"; }}>
          ← Home
        </Link>
      </nav>

      <div className="main-pad" style={{ position: "relative", zIndex: 1, maxWidth: 880, margin: "0 auto", padding: "60px 24px 80px" }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 48, animation: "fadeInUp 0.6s both" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(14,165,233,0.1)", border: "1px solid rgba(14,165,233,0.2)", borderRadius: 50, padding: "7px 18px", marginBottom: 24 }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#0ea5e9", display: "inline-block", animation: "pulse 2s infinite" }} />
            <span style={{ fontSize: 12, color: "#38bdf8", fontWeight: 700, letterSpacing: "0.08em" }}>10 EMAIL TYPES · 4 TONES · 100% FREE · NO LOGIN</span>
          </div>
          <div style={{ fontSize: 52, marginBottom: 16 }}>📧</div>
          <h1 className="hero-title" style={{ fontSize: "clamp(28px,5vw,46px)", fontWeight: 800, fontFamily: "'Syne',sans-serif", marginBottom: 12, background: "linear-gradient(135deg,#ffffff,#38bdf8,#14b8a6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", letterSpacing: "-0.02em" }}>
            Free Business Email Generator
          </h1>
          <p style={{ color: "#64748b", fontSize: 16, maxWidth: 520, margin: "0 auto", lineHeight: 1.7 }}>
            Generate professional business emails instantly — cold outreach, follow-ups, payment reminders & more. Built for Indian freelancers.
          </p>
        </div>

        {/* Step 1 — Email Type */}
        <div style={{ ...card, animation: "fadeInUp 0.6s 0.1s both" }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: "#0ea5e9", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 16 }}>Step 1 — Choose Email Type</div>
          <div className="cat-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(170px,1fr))", gap: 10 }}>
            {CATEGORIES.map(c => (
              <button key={c.id} className="cat-btn" onClick={() => { setCategory(c.id); setEmail(null); }}
                style={{ padding: "13px 14px", borderRadius: 14, cursor: "pointer", textAlign: "left", border: `1px solid ${category === c.id ? "rgba(14,165,233,0.5)" : "rgba(255,255,255,0.07)"}`, background: category === c.id ? "rgba(14,165,233,0.12)" : "rgba(255,255,255,0.02)" }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: category === c.id ? "#38bdf8" : "#f1f5f9", marginBottom: 3 }}>{c.label}</div>
                <div style={{ fontSize: 11, color: category === c.id ? "#0ea5e9" : "#334155" }}>{c.desc}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Step 2 — Tone */}
        <div style={{ ...card, animation: "fadeInUp 0.6s 0.15s both" }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: "#0ea5e9", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 16 }}>Step 2 — Choose Tone</div>
          <div className="tone-grid" style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            {TONES.map(t => (
              <button key={t.id} className="tone-btn" onClick={() => setTone(t.id)}
                style={{ padding: "11px 20px", borderRadius: 50, cursor: "pointer", fontSize: 14, fontWeight: 600, border: `1px solid ${tone === t.id ? "rgba(14,165,233,0.6)" : "rgba(255,255,255,0.08)"}`, background: tone === t.id ? "rgba(14,165,233,0.15)" : "rgba(255,255,255,0.03)", color: tone === t.id ? "#38bdf8" : "#94a3b8", transition: "all 0.2s" }}>
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Step 3 — Fields */}
        <div style={{ ...card, animation: "fadeInUp 0.6s 0.2s both" }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: "#0ea5e9", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 6 }}>Step 3 — Fill Your Details</div>
          <p style={{ fontSize: 13, color: "#334155", marginBottom: 20 }}>Leave any field blank — it will appear as a placeholder in the email.</p>

          {yourFields.length > 0 && (
            <>
              <div style={{ fontSize: 11, fontWeight: 700, color: "#0ea5e9", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 12 }}>📌 Your Details</div>
              <div className="fields-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 20 }}>
                {yourFields.map(f => <FocusInput key={f} label={FIELD_LABELS[f]} value={fields[f] || ""} onChange={v => updateField(f, v)} placeholder={f === "yourName" ? "e.g. Raj Patel" : f === "yourRole" ? "e.g. UI/UX Designer" : f === "yourEmail" ? "raj@email.com" : f === "yourPhone" ? "+91 98765 43210" : f === "yourCity" ? "Ahmedabad" : "..."} />)}
              </div>
            </>
          )}

          {clientFields.length > 0 && (
            <>
              <div style={{ fontSize: 11, fontWeight: 700, color: "#14b8a6", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 12 }}>👤 Client Details</div>
              <div className="fields-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 20 }}>
                {clientFields.map(f => <FocusInput key={f} label={FIELD_LABELS[f]} value={fields[f] || ""} onChange={v => updateField(f, v)} placeholder={f === "clientName" ? "e.g. Priya" : f === "clientCompany" ? "e.g. Acme Corp" : "..."} />)}
              </div>
            </>
          )}

          {otherFields.length > 0 && (
            <>
              <div style={{ fontSize: 11, fontWeight: 700, color: "#3b82f6", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 12 }}>📋 Project / Email Details</div>
              <div className="fields-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                {otherFields.map(f => <FocusInput key={f} label={FIELD_LABELS[f]} value={fields[f] || ""} onChange={v => updateField(f, v)} placeholder={f === "amount" ? "₹25,000" : f === "timeline" ? "2 weeks" : f === "result" ? "3x more leads" : "..."} multiline={["projectDescription","paymentDetails","upsellDescription","reason"].includes(f)} />)}
              </div>
            </>
          )}
        </div>

        {/* Generate Button */}
        <button onClick={handleGenerate}
          style={{ width: "100%", padding: 18, background: "linear-gradient(135deg,#0ea5e9,#14b8a6)", border: "none", borderRadius: 14, color: "#fff", fontSize: 17, fontWeight: 700, cursor: "pointer", fontFamily: "'Syne',sans-serif", boxShadow: "0 8px 32px rgba(14,165,233,0.35)", marginBottom: 24, transition: "all 0.3s" }}
          onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 16px 40px rgba(14,165,233,0.45)"; }}
          onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 8px 32px rgba(14,165,233,0.35)"; }}>
          ✨ Generate Email
        </button>

        {/* Result */}
        {email && (
          <div id="email-result" style={{ animation: "fadeIn 0.5s both" }}>

            {/* Stats */}
            <div className="stats-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 10, marginBottom: 16 }}>
              {[
                { label: "Words", value: wordCount, note: wordCount > 250 ? "⚠️ Too long" : "✅ Good" },
                { label: "Chars", value: email.body.length },
                { label: "Tone", value: TONES.find(t => t.id === tone)?.label.split(" ")[1] || tone },
                { label: "Type", value: CATEGORIES.find(c => c.id === category)?.label.split(" ").slice(1).join(" ") || category },
              ].map(s => (
                <div key={s.label} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 12, padding: "12px 14px" }}>
                  <div style={{ fontSize: 10, color: "#334155", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em" }}>{s.label}</div>
                  <div style={{ fontSize: 18, fontWeight: 800, color: "#38bdf8", fontFamily: "'Syne',sans-serif", marginTop: 3 }}>{s.value}</div>
                  {s.note && <div style={{ fontSize: 10, color: wordCount > 250 ? "#f59e0b" : "#4ade80", marginTop: 2 }}>{s.note}</div>}
                </div>
              ))}
            </div>

            {/* Subject */}
            <div style={{ ...card, padding: "20px 24px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                <span style={{ fontSize: 12, fontWeight: 700, color: "#0ea5e9", letterSpacing: "0.08em", textTransform: "uppercase" }}>📌 Subject Line</span>
                <button onClick={() => copy(email.subject, setCopiedS)} style={{ padding: "6px 14px", background: copiedS ? "rgba(52,211,153,0.15)" : "rgba(14,165,233,0.12)", border: `1px solid ${copiedS ? "rgba(52,211,153,0.3)" : "rgba(14,165,233,0.25)"}`, borderRadius: 8, color: copiedS ? "#34d399" : "#38bdf8", fontSize: 12, fontWeight: 700, cursor: "pointer" }}>
                  {copiedS ? "✅ Copied!" : "📋 Copy"}
                </button>
              </div>
              <div style={{ fontSize: 16, fontWeight: 700, color: "#f1f5f9", background: "rgba(255,255,255,0.03)", padding: "14px 16px", borderRadius: 10, border: "1px solid rgba(255,255,255,0.06)" }}>
                {email.subject}
              </div>
            </div>

            {/* Body */}
            <div style={{ ...card, padding: "20px 24px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                <span style={{ fontSize: 12, fontWeight: 700, color: "#0ea5e9", letterSpacing: "0.08em", textTransform: "uppercase" }}>✉️ Email Body</span>
                <button onClick={() => copy(email.body, setCopiedB)} style={{ padding: "6px 14px", background: copiedB ? "rgba(52,211,153,0.15)" : "rgba(14,165,233,0.12)", border: `1px solid ${copiedB ? "rgba(52,211,153,0.3)" : "rgba(14,165,233,0.25)"}`, borderRadius: 8, color: copiedB ? "#34d399" : "#38bdf8", fontSize: 12, fontWeight: 700, cursor: "pointer" }}>
                  {copiedB ? "✅ Copied!" : "📋 Copy"}
                </button>
              </div>
              <pre style={{ whiteSpace: "pre-wrap", fontSize: 14, lineHeight: 1.8, color: "#cbd5e1", fontFamily: "'DM Sans',sans-serif", background: "rgba(255,255,255,0.02)", padding: "20px", borderRadius: 12, border: "1px solid rgba(255,255,255,0.05)", margin: 0, overflowX: "auto" }}>
                {email.body}
              </pre>
            </div>

            {/* Copy All + Regenerate */}
            <button onClick={() => copy(`Subject: ${email.subject}\n\n${email.body}`, setCopiedAll)}
              style={{ width: "100%", padding: 16, background: copiedAll ? "linear-gradient(135deg,#059669,#0891b2)" : "linear-gradient(135deg,#0ea5e9,#14b8a6)", border: "none", borderRadius: 12, color: "#fff", fontSize: 16, fontWeight: 700, cursor: "pointer", fontFamily: "'Syne',sans-serif", boxShadow: "0 4px 20px rgba(14,165,233,0.3)", marginBottom: 10 }}>
              {copiedAll ? "✅ Full Email Copied!" : "📋 Copy Full Email (Subject + Body)"}
            </button>
            <button onClick={handleGenerate}
              style={{ width: "100%", padding: 14, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 12, color: "#475569", fontSize: 14, fontWeight: 600, cursor: "pointer", marginBottom: 24 }}>
              🔄 Regenerate with same settings
            </button>
          </div>
        )}

        {/* Email Tips */}
        <div style={{ ...card, marginTop: 8 }}>
          <h2 style={{ fontSize: 17, fontWeight: 800, fontFamily: "'Syne',sans-serif", color: "#f1f5f9", marginBottom: 16 }}>📈 Email Tips for Indian Freelancers</h2>
          <div style={{ display: "grid", gap: 10 }}>
            {[
              ["⏰ Best Send Time", "Tue–Thu, 9–11am or 2–4pm. Avoid Monday mornings and Fridays. Open rates drop 30% on weekends."],
              ["📏 Ideal Length", "Cold emails: under 150 words. Follow-ups: under 80 words. Proposals: 200–300 words. Shorter = more replies."],
              ["🎯 Subject Lines", "Personalised subjects get 26% higher open rates. Use the client's company name or a specific detail you noticed."],
              ["🔄 Follow-Up Sequence", "Send 3 follow-ups: at 48hrs, 5 days, and 10 days. Most replies come on follow-up #2 or #3."],
            ].map(([t, d]) => (
              <div key={t} style={{ display: "flex", gap: 12, padding: 14, background: "rgba(255,255,255,0.02)", borderRadius: 10, flexWrap: "wrap" }}>
                <span style={{ fontSize: 13, fontWeight: 700, color: "#0ea5e9", minWidth: 120 }}>{t}</span>
                <span style={{ fontSize: 13, color: "#64748b", lineHeight: 1.6, flex: 1 }}>{d}</span>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ — SEO */}
        <div style={{ marginTop: 20, borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: 48 }}>
          <h2 style={{ fontSize: 22, fontWeight: 800, fontFamily: "'Syne',sans-serif", color: "#f1f5f9", marginBottom: 28, textAlign: "center" }}>Frequently Asked Questions</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {FAQS.map(([q, a]) => (
              <div key={q} className="faq-item" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 14, padding: "20px 24px", transition: "all 0.3s" }}>
                <h3 style={{ fontSize: 15, fontWeight: 700, color: "#e2e8f0", marginBottom: 8, fontFamily: "'Syne',sans-serif" }}>{q}</h3>
                <p style={{ fontSize: 14, color: "#64748b", lineHeight: 1.7 }}>{a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* SEO text block */}
        <div style={{ marginTop: 48, padding: "32px 28px", background: "rgba(255,255,255,0.01)", border: "1px solid rgba(255,255,255,0.04)", borderRadius: 16 }}>
          <h2 style={{ fontSize: 18, fontWeight: 800, fontFamily: "'Syne',sans-serif", color: "#f1f5f9", marginBottom: 12 }}>Free Business Email Generator for Indian Freelancers</h2>
          <p style={{ fontSize: 14, color: "#334155", lineHeight: 1.8 }}>
            KaroTools Email Generator helps Indian freelancers, consultants, designers, developers, and small business owners write professional emails in seconds — completely free. Choose from 10 email types including cold outreach, follow-up, payment reminder, project proposal, thank you, onboarding, delay notice, feedback request, break-up email, and upsell. Available in 4 tones: Professional, Friendly, Confident, and Formal. No login required. No API. Works instantly.
          </p>
        </div>
      </div>
    </div>
  );
}
