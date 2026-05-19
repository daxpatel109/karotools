import { useState, useEffect } from "react";
 
// ── Template Engine ──────────────────────────────────────────────
const TEMPLATES = {
  instagram: {
    professional: [
      "{emoji} {profession} | {city}\n✨ {skill1} • {skill2} • {skill3}\n📩 DM for collabs\n🔗 Link in bio",
      "🚀 {name} | {profession}\n💡 Helping brands with {skill1} & {skill2}\n📍 {city} | Available for projects\n👇 Let's connect",
      "{emoji} Freelance {profession}\n⚡ {skill1} + {skill2} specialist\n🏆 {experience}+ years experience\n📩 Open for work | {city}",
      "✦ {profession} ✦\n{skill1} | {skill2} | {skill3}\n📍 {city} 🇮🇳\n💌 Collab? DM me!",
    ],
    creative: [
      "🎨 Making {skill1} magic ✨\n{profession} by day, creator by night\n📍 {city} | Open to collabs\n↓ See my work",
      "hey! i'm {name} 👋\n{profession} who loves {skill1}\nbased in {city} 🇮🇳\nlet's build something cool 🚀",
      "🌟 {profession} • {city}\nTurning ideas into {skill1}\n{skill2} enthusiast 💫\nDM to work together ✉️",
    ],
    minimal: [
      "{profession}\n{skill1} · {skill2} · {skill3}\n{city}, India",
      "{name}\n{profession} | {city} 🇮🇳\n{skill1} & {skill2}",
      "↗ {profession}\n{skill1} • {skill2}\n{city} · DM open",
    ],
  },
  linkedin: {
    professional: [
      "{profession} | Helping businesses with {skill1} & {skill2} | {experience}+ Years Experience | Based in {city}, India | Open to opportunities",
      "Freelance {profession} 🚀 | {skill1} • {skill2} • {skill3} | {experience}+ yrs in the industry | {city}, India | DM for collaborations",
      "{profession} specializing in {skill1} and {skill2}. {experience}+ years of experience delivering results. Based in {city} 🇮🇳. Let's connect!",
      "🎯 {profession} | {skill1} & {skill2} Expert | Worked with 50+ clients | {city}, India | Building impactful solutions",
    ],
    creative: [
      "I turn ideas into reality as a {profession}. Skilled in {skill1}, {skill2}, and {skill3}. {experience}+ years of freelance experience. Open to exciting projects — let's talk! 📩",
      "Passionate {profession} from {city} 🇮🇳 | I help brands grow through {skill1} & {skill2} | {experience} years in the game | Always learning, always building 🚀",
    ],
    minimal: [
      "{profession} | {skill1} | {skill2} | {city}, India",
      "Freelance {profession} • {skill1} & {skill2} • {city} 🇮🇳",
    ],
  },
  twitter: {
    professional: [
      "{profession} 🚀 | {skill1} & {skill2} | {city} 🇮🇳 | Tweeting about {skill1} | Open for work 📩",
      "Freelance {profession} | {skill1} + {skill2} | {city} | Building cool stuff 🛠️",
    ],
    creative: [
      "I do {skill1} for a living & {skill2} for fun ✨ | {profession} | {city} 🇮🇳",
      "{profession} by profession, {skill1} enthusiast by heart | {city} | Let's connect! 🤝",
    ],
    minimal: [
      "{profession} • {skill1} • {city} 🇮🇳",
      "{skill1} & {skill2} | {profession} | {city}",
    ],
  },
};
 
const PROFESSIONS = [
  "Web Developer","UI/UX Designer","Graphic Designer","Content Writer",
  "Digital Marketer","SEO Specialist","Social Media Manager","Video Editor",
  "Photographer","Copywriter","Data Analyst","App Developer","Brand Designer",
  "WordPress Developer","Motion Designer","Illustrator","Blogger","Consultant",
];
 
