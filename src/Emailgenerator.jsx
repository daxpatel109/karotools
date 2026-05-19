import { useState } from "react";

// ── Data ──────────────────────────────────────────────────────────

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
      body: `Hi {clientName},

I hope this message finds you well.

My name is {yourName}, and I'm a freelance {yourRole} based in {yourCity}. I came across {clientCompany} and was genuinely impressed by {specificDetail}.

I specialize in {yourService} and have helped clients achieve {result}. I believe I can bring similar value to {clientCompany}.

I'd love to schedule a quick 15-minute call to explore if there's a potential fit.

Would {day1} or {day2} work for you?

Looking forward to connecting.

Best regards,
{yourName}
{yourRole} | {yourCity}
{yourEmail} | {yourPhone}`,
    },
    friendly: {
      subject: "Hey {clientName}! Quick question about {clientCompany} 👋",
      body: `Hey {clientName}!

I was browsing {clientCompany}'s work online and honestly — really loved what you're doing with {specificDetail}. 

I'm {yourName}, a {yourRole} who helps businesses like yours with {yourService}. My clients typically see {result} after working with me.

I know you're probably busy, so I'll keep this short — would you be open to a quick 15-min chat? No pitch, just a conversation.

Either way, keep up the great work! 🙌

Cheers,
{yourName}
{yourEmail}`,
    },
    confident: {
      subject: "{clientCompany} is leaving money on the table — here's how",
      body: `Hi {clientName},

I'll get straight to the point.

I noticed {clientCompany} is {specificDetail}. This is a missed opportunity that I can fix.

I'm {yourName} — a {yourRole} who has helped businesses like yours achieve {result}. I do this through {yourService}.

I'm not looking for a long-term commitment right away. Let me show you what I can do with a small paid pilot project.

Interested? Reply "yes" and I'll send over a quick proposal.

— {yourName}`,
    },
    formal: {
      subject: "Business Proposal: {yourService} Services for {clientCompany}",
      body: `Dear {clientName},

I am writing to introduce myself and explore a potential business collaboration between us.

I am {yourName}, a professional {yourRole} with expertise in {yourService}. After researching {clientCompany}, I identified several opportunities where my services could add significant value, particularly in {specificDetail}.

My previous clients have experienced {result} through our engagement.

I would be honoured to arrange a formal meeting at your convenience to discuss this further.

Please find my contact details below.

Yours sincerely,
{yourName}
{yourRole}
{yourEmail} | {yourPhone}`,
    },
  },

  followup: {
    professional: {
      subject: "Following up — {subject}",
      body: `Hi {clientName},

I wanted to follow up on my previous email regarding {subject}.

I understand you're busy, so I'll keep this brief. I'm still very interested in the opportunity to work with {clientCompany} on {yourService}.

If you have any questions or need more information, I'm happy to provide it. Alternatively, if now isn't the right time, just let me know — I completely understand.

Would a quick 10-minute call this week work for you?

Best,
{yourName}`,
    },
    friendly: {
      subject: "Just checking in! 😊 — {subject}",
      body: `Hey {clientName}!

Just wanted to bump this up in your inbox — no pressure at all!

I sent over a note about {subject} a few days ago and wasn't sure if it got buried. Totally get it if the timing isn't right!

If you're interested, I'd love to chat. If not, no worries — happy to reconnect when the time is better. 😊

Either way, hope things are going great at {clientCompany}!

Cheers,
{yourName}`,
    },
    confident: {
      subject: "Last follow up — {subject}",
      body: `Hi {clientName},

I've reached out a couple of times about {subject} and haven't heard back.

I'll assume the timing isn't right — and that's completely fine.

If things change and you'd like to explore {yourService} for {clientCompany}, my door is always open.

Wishing you and the team all the best.

— {yourName}`,
    },
    formal: {
      subject: "Reminder: Pending Response — {subject}",
      body: `Dear {clientName},

This is a courteous follow-up to my earlier correspondence dated recently, regarding {subject}.

I would appreciate it if you could spare a moment to review the information shared. I remain available to address any queries or concerns you may have.

Please feel free to reach out at your earliest convenience.

Regards,
{yourName}
{yourRole}
{yourEmail}`,
    },
  },

  payment: {
    professional: {
      subject: "Invoice #{invoiceNo} — Payment Due {dueDate}",
      body: `Hi {clientName},

I hope the project has been going well!

This is a friendly reminder that Invoice #{invoiceNo} for {amount} is due on {dueDate}.

Project: {projectName}
Invoice #: {invoiceNo}
Amount Due: {amount}
Due Date: {dueDate}

You can transfer the payment via:
{paymentDetails}

Please let me know if you have any questions about the invoice. I really enjoyed working on this project and look forward to future collaborations!

Thank you,
{yourName}`,
    },
    friendly: {
      subject: "Quick reminder — Invoice #{invoiceNo} 🙏",
      body: `Hey {clientName}!

Hope you're doing well! Just a quick heads-up that Invoice #{invoiceNo} for {amount} is coming up due on {dueDate}.

Payment details:
{paymentDetails}

Let me know if anything looks off or if you need a different format — happy to help! 😊

Thanks so much,
{yourName}`,
    },
    confident: {
      subject: "OVERDUE: Invoice #{invoiceNo} — {amount} pending",
      body: `Hi {clientName},

Invoice #{invoiceNo} for {amount} was due on {dueDate} and remains unpaid.

I'd appreciate immediate attention to this. Please process the payment at your earliest convenience via:
{paymentDetails}

If there's an issue with the invoice or a reason for the delay, please let me know right away so we can resolve it.

I'm available on call if needed.

— {yourName}
{yourPhone}`,
    },
    formal: {
      subject: "Notice of Outstanding Payment — Invoice #{invoiceNo}",
      body: `Dear {clientName},

I am writing to formally notify you that Invoice #{invoiceNo} amounting to {amount}, issued for {projectName}, remains outstanding as of {dueDate}.

I kindly request you to arrange for the payment at the earliest. Details for the transfer are as follows:

{paymentDetails}

Should there be any discrepancy or query regarding the invoice, please communicate the same at your earliest convenience.

Yours faithfully,
{yourName}`,
    },
  },

  proposal: {
    professional: {
      subject: "Project Proposal — {projectName} for {clientCompany}",
      body: `Hi {clientName},

Thank you for considering me for {projectName}. I've put together a brief proposal based on our conversation.

PROJECT OVERVIEW
{projectDescription}

WHAT I WILL DELIVER
• {deliverable1}
• {deliverable2}
• {deliverable3}

TIMELINE
{timeline}

INVESTMENT
{amount}

This includes {revisions} rounds of revisions and {support} of post-delivery support.

I'm confident this project will achieve {result} for {clientCompany}.

To move forward, simply reply to this email and I'll send over a formal agreement.

Looking forward to working together!

Best,
{yourName}
{yourRole} | {yourEmail}`,
    },
    friendly: {
      subject: "Here's my proposal for {projectName}! 🚀",
      body: `Hey {clientName}!

Super excited about the possibility of working together on {projectName}! Here's what I'm thinking:

🎯 WHAT WE'RE SOLVING
{projectDescription}

✅ WHAT YOU GET
• {deliverable1}
• {deliverable2}
• {deliverable3}

⏰ TIMELINE: {timeline}
💰 INVESTMENT: {amount}
🔄 REVISIONS: {revisions} rounds included

I genuinely think this is going to turn out amazing for {clientCompany}!

Want to hop on a quick call to finalize details? Or if everything looks good, just reply "Let's do it!" and we can get started. 😊

Can't wait!
{yourName}`,
    },
    confident: {
      subject: "Proposal: Here's exactly how I'll deliver {result}",
      body: `Hi {clientName},

Based on our discussion, here's my proposal for {projectName}.

The problem: {projectDescription}
My solution: {deliverable1}, {deliverable2}, and {deliverable3}
The result you can expect: {result}

Timeline: {timeline}
Investment: {amount}
Includes: {revisions} revision rounds

I've done this before. My clients get results. Let's get started.

Reply "yes" and I'll send the agreement within 24 hours.

— {yourName}`,
    },
    formal: {
      subject: "Formal Proposal Submission — {projectName}",
      body: `Dear {clientName},

Please find herein a formal proposal for the project titled "{projectName}" as discussed.

SCOPE OF WORK
{projectDescription}

DELIVERABLES
1. {deliverable1}
2. {deliverable2}
3. {deliverable3}

PROJECT TIMELINE: {timeline}
TOTAL COST: {amount}
REVISION POLICY: {revisions} revisions included

Terms and conditions, as well as the payment schedule, shall be outlined in the formal agreement upon your acceptance.

I look forward to your favourable response.

Yours sincerely,
{yourName}
{yourRole} | {yourEmail}`,
    },
  },

  thankyou: {
    professional: {
      subject: "Thank you for the opportunity, {clientName}!",
      body: `Hi {clientName},

I just wanted to take a moment to thank you for choosing to work with me on {projectName}.

It was a genuinely enjoyable project, and I'm proud of what we achieved together — especially {specificDetail}.

I hope the results exceed your expectations. Please don't hesitate to reach out if you need any adjustments or have questions.

I would love to work with {clientCompany} again in the future. And if you know anyone who could benefit from my {yourService} services, a referral would mean the world to me!

Warm regards,
{yourName}`,
    },
    friendly: {
      subject: "It was such a pleasure! 🙏",
      body: `Hey {clientName}!

Just had to send a quick note — it was genuinely such a pleasure working with you on {projectName}!

{specificDetail} was my favourite part of the whole thing. I hope you love the final result as much as I do!

If you ever need anything — tweaks, new projects, or just want to brainstorm — I'm always here. 😊

Oh, and if you'd be open to leaving a quick review or testimonial, I'd be forever grateful — it really helps small freelancers like me grow!

Thanks again,
{yourName} 🙌`,
    },
    confident: {
      subject: "Project complete — and here's what's next",
      body: `Hi {clientName},

{projectName} is wrapped. I hope you're happy with the outcome — I certainly am.

Now that we've established what great work looks like together, here's what could be next for {clientCompany}:

• {upsell1}
• {upsell2}

Whenever you're ready to take the next step, I'm here.

And if you found our collaboration valuable, a short testimonial would go a long way. Just reply to this email with a few words — I'll take it from there.

— {yourName}`,
    },
    formal: {
      subject: "Project Completion — {projectName}",
      body: `Dear {clientName},

I am pleased to inform you that {projectName} has been successfully completed and delivered as per the agreed scope of work.

I sincerely thank {clientCompany} for entrusting me with this project. It was a privilege to contribute to your goals.

Should you require any further assistance or future engagements, please do not hesitate to contact me. I would welcome the opportunity to continue our professional relationship.

Once again, thank you for your trust and collaboration.

Yours sincerely,
{yourName}
{yourRole} | {yourEmail}`,
    },
  },

  breakup: {
    professional: {
      subject: "Closing the loop — {subject}",
      body: `Hi {clientName},

I've reached out a few times regarding {subject} and understand you may not be interested at this time — and that's completely fine.

I'll go ahead and close out this conversation so I'm not cluttering your inbox.

If things change down the road and {yourService} becomes relevant for {clientCompany}, feel free to reach back out. I'll be happy to reconnect.

Wishing you and your team all the best.

Best,
{yourName}`,
    },
    friendly: {
      subject: "No worries at all — closing this thread! 😊",
      body: `Hey {clientName}!

No response needed — I promise this is my last follow-up! 😄

I get it — timing might just not be right, and that's totally okay. I just didn't want to leave things hanging.

If you ever need {yourService} down the line, you know where to find me. And hey, I'll be rooting for {clientCompany}'s success regardless! 🙌

Take care,
{yourName}`,
    },
    confident: {
      subject: "Moving on — but the door stays open",
      body: `Hi {clientName},

This will be my last message regarding {subject}.

I've made my case. If the value wasn't clear enough, that's on me — and I'll take that as feedback.

If anything changes and you want to revisit, I'm one email away. Until then, I wish {clientCompany} continued success.

— {yourName}`,
    },
    formal: {
      subject: "Final Communication — {subject}",
      body: `Dear {clientName},

As I have not received a response to my previous correspondences regarding {subject}, I shall consider the matter closed for now.

Should the need for {yourService} arise in the future, I remain available and would be glad to assist.

I wish {clientCompany} continued success in all its endeavours.

Regards,
{yourName}
{yourRole}`,
    },
  },

  feedback: {
    professional: {
      subject: "Quick favour — would you share your feedback?",
      body: `Hi {clientName},

I hope you've had a chance to experience the results of {projectName}!

I'd really appreciate it if you could take 2 minutes to share your feedback. Your honest opinion helps me improve and helps other businesses make informed decisions.

You can leave a review here: {reviewLink}

Or if you prefer, simply reply to this email with a few sentences about your experience — I'll take care of the rest!

Thank you so much in advance.

Best,
{yourName}`,
    },
    friendly: {
      subject: "Would mean so much — quick review? ⭐",
      body: `Hey {clientName}!

I hope {projectName} is already making a difference for {clientCompany}!

This is a small ask — could you spare 2 mins to leave a review? Honest feedback from amazing clients like you helps me grow this little freelance business of mine. 🙏

👉 {reviewLink}

Or just reply here with your thoughts — even 2-3 sentences would be incredible!

Thanks a million,
{yourName} 😊`,
    },
    confident: {
      subject: "You said you were happy — prove it 😄",
      body: `Hi {clientName},

When we wrapped {projectName}, you mentioned you were really happy with the outcome. 

I'd love to capture that in a testimonial. It takes 2 minutes and helps me tremendously.

👉 {reviewLink}

Or reply here — I'll format it and send it to you for approval before publishing.

No pressure, but it would genuinely make my day!

— {yourName}`,
    },
    formal: {
      subject: "Request for Testimonial — {projectName}",
      body: `Dear {clientName},

I trust the deliverables from {projectName} have met your expectations.

I would be most grateful if you could take a moment to provide a brief testimonial or review of our engagement. Your feedback not only helps me improve but also assists prospective clients in making informed decisions.

You may submit your review at the following link: {reviewLink}

Alternatively, a brief written response to this email would be equally appreciated.

Thank you for your time and continued support.

Yours sincerely,
{yourName}`,
    },
  },

  onboard: {
    professional: {
      subject: "Welcome aboard — {projectName} kickoff 🚀",
      body: `Hi {clientName},

I'm thrilled to officially welcome you as a client! I'm looking forward to working together on {projectName}.

Here's what happens next:

📋 NEXT STEPS
1. Please review and sign the agreement: {agreementLink}
2. Complete the onboarding questionnaire: {questionnaireLink}
3. Initial payment: {amount} via {paymentMethod}

📅 KEY DATES
Project Start: {startDate}
First Check-in: {checkinDate}
Expected Delivery: {deliveryDate}

📞 HOW TO REACH ME
Email: {yourEmail}
Phone/WhatsApp: {yourPhone}
Working hours: {workingHours}

I'll be in touch soon. Let's make something great together!

Best,
{yourName}`,
    },
    friendly: {
      subject: "Let's gooo! Welcome to the team 🎉",
      body: `Hey {clientName}!!

I am SO excited to be working on {projectName} with you! This is going to be amazing. 🎉

Here's your quick start guide:

✅ Sign the agreement: {agreementLink}
✅ Fill out the onboarding form: {questionnaireLink}  
✅ Send initial payment of {amount} via {paymentMethod}

📅 We kick off on {startDate} and I'm targeting delivery by {deliveryDate}!

Questions? WhatsApp me anytime: {yourPhone}
I'm available {workingHours} and I respond fast. 😊

Can't wait to get started!!

{yourName} 🚀`,
    },
    confident: {
      subject: "We're officially in business — here's what's next",
      body: `Hi {clientName},

Glad to have you on board. Let's hit the ground running.

ACTION ITEMS (please complete within 48 hours):
1. Sign agreement → {agreementLink}
2. Onboarding form → {questionnaireLink}
3. Initial payment → {amount} via {paymentMethod}

PROJECT TIMELINE:
Start: {startDate} | Delivery: {deliveryDate} | Check-in: {checkinDate}

Contact: {yourEmail} | {yourPhone}
Hours: {workingHours}

I'll reach out on {startDate} to begin. See you then.

— {yourName}`,
    },
    formal: {
      subject: "Project Commencement Notice — {projectName}",
      body: `Dear {clientName},

I am pleased to formally confirm the commencement of our engagement for {projectName}.

Kindly complete the following at your earliest convenience:

1. Execution of the agreement: {agreementLink}
2. Completion of the project brief: {questionnaireLink}
3. Remittance of the initial payment: {amount} via {paymentMethod}

PROJECT SCHEDULE
Commencement Date: {startDate}
Progress Review: {checkinDate}
Delivery Date: {deliveryDate}

Please feel free to reach out via {yourEmail} or {yourPhone} during {workingHours} for any clarifications.

I look forward to a productive and successful collaboration.

Yours sincerely,
{yourName}`,
    },
  },

  delay: {
    professional: {
      subject: "Update on {projectName} — revised timeline",
      body: `Hi {clientName},

I want to be upfront with you about the status of {projectName}.

Due to {reason}, the delivery will be delayed by {delayDays}. The new expected delivery date is {newDeadline}.

I sincerely apologise for any inconvenience this may cause. I want to assure you that quality remains my top priority and I will not rush the work at the expense of the final output.

Here's what I'm doing to minimise further delays:
• {action1}
• {action2}

I will send you a progress update on {updateDate}. Please let me know if you have any concerns.

Apologies again, and thank you for your patience.

Best,
{yourName}`,
    },
    friendly: {
      subject: "Important update on {projectName} 🙏",
      body: `Hey {clientName},

I want to be completely transparent with you — {projectName} is going to take a little longer than expected.

Because of {reason}, I'm looking at a new delivery date of {newDeadline} (originally {originalDeadline}).

I'm really sorry about this — I know you were counting on the original date. Here's what I'm doing to get back on track: {action1} and {action2}.

I'll keep you updated every step of the way. Next update: {updateDate}.

Thanks so much for your understanding — it really means a lot. 🙏

{yourName}`,
    },
    confident: {
      subject: "{projectName} — revised delivery: {newDeadline}",
      body: `Hi {clientName},

Straight to the point: {projectName} will be delivered on {newDeadline}, not {originalDeadline}.

Reason: {reason}

What I'm doing about it: {action1}, {action2}.

The quality will be worth it. I'd rather deliver something exceptional slightly late than something average on time.

Next update from me: {updateDate}.

— {yourName}`,
    },
    formal: {
      subject: "Notice of Project Delay — {projectName}",
      body: `Dear {clientName},

I am writing to formally notify you of an unforeseen delay in the delivery of {projectName}.

Due to {reason}, the revised delivery date is {newDeadline}, as opposed to the originally agreed date of {originalDeadline}.

Please be assured that I am taking all necessary measures to ensure timely completion without compromising quality, including {action1} and {action2}.

A formal progress update will be provided on {updateDate}. I sincerely regret any inconvenience caused and appreciate your understanding.

Yours sincerely,
{yourName}`,
    },
  },

  upsell: {
    professional: {
      subject: "Taking {clientCompany} to the next level — a quick idea",
      body: `Hi {clientName},

I hope {projectName} has been delivering great results for {clientCompany}!

While working together, I identified an additional opportunity that I think could significantly benefit your business: {upsellIdea}.

Based on what I know about your goals, this could help you achieve {result}. I've helped similar clients do exactly this.

Here's a quick outline:
• What: {upsellDescription}
• Timeline: {timeline}
• Investment: {amount}

Would you be open to a brief call this week to explore this?

Best,
{yourName}`,
    },
    friendly: {
      subject: "Had a cool idea for {clientCompany}! 💡",
      body: `Hey {clientName}!

Hope everything from {projectName} is going well! 🙌

So I had this idea while thinking about {clientCompany} — what if we also tackled {upsellIdea}? Based on the results we've achieved together, I genuinely think it could help you {result}.

Here's the gist:
💡 What: {upsellDescription}
⏰ Timeline: {timeline}
💰 Investment: {amount}

No pressure at all — just thought it was worth sharing! Want to chat about it? 😊

{yourName}`,
    },
    confident: {
      subject: "The obvious next step for {clientCompany}",
      body: `Hi {clientName},

{projectName} went well. Here's what we should do next.

{upsellIdea} is the logical next step for {clientCompany}. Here's why: {upsellDescription}

This will get you: {result}
Timeline: {timeline}
Cost: {amount}

I can start as early as next week. Want to move forward?

— {yourName}`,
    },
    formal: {
      subject: "Proposal for Extended Engagement — {clientCompany}",
      body: `Dear {clientName},

Following the successful completion of {projectName}, I would like to propose an extended engagement to further support {clientCompany}'s growth objectives.

Specifically, I recommend {upsellIdea} — {upsellDescription}.

This initiative is projected to help you achieve {result}.

PROPOSED TERMS
Scope: {upsellDescription}
Timeline: {timeline}
Investment: {amount}

I would welcome the opportunity to discuss this proposal at your convenience.

Yours sincerely,
{yourName}
{yourRole} | {yourEmail}`,
    },
  },
};

