import { useState } from "react";
import { Link } from "react-router-dom";

const categories = [
  { icon: "⊹", label: "All Categories" },
  { icon: "<>", label: "Development" },
  { icon: "🎨", label: "Design" },
  { icon: "📢", label: "Marketing" },
  { icon: "✏️", label: "Writing" },
];

const freelancers = [
  {
    id: 1,
    name: "Sarah Jenkins",
    title: "Senior UI/UX Designer",
    bio: "Specializing in creating high-conversion SaaS platforms and mobile applications. 8+ years experience with Fortune 500...",
    rating: 4.9,
    reviews: 128,
    rate: 85,
    skills: ["Figma", "Prototyping", "React UI", "Design Systems"],
    available: true,
    badge: { text: "Verified Pro", color: "#059669", icon: "✓" },
    location: null,
    queue: null,
  },
  {
    id: 2,
    name: "Marcus Thorne",
    title: "Full Stack Architect",
    bio: "Expert in building scalable backend architectures and robust front-end systems. Specialty in Node.js, AWS, and Next.js.",
    rating: 5.0,
    reviews: 245,
    rate: 120,
    skills: ["Next.js", "Node.js", "AWS", "TypeScript"],
    available: true,
    badge: null,
    location: null,
    queue: "5 projects in queue",
  },
  {
    id: 3,
    name: "Elena Rodriguez",
    title: "Growth Marketer",
    bio: "Helping tech startups scale through data-driven SEO, content marketing, and performance advertising strategies.",
    rating: 4.8,
    reviews: 89,
    rate: 65,
    skills: ["SEO", "Google Ads", "Copywriting"],
    available: true,
    badge: { text: "Fast Responder", color: "#D97706", icon: "⚡" },
    location: null,
    queue: null,
  },
  {
    id: 4,
    name: "David Chen",
    title: "UX Writer & Copy Lead",
    bio: "Crafting clear, concise, and useful text that helps users complete tasks within your digital product ecosystem.",
    rating: 4.9,
    reviews: 156,
    rate: 75,
    skills: ["UX Writing", "Branding", "Strategy"],
    available: false,
    badge: null,
    location: "Remote • NYC",
    queue: null,
  },
];

