const User = require("../models/User");

const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: "User not found" });
    const { name, phone, title, bio, location, website, linkedin, github, skills, experience, education } = req.body;
    user.name = name || user.name;
    user.phone = phone || user.phone;
    user.title = title || user.title;
    user.bio = bio || user.bio;
    user.location = location || user.location;
    user.website = website || user.website;
    user.linkedin = linkedin || user.linkedin;
    user.github = github || user.github;
    user.skills = skills || user.skills;
    user.experience = experience || user.experience;
    user.education = education || user.education;
    const updated = await user.save();
    res.json({
      _id: updated._id, name: updated.name, email: updated.email,
      role: updated.role, avatar: updated.avatar, title: updated.title,
      bio: updated.bio, location: updated.location, skills: updated.skills,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const uploadAvatar = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: "User not found" });
    user.avatar = req.body.avatarUrl;
    await user.save();
    res.json({ avatar: user.avatar });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const uploadResume = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: "User not found" });
    user.resume = req.body.resumeUrl;
    await user.save();
    res.json({ resume: user.resume });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getUserProfile, updateUserProfile, uploadAvatar, uploadResume };