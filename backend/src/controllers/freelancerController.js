const Freelancer = require("../models/Freelancer");
const Review = require("../models/Review");

const getFreelancers = async (req, res) => {
  try {
    const { keyword, category, skills, minRate, maxRate, availability, page = 1, limit = 10 } = req.query;
    const query = { isActive: true };
    if (keyword) query.$or = [
      { title: { $regex: keyword, $options: "i" } },
      { bio: { $regex: keyword, $options: "i" } },
    ];
    if (category) query.category = { $regex: category, $options: "i" };
    if (skills) query.skills = { $in: skills.split(",") };
    if (availability) query.availability = availability;
    if (minRate) query.hourlyRate = { $gte: Number(minRate) };
    if (maxRate) query.hourlyRate = { ...query.hourlyRate, $lte: Number(maxRate) };
    const total = await Freelancer.countDocuments(query);
    const freelancers = await Freelancer.find(query)
      .populate("user", "name email avatar location")
      .sort({ rating: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));
    res.json({ freelancers, total, page: Number(page), pages: Math.ceil(total / limit) });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getFreelancerById = async (req, res) => {
  try {
    const freelancer = await Freelancer.findById(req.params.id)
      .populate("user", "name email avatar location title bio");
    if (!freelancer) return res.status(404).json({ message: "Freelancer not found" });
    const reviews = await Review.find({
      targetType: "freelancer", targetId: req.params.id,
    }).populate("reviewer", "name avatar");
    res.json({ freelancer, reviews });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createFreelancer = async (req, res) => {
  try {
    const exists = await Freelancer.findOne({ user: req.user._id });
    if (exists) return res.status(400).json({ message: "Freelancer profile already exists" });
    const freelancer = await Freelancer.create({ ...req.body, user: req.user._id });
    res.status(201).json(freelancer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateFreelancer = async (req, res) => {
  try {
    const freelancer = await Freelancer.findById(req.params.id);
    if (!freelancer) return res.status(404).json({ message: "Freelancer not found" });
    if (freelancer.user.toString() !== req.user._id.toString())
      return res.status(401).json({ message: "Not authorized" });
    const updated = await Freelancer.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteFreelancer = async (req, res) => {
  try {
    const freelancer = await Freelancer.findById(req.params.id);
    if (!freelancer) return res.status(404).json({ message: "Freelancer not found" });
    if (freelancer.user.toString() !== req.user._id.toString())
      return res.status(401).json({ message: "Not authorized" });
    await freelancer.deleteOne();
    res.json({ message: "Freelancer profile removed" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getMyFreelancerProfile = async (req, res) => {
  try {
    const freelancer = await Freelancer.findOne({ user: req.user._id })
      .populate("user", "name email avatar location");
    if (!freelancer) return res.status(404).json({ message: "Freelancer profile not found" });
    res.json(freelancer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addReview = async (req, res) => {
  try {
    const freelancer = await Freelancer.findById(req.params.id);
    if (!freelancer) return res.status(404).json({ message: "Freelancer not found" });
    const alreadyReviewed = await Review.findOne({
      reviewer: req.user._id, targetType: "freelancer", targetId: req.params.id,
    });
    if (alreadyReviewed) return res.status(400).json({ message: "Already reviewed" });
    const review = await Review.create({
      reviewer: req.user._id,
      targetType: "freelancer",
      targetId: req.params.id,
      rating: req.body.rating,
      comment: req.body.comment,
    });
    const reviews = await Review.find({ targetType: "freelancer", targetId: req.params.id });
    freelancer.totalReviews = reviews.length;
    freelancer.rating = reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length;
    await freelancer.save();
    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getFreelancers, getFreelancerById, createFreelancer,
  updateFreelancer, deleteFreelancer, getMyFreelancerProfile, addReview,
};