// ── Field definitions per category ────────────────────────────────
const FIELDS = {
  cold:      ["yourName","yourRole","yourCity","yourEmail","yourPhone","clientName","clientCompany","yourService","specificDetail","result","day1","day2"],
  followup:  ["yourName","yourEmail","yourPhone","clientName","clientCompany","yourService","subject"],
  payment:   ["yourName","yourEmail","yourPhone","clientName","projectName","invoiceNo","amount","dueDate","paymentDetails"],
  proposal:  ["yourName","yourRole","yourEmail","clientName","clientCompany","projectName","projectDescription","deliverable1","deliverable2","deliverable3","timeline","amount","revisions","support","result"],
  thankyou:  ["yourName","yourRole","yourEmail","clientName","clientCompany","projectName","specificDetail","upsell1","upsell2"],
  breakup:   ["yourName","yourRole","clientName","clientCompany","yourService","subject"],
  feedback:  ["yourName","clientName","clientCompany","projectName","reviewLink"],
  onboard:   ["yourName","yourEmail","yourPhone","clientName","projectName","amount","paymentMethod","startDate","checkinDate","deliveryDate","workingHours","agreementLink","questionnaireLink"],
  delay:     ["yourName","yourEmail","clientName","projectName","reason","delayDays","originalDeadline","newDeadline","action1","action2","updateDate"],
  upsell:    ["yourName","yourRole","yourEmail","clientName","clientCompany","projectName","upsellIdea","upsellDescription","result","timeline","amount"],
};