const SKILLS_BY_PROFESSION = {
  "Web Developer":        ["React","Node.js","JavaScript","HTML/CSS","Next.js","MongoDB"],
  "UI/UX Designer":       ["Figma","Adobe XD","Prototyping","User Research","Wireframing"],
  "Graphic Designer":     ["Adobe Illustrator","Photoshop","Canva","Branding","Typography"],
  "Content Writer":       ["SEO Writing","Copywriting","Blogging","Social Media","Research"],
  "Digital Marketer":     ["SEO","Google Ads","Meta Ads","Email Marketing","Analytics"],
  "SEO Specialist":       ["On-Page SEO","Link Building","Keyword Research","Technical SEO","Analytics"],
  "Social Media Manager": ["Instagram","Content Strategy","Reels","Analytics","Branding"],
  "Video Editor":         ["Premiere Pro","After Effects","Color Grading","YouTube","Reels"],
  "Photographer":         ["Portrait","Product Photography","Lightroom","Editing","Brand Shoots"],
  "Copywriter":           ["Ad Copy","Sales Pages","Email Campaigns","Storytelling","Brand Voice"],
  "Data Analyst":         ["Excel","Python","SQL","Power BI","Data Visualization"],
  "App Developer":        ["Flutter","React Native","Android","iOS","Firebase"],
  "Brand Designer":       ["Logo Design","Brand Identity","Typography","Color Theory","Packaging"],
  "WordPress Developer":  ["WooCommerce","Elementor","PHP","SEO","Performance"],
  "Motion Designer":      ["After Effects","Cinema 4D","Lottie","2D Animation","UI Motion"],
  "Illustrator":          ["Digital Art","Character Design","Adobe Illustrator","Procreate","Branding"],
  "Blogger":              ["SEO","Content Strategy","WordPress","Social Media","Monetization"],
  "Consultant":           ["Strategy","Business Development","Marketing","Operations","Growth"],
};
 
const CITIES = [
  "Mumbai","Delhi","Bangalore","Hyderabad","Ahmedabad","Chennai",
  "Kolkata","Pune","Jaipur","Surat","Lucknow","Kochi",
  "Chandigarh","Indore","Nagpur","Vadodara","Rajkot",
];
 
const EMOJIS = {
  "Web Developer":"💻","UI/UX Designer":"🎨","Graphic Designer":"🖌️",
  "Content Writer":"✍️","Digital Marketer":"📈","SEO Specialist":"🔍",
  "Social Media Manager":"📱","Video Editor":"🎬","Photographer":"📸",
  "Copywriter":"📝","Data Analyst":"📊","App Developer":"📲",
  "Brand Designer":"✨","WordPress Developer":"🌐","Motion Designer":"🎭",
  "Illustrator":"🖼️","Blogger":"📓","Consultant":"💼",
};
 
const CHAR_LIMITS = {
  instagram:{ ideal:150, max:150 },
  linkedin: { ideal:220, max:300 },
  twitter:  { ideal:160, max:160 },
};
 
const SEO_TIPS = {
  instagram:[
    ["🔑 Keywords",   "Put your main profession keyword in the first line — Instagram's search algorithm indexes it first."],
    ["📏 Length",     "150 characters is the sweet spot. Green = perfect, Yellow = okay, Red = too long."],
    ["🏷️ Line Breaks","Each line should make one clear point — scannable bios get more profile visits."],
    ["🔗 Link in Bio","Use Linktree or Beacons to fit multiple links in one spot."],
  ],
  linkedin:[
    ["🔑 Keywords","Job title + top 2 skills in the headline improves recruiter search visibility."],
    ["📏 Length",  "220 chars is ideal for your headline. Use up to 2,000 chars in your About section."],
    ["📍 Location","Include your city — it helps local clients find you."],
    ["🤝 CTA",     "Add 'Open to work' or 'DM for projects' as a clear call-to-action."],
  ],
  twitter:[
    ["🔑 Keywords",    "Niche keyword first — both Twitter search and Google index Twitter bios."],
    ["📏 Length",      "160 chars max. Short, punchy bios attract more followers."],
    ["🏷️ Hashtags",   "1–2 niche hashtags in your bio are fine — don't overdo it."],
    ["📌 Pinned Tweet","A great bio + a valuable pinned tweet = more conversions."],
  ],
};
 
const FAQS = [
  ["What should I write in an Instagram bio?",
   "Include your profession, top 2–3 skills, city, and a clear CTA. Stay within 150 characters. Use emojis to improve readability."],
  ["What are LinkedIn bio best practices?",
   "Job title + top skills + city. Keywords matter — recruiters use LinkedIn search. Add 'Open to work' or 'Available for freelance' to stand out."],
  ["I've generated my bio — what next?",
   "Check the character counter (green = perfect). Copy it, update your profile, and review your analytics in 2–3 weeks."],
  ["Which platform is best for Indian freelancers?",
   "LinkedIn for serious clients. Instagram for creative fields (design, photography, content). Twitter/X for tech and startup circles."],
];
 
