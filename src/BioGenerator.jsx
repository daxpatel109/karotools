import { useState } from "react";

function BioGenerator() {
  const [name, setName] = useState("");
  const [profession, setProfession] = useState("");
  const [skills, setSkills] = useState("");
  const [platform, setPlatform] = useState("instagram");
  const [bio, setBio] = useState("");
  const [loading, setLoading] = useState(false);

  const generateBio = async () => {
    if (!name || !profession) return;
    setLoading(true);
    setBio("");

    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [{
            role: "user",
            content: `Create a professional ${platform} bio for:
            Name: ${name}
            Profession: ${profession}
            Skills: ${skills}
            
            Make it catchy, professional and under 150 characters for Instagram or 300 characters for LinkedIn.
            Only return the bio, nothing else.`
          }],
          max_tokens: 200
        })
      });

      const data = await response.json();
      setBio(data.choices[0].message.content);
    } catch (error) {
      setBio("Error generating bio. Please try again!");
    }
    setLoading(false);
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f8fafc", fontFamily: "Inter, sans-serif" }}>

      {/* Navbar */}
      <nav style={{ backgroundColor: "#ffffff", padding: "16px 32px", display: "flex", justifyContent: "space-between", alignItems: "center", boxShadow: "0 2px 10px rgba(0,0,0,0.08)" }}>
        <h1 style={{ color: "#6366f1", fontSize: "24px", fontWeight: "800" }}>KaroTools</h1>
        <a href="/" style={{ color: "#64748b", textDecoration: "none", fontSize: "14px" }}>← Back to Home</a>
      </nav>

      {/* Main */}
      <div style={{ maxWidth: "600px", margin: "60px auto", padding: "0 20px" }}>
        <div style={{ backgroundColor: "white", borderRadius: "24px", padding: "40px", boxShadow: "0 4px 30px rgba(0,0,0,0.08)" }}>

          <div style={{ textAlign: "center", marginBottom: "32px" }}>
            <div style={{ fontSize: "48px", marginBottom: "12px" }}>📱</div>
            <h2 style={{ fontSize: "28px", fontWeight: "800", color: "#1e293b" }}>Bio Generator</h2>
            <p style={{ color: "#64748b", marginTop: "8px" }}>Create catchy Instagram & LinkedIn bios with AI</p>
          </div>

          {/* Platform */}
          <div style={{ marginBottom: "20px" }}>
            <label style={{ display: "block", fontWeight: "600", color: "#374151", marginBottom: "8px" }}>Platform</label>
            <div style={{ display: "flex", gap: "12px" }}>
              {["instagram", "linkedin"].map(p => (
                <button key={p} onClick={() => setPlatform(p)} style={{
                  flex: 1, padding: "12px", borderRadius: "12px", border: "2px solid",
                  borderColor: platform === p ? "#6366f1" : "#e2e8f0",
                  backgroundColor: platform === p ? "#ede9fe" : "white",
                  color: platform === p ? "#6366f1" : "#64748b",
                  fontWeight: "600", cursor: "pointer", fontSize: "14px"
                }}>
                  {p === "instagram" ? "📸 Instagram" : "💼 LinkedIn"}
                </button>
              ))}
            </div>
          </div>

          {/* Name */}
          <div style={{ marginBottom: "20px" }}>
            <label style={{ display: "block", fontWeight: "600", color: "#374151", marginBottom: "8px" }}>Your Name</label>
            <input
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Enter your name..."
              style={{ width: "100%", padding: "14px", borderRadius: "12px", border: "2px solid #e2e8f0", fontSize: "16px", outline: "none" }}
            />
          </div>

          {/* Profession */}
          <div style={{ marginBottom: "20px" }}>
            <label style={{ display: "block", fontWeight: "600", color: "#374151", marginBottom: "8px" }}>Profession</label>
            <input
              value={profession}
              onChange={e => setProfession(e.target.value)}
              placeholder="e.g. Freelance Designer, Web Developer..."
              style={{ width: "100%", padding: "14px", borderRadius: "12px", border: "2px solid #e2e8f0", fontSize: "16px", outline: "none" }}
            />
          </div>

          {/* Skills */}
          <div style={{ marginBottom: "28px" }}>
            <label style={{ display: "block", fontWeight: "600", color: "#374151", marginBottom: "8px" }}>Skills (optional)</label>
            <input
              value={skills}
              onChange={e => setSkills(e.target.value)}
              placeholder="e.g. React, UI Design, Photography..."
              style={{ width: "100%", padding: "14px", borderRadius: "12px", border: "2px solid #e2e8f0", fontSize: "16px", outline: "none" }}
            />
          </div>

          {/* Generate Button */}
          <button
            onClick={generateBio}
            disabled={loading}
            style={{ width: "100%", padding: "16px", backgroundColor: loading ? "#a5b4fc" : "#6366f1", color: "white", border: "none", borderRadius: "12px", fontSize: "18px", fontWeight: "700", cursor: "pointer" }}
          >
            {loading ? "Generating... ⏳" : "Generate Bio 📱"}
          </button>

          {/* Result */}
          {bio && (
            <div style={{ marginTop: "28px", backgroundColor: "#f8fafc", borderRadius: "16px", padding: "24px" }}>
              <h3 style={{ fontWeight: "700", color: "#1e293b", marginBottom: "12px" }}>Your Bio ✨</h3>
              <p style={{ color: "#374151", fontSize: "16px", lineHeight: "1.6" }}>{bio}</p>
              <button
                onClick={() => navigator.clipboard.writeText(bio)}
                style={{ marginTop: "16px", padding: "10px 20px", backgroundColor: "#6366f1", color: "white", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: "600" }}
              >
                Copy Bio 📋
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default BioGenerator;