const FIELD_LABELS = {
  yourName: "Your Name", yourRole: "Your Role/Title", yourCity: "Your City",
  yourEmail: "Your Email", yourPhone: "Your Phone/WhatsApp",
  clientName: "Client First Name", clientCompany: "Client Company",
  yourService: "Your Service (e.g. UI Design)", specificDetail: "Something specific about them",
  result: "Result you deliver (e.g. 3x more leads)", day1: "Day Option 1 (e.g. Tuesday 3pm)",
  day2: "Day Option 2 (e.g. Wednesday 10am)", subject: "Email Subject/Topic",
  projectName: "Project Name", invoiceNo: "Invoice Number",
  amount: "Amount (e.g. ₹25,000)", dueDate: "Due Date", paymentDetails: "Bank/UPI Details",
  projectDescription: "Project Description (1-2 lines)", deliverable1: "Deliverable 1",
  deliverable2: "Deliverable 2", deliverable3: "Deliverable 3",
  timeline: "Timeline (e.g. 2 weeks)", revisions: "No. of Revisions (e.g. 2)",
  support: "Support Period (e.g. 7 days)", upsell1: "Next Service Idea 1",
  upsell2: "Next Service Idea 2", reviewLink: "Review/Testimonial Link",
  paymentMethod: "Payment Method (e.g. NEFT/UPI)", startDate: "Project Start Date",
  checkinDate: "First Check-in Date", deliveryDate: "Delivery Date",
  workingHours: "Working Hours (e.g. Mon-Fri 10am-7pm)",
  agreementLink: "Agreement Link", questionnaireLink: "Onboarding Form Link",
  reason: "Reason for Delay", delayDays: "Days of Delay",
  originalDeadline: "Original Deadline", newDeadline: "New Deadline",
  action1: "Action 1 to fix", action2: "Action 2 to fix", updateDate: "Next Update Date",
  upsellIdea: "Upsell Idea (short)", upsellDescription: "Upsell Description",
};

