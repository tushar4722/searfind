import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const freelancer = {
  name: "Sarah Jenkins",
  location: "New York, USA",
  title: "Senior UI/UX Designer",
  successScore: 98,
  badge: "Top Rated Plus",
  hourlyRate: 85,
  totalJobs: 124,
  isVerified: true,
  isOnline: true,
  avatar: null,
  about: `With over 8 years of specialized experience in UI/UX Design, I transform complex problems into elegant, user-centric digital solutions. My design philosophy is rooted in empathy and data, ensuring that every interface I build not only looks beautiful but also drives business results.\n\nI've partnered with venture-backed startups and Fortune 500 companies to design products used by millions. My expertise spans across Fintech, Healthtech, and SaaS platforms, focusing on scalable design systems and high-fidelity prototyping.`,
  skills: ["Figma", "React", "Tailwind CSS", "Design Systems", "Prototyping", "User Research", "Motion Design"],
  availability: {
    weeklyLimit: "30 hrs/week",
    responseTime: "< 12 hours",
    languages: "English (Native), Spanish (Fluent)",
  },
  portfolio: [
    { id: 1, title: "SaaS Dashboard", image: null },
    { id: 2, title: "E Commerce App", image: null },
  ],
  reviews: [
    {
      id: 1,
      rating: 5.0,
      title: '"Exceptional eye for detail and design systems."',
      comment: '"Sarah completely transformed our enterprise platform. She is professional, responsive, and incredibly talented."',
      reviewer: "Mark Thompson",
      role: "CTO at CloudScale",
    },
    {
      id: 2,
      rating: 5.0,
      title: '"A Figma wizard!"',
      comment: '"Delivered the high-fidelity prototypes ahead of schedule. Highly recommended for any UX-intensive project."',
      reviewer: "Elena Rodriguez",
      role: "Product Manager",
    },
  ],
};

const StarRating = ({ rating }) => (
  <div style={{ display: "flex", alignItems: "center", gap: "2px" }}>
    {[1, 2, 3, 4, 5].map((s) => (
      <svg key={s} width="14" height="14" viewBox="0 0 14 14" fill={s <= rating ? "#F59E0B" : "#E5E7EB"}>
        <path d="M7 1l1.8 3.6L13 5.3l-3 2.9.7 4.1L7 10.1l-3.7 2.2.7-4.1-3-2.9 4.2-.7z"/>
      </svg>
    ))}
  </div>
);

