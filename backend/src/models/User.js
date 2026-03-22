const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    phone: { type: String },
    avatar: { type: String, default: "" },
    role: {
      type: String,
      enum: ["jobseeker", "employer", "freelancer", "instructor", "admin"],
      default: "jobseeker",
    },
    title: { type: String, default: "" },
    bio: { type: String, default: "" },
    location: { type: String, default: "" },
    website: { type: String, default: "" },
    linkedin: { type: String, default: "" },
    github: { type: String, default: "" },
    skills: [{ type: String }],
    experience: [{
      company: String,
      position: String,
      startDate: Date,
      endDate: Date,
      current: { type: Boolean, default: false },
      description: String,
    }],
    education: [{
      institution: String,
      degree: String,
      field: String,
      startDate: Date,
      endDate: Date,
    }],
    resume: { type: String, default: "" },
    isVerified: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
    verifyToken: { type: String },
    googleId: { type: String },
    resetPasswordToken: { type: String },
    resetPasswordExpire: { type: Date },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);