// ── Helpers ──────────────────────────────────────────────────────
function fillTemplate(tpl, d) {
  return tpl
    .replace(/{name}/g,       d.name)
    .replace(/{profession}/g, d.profession)
    .replace(/{skill1}/g,     d.skills[0] || "Skill 1")
    .replace(/{skill2}/g,     d.skills[1] || "Skill 2")
    .replace(/{skill3}/g,     d.skills[2] || "Skill 3")
    .replace(/{city}/g,       d.city)
    .replace(/{emoji}/g,      EMOJIS[d.profession] || "🚀")
    .replace(/{experience}/g, d.experience);
}
 
function generateBios(d) {
  const pool = TEMPLATES[d.platform][d.tone] || TEMPLATES[d.platform].professional;
  return pool.map(t => fillTemplate(t, d));
}
 
function charColor(len, platform) {
  const { ideal, max } = CHAR_LIMITS[platform];
  if (len <= ideal) return "#4ade80";
  if (len <= max)   return "#facc15";
  return "#f87171";
}
 
// ── Styles ────────────────────────────────────────────────────────
const chip = (active) => ({
  padding:"8px 16px", borderRadius:"50px", cursor:"pointer", transition:"all 0.2s",
  fontSize:"13px", fontWeight:"600",
  border:`1px solid ${active ? "rgba(167,139,250,0.6)" : "rgba(255,255,255,0.1)"}`,
  background: active ? "rgba(124,58,237,0.25)" : "rgba(255,255,255,0.03)",
  color:  active ? "#a78bfa" : "#94a3b8",
});
 
const card = {
  background:"linear-gradient(135deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))",
  backdropFilter:"blur(20px)", border:"1px solid rgba(255,255,255,0.1)",
  borderRadius:"24px", padding:"32px", marginBottom:"20px",
};
 
const label = {
  display:"block", fontSize:"13px", fontWeight:"700", color:"#94a3b8",
  marginBottom:"10px", letterSpacing:"0.08em", textTransform:"uppercase",
};
 
const inputStyle = {
  width:"100%", padding:"14px 18px",
  background:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.1)",
  borderRadius:"12px", fontSize:"15px", color:"#f1f5f9",
  outline:"none", boxSizing:"border-box", transition:"border-color 0.2s,box-shadow 0.2s",
};
 
const selectStyle = {
  width:"100%", padding:"14px 18px", background:"#0f0f23",
  border:"1px solid rgba(255,255,255,0.1)", borderRadius:"12px",
  fontSize:"15px", color:"#f1f5f9", outline:"none",
  boxSizing:"border-box", cursor:"pointer",
};
 
