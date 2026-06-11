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
  cold: ["yourName","yourRole","yourCity","yourEmail","yourPhone","clientName","clientEmail","clientCompany","yourService","specificDetail","result","day1","day2"],
  followup: ["yourName","yourEmail","yourPhone","clientName","clientEmail","clientCompany","yourService","subject"],
  payment: ["yourName","yourEmail","yourPhone","clientName","clientEmail","projectName","invoiceNo","amount","dueDate","paymentDetails"],
  proposal: ["yourName","yourRole","yourEmail","clientName","clientEmail","clientCompany","projectName","projectDescription","deliverable1","deliverable2","deliverable3","timeline","amount","revisions","support","result"],
  thankyou: ["yourName","yourRole","yourEmail","clientName","clientEmail","clientCompany","projectName","specificDetail","upsell1","upsell2"],
  breakup: ["yourName","yourRole","clientName","clientEmail","clientCompany","yourService","subject"],
  feedback: ["yourName","clientName","clientEmail","clientCompany","projectName","reviewLink"],
  onboard: ["yourName","yourEmail","yourPhone","clientName","clientEmail","projectName","amount","paymentMethod","startDate","checkinDate","deliveryDate","workingHours","agreementLink","questionnaireLink"],
  delay: ["yourName","yourEmail","clientName","clientEmail","projectName","reason","delayDays","originalDeadline","newDeadline","action1","action2","updateDate"],
  upsell: ["yourName","yourRole","yourEmail","clientName","clientEmail","clientCompany","projectName","upsellIdea","upsellDescription","result","timeline","amount"],
};

