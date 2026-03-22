import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const user = {
  name: "Alex Rivera",
  title: "Senior Product Designer",
  location: "San Francisco, CA",
  trustLevel: "High Trust",
  avatar: null,
  bio: "Forward-thinking Product Designer with over 8 years of experience building digital products from the ground up. I specialize in bridging the gap between user needs and business objectives through meticulous research, rapid prototyping, and polished visual design. Passionate about creating inclusive and accessible web ecosystems that empower users.",
  skills: ["UI Design", "Figma", "React", "Prototyping", "Tailwind CSS", "User Research", "Interaction Design"],
  experience: [
    {
      abbr: "SF", color: "#EEF2FF", textColor: "#4F46E5",
      title: "Senior Product Designer", company: "SearFind", type: "Full-time",
      period: "2021 — PRESENT",
      bullets: [
        "Led the redesign of the core search experience, resulting in a 24% increase in user engagement.",
        "Established a centralized design system that reduced front-end development time by 30%.",
      ],
    },
    {
      abbr: "PX", color: "#F3F4F6", textColor: "#374151",
      title: "UX Designer", company: "PixelPerfect", type: "Contract",
      period: "2018 — 2021",
      bullets: [
        "Developed high-fidelity prototypes for over 15 clients in the SaaS sector.",
        "Conducted user testing sessions and translated feedback into actionable design iterations.",
      ],
    },
  ],
  education: [
    { abbr: "🎓", color: "#FFF7ED", title: "BFA in Graphic Design", school: "Rhode Island School of Design (RISD)", year: "Class of 2017" },
  ],
  links: [
    { label: "LinkedIn", color: "#0A66C2", icon: "in" },
    { label: "GitHub", color: "#111827", icon: "gh" },
    { label: "Portfolio", color: "#4F46E5", icon: "pf" },
  ],
  profileViews: 1284,
  profileStrength: 92,
};

const SIDEBAR_ITEMS = [
  { id: "overview", label: "Overview", icon: (c) => <svg width="16" height="16" fill="none" stroke={c} strokeWidth="2" viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg> },
  { id: "background", label: "Background", icon: (c) => <svg width="16" height="16" fill="none" stroke={c} strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg> },
  { id: "experience", label: "Experience", icon: (c) => <svg width="16" height="16" fill="none" stroke={c} strokeWidth="2" viewBox="0 0 24 24"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/></svg> },
  { id: "skills", label: "Skills", icon: (c) => <svg width="16" height="16" fill="none" stroke={c} strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/></svg> },
];

