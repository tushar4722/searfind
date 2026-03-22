import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SIDEBAR_ITEMS = [
  { id: "profile", label: "Profile", icon: (c) => <svg width="16" height="16" fill="none" stroke={c} strokeWidth="2" viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg> },
  { id: "account", label: "Account", icon: (c) => <svg width="16" height="16" fill="none" stroke={c} strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg> },
  { id: "notifications", label: "Notifications", icon: (c) => <svg width="16" height="16" fill="none" stroke={c} strokeWidth="2" viewBox="0 0 24 24"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg> },
  { id: "security", label: "Security", icon: (c) => <svg width="16" height="16" fill="none" stroke={c} strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg> },
  { id: "billing", label: "Billing", icon: (c) => <svg width="16" height="16" fill="none" stroke={c} strokeWidth="2" viewBox="0 0 24 24"><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg> },
];

export default function EditProfile() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("profile");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [skillInput, setSkillInput] = useState("");

  const [form, setForm] = useState({
    name: "Alex Richardson",
    phone: "+1 (555) 000-0000",
    title: "Senior Product Designer",
    location: "San Francisco, CA",
    bio: "I am a multidisciplinary designer with over 8 years of experience building scalable design systems and user-centric digital products. Passionate about solving complex problems through elegant UI solutions.",
    linkedin: "linkedin.com/in/username",
    github: "github.com/username",
    portfolio: "yourportfolio.com",
    skills: ["UI Design", "Design Systems", "Figma", "React", "Tailwind CSS"],
    experience: [
      { company: "TechNova Solutions", position: "Senior Product Designer", startDate: "Jan 2021", endDate: "Present", description: "Leading the design of the core SaaS platform and mobile applications." },
    ],
    education: [
      { institution: "Stanford University", degree: "Master of Science", startDate: "2016", endDate: "2018" },
    ],
  });

  const fc = (k, v) => setForm(p => ({ ...p, [k]: v }));

  const addSkill = () => {
    const s = skillInput.trim();
    if (s && !form.skills.includes(s)) fc("skills", [...form.skills, s]);
    setSkillInput("");
  };

  const removeSkill = (s) => fc("skills", form.skills.filter(x => x !== s));

  const addExperience = () => fc("experience", [...form.experience, { company: "", position: "", startDate: "", endDate: "", description: "" }]);
  const updateExp = (i, k, v) => { const u = [...form.experience]; u[i][k] = v; fc("experience", u); };
  const removeExp = (i) => fc("experience", form.experience.filter((_, idx) => idx !== i));

  const addEducation = () => fc("education", [...form.education, { institution: "", degree: "", startDate: "", endDate: "" }]);
  const updateEdu = (i, k, v) => { const u = [...form.education]; u[i][k] = v; fc("education", u); };
  const removeEdu = (i) => fc("education", form.education.filter((_, idx) => idx !== i));

  const handleSave = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("searfind_token");
      await axios.put("http://localhost:5000/api/users/profile", form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    width: "100%", padding: "10px 14px",
    border: "1.5px solid #E5E7EB", borderRadius: "8px",
    fontSize: "13px", color: "#374151", outline: "none",
    boxSizing: "border-box", background: "#fff",
  };

  const labelStyle = {
    fontSize: "11px", fontWeight: 700, color: "#9CA3AF",
    letterSpacing: "0.06em", display: "block", marginBottom: "6px",
  };

  const sectionStyle = {
    background: "#fff", borderRadius: "14px",
    border: "1px solid #E5E7EB", padding: "24px",
    marginBottom: "16px",
  };

  return (
    <div style={{ fontFamily: "'Inter',sans-serif", background: "#F3F4F6", minHeight: "100vh" }}>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet"/>

      {/* Navbar */}
      <nav style={{ background: "#fff", borderBottom: "1px solid #E5E7EB", padding: "0 32px", height: "56px", display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 100 }}>
        <div style={{ display: "flex", alignItems: "center", gap: "28px" }}>
          <span style={{ fontWeight: 800, fontSize: "18px", color: "#4F46E5" }}>ProConnect</span>
          {["Dashboard", "Jobs", "Messages"].map(item => (
            <span key={item} style={{ fontSize: "14px", color: "#6B7280", cursor: "pointer" }}>{item}</span>
          ))}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", background: "#F9FAFB", border: "1px solid #E5E7EB", borderRadius: "8px", padding: "8px 14px", width: "200px" }}>
            <svg width="14" height="14" fill="none" stroke="#9CA3AF" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
            <input placeholder="Search..." style={{ border: "none", background: "transparent", fontSize: "13px", outline: "none", width: "100%" }}/>
          </div>
          {[
            <svg width="18" height="18" fill="none" stroke="#6B7280" strokeWidth="2" viewBox="0 0 24 24"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/></svg>,
            <svg width="18" height="18" fill="none" stroke="#6B7280" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>,
          ].map((icon, i) => (
            <div key={i} style={{ width: "36px", height: "36px", borderRadius: "50%", border: "1px solid #E5E7EB", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>{icon}</div>
          ))}
          <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: "linear-gradient(135deg,#F97316,#EF4444)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: "13px", fontWeight: 700 }}>A</div>
        </div>
      </nav>

      <div style={{ display: "flex", minHeight: "calc(100vh - 56px)" }}>

        {/* Sidebar */}
        <aside style={{ width: "200px", background: "#fff", borderRight: "1px solid #E5E7EB", padding: "24px 16px", flexShrink: 0 }}>
          <p style={{ fontSize: "14px", fontWeight: 700, color: "#111827", margin: "0 0 2px" }}>Settings</p>
          <p style={{ fontSize: "12px", color: "#9CA3AF", margin: "0 0 20px" }}>Manage your preferences</p>
          {SIDEBAR_ITEMS.map(item => (
            <div key={item.id} onClick={() => setActiveTab(item.id)} style={{
              display: "flex", alignItems: "center", gap: "10px",
              padding: "10px 12px", borderRadius: "8px", marginBottom: "4px",
              background: activeTab === item.id ? "#EEF2FF" : "transparent",
              cursor: "pointer",
            }}>
              {item.icon(activeTab === item.id ? "#4F46E5" : "#9CA3AF")}
              <span style={{ fontSize: "13px", fontWeight: activeTab === item.id ? 600 : 400, color: activeTab === item.id ? "#4F46E5" : "#6B7280" }}>{item.label}</span>
            </div>
          ))}
        </aside>

        {/* Main */}
        <main style={{ flex: 1, padding: "28px 32px", overflowY: "auto" }}>

          {/* Header */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "24px" }}>
            <div>
              <h1 style={{ fontSize: "24px", fontWeight: 800, color: "#111827", margin: "0 0 4px" }}>Edit Profile</h1>
              <p style={{ fontSize: "14px", color: "#6B7280", margin: 0 }}>Update your professional identity and public information.</p>
            </div>
            <div style={{ display: "flex", gap: "10px" }}>
              <button onClick={() => navigate(-1)} style={{ background: "#fff", color: "#374151", border: "1.5px solid #E5E7EB", borderRadius: "8px", padding: "10px 20px", fontSize: "14px", fontWeight: 600, cursor: "pointer" }}>
                Cancel
              </button>
              <button onClick={handleSave} disabled={loading} style={{ background: loading ? "#A5B4FC" : "#4F46E5", color: "#fff", border: "none", borderRadius: "8px", padding: "10px 24px", fontSize: "14px", fontWeight: 600, cursor: loading ? "not-allowed" : "pointer" }}>
                {loading ? "Saving..." : success ? "✅ Saved!" : "Save Changes"}
              </button>
            </div>
          </div>

          <div style={{ display: "flex", gap: "20px" }}>

            {/* Left Column */}
            <div style={{ width: "220px", flexShrink: 0 }}>

              {/* Media */}
              <div style={{ ...sectionStyle, marginBottom: "16px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px" }}>
                  <svg width="16" height="16" fill="none" stroke="#4F46E5" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
                  <h3 style={{ fontSize: "14px", fontWeight: 700, color: "#111827", margin: 0 }}>Media</h3>
                </div>

                {/* Avatar */}
                <div style={{ textAlign: "center", marginBottom: "16px" }}>
                  <div style={{ position: "relative", display: "inline-block" }}>
                    <div style={{ width: "90px", height: "90px", borderRadius: "50%", background: "linear-gradient(135deg,#FDE8D8,#FBBF9A)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto", border: "3px solid #fff", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
                      <svg width="32" height="32" fill="none" stroke="#C4834A" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                    </div>
                    <div style={{ position: "absolute", bottom: 0, right: 0, width: "26px", height: "26px", borderRadius: "50%", background: "#4F46E5", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", border: "2px solid #fff" }}>
                      <svg width="12" height="12" fill="none" stroke="#fff" strokeWidth="2" viewBox="0 0 24 24"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>
                    </div>
                  </div>
                  <p style={{ fontSize: "11px", color: "#9CA3AF", margin: "8px 0 0" }}>JPG or PNG, max 5MB</p>
                </div>

                {/* Resume Upload */}
                <div style={{ border: "2px dashed #E5E7EB", borderRadius: "10px", padding: "16px", textAlign: "center", cursor: "pointer", background: "#FAFAFA" }}
                  onMouseEnter={e => e.currentTarget.style.borderColor="#A5B4FC"}
                  onMouseLeave={e => e.currentTarget.style.borderColor="#E5E7EB"}>
                  <svg width="24" height="24" fill="none" stroke="#9CA3AF" strokeWidth="1.5" viewBox="0 0 24 24" style={{ margin: "0 auto 8px", display: "block" }}>
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="12" y1="18" x2="12" y2="12"/><line x1="9" y1="15" x2="15" y2="15"/>
                  </svg>
                  <p style={{ fontSize: "13px", fontWeight: 600, color: "#374151", margin: "0 0 2px" }}>Upload Resume</p>
                  <p style={{ fontSize: "11px", color: "#9CA3AF", margin: 0 }}>PDF format preferred</p>
                </div>
              </div>

              {/* Social Links */}
              <div style={sectionStyle}>
                <h3 style={{ fontSize: "14px", fontWeight: 700, color: "#111827", margin: "0 0 16px" }}>Social Links</h3>
                {[
                  { label: "LINKEDIN", key: "linkedin", icon: <svg width="14" height="14" fill="#0A66C2" viewBox="0 0 24 24"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg> },
                  { label: "GITHUB", key: "github", icon: <svg width="14" height="14" fill="#111827" viewBox="0 0 24 24"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg> },
                  { label: "PORTFOLIO", key: "portfolio", icon: <svg width="14" height="14" fill="none" stroke="#4F46E5" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg> },
                ].map(({ label, key, icon }) => (
                  <div key={key} style={{ marginBottom: "12px" }}>
                    <label style={labelStyle}>{label}</label>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", background: "#F9FAFB", border: "1.5px solid #E5E7EB", borderRadius: "8px", padding: "8px 12px" }}>
                      {icon}
                      <input value={form[key]} onChange={e => fc(key, e.target.value)}
                        style={{ border: "none", background: "transparent", fontSize: "12px", color: "#374151", outline: "none", width: "100%" }}
                        onFocus={e => e.target.parentElement.style.borderColor="#4F46E5"}
                        onBlur={e => e.target.parentElement.style.borderColor="#E5E7EB"} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column */}
            <div style={{ flex: 1 }}>

              {/* Basic Information */}
              <div style={sectionStyle}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "20px" }}>
                  <svg width="18" height="18" fill="none" stroke="#4F46E5" strokeWidth="2" viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                  <h2 style={{ fontSize: "16px", fontWeight: 700, color: "#111827", margin: 0 }}>Basic Information</h2>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>
                  <div>
                    <label style={labelStyle}>Full Name</label>
                    <input value={form.name} onChange={e => fc("name", e.target.value)} style={inputStyle}
                      onFocus={e => e.target.style.borderColor="#4F46E5"} onBlur={e => e.target.style.borderColor="#E5E7EB"} />
                  </div>
                  <div>
                    <label style={labelStyle}>Phone Number</label>
                    <input value={form.phone} onChange={e => fc("phone", e.target.value)} style={inputStyle}
                      onFocus={e => e.target.style.borderColor="#4F46E5"} onBlur={e => e.target.style.borderColor="#E5E7EB"} />
                  </div>
                  <div>
                    <label style={labelStyle}>Professional Title</label>
                    <input value={form.title} onChange={e => fc("title", e.target.value)} style={inputStyle}
                      onFocus={e => e.target.style.borderColor="#4F46E5"} onBlur={e => e.target.style.borderColor="#E5E7EB"} />
                  </div>
                  <div>
                    <label style={labelStyle}>Location</label>
                    <div style={{ position: "relative" }}>
                      <svg width="14" height="14" fill="none" stroke="#9CA3AF" strokeWidth="2" viewBox="0 0 24 24" style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)" }}>
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                      </svg>
                      <input value={form.location} onChange={e => fc("location", e.target.value)}
                        style={{ ...inputStyle, paddingLeft: "32px" }}
                        onFocus={e => e.target.style.borderColor="#4F46E5"} onBlur={e => e.target.style.borderColor="#E5E7EB"} />
                    </div>
                  </div>
                </div>

                <div>
                  <label style={labelStyle}>Professional Bio</label>
                  <textarea value={form.bio} onChange={e => fc("bio", e.target.value)} rows={4}
                    style={{ ...inputStyle, resize: "vertical", lineHeight: "1.6" }}
                    onFocus={e => e.target.style.borderColor="#4F46E5"} onBlur={e => e.target.style.borderColor="#E5E7EB"} />
                </div>
              </div>

              {/* Core Skills */}
              <div style={sectionStyle}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px" }}>
                  <svg width="18" height="18" fill="none" stroke="#4F46E5" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83"/></svg>
                  <h2 style={{ fontSize: "16px", fontWeight: 700, color: "#111827", margin: 0 }}>Core Skills</h2>
                </div>
                <div style={{ border: "1.5px dashed #C7D2FE", borderRadius: "10px", padding: "12px 14px", minHeight: "56px" }}>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", alignItems: "center" }}>
                    {form.skills.map(skill => (
                      <span key={skill} style={{ background: "#4F46E5", color: "#fff", padding: "5px 12px", borderRadius: "20px", fontSize: "13px", fontWeight: 500, display: "flex", alignItems: "center", gap: "6px" }}>
                        {skill}
                        <span onClick={() => removeSkill(skill)} style={{ cursor: "pointer", fontSize: "14px", lineHeight: 1, opacity: 0.8 }}>×</span>
                      </span>
                    ))}
                    <input
                      value={skillInput}
                      onChange={e => setSkillInput(e.target.value)}
                      onKeyDown={e => e.key === "Enter" && (e.preventDefault(), addSkill())}
                      placeholder="Add a skill..."
                      style={{ border: "none", outline: "none", fontSize: "13px", color: "#374151", background: "transparent", minWidth: "100px" }}
                    />
                  </div>
                </div>
              </div>

              {/* Experience */}
              <div style={sectionStyle}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <svg width="18" height="18" fill="none" stroke="#4F46E5" strokeWidth="2" viewBox="0 0 24 24"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/></svg>
                    <h2 style={{ fontSize: "16px", fontWeight: 700, color: "#111827", margin: 0 }}>Experience</h2>
                  </div>
                  <button onClick={addExperience} style={{ display: "flex", alignItems: "center", gap: "4px", background: "none", border: "none", color: "#4F46E5", fontSize: "13px", fontWeight: 600, cursor: "pointer" }}>
                    <svg width="14" height="14" fill="none" stroke="#4F46E5" strokeWidth="2.5" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>
                    Add Experience
                  </button>
                </div>

                {form.experience.map((exp, i) => (
                  <div key={i} style={{ borderLeft: "3px solid #4F46E5", paddingLeft: "16px", marginBottom: "20px", position: "relative" }}>
                    <div style={{ position: "absolute", left: "-8px", top: "0", width: "12px", height: "12px", borderRadius: "50%", background: "#4F46E5" }}/>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "12px" }}>
                      <div>
                        <label style={labelStyle}>COMPANY</label>
                        <input value={exp.company} onChange={e => updateExp(i, "company", e.target.value)} style={inputStyle}
                          onFocus={e => e.target.style.borderColor="#4F46E5"} onBlur={e => e.target.style.borderColor="#E5E7EB"} />
                      </div>
                      <div>
                        <label style={labelStyle}>POSITION</label>
                        <input value={exp.position} onChange={e => updateExp(i, "position", e.target.value)} style={inputStyle}
                          onFocus={e => e.target.style.borderColor="#4F46E5"} onBlur={e => e.target.style.borderColor="#E5E7EB"} />
                      </div>
                    </div>
                    <div style={{ marginBottom: "12px" }}>
                      <label style={labelStyle}>DATES</label>
                      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <input value={exp.startDate} onChange={e => updateExp(i, "startDate", e.target.value)} placeholder="Jan 2021"
                          style={{ ...inputStyle, width: "120px" }}
                          onFocus={e => e.target.style.borderColor="#4F46E5"} onBlur={e => e.target.style.borderColor="#E5E7EB"} />
                        <span style={{ color: "#9CA3AF" }}>-</span>
                        <input value={exp.endDate} onChange={e => updateExp(i, "endDate", e.target.value)} placeholder="Present"
                          style={{ ...inputStyle, width: "120px" }}
                          onFocus={e => e.target.style.borderColor="#4F46E5"} onBlur={e => e.target.style.borderColor="#E5E7EB"} />
                      </div>
                    </div>
                    <div>
                      <label style={labelStyle}>DESCRIPTION</label>
                      <textarea value={exp.description} onChange={e => updateExp(i, "description", e.target.value)} rows={2}
                        style={{ ...inputStyle, resize: "none" }}
                        onFocus={e => e.target.style.borderColor="#4F46E5"} onBlur={e => e.target.style.borderColor="#E5E7EB"} />
                    </div>
                    {form.experience.length > 1 && (
                      <button onClick={() => removeExp(i)} style={{ position: "absolute", top: 0, right: 0, background: "none", border: "none", cursor: "pointer", color: "#EF4444" }}>
                        <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/></svg>
                      </button>
                    )}
                  </div>
                ))}
              </div>

              {/* Education */}
              <div style={sectionStyle}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <svg width="18" height="18" fill="none" stroke="#4F46E5" strokeWidth="2" viewBox="0 0 24 24"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
                    <h2 style={{ fontSize: "16px", fontWeight: 700, color: "#111827", margin: 0 }}>Education</h2>
                  </div>
                  <button onClick={addEducation} style={{ display: "flex", alignItems: "center", gap: "4px", background: "none", border: "none", color: "#4F46E5", fontSize: "13px", fontWeight: 600, cursor: "pointer" }}>
                    <svg width="14" height="14" fill="none" stroke="#4F46E5" strokeWidth="2.5" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>
                    Add Education
                  </button>
                </div>

                {form.education.map((edu, i) => (
                  <div key={i} style={{ background: "#F9FAFB", borderRadius: "10px", padding: "16px", marginBottom: "12px", position: "relative" }}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "12px" }}>
                      <div>
                        <label style={labelStyle}>INSTITUTION</label>
                        <input value={edu.institution} onChange={e => updateEdu(i, "institution", e.target.value)}
                          style={{ ...inputStyle, fontWeight: 700 }}
                          onFocus={e => e.target.style.borderColor="#4F46E5"} onBlur={e => e.target.style.borderColor="#E5E7EB"} />
                      </div>
                      <div>
                        <label style={labelStyle}>DEGREE</label>
                        <input value={edu.degree} onChange={e => updateEdu(i, "degree", e.target.value)} style={inputStyle}
                          onFocus={e => e.target.style.borderColor="#4F46E5"} onBlur={e => e.target.style.borderColor="#E5E7EB"} />
                      </div>
                      <div>
                        <label style={labelStyle}>DATES</label>
                        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                          <input value={edu.startDate} onChange={e => updateEdu(i, "startDate", e.target.value)} placeholder="2016"
                            style={{ ...inputStyle, width: "70px", padding: "10px 8px", textAlign: "center" }}
                            onFocus={e => e.target.style.borderColor="#4F46E5"} onBlur={e => e.target.style.borderColor="#E5E7EB"} />
                          <span style={{ color: "#9CA3AF" }}>-</span>
                          <input value={edu.endDate} onChange={e => updateEdu(i, "endDate", e.target.value)} placeholder="2018"
                            style={{ ...inputStyle, width: "70px", padding: "10px 8px", textAlign: "center" }}
                            onFocus={e => e.target.style.borderColor="#4F46E5"} onBlur={e => e.target.style.borderColor="#E5E7EB"} />
                        </div>
                      </div>
                    </div>
                    <button onClick={() => removeEdu(i)} style={{ position: "absolute", top: "12px", right: "12px", background: "none", border: "none", cursor: "pointer", color: "#EF4444" }}>
                      <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6M14 11v6"/></svg>
                    </button>
                  </div>
                ))}
              </div>

              {/* Save button bottom */}
              <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px" }}>
                <button onClick={() => navigate(-1)} style={{ background: "#fff", color: "#374151", border: "1.5px solid #E5E7EB", borderRadius: "8px", padding: "12px 24px", fontSize: "14px", fontWeight: 600, cursor: "pointer" }}>
                  Cancel
                </button>
                <button onClick={handleSave} disabled={loading} style={{ background: loading ? "#A5B4FC" : "#4F46E5", color: "#fff", border: "none", borderRadius: "8px", padding: "12px 28px", fontSize: "14px", fontWeight: 600, cursor: loading ? "not-allowed" : "pointer" }}>
                  {loading ? "Saving..." : success ? "✅ Saved!" : "Save Changes"}
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}