export default function FreelancerDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [review, setReview] = useState({ rating: 5, comment: "" });

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: "#F9FAFB", minHeight: "100vh" }}>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />

      {/* Navbar */}
      <nav style={{
        background: "#fff",
        borderBottom: "1px solid #E5E7EB",
        padding: "0 40px",
        height: "56px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        position: "sticky", top: 0, zIndex: 100,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "32px" }}>
          <span style={{ fontWeight: 800, fontSize: "18px", color: "#111827" }}>SearFind</span>
          {["Explore", "Projects", "Messages"].map((item) => (
            <span key={item} style={{ fontSize: "14px", color: "#6B7280", cursor: "pointer" }}>{item}</span>
          ))}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <span style={{ fontSize: "14px", color: "#374151", cursor: "pointer" }}>Sign In</span>
          <button style={{
            background: "#4F46E5", color: "#fff",
            border: "none", borderRadius: "8px",
            padding: "8px 20px", fontSize: "14px",
            fontWeight: 600, cursor: "pointer",
          }}>Hire Now</button>
        </div>
      </nav>

      {/* Hero Section */}
      <div style={{
        background: "#fff",
        borderBottom: "1px solid #E5E7EB",
        padding: "32px 40px",
        marginBottom: "24px",
      }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <div style={{ display: "flex", gap: "28px", alignItems: "flex-start" }}>

            {/* Avatar */}
            <div style={{ position: "relative", flexShrink: 0 }}>
              <div style={{
                width: "140px", height: "140px",
                borderRadius: "16px",
                background: "linear-gradient(135deg, #C7D2FE, #A5B4FC)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "48px", fontWeight: 800, color: "#4F46E5",
                overflow: "hidden",
              }}>S</div>
              {/* Verified badge */}
              <div style={{
                position: "absolute", bottom: "-10px", left: "50%",
                transform: "translateX(-50%)",
                background: "#fff",
                border: "1px solid #E5E7EB",
                borderRadius: "20px",
                padding: "4px 10px",
                display: "flex", alignItems: "center", gap: "4px",
                whiteSpace: "nowrap",
                boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
              }}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <circle cx="7" cy="7" r="7" fill="#10B981"/>
                  <path d="M4 7l2 2 4-4" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span style={{ fontSize: "11px", fontWeight: 700, color: "#10B981" }}>VERIFIED</span>
              </div>
            </div>

            {/* Info */}
            <div style={{ flex: 1, paddingTop: "8px" }}>
              {/* Name + Location */}
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "4px" }}>
                <h1 style={{ fontSize: "28px", fontWeight: 800, color: "#111827", margin: 0 }}>
                  {freelancer.name}
                </h1>
                <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                  <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#10B981" }}/>
                  <svg width="14" height="14" fill="none" stroke="#6B7280" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                  </svg>
                  <span style={{ fontSize: "14px", color: "#6B7280" }}>{freelancer.location}</span>
                </div>
              </div>

              {/* Title */}
              <p style={{ fontSize: "16px", fontWeight: 600, color: "#4F46E5", margin: "0 0 20px" }}>
                {freelancer.title}
              </p>

              {/* Stats */}
              <div style={{
                display: "flex", gap: "0",
                border: "1px solid #E5E7EB",
                borderRadius: "12px",
                overflow: "hidden",
                marginBottom: "20px",
                maxWidth: "580px",
              }}>
                {[
                  { label: "Success Score", value: `${freelancer.successScore}%` },
                  { label: "Badge", value: freelancer.badge, isBlue: true },
                  { label: "Hourly Rate", value: `$${freelancer.hourlyRate}/hr` },
                  { label: "Total Jobs", value: freelancer.totalJobs },
                ].map((stat, i) => (
                  <div key={i} style={{
                    flex: 1,
                    padding: "14px 16px",
                    borderRight: i < 3 ? "1px solid #E5E7EB" : "none",
                  }}>
                    <p style={{ fontSize: "11px", color: "#9CA3AF", margin: "0 0 4px", fontWeight: 500 }}>{stat.label}</p>
                    {stat.isBlue ? (
                      <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                          <circle cx="7" cy="7" r="7" fill="#4F46E5"/>
                          <path d="M4 7l2 2 4-4" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <span style={{ fontSize: "14px", fontWeight: 600, color: "#4F46E5" }}>{stat.value}</span>
                      </div>
                    ) : (
                      <p style={{ fontSize: "16px", fontWeight: 700, color: "#111827", margin: 0 }}>{stat.value}</p>
                    )}
                  </div>
                ))}
              </div>

              {/* Buttons */}
              <div style={{ display: "flex", gap: "12px" }}>
                <button style={{
                  background: "#4F46E5", color: "#fff",
                  border: "none", borderRadius: "8px",
                  padding: "10px 24px", fontSize: "14px",
                  fontWeight: 600, cursor: "pointer",
                }}>Hire Now</button>
                <button style={{
                  background: "#fff", color: "#374151",
                  border: "1.5px solid #E5E7EB", borderRadius: "8px",
                  padding: "10px 24px", fontSize: "14px",
                  fontWeight: 600, cursor: "pointer",
                  display: "flex", alignItems: "center", gap: "8px",
                }}>
                  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
                  </svg>
                  Message
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "0 40px 40px", display: "flex", gap: "24px" }}>

        {/* Left Column */}
        <div style={{ flex: 1 }}>

          {/* About */}
          <div style={{
            background: "#fff", borderRadius: "16px",
            border: "1px solid #E5E7EB", padding: "28px",
            marginBottom: "20px",
          }}>
            <h2 style={{
              fontSize: "18px", fontWeight: 700, color: "#111827",
              margin: "0 0 16px",
              borderLeft: "4px solid #4F46E5",
              paddingLeft: "12px",
            }}>About {freelancer.name.split(" ")[0]}</h2>
            {freelancer.about.split("\n\n").map((para, i) => (
              <p key={i} style={{ fontSize: "14px", color: "#374151", lineHeight: "1.7", margin: "0 0 12px" }}>
                {para}
              </p>
            ))}
          </div>

          {/* Top Skills */}
          <div style={{
            background: "#fff", borderRadius: "16px",
            border: "1px solid #E5E7EB", padding: "28px",
            marginBottom: "20px",
          }}>
            <h2 style={{
              fontSize: "18px", fontWeight: 700, color: "#111827",
              margin: "0 0 16px",
              borderLeft: "4px solid #4F46E5",
              paddingLeft: "12px",
            }}>Top Skills</h2>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
              {freelancer.skills.map((skill) => (
                <span key={skill} style={{
                  padding: "6px 16px",
                  borderRadius: "8px",
                  border: "1.5px solid #E5E7EB",
                  fontSize: "13px", fontWeight: 500,
                  color: "#374151", background: "#F9FAFB",
                }}>{skill}</span>
              ))}
            </div>
          </div>

          {/* Portfolio */}
          <div style={{
            background: "#fff", borderRadius: "16px",
            border: "1px solid #E5E7EB", padding: "28px",
            marginBottom: "20px",
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
              <h2 style={{
                fontSize: "18px", fontWeight: 700, color: "#111827",
                margin: 0,
                borderLeft: "4px solid #4F46E5",
                paddingLeft: "12px",
              }}>Project Portfolio</h2>
              <span style={{ fontSize: "13px", color: "#4F46E5", cursor: "pointer", fontWeight: 500 }}>
                View All Projects
              </span>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
              {freelancer.portfolio.map((project) => (
                <div key={project.id} style={{
                  borderRadius: "12px",
                  overflow: "hidden",
                  border: "1px solid #E5E7EB",
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
                onMouseEnter={e => e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)"}
                onMouseLeave={e => e.currentTarget.style.boxShadow = "none"}
                >
                  <div style={{
                    height: "160px",
                    background: "linear-gradient(135deg, #EEF2FF, #E0E7FF)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <svg width="40" height="40" fill="none" stroke="#A5B4FC" strokeWidth="1.5" viewBox="0 0 24 24">
                      <rect x="3" y="3" width="18" height="18" rx="3"/><path d="M3 9h18M9 21V9"/>
                    </svg>
                  </div>
                  <div style={{ padding: "12px" }}>
                    <p style={{ fontSize: "13px", fontWeight: 600, color: "#374151", margin: 0 }}>{project.title}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div style={{ width: "260px", flexShrink: 0 }}>

          {/* Availability */}
          <div style={{
            background: "#fff", borderRadius: "16px",
            border: "1px solid #E5E7EB", padding: "24px",
            marginBottom: "20px",
          }}>
            <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#111827", margin: "0 0 16px" }}>
              Availability
            </h3>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px" }}>
              <span style={{ fontSize: "13px", color: "#6B7280" }}>Weekly limit</span>
              <span style={{ fontSize: "13px", fontWeight: 600, color: "#111827" }}>
                {freelancer.availability.weeklyLimit}
              </span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "16px" }}>
              <span style={{ fontSize: "13px", color: "#6B7280" }}>Response time</span>
              <span style={{ fontSize: "13px", fontWeight: 600, color: "#111827" }}>
                {freelancer.availability.responseTime}
              </span>
            </div>
            <div style={{
              borderTop: "1px solid #F3F4F6",
              paddingTop: "16px",
              display: "flex", alignItems: "flex-start", gap: "8px",
            }}>
              <svg width="16" height="16" fill="none" stroke="#6B7280" strokeWidth="2" viewBox="0 0 24 24" style={{ flexShrink: 0, marginTop: "2px" }}>
                <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
              </svg>
              <div>
                <p style={{ fontSize: "11px", color: "#9CA3AF", margin: "0 0 2px" }}>Languages</p>
                <p style={{ fontSize: "13px", color: "#374151", margin: 0 }}>
                  {freelancer.availability.languages}
                </p>
              </div>
            </div>
          </div>

          {/* Reviews */}
          <div style={{
            background: "#fff", borderRadius: "16px",
            border: "1px solid #E5E7EB", padding: "24px",
          }}>
            <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#111827", margin: "0 0 20px" }}>
              Recent Reviews
            </h3>

            {freelancer.reviews.map((rev, i) => (
              <div key={rev.id} style={{
                marginBottom: i < freelancer.reviews.length - 1 ? "20px" : "0",
                paddingBottom: i < freelancer.reviews.length - 1 ? "20px" : "0",
                borderBottom: i < freelancer.reviews.length - 1 ? "1px solid #F3F4F6" : "none",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
                  <StarRating rating={rev.rating} />
                  <span style={{ fontSize: "12px", fontWeight: 600, color: "#374151" }}>{rev.rating}</span>
                </div>
                <p style={{ fontSize: "13px", fontWeight: 700, color: "#111827", margin: "0 0 6px" }}>
                  {rev.title}
                </p>
                <p style={{ fontSize: "12px", color: "#6B7280", lineHeight: "1.6", margin: "0 0 8px", fontStyle: "italic" }}>
                  {rev.comment}
                </p>
                <p style={{ fontSize: "11px", color: "#9CA3AF", margin: 0 }}>
                  {rev.reviewer} • {rev.role}
                </p>
              </div>
            ))}

            <button style={{
              width: "100%",
              marginTop: "16px",
              background: "#fff",
              color: "#4F46E5",
              border: "1.5px solid #4F46E5",
              borderRadius: "8px",
              padding: "10px",
              fontSize: "13px",
              fontWeight: 600,
              cursor: "pointer",
            }}>See All Reviews</button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer style={{
        background: "#fff",
        borderTop: "1px solid #E5E7EB",
        padding: "24px 40px",
      }}>
        <div style={{ maxWidth: "900px", margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <p style={{ fontSize: "16px", fontWeight: 800, color: "#111827", margin: "0 0 4px" }}>SearFind</p>
            <p style={{ fontSize: "12px", color: "#9CA3AF", margin: 0 }}>Connecting world-class talent with leading companies.</p>
          </div>
          <div style={{ display: "flex", gap: "24px", alignItems: "center" }}>
            {["About", "Privacy Policy", "Terms of Service", "Help Center"].map((item) => (
              <span key={item} style={{ fontSize: "13px", color: "#6B7280", cursor: "pointer" }}>{item}</span>
            ))}
            <span style={{ fontSize: "12px", color: "#9CA3AF" }}>© 2024 SearFind. All rights reserved.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}