// ── Component ────────────────────────────────────────────────────
export default function BioGenerator({ onBack }) {
  const [name,        setName]        = useState("");
  const [profession,  setProfession]  = useState("Web Developer");
  const [skills,      setSkills]      = useState([]);
  const [city,        setCity]        = useState("Ahmedabad");
  const [experience,  setExperience]  = useState("2");
  const [platform,    setPlatform]    = useState("instagram");
  const [tone,        setTone]        = useState("professional");
  const [bios,        setBios]        = useState([]);
  const [selected,    setSelected]    = useState(null);
  const [copied,      setCopied]      = useState(false);
  const [generated,   setGenerated]   = useState(false);
 
  const suggested = SKILLS_BY_PROFESSION[profession] || [];
  useEffect(() => { setSkills([]); }, [profession]);
 
  const toggleSkill = (s) =>
    setSkills(prev =>
      prev.includes(s) ? prev.filter(x => x !== s) : prev.length < 3 ? [...prev, s] : prev
    );
 
  const handleGenerate = () => {
    const data = {
      name: name.trim() || "Your Name",
      profession, city, experience, platform, tone,
      skills: skills.length ? skills : suggested.slice(0, 3),
    };
    setBios(generateBios(data));
    setSelected(null);
    setGenerated(true);
  };
 
  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
 
  return (
    <div style={{ minHeight:"100vh", background:"#080814", fontFamily:"'DM Sans',sans-serif", color:"#f1f5f9" }}>
      <link href="https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;600&display=swap" rel="stylesheet" />
      <style>{`
        input::placeholder{color:#475569}
        select option{background:#0f0f23;color:#f1f5f9}
        @keyframes fadeInUp{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}
        @keyframes pulse{0%,100%{box-shadow:0 0 20px rgba(167,139,250,0.3)}50%{box-shadow:0 0 40px rgba(167,139,250,0.7)}}
        .bio-card:hover{border-color:rgba(167,139,250,0.35)!important;background:rgba(255,255,255,0.05)!important}
      `}</style>
 
      {/* Mesh bg */}
      <div style={{
        position:"fixed",inset:0,zIndex:0,pointerEvents:"none",
        background:"radial-gradient(ellipse 80% 60% at 20% 20%,rgba(124,58,237,0.13) 0%,transparent 60%),radial-gradient(ellipse 60% 50% at 80% 80%,rgba(37,99,235,0.09) 0%,transparent 60%)"
      }}/>
 
      {/* Navbar */}
      <nav style={{
        position:"fixed",top:0,left:0,right:0,zIndex:100,height:"64px",
        display:"flex",alignItems:"center",padding:"0 32px",justifyContent:"space-between",
        background:"rgba(8,8,20,0.85)",backdropFilter:"blur(20px)",
        borderBottom:"1px solid rgba(255,255,255,0.05)",
      }}>
        <div style={{display:"flex",alignItems:"center",gap:"10px"}}>
          <div style={{
            width:"32px",height:"32px",borderRadius:"9px",
            background:"linear-gradient(135deg,#7c3aed,#2563eb)",
            display:"flex",alignItems:"center",justifyContent:"center",fontSize:"16px"
          }}>⚡</div>
          <span style={{
            fontSize:"20px",fontWeight:"800",fontFamily:"'Syne',sans-serif",
            background:"linear-gradient(135deg,#a78bfa,#60a5fa)",
            WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"
          }}>KaroTools</span>
        </div>
        <button onClick={() => window.location.href = "/"} style={{
          background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.1)",
          color:"#94a3b8",padding:"8px 16px",borderRadius:"10px",
          fontSize:"14px",cursor:"pointer",fontWeight:"600",
        }}>← Back</button>
      </nav>
 
      <div style={{position:"relative",zIndex:1,maxWidth:"780px",margin:"0 auto",padding:"100px 20px 80px"}}>
 
        {/* Header */}
        <div style={{textAlign:"center",marginBottom:"40px",animation:"fadeInUp 0.5s both"}}>
          <div style={{
            display:"inline-flex",alignItems:"center",gap:"8px",
            background:"rgba(124,58,237,0.15)",border:"1px solid rgba(124,58,237,0.3)",
            borderRadius:"50px",padding:"6px 16px",marginBottom:"20px",
          }}>
            <span style={{width:"6px",height:"6px",borderRadius:"50%",background:"#a78bfa",display:"inline-block",animation:"pulse 2s infinite"}}/>
            <span style={{fontSize:"12px",color:"#a78bfa",fontWeight:"700",letterSpacing:"0.08em"}}>100% FREE · NO AI API NEEDED</span>
          </div>
          <div style={{fontSize:"48px",marginBottom:"12px"}}>📱</div>
          <h1 style={{
            fontSize:"clamp(28px,5vw,42px)",fontWeight:"800",fontFamily:"'Syne',sans-serif",marginBottom:"12px",
            background:"linear-gradient(135deg,#f1f5f9,#a78bfa,#60a5fa)",
            WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",
          }}>Bio Generator</h1>
          <p style={{color:"#64748b",fontSize:"16px"}}>
            Create catchy bios for Instagram, LinkedIn & Twitter — instantly, for free.
          </p>
        </div>
 
        {/* Form */}
        <div style={{...card,animation:"fadeInUp 0.5s 0.1s both"}}>
 
          {/* Platform */}
          <div style={{marginBottom:"24px"}}>
            <label style={label}>Platform</label>
            <div style={{display:"flex",flexWrap:"wrap",gap:"8px"}}>
              {[{id:"instagram",l:"📸 Instagram"},{id:"linkedin",l:"💼 LinkedIn"},{id:"twitter",l:"🐦 Twitter / X"}].map(p=>(
                <button key={p.id} onClick={()=>setPlatform(p.id)} style={chip(platform===p.id)}>{p.l}</button>
              ))}
            </div>
          </div>
 
          {/* Tone */}
          <div style={{marginBottom:"24px"}}>
            <label style={label}>Tone / Style</label>
            <div style={{display:"flex",flexWrap:"wrap",gap:"8px"}}>
              {[{id:"professional",l:"💼 Professional"},{id:"creative",l:"🎨 Creative"},{id:"minimal",l:"✦ Minimal"}].map(t=>(
                <button key={t.id} onClick={()=>setTone(t.id)} style={chip(tone===t.id)}>{t.l}</button>
              ))}
            </div>
          </div>
 
          {/* Name + Profession */}
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"16px",marginBottom:"24px"}}>
            <div>
              <label style={label}>Your Name (optional)</label>
              <input
                value={name} onChange={e=>setName(e.target.value)}
                placeholder="e.g. Raj Patel" style={inputStyle}
                onFocus={e=>{e.target.style.borderColor="rgba(167,139,250,0.5)";e.target.style.boxShadow="0 0 20px rgba(124,58,237,0.15)";}}
                onBlur={e=>{e.target.style.borderColor="rgba(255,255,255,0.1)";e.target.style.boxShadow="none";}}
              />
            </div>
            <div>
              <label style={label}>Profession</label>
              <select value={profession} onChange={e=>setProfession(e.target.value)} style={selectStyle}>
                {PROFESSIONS.map(p=><option key={p} value={p}>{p}</option>)}
              </select>
            </div>
          </div>
 
          {/* City + Experience */}
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"16px",marginBottom:"24px"}}>
            <div>
              <label style={label}>City</label>
              <select value={city} onChange={e=>setCity(e.target.value)} style={selectStyle}>
                {CITIES.map(c=><option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label style={label}>Experience</label>
              <select value={experience} onChange={e=>setExperience(e.target.value)} style={selectStyle}>
                {["1","2","3","4","5","6","7","8","9","10+"].map(y=>(
                  <option key={y} value={y}>{y} year{y!=="1"?"s":""}</option>
                ))}
              </select>
            </div>
          </div>
 
          {/* Skills */}
          <div style={{marginBottom:"28px"}}>
            <label style={label}>
              Skills —&nbsp;
              <span style={{color:"#a78bfa"}}>{skills.length}/3 selected</span>
              <span style={{color:"#475569",fontWeight:"400",marginLeft:"8px",textTransform:"none"}}>(select up to 3)</span>
            </label>
            <div style={{display:"flex",flexWrap:"wrap",gap:"8px"}}>
              {suggested.map(s=>(
                <button key={s} onClick={()=>toggleSkill(s)} style={{
                  ...chip(skills.includes(s)),
                  opacity:!skills.includes(s)&&skills.length>=3?0.35:1,
                }}>{s}</button>
              ))}
            </div>
          </div>
 
          {/* Generate */}
          <button onClick={handleGenerate} style={{
            width:"100%",padding:"18px",
            background:"linear-gradient(135deg,#7c3aed,#2563eb)",
            border:"none",borderRadius:"14px",color:"#fff",
            fontSize:"17px",fontWeight:"700",cursor:"pointer",
            fontFamily:"'Syne',sans-serif",letterSpacing:"0.02em",
            boxShadow:"0 4px 30px rgba(124,58,237,0.4)",transition:"all 0.2s",
          }}>
            ✨ Generate Bios
          </button>
        </div>
 
        {/* Results */}
        {generated && bios.length>0 && (
          <div style={{animation:"fadeInUp 0.4s both"}}>
            <div style={{textAlign:"center",marginBottom:"20px"}}>
              <h2 style={{
                fontSize:"22px",fontWeight:"800",fontFamily:"'Syne',sans-serif",
                background:"linear-gradient(135deg,#a78bfa,#60a5fa)",
                WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",
              }}>{bios.length} Bios Generated ✨</h2>
              <p style={{color:"#475569",fontSize:"13px",marginTop:"6px"}}>Click a bio to select it, then copy</p>
            </div>
 
            {bios.map((bio,i)=>{
              const len=bio.length;
              const col=charColor(len,platform);
              const isSel=selected===i;
              return(
                <div key={i} className="bio-card" onClick={()=>setSelected(isSel?null:i)} style={{
                  background:isSel?"rgba(124,58,237,0.15)":"rgba(255,255,255,0.03)",
                  border:`1px solid ${isSel?"rgba(167,139,250,0.5)":"rgba(255,255,255,0.08)"}`,
                  borderRadius:"16px",padding:"20px",marginBottom:"14px",
                  cursor:"pointer",transition:"all 0.2s",position:"relative",
                }}>
                  <div style={{
                    position:"absolute",top:"16px",left:"16px",
                    width:"24px",height:"24px",borderRadius:"50%",
                    background:isSel?"rgba(124,58,237,0.5)":"rgba(255,255,255,0.07)",
                    display:"flex",alignItems:"center",justifyContent:"center",
                    fontSize:"11px",fontWeight:"700",color:isSel?"#a78bfa":"#64748b",
                  }}>{i+1}</div>
 
                  <pre style={{
                    whiteSpace:"pre-wrap",margin:"0 0 0 36px",
                    fontSize:"14px",lineHeight:"1.75",
                    color:isSel?"#e2e8f0":"#cbd5e1",
                    fontFamily:"'DM Sans',sans-serif",
                  }}>{bio}</pre>
 
                  <div style={{
                    display:"flex",alignItems:"center",justifyContent:"space-between",
                    marginTop:"12px",paddingTop:"12px",
                    borderTop:"1px solid rgba(255,255,255,0.06)",
                  }}>
                    <span style={{fontSize:"12px",color:"#475569"}}>
                      {platform==="instagram"&&"Instagram Bio"}
                      {platform==="linkedin"&&"LinkedIn Headline"}
                      {platform==="twitter"&&"Twitter / X Bio"}
                    </span>
                    <span style={{
                      fontSize:"12px",fontWeight:"700",color:col,
                      background:`${col}18`,padding:"3px 10px",
                      borderRadius:"20px",border:`1px solid ${col}33`,
                    }}>{len} / {CHAR_LIMITS[platform].max} chars</span>
                  </div>
                </div>
              );
            })}
 
            {selected!==null&&(
              <div style={{textAlign:"center",marginTop:"8px"}}>
                <button onClick={()=>handleCopy(bios[selected])} style={{
                  padding:"14px 40px",
                  background:copied
                    ?"linear-gradient(135deg,#059669,#0891b2)"
                    :"linear-gradient(135deg,#7c3aed,#2563eb)",
                  border:"none",borderRadius:"12px",color:"#fff",
                  fontSize:"16px",fontWeight:"700",cursor:"pointer",
                  fontFamily:"'Syne',sans-serif",
                  boxShadow:"0 4px 20px rgba(124,58,237,0.35)",transition:"all 0.2s",
                }}>
                  {copied?"✅ Copied!":"📋 Copy Bio"}
                </button>
              </div>
            )}
 
            {/* SEO Tips */}
            <div style={{...card,marginTop:"28px"}}>
              <h3 style={{fontSize:"16px",fontWeight:"800",fontFamily:"'Syne',sans-serif",color:"#f1f5f9",marginBottom:"16px"}}>
                📈 SEO Tips for {platform==="instagram"?"Instagram":platform==="linkedin"?"LinkedIn":"Twitter / X"}
              </h3>
              <div style={{display:"grid",gap:"10px"}}>
                {SEO_TIPS[platform].map(([t,d])=>(
                  <div key={t} style={{display:"flex",gap:"12px",padding:"12px",background:"rgba(255,255,255,0.03)",borderRadius:"10px"}}>
                    <span style={{fontSize:"13px",fontWeight:"700",color:"#a78bfa",minWidth:"110px"}}>{t}</span>
                    <span style={{fontSize:"13px",color:"#64748b",lineHeight:"1.5"}}>{d}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
 
        {/* FAQ */}
        <div style={{...card,marginTop:"20px"}}>
          <h3 style={{fontSize:"16px",fontWeight:"800",fontFamily:"'Syne',sans-serif",color:"#f1f5f9",marginBottom:"16px"}}>
            ❓ Frequently Asked Questions
          </h3>
          {FAQS.map(([q,a])=>(
            <div key={q} style={{marginBottom:"14px",padding:"16px",background:"rgba(255,255,255,0.03)",borderRadius:"12px"}}>
              <div style={{fontSize:"14px",fontWeight:"700",color:"#e2e8f0",marginBottom:"6px"}}>{q}</div>
              <div style={{fontSize:"13px",color:"#64748b",lineHeight:"1.6"}}>{a}</div>
            </div>
          ))}
        </div>
 
      </div>
    </div>
  );
}
 