export default function FreelancersPage() {
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedExperience, setSelectedExperience] = useState(["Intermediate"]);
  const [sliderValue, setSliderValue] = useState(150);
  const [currentPage, setCurrentPage] = useState(1);

  const toggleExperience = (level) => {
    setSelectedExperience((prev) =>
      prev.includes(level) ? prev.filter((l) => l !== level) : [...prev, level]
    );
  };

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: "#F9FAFB", minHeight: "100vh" }}>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />

      {/* Navbar */}
      <nav style={{
        background: "#fff",
        borderBottom: "1px solid #E5E7EB",
        padding: "0 28px",
        height: "58px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        position: "sticky",
        top: 0,
        zIndex: 100,
      }}>
        <span style={{ fontWeight: 700, fontSize: "17px", color: "#111827", flexShrink: 0 }}>
          SearFind 
        </span>

        <div style={{
          display: "flex", alignItems: "center",
          background: "#F9FAFB", border: "1px solid #E5E7EB",
          borderRadius: "8px", padding: "8px 14px", gap: "8px", width: "260px", margin: "0 24px",
        }}>
          <svg width="15" height="15" fill="none" stroke="#9CA3AF" strokeWidth="2" viewBox="0 0 24 24">
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
          </svg>
          <input placeholder="Search freelancers..." style={{ border: "none", background: "transparent", fontSize: "13px", color: "#374151", outline: "none", width: "100%" }} />
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
          {["Find Talent", "My Projects", "Messages"].map((item) => (
            <span key={item} style={{
              fontSize: "14px", fontWeight: item === "Find Talent" ? 600 : 400,
              color: item === "Find Talent" ? "#4F46E5" : "#6B7280", cursor: "pointer",
              borderBottom: item === "Find Talent" ? "2px solid #4F46E5" : "none", paddingBottom: "2px",
            }}>{item}</span>
          ))}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "14px", marginLeft: "24px" }}>
          <svg width="20" height="20" fill="none" stroke="#6B7280" strokeWidth="2" viewBox="0 0 24 24" style={{ cursor: "pointer" }}>
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>
          </svg>
          <svg width="20" height="20" fill="none" stroke="#6B7280" strokeWidth="2" viewBox="0 0 24 24" style={{ cursor: "pointer" }}>
            <circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
          </svg>
          <button style={{ background: "#4F46E5", color: "#fff", border: "none", borderRadius: "8px", padding: "8px 16px", fontSize: "13px", fontWeight: 600, cursor: "pointer" }}>
            Post a Job
          </button>
          <div style={{ width: "34px", height: "34px", borderRadius: "50%", background: "linear-gradient(135deg, #4F46E5, #7C3AED)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: "13px", fontWeight: 600, cursor: "pointer" }}>T</div>
        </div>
      </nav>

      {/* Body */}
      <div style={{ display: "flex" }}>

        {/* Sidebar */}
        <aside style={{
          width: "232px", flexShrink: 0, background: "#fff",
          borderRight: "1px solid #E5E7EB", padding: "28px 20px",
          minHeight: "calc(100vh - 58px)", display: "flex",
          flexDirection: "column", gap: "28px",
        }}>
          <div>
            <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#111827", margin: "0 0 4px" }}>Filters</h3>
            <p style={{ fontSize: "12px", color: "#9CA3AF", margin: 0 }}>Refine your search</p>
          </div>

          {/* Category */}
          <div>
            <p style={{ fontSize: "11px", fontWeight: 700, color: "#9CA3AF", letterSpacing: "0.08em", marginBottom: "12px" }}>CATEGORY</p>
            {categories.map((cat) => (
              <div key={cat.label} onClick={() => setSelectedCategory(cat.label)} style={{
                display: "flex", alignItems: "center", gap: "10px",
                padding: "9px 12px", borderRadius: "8px", marginBottom: "2px",
                background: selectedCategory === cat.label ? "#EEF2FF" : "transparent",
                cursor: "pointer",
              }}>
                <span style={{ fontSize: "14px" }}>{cat.icon}</span>
                <span style={{ fontSize: "13px", fontWeight: selectedCategory === cat.label ? 600 : 400, color: selectedCategory === cat.label ? "#4F46E5" : "#374151" }}>
                  {cat.label}
                </span>
              </div>
            ))}
          </div>

          {/* Hourly Rate */}
          <div>
            <p style={{ fontSize: "11px", fontWeight: 700, color: "#9CA3AF", letterSpacing: "0.08em", marginBottom: "14px" }}>HOURLY RATE</p>
            <input type="range" min="20" max="200" value={sliderValue} onChange={(e) => setSliderValue(e.target.value)} style={{ width: "100%", accentColor: "#4F46E5", marginBottom: "8px" }} />
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ fontSize: "12px", color: "#9CA3AF" }}>$20/hr</span>
              <span style={{ fontSize: "12px", color: "#9CA3AF" }}>${sliderValue}/hr+</span>
            </div>
          </div>

          {/* Experience */}
          <div>
            <p style={{ fontSize: "11px", fontWeight: 700, color: "#9CA3AF", letterSpacing: "0.08em", marginBottom: "12px" }}>EXPERIENCE</p>
            {["Entry Level", "Intermediate", "Expert"].map((level) => (
              <label key={level} style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px", cursor: "pointer" }}>
                <div onClick={() => toggleExperience(level)} style={{
                  width: "18px", height: "18px", borderRadius: "4px",
                  background: selectedExperience.includes(level) ? "#4F46E5" : "transparent",
                  border: selectedExperience.includes(level) ? "none" : "2px solid #D1D5DB",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  cursor: "pointer", flexShrink: 0,
                }}>
                  {selectedExperience.includes(level) && (
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <path d="M2 5l2.5 2.5L8 3" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                </div>
                <span style={{ fontSize: "13px", color: "#374151" }}>{level}</span>
              </label>
            ))}
          </div>

          <div style={{ marginTop: "auto" }}>
            <button style={{ width: "100%", background: "#4F46E5", color: "#fff", border: "none", borderRadius: "10px", padding: "12px", fontSize: "14px", fontWeight: 600, cursor: "pointer" }}>
              Apply Filters
            </button>
          </div>
        </aside>

        {/* Main */}
        <main style={{ flex: 1, padding: "28px 32px" }}>

          {/* Breadcrumb */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px" }}>
            <span style={{ fontSize: "13px", color: "#6B7280", cursor: "pointer" }}>Freelancers</span>
            <span style={{ fontSize: "13px", color: "#9CA3AF" }}>/</span>
            <span style={{ fontSize: "13px", color: "#4F46E5", fontWeight: 500 }}>Search Results</span>
          </div>

          {/* Header */}
          <div style={{ marginBottom: "24px" }}>
            <h1 style={{ fontSize: "28px", fontWeight: 700, color: "#111827", margin: "0 0 6px" }}>Find Expert Freelancers</h1>
            <p style={{ fontSize: "14px", color: "#6B7280", margin: 0 }}>
              Discover <strong style={{ color: "#111827" }}>12,482</strong> active specialists ready to boost your next project.
            </p>
          </div>

          {/* Cards Grid */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "32px" }}>
            {freelancers.map((f) => (
              <div key={f.id} style={{
                background: "#fff", borderRadius: "14px",
                border: "1px solid #E5E7EB", padding: "24px",
                transition: "all 0.2s", cursor: "pointer",
              }}
              onMouseEnter={e => e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.08)"}
              onMouseLeave={e => e.currentTarget.style.boxShadow = "none"}
              >
                {/* Top Row */}
                <div style={{ display: "flex", gap: "16px", marginBottom: "12px" }}>
                  <div style={{ position: "relative", flexShrink: 0 }}>
                    <div style={{
                      width: "60px", height: "60px", borderRadius: "10px",
                      background: "linear-gradient(135deg, #E0E7FF, #C7D2FE)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: "22px", fontWeight: 700, color: "#4F46E5",
                    }}>{f.name.charAt(0)}</div>
                    <div style={{
                      position: "absolute", bottom: "2px", right: "2px",
                      width: "12px", height: "12px", borderRadius: "50%",
                      background: f.available ? "#10B981" : "#9CA3AF",
                      border: "2px solid #fff",
                    }}/>
                  </div>

                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                      <div>
                        <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#111827", margin: "0 0 2px" }}>{f.name}</h3>
                        <p style={{ fontSize: "13px", fontWeight: 600, color: "#4F46E5", margin: 0 }}>{f.title}</p>
                      </div>
                      <div style={{ textAlign: "right" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "4px", justifyContent: "flex-end" }}>
                          <span style={{ color: "#F59E0B" }}>★</span>
                          <span style={{ fontSize: "14px", fontWeight: 700, color: "#111827" }}>{f.rating}</span>
                        </div>
                        <p style={{ fontSize: "11px", color: "#9CA3AF", margin: "2px 0 0" }}>{f.reviews} REVIEWS</p>
                      </div>
                    </div>
                    <div style={{ marginTop: "6px" }}>
                      <span style={{ fontSize: "20px", fontWeight: 700, color: "#111827" }}>${f.rate}</span>
                      <span style={{ fontSize: "13px", color: "#9CA3AF" }}>/hr</span>
                    </div>
                  </div>
                </div>

                {/* Bio */}
                <p style={{ fontSize: "13px", color: "#374151", lineHeight: "1.6", margin: "0 0 14px" }}>{f.bio}</p>

                {/* Skills */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "16px" }}>
                  {f.skills.map((skill) => (
                    <span key={skill} style={{ padding: "4px 10px", borderRadius: "6px", border: "1.5px solid #E5E7EB", fontSize: "12px", color: "#374151", fontWeight: 500 }}>
                      {skill}
                    </span>
                  ))}
                </div>

                {/* Bottom */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    {f.badge && (
                      <span style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "12px", fontWeight: 600, color: f.badge.color }}>
                        {f.badge.icon} {f.badge.text}
                      </span>
                    )}
                    {f.queue && (
                      <span style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "12px", color: "#6B7280" }}>
                        <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>
                        </svg>
                        {f.queue}
                      </span>
                    )}
                    {f.location && (
                      <span style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "12px", color: "#6B7280" }}>
                        <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                        </svg>
                        {f.location}
                      </span>
                    )}
                    {!f.badge && !f.queue && !f.location && <span/>}
                  </div>
                  <Link to={`/freelancers/${f.id}`}>
                    <button style={{ background: "#4F46E5", color: "#fff", border: "none", borderRadius: "8px", padding: "9px 20px", fontSize: "13px", fontWeight: 600, cursor: "pointer" }}>
                      View Profile
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "8px" }}>
            <button style={{ width: "36px", height: "36px", borderRadius: "8px", border: "1.5px solid #E5E7EB", background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
              <svg width="14" height="14" fill="none" stroke="#6B7280" strokeWidth="2" viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6"/></svg>
            </button>
            {[1, 2, 3, "...", 12].map((page, i) => (
              <button key={i} onClick={() => typeof page === "number" && setCurrentPage(page)} style={{
                width: "36px", height: "36px", borderRadius: "8px",
                border: page === currentPage ? "none" : "1.5px solid #E5E7EB",
                background: page === currentPage ? "#4F46E5" : "#fff",
                color: page === currentPage ? "#fff" : "#374151",
                fontSize: "13px", fontWeight: page === currentPage ? 700 : 400, cursor: "pointer",
              }}>{page}</button>
            ))}
            <button style={{ width: "36px", height: "36px", borderRadius: "8px", border: "1.5px solid #E5E7EB", background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
              <svg width="14" height="14" fill="none" stroke="#6B7280" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 18l6-6-6-6"/></svg>
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}