const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    company: { type: String, required: true },
    companyLogo: { type: String, default: "" },
    location: { type: String, required: true },
    isRemote: { type: Boolean, default: false },
    type: {
      type: String,
      enum: ["full-time", "part-time", "contract", "internship", "freelance"],
      required: true,
    },
    category: { type: String, default: "" },
    experience: {
      type: String,
      enum: ["entry", "mid", "senior", "lead"],
      required: true,
    },
    salary: {
      min: { type: Number },
      max: { type: Number },
      currency: { type: String, default: "USD" },
      period: { type: String, enum: ["hourly", "monthly", "yearly"] },
    },
    skills: [{ type: String }],
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    applications: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Application",
    }],
    totalApplications: { type: Number, default: 0 },
    status: {
      type: String,
      enum: ["active", "closed", "draft"],
      default: "active",
    },
    deadline: { type: Date },
    isApproved: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Job", JobSchema);