const FAQS = [
  ["How do I write a cold email that gets replies?","Keep it under 150 words, personalise the first line, focus on their problem (not your services), and end with one clear low-commitment CTA like a 15-min call."],
  ["How many follow-ups should I send?","3 follow-ups is the sweet spot — 48hrs, 5 days, and 10 days after the first email. The 3rd is a soft break-up email. Most deals close on follow-up 2 or 3."],
  ["What's the best time to send freelance emails?","Tuesday–Thursday, 9–11am or 2–4pm in the recipient's timezone. Avoid Mondays and Fridays. Open rates drop by 30% on weekends."],
  ["How do I ask for payment professionally?","Be direct but polite. Reference the invoice number, amount, and due date clearly. Offer payment methods upfront. Escalate tone on 2nd and 3rd reminders."],
  ["Should I use formal or casual email tone?","Match your client's communication style. Indian corporate clients prefer professional/formal. Startups and D2C brands prefer friendly/casual. When in doubt, start professional."],
];

// ── Helpers ───────────────────────────────────────────────────────
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

// ── Styles ────────────────────────────────────────────────────────
const dark = {
  card: { background: "linear-gradient(135deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))", backdropFilter: "blur(20px)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "24px", padding: "28px", marginBottom: "20px" },
  label: { display: "block", fontSize: "12px", fontWeight: "700", color: "#64748b", marginBottom: "8px", letterSpacing: "0.07em", textTransform: "uppercase" },
  input: { width: "100%", padding: "12px 16px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "10px", fontSize: "14px", color: "#f1f5f9", outline: "none", boxSizing: "border-box", fontFamily: "'DM Sans',sans-serif", transition: "border-color 0.2s,box-shadow 0.2s" },
  chip: (a) => ({ padding: "8px 16px", borderRadius: "50px", cursor: "pointer", fontSize: "13px", fontWeight: "600", border: `1px solid ${a ? "rgba(167,139,250,0.6)" : "rgba(255,255,255,0.1)"}`, background: a ? "rgba(124,58,237,0.25)" : "rgba(255,255,255,0.03)", color: a ? "#a78bfa" : "#94a3b8", transition: "all 0.2s" }),
  sectionTitle: { fontSize: "13px", fontWeight: "700", color: "#94a3b8", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "16px" },
};

function FocusInput({ label, value, onChange, placeholder, multiline = false, rows = 2 }) {
  const style = { ...dark.input, ...(multiline ? { resize: "vertical", minHeight: `${rows * 40}px` } : {}) };
  const handlers = {
    onFocus: e => { e.target.style.borderColor = "rgba(167,139,250,0.5)"; e.target.style.boxShadow = "0 0 16px rgba(124,58,237,0.15)"; },
    onBlur:  e => { e.target.style.borderColor = "rgba(255,255,255,0.1)"; e.target.style.boxShadow = "none"; },
  };
  return (
    <div>
      <label style={dark.label}>{label}</label>
      {multiline
        ? <textarea value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} style={style} rows={rows} {...handlers} />
        : <input value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} style={style} {...handlers} />
      }
    </div>
  );
}