export default function UserProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("overview");

  return (
    <div style={{ fontFamily: "'Inter',sans-serif", background: "#F3F4F6", minHeight: "100vh" }}>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet"/>

      {/* Navbar */}
      <nav style={{ background:"#fff", borderBottom:"1px solid #E5E7EB", padding:"0 32px", height:"56px", display:"flex", alignItems:"center", justifyContent:"space-between", position:"sticky", top:0, zIndex:100 }}>
        <div style={{ display:"flex", alignItems:"center", gap:"28px" }}>
          <span style={{ fontWeight:800, fontSize:"18px", color:"#111827" }}>SearFind</span>
          {["Profile","Jobs","Network"].map((item,i) => (
            <span key={item} style={{ fontSize:"14px", fontWeight: i===0 ? 600 : 400, color: i===0 ? "#4F46E5" : "#6B7280", cursor:"pointer", borderBottom: i===0 ? "2px solid #4F46E5" : "none", paddingBottom:"2px" }}>{item}</span>
          ))}
        </div>
        <div style={{ display:"flex", alignItems:"center", gap:"12px" }}>
          <div style={{ display:"flex", alignItems:"center", gap:"8px", background:"#F9FAFB", border:"1px solid #E5E7EB", borderRadius:"8px", padding:"8px 14px", width:"220px" }}>
            <svg width="14" height="14" fill="none" stroke="#9CA3AF" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
            <input placeholder="Search profiles..." style={{ border:"none", background:"transparent", fontSize:"13px", color:"#374151", outline:"none", width:"100%" }}/>
          </div>
          {[
            <svg width="18" height="18" fill="none" stroke="#6B7280" strokeWidth="2" viewBox="0 0 24 24"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>,
            <svg width="18" height="18" fill="none" stroke="#6B7280" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>,
          ].map((icon, i) => (
            <div key={i} style={{ width:"36px", height:"36px", borderRadius:"50%", border:"1px solid #E5E7EB", display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer" }}>{icon}</div>
          ))}
          <div style={{ width:"36px", height:"36px", borderRadius:"50%", background:"linear-gradient(135deg,#F97316,#EF4444)", display:"flex", alignItems:"center", justifyContent:"center", color:"#fff", fontSize:"13px", fontWeight:700, cursor:"pointer" }}>A</div>
        </div>
      </nav>

      <div style={{ display:"flex", minHeight:"calc(100vh - 56px)" }}>

        {/* Sidebar */}
        <aside style={{ width:"200px", background:"#fff", borderRight:"1px solid #E5E7EB", padding:"24px 16px", flexShrink:0, display:"flex", flexDirection:"column", justifyContent:"space-between" }}>
          <div>
            <p style={{ fontSize:"13px", fontWeight:700, color:"#4F46E5", margin:"0 0 2px" }}>Professional Profile</p>
            <p style={{ fontSize:"10px", fontWeight:700, color:"#9CA3AF", letterSpacing:"0.06em", margin:"0 0 20px" }}>VERIFICATION STATUS: HIGH TRUST</p>
            {SIDEBAR_ITEMS.map(item => (
              <div key={item.id} onClick={() => setActiveSection(item.id)} style={{
                display:"flex", alignItems:"center", gap:"10px",
                padding:"10px 12px", borderRadius:"8px", marginBottom:"4px",
                background: activeSection === item.id ? "#EEF2FF" : "transparent",
                cursor:"pointer",
              }}>
                {item.icon(activeSection === item.id ? "#4F46E5" : "#9CA3AF")}
                <span style={{ fontSize:"13px", fontWeight: activeSection === item.id ? 600 : 400, color: activeSection === item.id ? "#4F46E5" : "#6B7280" }}>{item.label}</span>
              </div>
            ))}
          </div>

          {/* Profile Strength */}
          <div style={{ background:"#1E293B", borderRadius:"12px", padding:"16px" }}>
            <p style={{ fontSize:"12px", fontWeight:600, color:"#fff", margin:"0 0 8px" }}>Profile Strength</p>
            <div style={{ height:"4px", background:"rgba(255,255,255,0.2)", borderRadius:"2px", marginBottom:"6px" }}>
              <div style={{ height:"100%", width:`${user.profileStrength}%`, background:"#4F46E5", borderRadius:"2px" }}/>
            </div>
            <p style={{ fontSize:"11px", color:"#94A3B8", margin:0 }}>{user.profileStrength}% complete - Looking great!</p>
          </div>
        </aside>

        {/* Main Content */}
        <main style={{ flex:1, padding:"24px", overflowY:"auto" }}>

          {/* Cover + Profile Header */}
          <div style={{ borderRadius:"16px", overflow:"hidden", marginBottom:"24px", boxShadow:"0 1px 3px rgba(0,0,0,0.08)" }}>
            {/* Cover */}
            <div style={{ height:"200px", background:"linear-gradient(135deg,#D4C5A9,#C4B99A)", position:"relative", display:"flex", alignItems:"center", justifyContent:"center" }}>
              <div style={{ opacity:0.4, fontSize:"48px", fontWeight:800, color:"#8B7355", letterSpacing:"4px", textAlign:"center" }}>
                <div>MNIMAIIAL</div>
                <div style={{ fontSize:"24px" }}>SAFE ME WORK</div>
              </div>
            </div>

            {/* Profile info bar */}
            <div style={{ background:"#fff", padding:"16px 24px 24px", position:"relative" }}>
              {/* Avatar */}
              <div style={{ position:"absolute", top:"-60px", left:"24px" }}>
                <div style={{ width:"110px", height:"110px", borderRadius:"14px", background:"linear-gradient(135deg,#D4C5A9,#A8926A)", border:"4px solid #fff", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"36px", fontWeight:800, color:"#fff", overflow:"hidden" }}>
                  {user.name.charAt(0)}
                </div>
              </div>

              <div style={{ paddingLeft:"130px", display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
                <div>
                  <div style={{ display:"flex", alignItems:"center", gap:"8px", marginBottom:"4px" }}>
                    <h1 style={{ fontSize:"22px", fontWeight:800, color:"#111827", margin:0 }}>{user.name}</h1>
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="9" cy="9" r="9" fill="#4F46E5"/><path d="M5.5 9l2.5 2.5L12.5 7" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </div>
                  <p style={{ fontSize:"14px", color:"#374151", margin:"0 0 6px" }}>{user.title}</p>
                  <div style={{ display:"flex", alignItems:"center", gap:"14px" }}>
                    <div style={{ display:"flex", alignItems:"center", gap:"4px" }}>
                      <svg width="13" height="13" fill="none" stroke="#9CA3AF" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                      <span style={{ fontSize:"13px", color:"#6B7280" }}>{user.location}</span>
                    </div>
                    <div style={{ display:"flex", alignItems:"center", gap:"4px" }}>
                      <svg width="13" height="13" fill="none" stroke="#9CA3AF" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                      <span style={{ fontSize:"13px", color:"#6B7280" }}>{user.trustLevel}</span>
                    </div>
                  </div>
                </div>
                <div style={{ display:"flex", gap:"10px", marginTop:"8px" }}>
                  <button style={{ background:"#4F46E5", color:"#fff", border:"none", borderRadius:"8px", padding:"10px 24px", fontSize:"14px", fontWeight:600, cursor:"pointer" }}>Connect</button>
                  <div style={{ width:"40px", height:"40px", border:"1.5px solid #E5E7EB", borderRadius:"8px", display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer" }}>
                    <svg width="16" height="16" fill="none" stroke="#6B7280" strokeWidth="2" viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div style={{ display:"flex", gap:"24px" }}>

            {/* Left Column */}
            <div style={{ flex:1, display:"flex", flexDirection:"column", gap:"20px" }}>

              {/* Professional Bio */}
              <div style={{ background:"#fff", borderRadius:"14px", border:"1px solid #E5E7EB", padding:"24px" }}>
                <div style={{ display:"flex", alignItems:"center", gap:"10px", marginBottom:"14px" }}>
                  <svg width="18" height="18" fill="none" stroke="#4F46E5" strokeWidth="2" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                  <h2 style={{ fontSize:"16px", fontWeight:700, color:"#111827", margin:0 }}>Professional Bio</h2>
                </div>
                <p style={{ fontSize:"14px", color:"#374151", lineHeight:"1.7", margin:0 }}>{user.bio}</p>
              </div>

              {/* Experience */}
              <div style={{ background:"#fff", borderRadius:"14px", border:"1px solid #E5E7EB", padding:"24px" }}>
                <div style={{ display:"flex", alignItems:"center", gap:"10px", marginBottom:"20px" }}>
                  <svg width="18" height="18" fill="none" stroke="#4F46E5" strokeWidth="2" viewBox="0 0 24 24"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/></svg>
                  <h2 style={{ fontSize:"16px", fontWeight:700, color:"#111827", margin:0 }}>Experience History</h2>
                </div>
                <div style={{ display:"flex", flexDirection:"column", gap:"16px" }}>
                  {user.experience.map((exp, i) => (
                    <div key={i} style={{ background:"#F9FAFB", borderRadius:"12px", padding:"20px" }}>
                      <div style={{ display:"flex", alignItems:"flex-start", gap:"14px" }}>
                        <div style={{ width:"40px", height:"40px", borderRadius:"10px", background: exp.color, display:"flex", alignItems:"center", justifyContent:"center", fontSize:"13px", fontWeight:700, color: exp.textColor, flexShrink:0 }}>
                          {exp.abbr}
                        </div>
                        <div style={{ flex:1 }}>
                          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:"4px" }}>
                            <div>
                              <p style={{ fontSize:"14px", fontWeight:700, color:"#111827", margin:"0 0 2px" }}>{exp.title}</p>
                              <p style={{ fontSize:"13px", color:"#6B7280", margin:0 }}>{exp.company} • {exp.type}</p>
                            </div>
                            <span style={{ fontSize:"12px", color:"#9CA3AF", fontWeight:500, whiteSpace:"nowrap" }}>{exp.period}</span>
                          </div>
                          <ul style={{ margin:"10px 0 0", paddingLeft:"16px" }}>
                            {exp.bullets.map((b, j) => (
                              <li key={j} style={{ fontSize:"13px", color:"#374151", lineHeight:"1.6", marginBottom:"4px" }}>{b}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Education */}
              <div style={{ background:"#fff", borderRadius:"14px", border:"1px solid #E5E7EB", padding:"24px" }}>
                <div style={{ display:"flex", alignItems:"center", gap:"10px", marginBottom:"20px" }}>
                  <svg width="18" height="18" fill="none" stroke="#4F46E5" strokeWidth="2" viewBox="0 0 24 24"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
                  <h2 style={{ fontSize:"16px", fontWeight:700, color:"#111827", margin:0 }}>Education</h2>
                </div>
                {user.education.map((edu, i) => (
                  <div key={i} style={{ display:"flex", gap:"14px", alignItems:"flex-start" }}>
                    <div style={{ width:"40px", height:"40px", borderRadius:"10px", background:"#FFF7ED", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                      <svg width="20" height="20" fill="none" stroke="#F97316" strokeWidth="2" viewBox="0 0 24 24"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
                    </div>
                    <div>
                      <p style={{ fontSize:"14px", fontWeight:700, color:"#111827", margin:"0 0 2px" }}>{edu.title}</p>
                      <p style={{ fontSize:"13px", color:"#374151", margin:"0 0 2px" }}>{edu.school}</p>
                      <p style={{ fontSize:"12px", color:"#4F46E5", fontWeight:500, margin:0 }}>{edu.year}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column */}
            <div style={{ width:"240px", flexShrink:0, display:"flex", flexDirection:"column", gap:"16px" }}>

              {/* Core Skills */}
              <div style={{ background:"#fff", borderRadius:"14px", border:"1px solid #E5E7EB", padding:"20px" }}>
                <h3 style={{ fontSize:"15px", fontWeight:700, color:"#111827", margin:"0 0 14px" }}>Core Skills</h3>
                <div style={{ display:"flex", flexWrap:"wrap", gap:"8px" }}>
                  {user.skills.map(skill => (
                    <span key={skill} style={{ background:"#F3F4F6", color:"#374151", padding:"5px 12px", borderRadius:"8px", fontSize:"12px", fontWeight:500 }}>{skill}</span>
                  ))}
                </div>
              </div>

              {/* Connect */}
              <div style={{ background:"#fff", borderRadius:"14px", border:"1px solid #E5E7EB", padding:"20px" }}>
                <h3 style={{ fontSize:"15px", fontWeight:700, color:"#111827", margin:"0 0 14px" }}>Connect</h3>
                {user.links.map(link => (
                  <div key={link.label} style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"10px 12px", borderRadius:"10px", marginBottom:"8px", cursor:"pointer", transition:"background 0.15s", border:"1px solid #F3F4F6" }}
                    onMouseEnter={e => e.currentTarget.style.background="#F9FAFB"}
                    onMouseLeave={e => e.currentTarget.style.background="#fff"}>
                    <div style={{ display:"flex", alignItems:"center", gap:"10px" }}>
                      <div style={{ width:"32px", height:"32px", borderRadius:"8px", background: link.color, display:"flex", alignItems:"center", justifyContent:"center", color:"#fff", fontSize:"11px", fontWeight:800 }}>
                        {link.icon}
                      </div>
                      <span style={{ fontSize:"13px", fontWeight:600, color:"#374151" }}>{link.label}</span>
                    </div>
                    <svg width="14" height="14" fill="none" stroke="#9CA3AF" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 18l6-6-6-6"/></svg>
                  </div>
                ))}
              </div>

              {/* Profile Views */}
              <div style={{ background:"#1E293B", borderRadius:"14px", padding:"20px" }}>
                <p style={{ fontSize:"12px", color:"#94A3B8", margin:"0 0 4px" }}>Profile Views</p>
                <div style={{ display:"flex", alignItems:"center", gap:"10px", marginBottom:"16px" }}>
                  <span style={{ fontSize:"28px", fontWeight:800, color:"#fff" }}>{user.profileViews.toLocaleString()}</span>
                  <span style={{ fontSize:"12px", fontWeight:600, color:"#10B981", background:"rgba(16,185,129,0.15)", padding:"3px 8px", borderRadius:"6px" }}>↑+12%</span>
                </div>
                {/* Mini chart */}
                <div style={{ display:"flex", alignItems:"flex-end", gap:"4px", height:"32px" }}>
                  {[60, 75, 55, 80, 70, 90, 100].map((h, i) => (
                    <div key={i} style={{ flex:1, height:`${h}%`, borderRadius:"3px", background: i === 5 ? "#4F46E5" : "rgba(255,255,255,0.15)" }}/>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}