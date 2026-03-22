import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CATEGORIES = ["Design","Web Development","Mobile Development","Data Science","Marketing","Writing","Video & Animation","Music & Audio","Business","Consulting"];
const COMMITMENT_TYPES = ["Full-time (40+ hrs/wk)","Part-time (20–30 hrs/wk)","Hourly (< 20 hrs/wk)","Not available"];

const SIDEBAR_STEPS = [
  { n: 1, label: "Professional Info", icon: (c) => <svg width="16" height="16" fill="none" stroke={c} strokeWidth="2" viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg> },
  { n: 2, label: "Skills & Rates",    icon: (c) => <svg width="16" height="16" fill="none" stroke={c} strokeWidth="2" viewBox="0 0 24 24"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg> },
  { n: 3, label: "Portfolio",         icon: (c) => <svg width="16" height="16" fill="none" stroke={c} strokeWidth="2" viewBox="0 0 24 24"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/></svg> },
  { n: 4, label: "Final Review",      icon: (c) => <svg width="16" height="16" fill="none" stroke={c} strokeWidth="2" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg> },
];

export default function BecomeFreelancerPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [skillInput, setSkillInput] = useState("");

  const [form, setForm] = useState({
    title: "", category: "Design", location: "", bio: "",
    bioSnapshot: "",
    skills: ["React", "Figma", "Tailwind CSS", "TypeScript"],
    hourlyRate: "45", availability: "Part-time (20–30 hrs/wk)",
    portfolio: [
      { title: "E-commerce Dashboard", description: "A full-scale React application for managing inventory and global sales with real-time...", link: "", tech: ["React", "Node.js"] },
      { title: "Mobile Banking App", description: "UX/UI design for a neobank focused on generation Z, emphasizing speed and security.", link: "", tech: ["Figma", "UI/UX"] },
    ],
  });

  const progress = step === 1 ? 25 : step === 2 ? 50 : step === 3 ? 75 : 100;
  const fc = (k, v) => setForm(p => ({ ...p, [k]: v }));

  const addSkill = () => {
    const s = skillInput.trim();
    if (s && !form.skills.includes(s)) fc("skills", [...form.skills, s]);
    setSkillInput("");
  };
  const removeSkill = (s) => fc("skills", form.skills.filter(x => x !== s));

  const addProject = () => fc("portfolio", [...form.portfolio, { title: "", description: "", link: "", tech: [] }]);
  const updateProject = (i, k, v) => {
    const u = [...form.portfolio]; u[i][k] = v; fc("portfolio", u);
  };
  const removeProject = (i) => fc("portfolio", form.portfolio.filter((_, idx) => idx !== i));

  const handleSubmit = async () => {
    if (!agreed) { setError("Please agree to the Terms of Service"); return; }
    setLoading(true); setError("");
    try {
      const token = localStorage.getItem("searfind_token");
      await axios.post("http://localhost:5000/api/freelancers", {
        title: form.title, bio: form.bio || form.bioSnapshot,
        skills: form.skills, category: form.category,
        hourlyRate: Number(form.hourlyRate),
        availability: form.availability.includes("Full") ? "full-time" : form.availability.includes("Part") ? "part-time" : "not-available",
        portfolio: form.portfolio,
      }, { headers: { Authorization: `Bearer ${token}` } });
      navigate("/my-freelancer-profile");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create profile");
    } finally { setLoading(false); }
  };

  return (
    <div style={{ fontFamily: "'Inter',sans-serif", background: "#F3F4F6", minHeight: "100vh" }}>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet"/>

      {/* Navbar */}
      <nav style={{ background:"#fff", borderBottom:"1px solid #E5E7EB", padding:"0 32px", height:"56px", display:"flex", alignItems:"center", justifyContent:"space-between", position:"sticky", top:0, zIndex:100 }}>
        <span style={{ fontWeight:800, fontSize:"20px", color:"#111827" }}>SearFind</span>
        <div style={{ display:"flex", alignItems:"center", gap:"10px" }}>
          {[[<svg width="18" height="18" fill="none" stroke="#6B7280" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>],
            [<svg width="18" height="18" fill="none" stroke="#6B7280" strokeWidth="2" viewBox="0 0 24 24"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>]
          ].map((icon, i) => (
            <div key={i} style={{ width:"36px", height:"36px", borderRadius:"50%", border:"1px solid #E5E7EB", display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer" }}>{icon}</div>
          ))}
          <div style={{ width:"36px", height:"36px", borderRadius:"50%", background:"linear-gradient(135deg,#FCD34D,#F97316)", display:"flex", alignItems:"center", justifyContent:"center", color:"#fff", fontSize:"13px", fontWeight:700 }}>T</div>
        </div>
      </nav>

      <div style={{ display:"flex", minHeight:"calc(100vh - 56px)" }}>

        {/* Sidebar */}
        <aside style={{ width:"220px", background:"#fff", borderRight:"1px solid #E5E7EB", padding:"28px 16px", flexShrink:0 }}>
          <p style={{ fontSize:"15px", fontWeight:700, color:"#111827", margin:"0 0 2px" }}>Freelancer Setup</p>
          <p style={{ fontSize:"12px", color:"#6B7280", margin:"0 0 28px" }}>Step {step} of 4</p>
          {SIDEBAR_STEPS.map(s => (
            <div key={s.n} onClick={() => setStep(s.n)} style={{
              display:"flex", alignItems:"center", gap:"10px",
              padding:"10px 12px", borderRadius:"8px", marginBottom:"4px",
              background: step === s.n ? "#EEF2FF" : "transparent",
              borderLeft: step === s.n ? "3px solid #4F46E5" : "3px solid transparent",
              cursor:"pointer",
            }}>
              {s.icon(step === s.n ? "#4F46E5" : "#9CA3AF")}
              <span style={{ fontSize:"13px", fontWeight: step === s.n ? 600 : 400, color: step === s.n ? "#4F46E5" : "#6B7280" }}>{s.label}</span>
            </div>
          ))}
        </aside>

        {/* Main */}
        <main style={{ flex:1, padding:"32px 40px", overflowY:"auto" }}>

          {/* ═══════════════ STEP 1 ═══════════════ */}
          {step === 1 && (
            <>
              {/* Step dots */}
              <div style={{ display:"flex", alignItems:"center", gap:"0", marginBottom:"32px" }}>
                {[{n:1,l:"Identity"},{n:2,l:"Expertise"},{n:3,l:"Showcase"},{n:4,l:"Verify"}].map((s,i,arr) => (
                  <div key={s.n} style={{ display:"flex", alignItems:"center" }}>
                    <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:"6px" }}>
                      <div style={{ width:"36px", height:"36px", borderRadius:"50%", background: step >= s.n ? "#4F46E5" : "#E5E7EB", display:"flex", alignItems:"center", justifyContent:"center", color: step >= s.n ? "#fff" : "#9CA3AF", fontSize:"14px", fontWeight:700 }}>
                        {step > s.n ? <svg width="16" height="16" fill="none" stroke="#fff" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5"/></svg> : s.n}
                      </div>
                      <span style={{ fontSize:"12px", fontWeight: step === s.n ? 600 : 400, color: step === s.n ? "#4F46E5" : "#9CA3AF" }}>{s.l}</span>
                    </div>
                    {i < arr.length - 1 && <div style={{ width:"160px", height:"2px", background: step > s.n ? "#4F46E5" : "#E5E7EB", margin:"0 8px 20px" }}/>}
                  </div>
                ))}
              </div>

              <div style={{ display:"flex", gap:"24px" }}>
                {/* Form */}
                <div style={{ flex:1, background:"#fff", borderRadius:"14px", border:"1px solid #E5E7EB", padding:"28px" }}>
                  <h2 style={{ fontSize:"22px", fontWeight:800, color:"#111827", margin:"0 0 4px" }}>Professional Information</h2>
                  <p style={{ fontSize:"14px", color:"#6B7280", margin:"0 0 24px" }}>Tell us about your background and what you do best.</p>

                  <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"16px", marginBottom:"16px" }}>
                    <div>
                      <label style={{ fontSize:"13px", fontWeight:600, color:"#374151", display:"block", marginBottom:"6px" }}>Professional Title</label>
                      <input value={form.title} onChange={e => fc("title", e.target.value)} placeholder="e.g., Senior UI/UX Designer"
                        style={{ width:"100%", padding:"10px 14px", border:"1.5px solid #E5E7EB", borderRadius:"8px", fontSize:"13px", outline:"none", boxSizing:"border-box" }}
                        onFocus={e => e.target.style.borderColor="#4F46E5"} onBlur={e => e.target.style.borderColor="#E5E7EB"} />
                    </div>
                    <div>
                      <label style={{ fontSize:"13px", fontWeight:600, color:"#374151", display:"block", marginBottom:"6px" }}>Primary Category</label>
                      <select value={form.category} onChange={e => fc("category", e.target.value)}
                        style={{ width:"100%", padding:"10px 14px", border:"1.5px solid #E5E7EB", borderRadius:"8px", fontSize:"13px", background:"#fff", outline:"none", boxSizing:"border-box", cursor:"pointer" }}>
                        {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                      </select>
                    </div>
                  </div>

                  <div style={{ marginBottom:"16px" }}>
                    <label style={{ fontSize:"13px", fontWeight:600, color:"#374151", display:"block", marginBottom:"6px" }}>Location</label>
                    <div style={{ position:"relative" }}>
                      <svg width="14" height="14" fill="none" stroke="#9CA3AF" strokeWidth="2" viewBox="0 0 24 24" style={{ position:"absolute", left:"12px", top:"50%", transform:"translateY(-50%)" }}>
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                      </svg>
                      <input value={form.location} onChange={e => fc("location", e.target.value)} placeholder="City, Country"
                        style={{ width:"100%", padding:"10px 14px 10px 34px", border:"1.5px solid #E5E7EB", borderRadius:"8px", fontSize:"13px", outline:"none", boxSizing:"border-box" }}
                        onFocus={e => e.target.style.borderColor="#4F46E5"} onBlur={e => e.target.style.borderColor="#E5E7EB"} />
                    </div>
                  </div>

                  <div>
                    <label style={{ fontSize:"13px", fontWeight:600, color:"#374151", display:"block", marginBottom:"6px" }}>Professional Bio</label>
                    <textarea value={form.bio} onChange={e => fc("bio", e.target.value)} rows={6} maxLength={2000}
                      placeholder="Describe your experience, achievements, and what makes you unique..."
                      style={{ width:"100%", padding:"12px 14px", border:"1.5px solid #E5E7EB", borderRadius:"8px", fontSize:"13px", outline:"none", resize:"vertical", boxSizing:"border-box", lineHeight:"1.6" }}
                      onFocus={e => e.target.style.borderColor="#4F46E5"} onBlur={e => e.target.style.borderColor="#E5E7EB"} />
                    <p style={{ fontSize:"12px", color:"#9CA3AF", textAlign:"right", margin:"4px 0 0" }}>{form.bio.length}/2000 characters</p>
                  </div>
                </div>

                {/* Right panel */}
                <div style={{ width:"220px", flexShrink:0, display:"flex", flexDirection:"column", gap:"16px" }}>
                  <div style={{ background:"#EEF2FF", borderRadius:"14px", padding:"20px" }}>
                    <div style={{ display:"flex", alignItems:"center", gap:"8px", marginBottom:"10px" }}>
                      <div style={{ width:"36px", height:"36px", borderRadius:"50%", background:"#4F46E5", display:"flex", alignItems:"center", justifyContent:"center" }}>
                        <svg width="18" height="18" fill="#fff" viewBox="0 0 24 24"><path d="M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2zm1 14h-2v-4h2zm0-6h-2V7h2z"/></svg>
                      </div>
                      <span style={{ fontSize:"14px", fontWeight:700, color:"#4F46E5" }}>Pro Tip</span>
                    </div>
                    <p style={{ fontSize:"13px", color:"#374151", lineHeight:"1.6", margin:0 }}>
                      Freelancers with a professional title and a bio over 100 words are <strong>3x more likely</strong> to get their first project within the first week.
                    </p>
                  </div>

                  <div style={{ background:"#fff", border:"1px solid #E5E7EB", borderRadius:"14px", padding:"20px" }}>
                    <p style={{ fontSize:"13px", fontWeight:700, color:"#111827", margin:"0 0 14px" }}>Profile Preview</p>
                    <div style={{ display:"flex", alignItems:"center", gap:"10px", marginBottom:"12px" }}>
                      <div style={{ width:"40px", height:"40px", borderRadius:"50%", background:"#F3F4F6", border:"2px dashed #D1D5DB", display:"flex", alignItems:"center", justifyContent:"center" }}>
                        <svg width="16" height="16" fill="none" stroke="#9CA3AF" strokeWidth="2" viewBox="0 0 24 24"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>
                      </div>
                      <div style={{ flex:1 }}>
                        <div style={{ height:"8px", background:"#F3F4F6", borderRadius:"4px", marginBottom:"6px", width:"80%" }}/>
                        <div style={{ height:"6px", background:"#F3F4F6", borderRadius:"4px", width:"55%" }}/>
                      </div>
                    </div>
                    {[90,100,70].map((w,i) => <div key={i} style={{ height:"6px", background:"#F3F4F6", borderRadius:"4px", marginBottom:"6px", width:`${w}%` }}/>)}
                  </div>

                  <div style={{ borderRadius:"14px", overflow:"hidden", height:"120px", background:"linear-gradient(135deg,#1E293B,#374151)", display:"flex", alignItems:"flex-end", position:"relative" }}>
                    <div style={{ position:"absolute", inset:0, background:"linear-gradient(to top,rgba(0,0,0,0.7),transparent 50%)" }}/>
                    <p style={{ position:"relative", fontSize:"12px", color:"#fff", padding:"12px", margin:0, lineHeight:"1.4" }}>Join 50,000+ professionals worldwide on SearFind.</p>
                  </div>
                </div>
              </div>

              {/* Nav */}
              <div style={{ display:"flex", justifyContent:"space-between", marginTop:"32px", paddingTop:"24px", borderTop:"1px solid #E5E7EB" }}>
                <button style={{ display:"flex", alignItems:"center", gap:"8px", background:"transparent", border:"none", fontSize:"14px", fontWeight:600, color:"#9CA3AF", cursor:"not-allowed" }}>
                  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M19 12H5"/><path d="M12 19l-7-7 7-7"/></svg>Back
                </button>
                <button onClick={() => setStep(2)} style={{ display:"flex", alignItems:"center", gap:"8px", background:"#4F46E5", color:"#fff", border:"none", borderRadius:"8px", padding:"12px 28px", fontSize:"14px", fontWeight:600, cursor:"pointer" }}>
                  Save & Continue <svg width="16" height="16" fill="none" stroke="#fff" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg>
                </button>
              </div>
            </>
          )}

          {/* ═══════════════ STEP 2 ═══════════════ */}
          {step === 2 && (
            <>
              <div style={{ marginBottom:"28px" }}>
                <div style={{ display:"flex", justifyContent:"space-between", marginBottom:"8px" }}>
                  <span style={{ fontSize:"13px", fontWeight:600, color:"#4F46E5" }}>Configuration Progress</span>
                  <span style={{ fontSize:"13px", color:"#6B7280" }}>50% Complete</span>
                </div>
                <div style={{ height:"6px", background:"#E5E7EB", borderRadius:"3px", overflow:"hidden" }}>
                  <div style={{ height:"100%", width:"50%", background:"linear-gradient(90deg,#4F46E5,#7C3AED)", borderRadius:"3px" }}/>
                </div>
              </div>

              <h2 style={{ fontSize:"26px", fontWeight:800, color:"#111827", margin:"0 0 6px" }}>Skills & Rates</h2>
              <p style={{ fontSize:"14px", color:"#6B7280", margin:"0 0 24px" }}>Define your expertise and set your financial expectations to help us match you with the right clients.</p>

              <div style={{ display:"flex", gap:"24px" }}>
                {/* Left */}
                <div style={{ flex:1, background:"#fff", borderRadius:"14px", border:"1px solid #E5E7EB", padding:"28px" }}>
                  <div style={{ display:"flex", alignItems:"center", gap:"10px", marginBottom:"20px" }}>
                    <div style={{ width:"32px", height:"32px", borderRadius:"8px", background:"#EEF2FF", display:"flex", alignItems:"center", justifyContent:"center" }}>
                      <svg width="16" height="16" fill="none" stroke="#4F46E5" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/></svg>
                    </div>
                    <h3 style={{ fontSize:"16px", fontWeight:700, color:"#111827", margin:0 }}>Expertise & Skills</h3>
                  </div>

                  <label style={{ fontSize:"13px", fontWeight:600, color:"#374151", display:"block", marginBottom:"8px" }}>Core Skills</label>
                  <div style={{ display:"flex", gap:"8px", marginBottom:"6px" }}>
                    <input value={skillInput} onChange={e => setSkillInput(e.target.value)}
                      onKeyDown={e => e.key === "Enter" && (e.preventDefault(), addSkill())}
                      placeholder="e.g. React, UI Design, Python"
                      style={{ flex:1, padding:"10px 14px", border:"1.5px solid #E5E7EB", borderRadius:"8px", fontSize:"13px", outline:"none" }}
                      onFocus={e => e.target.style.borderColor="#4F46E5"} onBlur={e => e.target.style.borderColor="#E5E7EB"} />
                    <button onClick={addSkill} style={{ width:"40px", height:"40px", background:"#4F46E5", color:"#fff", border:"none", borderRadius:"8px", fontSize:"22px", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>+</button>
                  </div>
                  <p style={{ fontSize:"12px", color:"#9CA3AF", margin:"0 0 14px" }}>Add at least 3 skills to stand out.</p>

                  <div style={{ display:"flex", flexWrap:"wrap", gap:"8px", marginBottom:"20px" }}>
                    {form.skills.map(skill => (
                      <span key={skill} style={{ background:"#CCFBF1", color:"#0F766E", padding:"5px 12px", borderRadius:"20px", fontSize:"13px", fontWeight:500, display:"flex", alignItems:"center", gap:"6px" }}>
                        {skill} <span onClick={() => removeSkill(skill)} style={{ cursor:"pointer", fontSize:"16px", lineHeight:1 }}>×</span>
                      </span>
                    ))}
                  </div>

                  <div style={{ borderTop:"1px solid #F3F4F6", paddingTop:"20px" }}>
                    <label style={{ fontSize:"13px", fontWeight:600, color:"#374151", display:"block", marginBottom:"8px" }}>Bio Snapshot</label>
                    <textarea value={form.bioSnapshot} onChange={e => fc("bioSnapshot", e.target.value)} rows={4}
                      placeholder="Briefly describe your professional background..."
                      style={{ width:"100%", padding:"12px 14px", border:"1.5px solid #E5E7EB", borderRadius:"8px", fontSize:"13px", outline:"none", resize:"none", boxSizing:"border-box", lineHeight:"1.6" }}
                      onFocus={e => e.target.style.borderColor="#4F46E5"} onBlur={e => e.target.style.borderColor="#E5E7EB"} />
                  </div>
                </div>

                {/* Right */}
                <div style={{ width:"300px", flexShrink:0, display:"flex", flexDirection:"column", gap:"16px" }}>
                  {/* Financials */}
                  <div style={{ background:"linear-gradient(135deg,#4F46E5,#4338CA)", borderRadius:"14px", padding:"24px", color:"#fff" }}>
                    <div style={{ display:"flex", alignItems:"center", gap:"10px", marginBottom:"20px" }}>
                      <svg width="18" height="18" fill="none" stroke="#fff" strokeWidth="2" viewBox="0 0 24 24"><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg>
                      <span style={{ fontSize:"16px", fontWeight:700 }}>Financials</span>
                    </div>
                    <p style={{ fontSize:"11px", fontWeight:600, letterSpacing:"0.08em", opacity:0.8, margin:"0 0 8px" }}>HOURLY RATE</p>
                    <div style={{ display:"flex", alignItems:"center", background:"rgba(255,255,255,0.15)", borderRadius:"10px", overflow:"hidden", marginBottom:"10px" }}>
                      <span style={{ padding:"12px 16px", fontSize:"20px", fontWeight:700, borderRight:"1px solid rgba(255,255,255,0.2)" }}>$</span>
                      <input type="number" value={form.hourlyRate} onChange={e => fc("hourlyRate", e.target.value)}
                        style={{ flex:1, padding:"12px 16px", background:"transparent", border:"none", color:"#fff", fontSize:"28px", fontWeight:800, outline:"none", width:"80px" }} />
                      <span style={{ padding:"12px 16px", fontSize:"14px", fontWeight:600, opacity:0.8 }}>/hr</span>
                    </div>
                    <p style={{ fontSize:"12px", opacity:0.7, margin:0 }}>Suggested rate for your skills: $40 - $65</p>
                  </div>

                  {/* Availability */}
                  <div style={{ background:"#fff", border:"1px solid #E5E7EB", borderRadius:"14px", padding:"24px" }}>
                    <div style={{ display:"flex", alignItems:"center", gap:"10px", marginBottom:"16px" }}>
                      <svg width="18" height="18" fill="none" stroke="#4F46E5" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                      <span style={{ fontSize:"16px", fontWeight:700, color:"#111827" }}>Availability</span>
                    </div>
                    <label style={{ fontSize:"13px", fontWeight:600, color:"#374151", display:"block", marginBottom:"8px" }}>Commitment Type</label>
                    <div style={{ position:"relative" }}>
                      <select value={form.availability} onChange={e => fc("availability", e.target.value)}
                        style={{ width:"100%", padding:"10px 36px 10px 14px", border:"1.5px solid #E5E7EB", borderRadius:"8px", fontSize:"13px", color:"#374151", background:"#fff", outline:"none", cursor:"pointer", appearance:"none" }}>
                        {COMMITMENT_TYPES.map(c => <option key={c}>{c}</option>)}
                      </select>
                      <svg width="14" height="14" fill="none" stroke="#6B7280" strokeWidth="2" viewBox="0 0 24 24" style={{ position:"absolute", right:"12px", top:"50%", transform:"translateY(-50%)", pointerEvents:"none" }}><path d="M6 9l6 6 6-6"/></svg>
                    </div>
                  </div>
                </div>
              </div>

              <div style={{ display:"flex", justifyContent:"space-between", marginTop:"32px", paddingTop:"24px", borderTop:"1px solid #E5E7EB" }}>
                <button onClick={() => setStep(1)} style={{ display:"flex", alignItems:"center", gap:"8px", background:"#fff", border:"1.5px solid #E5E7EB", borderRadius:"8px", padding:"10px 20px", fontSize:"14px", fontWeight:600, color:"#374151", cursor:"pointer" }}>
                  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M19 12H5"/><path d="M12 19l-7-7 7-7"/></svg>Back
                </button>
                <div style={{ display:"flex", gap:"12px" }}>
                  <button style={{ background:"#F3F4F6", color:"#374151", border:"none", borderRadius:"8px", padding:"10px 20px", fontSize:"14px", fontWeight:600, cursor:"pointer" }}>Save Draft</button>
                  <button onClick={() => setStep(3)} style={{ display:"flex", alignItems:"center", gap:"8px", background:"#4F46E5", color:"#fff", border:"none", borderRadius:"8px", padding:"10px 24px", fontSize:"14px", fontWeight:600, cursor:"pointer" }}>
                    Save & Continue <svg width="16" height="16" fill="none" stroke="#fff" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg>
                  </button>
                </div>
              </div>
            </>
          )}

          {/* ═══════════════ STEP 3 ═══════════════ */}
          {step === 3 && (
            <>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"8px" }}>
                <h2 style={{ fontSize:"26px", fontWeight:800, color:"#111827", margin:0 }}>Portfolio & Projects</h2>
                <span style={{ background:"#EEF2FF", color:"#4F46E5", padding:"6px 14px", borderRadius:"20px", fontSize:"13px", fontWeight:600 }}>Step 3 of 4</span>
              </div>
              <div style={{ height:"4px", background:"linear-gradient(90deg,#4F46E5,#7C3AED)", borderRadius:"2px", marginBottom:"28px", width:"75%" }}/>

              <div style={{ display:"flex", gap:"24px" }}>
                {/* Left tip */}
                <div style={{ width:"240px", flexShrink:0 }}>
                  <div style={{ background:"#fff", border:"1px solid #E5E7EB", borderRadius:"14px", padding:"24px" }}>
                    <div style={{ display:"flex", alignItems:"center", gap:"8px", marginBottom:"12px" }}>
                      <svg width="16" height="16" fill="none" stroke="#4F46E5" strokeWidth="2" viewBox="0 0 24 24"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
                      <span style={{ fontSize:"12px", fontWeight:700, color:"#4F46E5", letterSpacing:"0.06em" }}>EXPERT TIP</span>
                    </div>
                    <p style={{ fontSize:"13px", color:"#374151", lineHeight:"1.6", margin:"0 0 16px" }}>
                      Freelancers with at least 3 high-quality portfolio pieces are 40% more likely to be hired for their first contract.
                    </p>
                    <div style={{ borderTop:"1px solid #F3F4F6", paddingTop:"16px" }}>
                      <p style={{ fontSize:"11px", fontWeight:700, color:"#9CA3AF", letterSpacing:"0.06em", margin:"0 0 10px" }}>REQUIREMENTS</p>
                      {["High resolution images", "Detailed project description"].map(r => (
                        <div key={r} style={{ display:"flex", alignItems:"center", gap:"8px", marginBottom:"8px" }}>
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="8" fill="#10B981"/><path d="M5 8l2 2 4-4" stroke="#fff" strokeWidth="1.5" strokeLinecap="round"/></svg>
                          <span style={{ fontSize:"13px", color:"#374151" }}>{r}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right grid */}
                <div style={{ flex:1 }}>
                  <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"16px" }}>
                    {/* Add new project */}
                    <div onClick={addProject} style={{
                      border:"2px dashed #C7D2FE", borderRadius:"14px", padding:"32px 20px",
                      background:"#F5F7FF", display:"flex", flexDirection:"column",
                      alignItems:"center", justifyContent:"center", gap:"12px", cursor:"pointer",
                      transition:"all 0.2s",
                    }}
                    onMouseEnter={e => e.currentTarget.style.background="#EEF2FF"}
                    onMouseLeave={e => e.currentTarget.style.background="#F5F7FF"}>
                      <div style={{ width:"52px", height:"52px", borderRadius:"50%", background:"#4F46E5", display:"flex", alignItems:"center", justifyContent:"center" }}>
                        <svg width="24" height="24" fill="none" stroke="#fff" strokeWidth="2.5" viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                      </div>
                      <div style={{ textAlign:"center" }}>
                        <p style={{ fontSize:"15px", fontWeight:700, color:"#111827", margin:"0 0 4px" }}>Add New Project</p>
                        <p style={{ fontSize:"13px", color:"#6B7280", margin:"0 0 12px" }}>Showcase your best work to potential clients.</p>
                        <button style={{ background:"#4F46E5", color:"#fff", border:"none", borderRadius:"8px", padding:"8px 20px", fontSize:"13px", fontWeight:600, cursor:"pointer" }}>
                          Start Uploading
                        </button>
                      </div>
                    </div>

                    {/* Existing projects */}
                    {form.portfolio.map((p, i) => (
                      <div key={i} style={{ background:"#fff", border:"1px solid #E5E7EB", borderRadius:"14px", overflow:"hidden" }}>
                        {/* Thumbnail */}
                        <div style={{ height:"140px", background: i % 2 === 0 ? "#F8F5F0" : "#FAF0EC", position:"relative", display:"flex", alignItems:"center", justifyContent:"center" }}>
                          <svg width="40" height="40" fill="none" stroke="#C7D2FE" strokeWidth="1.5" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="3"/><path d="M3 9h18M9 21V9"/></svg>
                          {/* Edit/Delete */}
                          <div style={{ position:"absolute", top:"10px", right:"10px", display:"flex", gap:"6px" }}>
                            {[
                              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>,
                              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6M14 11v6"/></svg>
                            ].map((icon, j) => (
                              <div key={j} onClick={() => j === 1 && removeProject(i)} style={{ width:"28px", height:"28px", borderRadius:"6px", background:"rgba(255,255,255,0.9)", display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", color:"#374151" }}>
                                {icon}
                              </div>
                            ))}
                          </div>
                        </div>
                        {/* Info */}
                        <div style={{ padding:"14px" }}>
                          <input value={p.title} onChange={e => updateProject(i, "title", e.target.value)} placeholder="Project title"
                            style={{ width:"100%", border:"none", outline:"none", fontSize:"14px", fontWeight:700, color:"#111827", marginBottom:"6px", background:"transparent", boxSizing:"border-box" }} />
                          <input value={p.description} onChange={e => updateProject(i, "description", e.target.value)} placeholder="Brief description..."
                            style={{ width:"100%", border:"none", outline:"none", fontSize:"12px", color:"#6B7280", lineHeight:"1.4", background:"transparent", boxSizing:"border-box", marginBottom:"10px" }} />
                          <div style={{ display:"flex", gap:"6px", flexWrap:"wrap" }}>
                            {p.tech.map(t => (
                              <span key={t} style={{ background:"#F3F4F6", color:"#374151", padding:"3px 10px", borderRadius:"6px", fontSize:"11px", fontWeight:500 }}>{t}</span>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div style={{ display:"flex", justifyContent:"space-between", marginTop:"32px", paddingTop:"24px", borderTop:"1px solid #E5E7EB" }}>
                <button onClick={() => setStep(2)} style={{ display:"flex", alignItems:"center", gap:"8px", background:"#fff", border:"1.5px solid #E5E7EB", borderRadius:"8px", padding:"10px 20px", fontSize:"14px", fontWeight:600, color:"#374151", cursor:"pointer" }}>
                  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M19 12H5"/><path d="M12 19l-7-7 7-7"/></svg>Back
                </button>
                <button onClick={() => setStep(4)} style={{ display:"flex", alignItems:"center", gap:"8px", background:"#4F46E5", color:"#fff", border:"none", borderRadius:"8px", padding:"10px 24px", fontSize:"14px", fontWeight:600, cursor:"pointer" }}>
                  Save & Continue <svg width="16" height="16" fill="none" stroke="#fff" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg>
                </button>
              </div>
            </>
          )}

          {/* ═══════════════ STEP 4 ═══════════════ */}
          {step === 4 && (
            <>
              <p style={{ fontSize:"12px", fontWeight:700, color:"#4F46E5", letterSpacing:"0.06em", margin:"0 0 4px" }}>STEP 4 OF 4</p>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"8px" }}>
                <h2 style={{ fontSize:"26px", fontWeight:800, color:"#111827", margin:0 }}>Final Review</h2>
                <div style={{ display:"flex", alignItems:"center", gap:"8px" }}>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="10" fill="#10B981"/><path d="M6 10l3 3 5-5" stroke="#fff" strokeWidth="1.5" strokeLinecap="round"/></svg>
                  <span style={{ fontSize:"13px", fontWeight:600, color:"#10B981" }}>Everything looks great!</span>
                </div>
              </div>
              <div style={{ height:"4px", background:"linear-gradient(90deg,#4F46E5,#7C3AED)", borderRadius:"2px", marginBottom:"28px" }}/>

              {error && <div style={{ background:"#FEF2F2", border:"1px solid #FECACA", borderRadius:"8px", padding:"12px 16px", fontSize:"13px", color:"#DC2626", marginBottom:"20px" }}>{error}</div>}

              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"16px", marginBottom:"16px" }}>
                {/* Professional Bio */}
                <div style={{ background:"#fff", border:"1px solid #E5E7EB", borderRadius:"14px", padding:"24px" }}>
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"16px" }}>
                    <div style={{ display:"flex", alignItems:"center", gap:"8px" }}>
                      <svg width="18" height="18" fill="none" stroke="#374151" strokeWidth="2" viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                      <span style={{ fontSize:"15px", fontWeight:700, color:"#111827" }}>Professional Bio</span>
                    </div>
                    <button onClick={() => setStep(1)} style={{ fontSize:"13px", color:"#4F46E5", background:"none", border:"none", cursor:"pointer", fontWeight:600 }}>Edit</button>
                  </div>
                  <div style={{ display:"flex", gap:"14px" }}>
                    <div style={{ width:"56px", height:"56px", borderRadius:"10px", background:"linear-gradient(135deg,#C7D2FE,#A5B4FC)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"20px", fontWeight:800, color:"#4F46E5", flexShrink:0 }}>
                      {form.title ? form.title.charAt(0) : "A"}
                    </div>
                    <div>
                      <p style={{ fontSize:"15px", fontWeight:700, color:"#111827", margin:"0 0 2px" }}>{form.title || "Your Name"}</p>
                      <p style={{ fontSize:"13px", color:"#4F46E5", fontWeight:600, margin:"0 0 8px" }}>{form.category}</p>
                      <p style={{ fontSize:"13px", color:"#374151", lineHeight:"1.5", margin:0 }}>
                        {form.bio || form.bioSnapshot || "Your professional bio will appear here."}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Target Rate */}
                <div style={{ background:"linear-gradient(135deg,#4F46E5,#4338CA)", borderRadius:"14px", padding:"24px", color:"#fff" }}>
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
                    <svg width="20" height="20" fill="none" stroke="#fff" strokeWidth="2" viewBox="0 0 24 24"><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg>
                    <button onClick={() => setStep(2)} style={{ fontSize:"13px", color:"rgba(255,255,255,0.8)", background:"none", border:"none", cursor:"pointer", fontWeight:600 }}>Edit</button>
                  </div>
                  <p style={{ fontSize:"11px", fontWeight:600, letterSpacing:"0.08em", opacity:0.8, margin:"16px 0 4px" }}>TARGET HOURLY RATE</p>
                  <p style={{ fontSize:"36px", fontWeight:800, margin:"0 0 16px" }}>${form.hourlyRate}.00</p>
                  <div style={{ display:"flex", alignItems:"center", gap:"8px", opacity:0.9 }}>
                    <svg width="14" height="14" fill="none" stroke="#fff" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                    <span style={{ fontSize:"13px" }}>Available: {form.availability.replace(/\(.*\)/, "").trim()}</span>
                  </div>
                </div>
              </div>

              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"16px", marginBottom:"20px" }}>
                {/* Skills */}
                <div style={{ background:"#fff", border:"1px solid #E5E7EB", borderRadius:"14px", padding:"24px" }}>
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"16px" }}>
                    <div style={{ display:"flex", alignItems:"center", gap:"8px" }}>
                      <svg width="18" height="18" fill="none" stroke="#374151" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83"/></svg>
                      <span style={{ fontSize:"15px", fontWeight:700, color:"#111827" }}>Skills</span>
                    </div>
                    <button onClick={() => setStep(2)} style={{ fontSize:"13px", color:"#4F46E5", background:"none", border:"none", cursor:"pointer", fontWeight:600 }}>Edit</button>
                  </div>
                  <div style={{ display:"flex", flexWrap:"wrap", gap:"8px" }}>
                    {form.skills.map(s => (
                      <span key={s} style={{ background:"#F3F4F6", color:"#374151", padding:"5px 12px", borderRadius:"8px", fontSize:"13px", fontWeight:500 }}>{s}</span>
                    ))}
                  </div>
                </div>

                {/* Portfolio */}
                <div style={{ background:"#fff", border:"1px solid #E5E7EB", borderRadius:"14px", padding:"24px" }}>
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"16px" }}>
                    <div style={{ display:"flex", alignItems:"center", gap:"8px" }}>
                      <svg width="18" height="18" fill="none" stroke="#374151" strokeWidth="2" viewBox="0 0 24 24"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/></svg>
                      <span style={{ fontSize:"15px", fontWeight:700, color:"#111827" }}>Portfolio Showcase</span>
                    </div>
                    <button onClick={() => setStep(3)} style={{ fontSize:"13px", color:"#4F46E5", background:"none", border:"none", cursor:"pointer", fontWeight:600 }}>Edit</button>
                  </div>
                  <div style={{ display:"flex", gap:"8px" }}>
                    {form.portfolio.slice(0, 3).map((p, i) => (
                      <div key={i} style={{ flex:1, height:"70px", borderRadius:"8px", background: i === 0 ? "#F8F5F0" : i === 1 ? "#E8F5E9" : "#E8EAF6", display:"flex", alignItems:"center", justifyContent:"center" }}>
                        <svg width="20" height="20" fill="none" stroke="#9CA3AF" strokeWidth="1.5" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="3"/><path d="M3 9h18M9 21V9"/></svg>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Terms */}
              <div style={{ background:"#fff", border:"1.5px dashed #C7D2FE", borderRadius:"14px", padding:"20px", marginBottom:"24px" }}>
                <label style={{ display:"flex", alignItems:"flex-start", gap:"12px", cursor:"pointer" }}>
                  <div onClick={() => setAgreed(!agreed)} style={{
                    width:"18px", height:"18px", borderRadius:"4px", flexShrink:0, marginTop:"1px",
                    border: agreed ? "none" : "2px solid #D1D5DB",
                    background: agreed ? "#4F46E5" : "transparent",
                    display:"flex", alignItems:"center", justifyContent:"center",
                  }}>
                    {agreed && <svg width="10" height="10" fill="none" stroke="#fff" strokeWidth="2" viewBox="0 0 10 10"><path d="M2 5l2.5 2.5L8 3"/></svg>}
                  </div>
                  <span style={{ fontSize:"13px", color:"#374151", lineHeight:"1.6" }}>
                    I confirm that all information provided is accurate and represent my professional expertise. I have read and agree to the{" "}
                    <span style={{ color:"#4F46E5", fontWeight:600, cursor:"pointer" }}>Freelancer Terms of Service</span>{" "}and the{" "}
                    <span style={{ color:"#4F46E5", fontWeight:600, cursor:"pointer" }}>Privacy Policy</span>{" "}regarding how SearFind handles my data.
                  </span>
                </label>
              </div>

              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"24px" }}>
                <button onClick={() => setStep(3)} style={{ display:"flex", alignItems:"center", gap:"8px", background:"#fff", border:"1.5px solid #E5E7EB", borderRadius:"8px", padding:"12px 20px", fontSize:"14px", fontWeight:600, color:"#374151", cursor:"pointer" }}>
                  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M19 12H5"/><path d="M12 19l-7-7 7-7"/></svg>Back to Portfolio
                </button>
                <button onClick={handleSubmit} disabled={loading || !agreed} style={{
                  display:"flex", alignItems:"center", gap:"10px",
                  background: (!agreed || loading) ? "#A5B4FC" : "#4F46E5",
                  color:"#fff", border:"none", borderRadius:"10px",
                  padding:"14px 32px", fontSize:"15px", fontWeight:700,
                  cursor: (!agreed || loading) ? "not-allowed" : "pointer",
                }}>
                  {loading ? "Submitting..." : "Submit Application"}
                  {!loading && <svg width="18" height="18" fill="none" stroke="#fff" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M22 2L11 13"/><path d="M22 2L15 22l-4-9-9-4z"/></svg>}
                </button>
              </div>

              {/* Trust badges */}
              <div style={{ textAlign:"center" }}>
                <div style={{ display:"flex", justifyContent:"center", gap:"24px", marginBottom:"8px" }}>
                  {[
                    [<svg width="14" height="14" fill="none" stroke="#9CA3AF" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>, "Secure SSL"],
                    [<svg width="14" height="14" fill="none" stroke="#9CA3AF" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>, "GDPR Compliant"],
                    [<svg width="14" height="14" fill="none" stroke="#9CA3AF" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>, "24/7 Support"],
                  ].map(([icon, label], i) => (
                    <div key={i} style={{ display:"flex", alignItems:"center", gap:"6px" }}>
                      <span style={{ color:"#9CA3AF" }}>{icon}</span>
                      <span style={{ fontSize:"12px", color:"#9CA3AF" }}>{label}</span>
                    </div>
                  ))}
                </div>
                <p style={{ fontSize:"12px", color:"#9CA3AF", margin:0 }}>Applications are typically reviewed within 2–3 business days.</p>
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
}