// ── Main Component ─────────────────────────────────────────────────
export default function EmailGenerator({ onBack }) {
  const [category, setCategory] = useState("cold");
  const [tone,     setTone]     = useState("professional");
  const [fields,   setFields]   = useState({});
  const [email,    setEmail]    = useState(null);
  const [copiedS,  setCopiedS]  = useState(false);
  const [copiedB,  setCopiedB]  = useState(false);
  const [copiedAll,setCopiedAll]= useState(false);
  const [charCount,setCharCount]= useState(0);

  const updateField = (key, val) => setFields(p => ({ ...p, [key]: val }));

  const handleGenerate = () => {
    const result = buildEmail(category, tone, fields);
    setEmail(result);
    setCharCount(result.body.length);
    setTimeout(() => document.getElementById("email-output")?.scrollIntoView({ behavior: "smooth", block: "start" }), 100);
  };

  const copy = (text, setter) => {
    navigator.clipboard.writeText(text);
    setter(true);
    setTimeout(() => setter(false), 2000);
  };

  const currentFields = FIELDS[category] || [];

  // split fields into logical groups
  const yourFields   = currentFields.filter(f => f.startsWith("your"));
  const clientFields = currentFields.filter(f => f.startsWith("client"));
  const otherFields  = currentFields.filter(f => !f.startsWith("your") && !f.startsWith("client"));

  const wordCount = email ? email.body.split(/\s+/).filter(Boolean).length : 0;

  return (
    <div style={{ minHeight: "100vh", background: "#080814", fontFamily: "'DM Sans',sans-serif", color: "#f1f5f9" }}>
      <link href="https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;600&display=swap" rel="stylesheet" />
      <style>{`
        input::placeholder,textarea::placeholder{color:#334155}
        select option{background:#0f0f23;color:#f1f5f9}
        textarea{resize:vertical}
        @keyframes fadeInUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
        @keyframes pulse{0%,100%{box-shadow:0 0 20px rgba(167,139,250,0.3)}50%{box-shadow:0 0 40px rgba(167,139,250,0.7)}}
        @keyframes fadeIn{from{opacity:0}to{opacity:1}}
        .cat-chip:hover{border-color:rgba(167,139,250,0.4)!important;color:#a78bfa!important}
      `}</style>

      {/* BG */}
      <div style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none", background: "radial-gradient(ellipse 80% 60% at 20% 20%,rgba(124,58,237,0.13) 0%,transparent 60%),radial-gradient(ellipse 60% 50% at 80% 80%,rgba(37,99,235,0.09) 0%,transparent 60%)" }} />

      {/* Navbar */}
      <nav style={{ position: "sticky", top: 0, zIndex: 100, height: "64px", display: "flex", alignItems: "center", padding: "0 32px", justifyContent: "space-between", background: "rgba(8,8,20,0.9)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{ width: "32px", height: "32px", borderRadius: "9px", background: "linear-gradient(135deg,#7c3aed,#2563eb)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "16px" }}>⚡</div>
          <span style={{ fontSize: "20px", fontWeight: "800", fontFamily: "'Syne',sans-serif", background: "linear-gradient(135deg,#a78bfa,#60a5fa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>KaroTools</span>
        </div>
<button onClick={() => window.location.href = "/"} style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "#94a3b8", padding: "8px 16px", borderRadius: "10px", fontSize: "14px", cursor: "pointer", fontWeight: "600" }}>← Back</button>
      </nav>

      <div style={{ position: "relative", zIndex: 1, maxWidth: "860px", margin: "0 auto", padding: "60px 20px 80px" }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "44px", animation: "fadeInUp 0.5s both" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(124,58,237,0.15)", border: "1px solid rgba(124,58,237,0.3)", borderRadius: "50px", padding: "6px 16px", marginBottom: "20px" }}>
            <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#a78bfa", display: "inline-block", animation: "pulse 2s infinite" }} />
            <span style={{ fontSize: "12px", color: "#a78bfa", fontWeight: "700", letterSpacing: "0.08em" }}>10 EMAIL TYPES · 4 TONES · 100% FREE</span>
          </div>
          <div style={{ fontSize: "48px", marginBottom: "12px" }}>📧</div>
          <h1 style={{ fontSize: "clamp(28px,5vw,44px)", fontWeight: "800", fontFamily: "'Syne',sans-serif", marginBottom: "12px", background: "linear-gradient(135deg,#f1f5f9,#a78bfa,#60a5fa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            Email Generator
          </h1>
          <p style={{ color: "#64748b", fontSize: "16px" }}>
            Generate professional business emails for every situation — cold outreach, follow-ups, payments & more.
          </p>
        </div>

        {/* Step 1 — Category */}
        <div style={{ ...dark.card, animation: "fadeInUp 0.5s 0.1s both" }}>
          <div style={dark.sectionTitle}>Step 1 — Choose Email Type</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(160px,1fr))", gap: "10px" }}>
            {CATEGORIES.map(c => (
              <button key={c.id} className="cat-chip" onClick={() => { setCategory(c.id); setEmail(null); }}
                style={{ padding: "12px 14px", borderRadius: "12px", cursor: "pointer", textAlign: "left", transition: "all 0.2s", border: `1px solid ${category === c.id ? "rgba(167,139,250,0.6)" : "rgba(255,255,255,0.08)"}`, background: category === c.id ? "rgba(124,58,237,0.2)" : "rgba(255,255,255,0.03)" }}>
                <div style={{ fontSize: "14px", fontWeight: "700", color: category === c.id ? "#a78bfa" : "#f1f5f9" }}>{c.label}</div>
                <div style={{ fontSize: "11px", color: category === c.id ? "#7c3aed" : "#475569", marginTop: "3px" }}>{c.desc}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Step 2 — Tone */}
        <div style={{ ...dark.card, animation: "fadeInUp 0.5s 0.15s both" }}>
          <div style={dark.sectionTitle}>Step 2 — Choose Tone</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
            {TONES.map(t => (
              <button key={t.id} onClick={() => setTone(t.id)} style={dark.chip(tone === t.id)}>{t.label}</button>
            ))}
          </div>
        </div>

        {/* Step 3 — Fields */}
        <div style={{ ...dark.card, animation: "fadeInUp 0.5s 0.2s both" }}>
          <div style={dark.sectionTitle}>Step 3 — Fill in Your Details</div>
          <p style={{ fontSize: "13px", color: "#475569", marginBottom: "20px", marginTop: "-8px" }}>
            Leave any field blank — it will appear as a placeholder in the email.
          </p>

          {/* Your details */}
          {yourFields.length > 0 && (
            <>
              <div style={{ fontSize: "11px", fontWeight: "700", color: "#7c3aed", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "12px" }}>📌 Your Details</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px", marginBottom: "20px" }}>
                {yourFields.map(f => (
                  <FocusInput key={f} label={FIELD_LABELS[f]} value={fields[f] || ""} onChange={v => updateField(f, v)} placeholder={`e.g. ${f === "yourName" ? "Raj Patel" : f === "yourRole" ? "UI/UX Designer" : f === "yourEmail" ? "raj@email.com" : f === "yourPhone" ? "+91 98765 43210" : f === "yourCity" ? "Ahmedabad" : "..."}`} />
                ))}
              </div>
            </>
          )}

          {/* Client details */}
          {clientFields.length > 0 && (
            <>
              <div style={{ fontSize: "11px", fontWeight: "700", color: "#2563eb", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "12px" }}>👤 Client Details</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px", marginBottom: "20px" }}>
                {clientFields.map(f => (
                  <FocusInput key={f} label={FIELD_LABELS[f]} value={fields[f] || ""} onChange={v => updateField(f, v)} placeholder={`e.g. ${f === "clientName" ? "Priya" : f === "clientCompany" ? "Acme Corp" : "..."}`} />
                ))}
              </div>
            </>
          )}

          {/* Other details */}
          {otherFields.length > 0 && (
            <>
              <div style={{ fontSize: "11px", fontWeight: "700", color: "#0891b2", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "12px" }}>📋 Project / Email Details</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
                {otherFields.map(f => (
                  <FocusInput key={f} label={FIELD_LABELS[f]} value={fields[f] || ""} onChange={v => updateField(f, v)}
                    placeholder={`e.g. ${f === "amount" ? "₹25,000" : f === "timeline" ? "2 weeks" : f === "result" ? "3x more leads" : "..."}`}
                    multiline={["projectDescription","paymentDetails","upsellDescription","reason"].includes(f)}
                    rows={2}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {/* Generate Button */}
        <button onClick={handleGenerate} style={{ width: "100%", padding: "18px", background: "linear-gradient(135deg,#7c3aed,#2563eb)", border: "none", borderRadius: "14px", color: "#fff", fontSize: "17px", fontWeight: "700", cursor: "pointer", fontFamily: "'Syne',sans-serif", letterSpacing: "0.02em", boxShadow: "0 4px 30px rgba(124,58,237,0.4)", marginBottom: "24px", transition: "all 0.2s" }}>
          ✨ Generate Email
        </button>

        {/* Output */}
        {email && (
          <div id="email-output" style={{ animation: "fadeIn 0.4s both" }}>

            {/* Stats bar */}
            <div style={{ display: "flex", gap: "12px", marginBottom: "14px", flexWrap: "wrap" }}>
              {[
                { label: "Words", value: wordCount, good: wordCount < 200, tip: wordCount > 250 ? "⚠️ Consider shortening" : "✅ Good length" },
                { label: "Chars", value: charCount },
                { label: "Tone", value: TONES.find(t => t.id === tone)?.label || tone },
                { label: "Type", value: CATEGORIES.find(c => c.id === category)?.label || category },
              ].map(s => (
                <div key={s.label} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "10px", padding: "10px 16px", flex: 1, minWidth: "100px" }}>
                  <div style={{ fontSize: "11px", color: "#475569", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.06em" }}>{s.label}</div>
                  <div style={{ fontSize: "16px", fontWeight: "800", color: "#a78bfa", fontFamily: "'Syne',sans-serif", marginTop: "2px" }}>{s.value}</div>
                  {s.tip && <div style={{ fontSize: "10px", color: s.good ? "#4ade80" : "#facc15", marginTop: "2px" }}>{s.tip}</div>}
                </div>
              ))}
            </div>

            {/* Subject */}
            <div style={{ ...dark.card, padding: "20px 24px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
                <span style={{ ...dark.sectionTitle, marginBottom: 0 }}>📌 Subject Line</span>
                <button onClick={() => copy(email.subject, setCopiedS)} style={{ padding: "6px 14px", background: copiedS ? "rgba(52,211,153,0.15)" : "rgba(124,58,237,0.15)", border: `1px solid ${copiedS ? "rgba(52,211,153,0.3)" : "rgba(124,58,237,0.3)"}`, borderRadius: "8px", color: copiedS ? "#34d399" : "#a78bfa", fontSize: "12px", fontWeight: "700", cursor: "pointer" }}>
                  {copiedS ? "✅ Copied!" : "📋 Copy"}
                </button>
              </div>
              <div style={{ fontSize: "16px", fontWeight: "700", color: "#f1f5f9", background: "rgba(255,255,255,0.04)", padding: "14px 16px", borderRadius: "10px", border: "1px solid rgba(255,255,255,0.08)" }}>
                {email.subject}
              </div>
            </div>

            {/* Body */}
            <div style={{ ...dark.card, padding: "20px 24px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
                <span style={{ ...dark.sectionTitle, marginBottom: 0 }}>✉️ Email Body</span>
                <button onClick={() => copy(email.body, setCopiedB)} style={{ padding: "6px 14px", background: copiedB ? "rgba(52,211,153,0.15)" : "rgba(124,58,237,0.15)", border: `1px solid ${copiedB ? "rgba(52,211,153,0.3)" : "rgba(124,58,237,0.3)"}`, borderRadius: "8px", color: copiedB ? "#34d399" : "#a78bfa", fontSize: "12px", fontWeight: "700", cursor: "pointer" }}>
                  {copiedB ? "✅ Copied!" : "📋 Copy"}
                </button>
              </div>
              <pre style={{ whiteSpace: "pre-wrap", fontSize: "14px", lineHeight: "1.8", color: "#cbd5e1", fontFamily: "'DM Sans',sans-serif", background: "rgba(255,255,255,0.03)", padding: "20px", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.06)", margin: 0 }}>
                {email.body}
              </pre>
            </div>

            {/* Copy All */}
            <button onClick={() => copy(`Subject: ${email.subject}\n\n${email.body}`, setCopiedAll)} style={{ width: "100%", padding: "16px", background: copiedAll ? "linear-gradient(135deg,#059669,#0891b2)" : "linear-gradient(135deg,#7c3aed,#2563eb)", border: "none", borderRadius: "12px", color: "#fff", fontSize: "16px", fontWeight: "700", cursor: "pointer", fontFamily: "'Syne',sans-serif", boxShadow: "0 4px 20px rgba(124,58,237,0.35)", marginBottom: "8px" }}>
              {copiedAll ? "✅ Full Email Copied!" : "📋 Copy Full Email (Subject + Body)"}
            </button>

            {/* Regenerate */}
            <button onClick={handleGenerate} style={{ width: "100%", padding: "14px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "12px", color: "#64748b", fontSize: "14px", fontWeight: "600", cursor: "pointer", marginBottom: "24px" }}>
              🔄 Regenerate with same settings
            </button>
          </div>
        )}

        {/* Tips */}
        <div style={{ ...dark.card, marginTop: "8px" }}>
          <h3 style={{ fontSize: "16px", fontWeight: "800", fontFamily: "'Syne',sans-serif", color: "#f1f5f9", marginBottom: "16px" }}>📈 Email Tips for Indian Freelancers</h3>
          <div style={{ display: "grid", gap: "10px" }}>
            {[
              ["⏰ Best Send Time", "Tue–Thu between 9–11am. Avoid Monday mornings and Friday evenings. Open rates drop 30% on weekends."],
              ["📏 Ideal Length", "Cold emails: under 150 words. Follow-ups: under 80 words. Proposals: 200–300 words max. Shorter = more replies."],
              ["🎯 Subject Lines", "Personalised subjects get 26% higher open rates. Use client's company name or a specific detail you noticed."],
              ["🔄 Follow-Up Sequence", "Send 3 follow-ups: at 48hrs, 5 days, and 10 days. Most replies come on follow-up #2 or #3."],
            ].map(([t, d]) => (
              <div key={t} style={{ display: "flex", gap: "12px", padding: "12px", background: "rgba(255,255,255,0.02)", borderRadius: "10px" }}>
                <span style={{ fontSize: "13px", fontWeight: "700", color: "#a78bfa", minWidth: "120px" }}>{t}</span>
                <span style={{ fontSize: "13px", color: "#64748b", lineHeight: "1.5" }}>{d}</span>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div style={{ marginTop: "20px", borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: "40px" }}>
          <h2 style={{ fontSize: "20px", fontWeight: "800", fontFamily: "'Syne',sans-serif", color: "#f1f5f9", marginBottom: "24px" }}>❓ Frequently Asked Questions</h2>
          {FAQS.map(([q, a]) => (
            <div key={q} style={{ marginBottom: "20px", padding: "18px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "12px" }}>
              <div style={{ fontSize: "14px", fontWeight: "700", color: "#e2e8f0", marginBottom: "8px" }}>{q}</div>
              <div style={{ fontSize: "13px", color: "#64748b", lineHeight: "1.7" }}>{a}</div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