const FIELD_LABELS = {
  yourName:"Your Name", yourRole:"Your Role/Title", yourCity:"Your City",
  yourEmail:"Your Email", yourPhone:"Your Phone/WhatsApp",
  clientName:"Client First Name", clientEmail:"Client Email", clientCompany:"Client Company",
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

const PLACEHOLDERS = {
  yourName: "e.g. Raj Patel",
  yourRole: "e.g. Frontend Developer",
  yourCity: "e.g. Bangalore",
  yourEmail: "e.g. raj@email.com",
  yourPhone: "e.g. +91 98765 43210",
  clientName: "e.g. Priya",
  clientEmail: "e.g. priya@startup.com",
  clientCompany: "e.g. Acme Corp",
  yourService: "e.g. Website Redesign",
  specificDetail: "e.g. your recent product launch",
  result: "e.g. 3x faster load times",
  day1: "e.g. Tuesday 3pm",
  day2: "e.g. Wednesday 10am",
  subject: "e.g. Question about our project",
  projectName: "e.g. Q3 Marketing Website",
  invoiceNo: "e.g. INV-2024-05",
  amount: "e.g. ₹25,000",
  dueDate: "e.g. Friday, 15th October",
  paymentDetails: "e.g. UPI: raj@okicici\\nBank: HDFC 12345678",
  projectDescription: "e.g. Designing a 5-page marketing website in Figma",
  deliverable1: "e.g. Homepage Design",
  deliverable2: "e.g. About & Contact Pages",
  deliverable3: "e.g. Mobile Responsive Layout",
  timeline: "e.g. 2 weeks",
  revisions: "e.g. 2",
  support: "e.g. 14 days",
  upsell1: "e.g. SEO Optimization",
  upsell2: "e.g. Monthly Maintenance Plan",
  reviewLink: "e.g. https://g.page/r/123/review",
  paymentMethod: "e.g. NEFT / UPI",
  startDate: "e.g. 1st November",
  checkinDate: "e.g. 7th November",
  deliveryDate: "e.g. 14th November",
  workingHours: "e.g. Mon-Fri 10am-7pm",
  agreementLink: "e.g. https://docu.sign/123",
  questionnaireLink: "e.g. https://tally.so/r/123",
  reason: "e.g. Waiting on API access",
  delayDays: "e.g. 3 days",
  originalDeadline: "e.g. 10th Oct",
  newDeadline: "e.g. 13th Oct",
  action1: "e.g. Using mock data temporarily",
  action2: "e.g. Completing UI first",
  updateDate: "e.g. Tomorrow 5pm",
  upsellIdea: "e.g. Adding an admin dashboard",
  upsellDescription: "e.g. A dashboard to manage users easily without dev help",
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
  const [category, setCategory] = useState(() => localStorage.getItem("em_category") || "cold");
  const [tone, setTone] = useState(() => localStorage.getItem("em_tone") || "professional");
  const [fields, setFields] = useState(() => JSON.parse(localStorage.getItem("em_fields") || "{}"));
  const [copiedAll, setCopiedAll] = useState(false);

  useEffect(() => {
    localStorage.setItem("em_category", category);
    localStorage.setItem("em_tone", tone);
    localStorage.setItem("em_fields", JSON.stringify(fields));
  }, [category, tone, fields]);

  const updateField = (key, val) => setFields(p => ({ ...p, [key]: val }));

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Free AI Email Generator for Freelancers";
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
      "@graph": [
        {
          "@type": "WebApplication",
          "name": "KaroTools Email Generator",
          "url": "https://karotools.in/email-generator",
          "description": "Free business email generator for Indian freelancers. 10 email types, 4 tones. No login required.",
          "applicationCategory": "BusinessApplication",
          "offers": { "@type": "Offer", "price": "0", "priceCurrency": "INR" }
        },
        {
          "@type": "FAQPage",
          "mainEntity": [
            { "@type": "Question", "name": "How do I write a cold email that gets replies?", "acceptedAnswer": { "@type": "Answer", "text": "Keep it under 150 words, personalise the first line, focus on their problem and end with one clear low-commitment CTA like a 15-min call." } },
            { "@type": "Question", "name": "How many follow-ups should I send?", "acceptedAnswer": { "@type": "Answer", "text": "3 follow-ups is the sweet spot — 48hrs, 5 days, and 10 days after the first email. Most deals close on follow-up 2 or 3." } },
            { "@type": "Question", "name": "What's the best time to send freelance emails in India?", "acceptedAnswer": { "@type": "Answer", "text": "Tuesday–Thursday, 9–11am or 2–4pm. Avoid Mondays and Fridays. Open rates drop 30% on weekends." } },
            { "@type": "Question", "name": "How do I ask for payment professionally?", "acceptedAnswer": { "@type": "Answer", "text": "Be direct but polite. Reference the invoice number, amount, and due date clearly. Offer payment methods upfront." } },
            { "@type": "Question", "name": "Should I use formal or friendly email tone?", "acceptedAnswer": { "@type": "Answer", "text": "Match your client's style. Indian corporate clients prefer professional/formal. Startups prefer friendly/casual. When in doubt, start professional." } }
          ]
        }
      ]
    };
    let sc = document.querySelector("#ld-email");
    if (!sc) { sc = document.createElement("script"); sc.id = "ld-email"; sc.type = "application/ld+json"; document.head.appendChild(sc); }
    sc.text = JSON.stringify(schema);
  }, []);

  const copy = (text, setter) => {
    navigator.clipboard.writeText(text);
    setter(true);
    setTimeout(() => setter(false), 2000);
  };

  const currentFields = FIELDS[category] || [];
  const yourFields = currentFields.filter(f => f.startsWith("your"));
  const clientFields = currentFields.filter(f => f.startsWith("client"));
  const otherFields = currentFields.filter(f => !f.startsWith("your") && !f.startsWith("client"));
  
  // Calculate live email on every render
  const liveEmail = buildEmail(category, tone, fields);
  const wordCount = liveEmail.body.split(/\s+/).filter(Boolean).length;

  const card = { background: "rgba(255,255,255,0.02)", backdropFilter: "blur(20px)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: "16px", padding: "24px" };

  return (
    <div style={{ minHeight: "100vh", background: "#020617", fontFamily: "'DM Sans',sans-serif", color: "#f1f5f9" }}>
      <link href="https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;600&display=swap" rel="stylesheet" />
      <style>{`
        * { box-sizing: border-box; }
        input::placeholder, textarea::placeholder { color: #334155; }
        textarea { resize: vertical; }
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 10px; }
        
        .split-grid { display: grid; grid-template-columns: 420px 1fr; gap: 40px; align-items: start; }
        
        @media (max-width: 1024px) {
          .split-grid { grid-template-columns: 1fr; }
          .preview-pane { position: relative !important; top: 0 !important; margin-top: 40px; }
        }
      `}</style>

      {/* Navbar */}
      <nav style={{ position: "sticky", top: 0, zIndex: 100, height: 70, display: "flex", alignItems: "center", padding: "0 40px", justifyContent: "space-between", background: "rgba(2,6,23,0.92)", backdropFilter: "blur(24px)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
        <a href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" }} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
  <img src="/logo.png" alt="KaroTools Logo" style={{ height: "56px", margin: "0 -24px 0 0", objectFit: "contain", position: "relative", zIndex: 10 }} />
  <span style={{ fontSize: "22px", fontWeight: "800", fontFamily: "'Syne',sans-serif", color: "#f8fafc" }}>
    Karo<span style={{ background: "linear-gradient(135deg, #0ea5e9, #8b5cf6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Tools</span>
  </span>
</div>
        </a>
        <a href="/" style={{ padding: "8px 16px", background: "rgba(255,255,255,0.05)", borderRadius: 10, color: "#94a3b8", fontSize: 14, fontWeight: 600, textDecoration: "none" }}>← Home</a>
      </nav>

      <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "40px 24px" }}>
        
        {/* Header */}
        <div style={{ marginBottom: 40 }}>
          <div style={{ display: "inline-block", background: "rgba(14,165,233,0.1)", color: "#38bdf8", padding: "6px 14px", borderRadius: "50px", fontSize: "12px", fontWeight: "700", letterSpacing: "0.08em", marginBottom: "16px" }}>
            LIVE PREVIEW APP
          </div>
          <h1 style={{ fontSize: "clamp(32px,4vw,48px)", fontWeight: 800, fontFamily: "'Syne',sans-serif", marginBottom: "12px", color: "#fff" }}>
            Email Generator
          </h1>
          <p style={{ color: "#94a3b8", fontSize: "16px", maxWidth: "600px" }}>
            Select your tone, fill in the blanks, and watch your email write itself perfectly in real-time.
          </p>
        </div>

        {/* Split Screen Container */}
        <div className="split-grid">
          
          {/* LEFT SIDE: Controls */}
          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            
            {/* Category Selector */}
            <div style={card}>
              <h2 style={{ fontSize: "14px", fontWeight: "700", color: "#0ea5e9", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "16px" }}>1. Email Type</h2>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
                {CATEGORIES.map(c => (
                  <button key={c.id} onClick={() => setCategory(c.id)}
                    style={{ padding: "12px 14px", borderRadius: "10px", textAlign: "left", cursor: "pointer", transition: "all 0.2s",
                             background: category === c.id ? "rgba(14,165,233,0.15)" : "rgba(255,255,255,0.03)", 
                             border: `1px solid ${category === c.id ? "rgba(14,165,233,0.4)" : "rgba(255,255,255,0.05)"}` }}>
                    <div style={{ fontSize: "13px", fontWeight: "700", color: category === c.id ? "#38bdf8" : "#e2e8f0" }}>{c.label}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Tone Selector */}
            <div style={card}>
              <h2 style={{ fontSize: "14px", fontWeight: "700", color: "#0ea5e9", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "16px" }}>2. Select Tone</h2>
              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                {TONES.map(t => (
                  <button key={t.id} onClick={() => setTone(t.id)}
                    style={{ padding: "8px 16px", borderRadius: "50px", cursor: "pointer", transition: "all 0.2s", fontSize: "13px", fontWeight: "600",
                             background: tone === t.id ? "#0ea5e9" : "rgba(255,255,255,0.05)",
                             color: tone === t.id ? "#fff" : "#94a3b8", border: "none" }}>
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Dynamic Fields */}
            <div style={card}>
              <h2 style={{ fontSize: "14px", fontWeight: "700", color: "#0ea5e9", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "16px" }}>3. Fill Details</h2>
              
              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                {yourFields.map(f => <FocusInput key={f} label={FIELD_LABELS[f]} value={fields[f] || ""} onChange={v => updateField(f, v)} placeholder={PLACEHOLDERS[f] || "..."} />)}
                {clientFields.map(f => <FocusInput key={f} label={FIELD_LABELS[f]} value={fields[f] || ""} onChange={v => updateField(f, v)} placeholder={PLACEHOLDERS[f] || "..."} />)}
                {otherFields.map(f => <FocusInput key={f} label={FIELD_LABELS[f]} value={fields[f] || ""} onChange={v => updateField(f, v)} placeholder={PLACEHOLDERS[f] || "..."} multiline={["projectDescription","paymentDetails","upsellDescription","reason"].includes(f)} />)}
              </div>
            </div>
          </div>

          {/* RIGHT SIDE: Live Preview */}
          <div className="preview-pane" style={{ position: "sticky", top: "100px", display: "flex", flexDirection: "column" }}>
            
            {/* macOS Window Header */}
            <div style={{ background: "rgba(255,255,255,0.05)", borderTopLeftRadius: "16px", borderTopRightRadius: "16px", padding: "12px 20px", display: "flex", alignItems: "center", border: "1px solid rgba(255,255,255,0.1)", borderBottom: "none" }}>
              <div style={{ display: "flex", gap: "8px" }}>
                <div style={{ width: "12px", height: "12px", borderRadius: "50%", background: "#ef4444" }}></div>
                <div style={{ width: "12px", height: "12px", borderRadius: "50%", background: "#f59e0b" }}></div>
                <div style={{ width: "12px", height: "12px", borderRadius: "50%", background: "#10b981" }}></div>
              </div>
              <div style={{ margin: "0 auto", fontSize: "12px", fontWeight: "600", color: "#64748b", letterSpacing: "0.05em" }}>LIVE PREVIEW</div>
            </div>

            {/* Email Content Area */}
            <div style={{ background: "#0f172a", border: "1px solid rgba(255,255,255,0.1)", borderBottomLeftRadius: "16px", borderBottomRightRadius: "16px", padding: "32px", position: "relative" }}>
              
              <div style={{ borderBottom: "1px solid rgba(255,255,255,0.05)", paddingBottom: "16px", marginBottom: "24px" }}>
                <div style={{ display: "flex", marginBottom: "12px" }}>
                  <span style={{ width: "80px", color: "#64748b", fontSize: "14px", fontWeight: "600" }}>To:</span>
                  <span style={{ color: "#f8fafc", fontSize: "14px" }}>{fields.clientEmail || "client@company.com"}</span>
                </div>
                <div style={{ display: "flex" }}>
                  <span style={{ width: "80px", color: "#64748b", fontSize: "14px", fontWeight: "600" }}>Subject:</span>
                  <span style={{ color: "#f8fafc", fontSize: "14px", fontWeight: "600" }}>{liveEmail.subject || "Subject Line"}</span>
                </div>
              </div>

              <div style={{ fontSize: "15px", lineHeight: "1.8", color: "#cbd5e1", whiteSpace: "pre-wrap", minHeight: "200px" }}>
                {liveEmail.body || "Your email body will appear here..."}
              </div>

              {/* Action Buttons */}
              <div style={{ display: "flex", gap: "16px", marginTop: "40px", borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: "24px" }}>
                
                <a href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(fields.clientEmail || "")}&su=${encodeURIComponent(liveEmail.subject)}&body=${encodeURIComponent(liveEmail.body)}`} target="_blank" rel="noopener noreferrer"
                  style={{ flex: 1, padding: "14px", background: "linear-gradient(135deg,#ef4444,#dc2626)", borderRadius: "10px", color: "#fff", fontSize: "14px", fontWeight: "700", textAlign: "center", textDecoration: "none", cursor: "pointer", display: "flex", justifyContent: "center", alignItems: "center", gap: "8px", transition: "transform 0.2s" }}
                  onMouseEnter={e => e.currentTarget.style.transform = "translateY(-2px)"}
                  onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg> Gmail
                </a>

                <a href={`mailto:${encodeURIComponent(fields.clientEmail || "")}?subject=${encodeURIComponent(liveEmail.subject)}&body=${encodeURIComponent(liveEmail.body)}`}
                  style={{ flex: 1, padding: "14px", background: "linear-gradient(135deg,#0ea5e9,#14b8a6)", borderRadius: "10px", color: "#fff", fontSize: "14px", fontWeight: "700", textAlign: "center", textDecoration: "none", cursor: "pointer", display: "flex", justifyContent: "center", alignItems: "center", gap: "8px", transition: "transform 0.2s" }}
                  onMouseEnter={e => e.currentTarget.style.transform = "translateY(-2px)"}
                  onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg> Mail App
                </a>

                <button onClick={() => copy(`Subject: ${liveEmail.subject}\n\n${liveEmail.body}`, setCopiedAll)}
                  style={{ flex: 1, padding: "14px", background: copiedAll ? "#10b981" : "rgba(255,255,255,0.05)", border: `1px solid ${copiedAll ? "#10b981" : "rgba(255,255,255,0.1)"}`, borderRadius: "10px", color: copiedAll ? "#fff" : "#f1f5f9", fontSize: "14px", fontWeight: "700", cursor: "pointer", transition: "all 0.2s" }}>
                  {copiedAll ? "✅ Copied to Clipboard" : "📋 Copy Email"}
                </button>

              </div>
            </div>

            {/* Quick Stats */}
            <div style={{ display: "flex", gap: "24px", padding: "16px", marginTop: "16px" }}>
              <div>
                <div style={{ fontSize: "11px", color: "#64748b", textTransform: "uppercase", letterSpacing: "0.05em" }}>Word Count</div>
                <div style={{ fontSize: "16px", color: wordCount > 250 ? "#f59e0b" : "#10b981", fontWeight: "700" }}>{wordCount} {wordCount > 250 ? "(A bit long)" : ""}</div>
              </div>
              <div>
                <div style={{ fontSize: "11px", color: "#64748b", textTransform: "uppercase", letterSpacing: "0.05em" }}>Tone</div>
                <div style={{ fontSize: "16px", color: "#f8fafc", fontWeight: "700" }}>{TONES.find(t => t.id === tone)?.label}</div>
              </div>
            </div>

          </div>

        </div>

        {/* SEO Text Content below app */}
        <div style={{ marginTop: "80px", borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: "60px", maxWidth: "800px", margin: "80px auto 0" }}>
          
          <h2 style={{ fontSize: "32px", fontWeight: "800", fontFamily: "'Syne',sans-serif", marginBottom: "24px", color: "#f1f5f9" }}>Free Business Email Generator for Indian Freelancers</h2>
          <p style={{ color: "#94a3b8", fontSize: "18px", lineHeight: "1.7", marginBottom: "24px" }}>
            KaroTools Email Generator helps Indian freelancers, consultants, designers, developers, and small business owners write professional emails in seconds — completely free. 
            Choose from 10 email types including cold outreach, follow-up, payment reminder, project proposal, thank you, onboarding, delay notice, feedback request, break-up email, and upsell. 
          </p>

          <h2 style={{ fontSize: "32px", fontWeight: "800", fontFamily: "'Syne',sans-serif", marginBottom: "32px", color: "#f1f5f9" }}>Frequently Asked Questions (FAQ)</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            {FAQS.map(([q, a]) => (
              <div key={q} style={{ background: "rgba(255,255,255,0.02)", padding: "24px", borderRadius: "16px", border: "1px solid rgba(255,255,255,0.05)" }}>
                <h3 style={{ fontSize: "20px", fontWeight: "700", color: "#f8fafc", marginBottom: "12px" }}>{q}</h3>
                <p style={{ color: "#94a3b8", fontSize: "16px", lineHeight: "1.6", margin: 0 }}>{a}</p>
              </div>
            ))}
          </div>

        </div>

        {/* Universal Legal Disclaimer */}
        <div style={{ marginTop: "40px", padding: "20px", background: "rgba(0,0,0,0.3)", borderRadius: "12px", border: "1px dashed rgba(255,255,255,0.1)", textAlign: "center" }}>
          <p style={{ color: "#64748b", fontSize: "12px", lineHeight: "1.6", margin: 0, fontFamily: "'DM Sans',sans-serif" }}>
            <strong>Disclaimer:</strong> All calculators and tools on KaroTools.in are provided for educational and informational purposes only. While we strive to keep the logic updated with the latest Indian tax laws (FY 2025-26), the results generated are estimates and do not constitute professional financial, legal, or tax advice. We strongly recommend consulting a certified Chartered Accountant or legal professional before making any business decisions or filing your taxes. KaroTools is not responsible for any financial loss, penalties, or compliance errors resulting from the use of this website.
          </p>
        </div>

      </div>
    </div>
  );
}
