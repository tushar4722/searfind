const mongoose = require("mongoose");

const FreelancerSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    title: { type: String, required: true },
    bio: { type: String, required: true },
    skills: [{ type: String }],
    category: { type: String },
    languages: [{ type: String }],
    hourlyRate: { type: Number, required: true },
    currency: { type: String, default: "USD" },
    availability: {
      type: String,
      enum: ["full-time", "part-time", "not-available"],
      default: "full-time",
    },
    portfolio: [{
      title: String,
      description: String,
      image: String,
      link: String,
      tech: [String],
    }],
    totalProjects: { type: Number, default: 0 },
    totalEarnings: { type: Number, default: 0 },
    rating: { type: Number, default: 0 },
    totalReviews: { type: Number, default: 0 },
    isVerified: { type: Boolean, default: false },
    isApproved: { type: Boolean, default: true },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Freelancer", FreelancerSchema);