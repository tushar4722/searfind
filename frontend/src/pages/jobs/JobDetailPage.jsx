import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";

const JobDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState(false);
  const [applied, setApplied] = useState(false);
  const [error, setError] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const [showApplyForm, setShowApplyForm] = useState(false);

  const user = JSON.parse(localStorage.getItem("searfind_user") || "{}");
  const token = localStorage.getItem("searfind_token");

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:5000/api/jobs/${id}`
        );
        setJob(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchJob();
  }, [id]);

  const handleApply = async (e) => {
    e.preventDefault();
    if (!token) {
      navigate("/login");
      return;
    }
    setApplying(true);
    setError("");
    try {
      await axios.post(
        `http://localhost:5000/api/jobs/${id}/apply`,
        { coverLetter },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setApplied(true);
      setShowApplyForm(false);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to apply");
    } finally {
      setApplying(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500 text-lg">Loading job details...</p>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500 text-lg">Job not found!</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-4xl mx-auto">

        {/* Back Button */}
        <Link
          to="/jobs"
          className="text-indigo-600 hover:underline mb-6 inline-block"
        >
          ← Back to Jobs
        </Link>

        {/* Job Header */}
        <div className="bg-white rounded-2xl shadow-sm p-8 mb-6">
          <div className="flex justify-between items-start flex-wrap gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">{job.title}</h1>
              <p className="text-indigo-600 text-xl font-medium mt-2">
                {job.company}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mt-4">
                <span className="bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full text-sm">
                  {job.type}
                </span>
                <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm">
                  📍 {job.location}
                </span>
                <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm">
                  🎯 {job.experience}
                </span>
                {job.isRemote && (
                  <span className="bg-green-50 text-green-600 px-3 py-1 rounded-full text-sm">
                    🌍 Remote
                  </span>
                )}
              </div>
            </div>

            {/* Salary + Apply */}
            <div className="text-right">
              {job.salary?.min && (
                <p className="text-2xl font-bold text-green-600">
                  ${job.salary.min.toLocaleString()} -{" "}
                  ${job.salary.max?.toLocaleString()}
                </p>
              )}
              <p className="text-gray-400 text-sm mt-1">
                {job.salary?.period}
              </p>
              <p className="text-gray-400 text-sm mt-1">
                {job.totalApplications} applicants
              </p>
            </div>
          </div>

          {/* Apply Button */}
          <div className="mt-6">
            {applied ? (
              <div className="bg-green-50 text-green-600 px-6 py-3 rounded-xl font-semibold text-center">
                ✅ Successfully Applied!
              </div>
            ) : (
              <button
                onClick={() => setShowApplyForm(!showApplyForm)}
                className="bg-indigo-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-indigo-700 transition"
              >
                {showApplyForm ? "Cancel" : "Apply Now"}
              </button>
            )}
          </div>

          {/* Apply Form */}
          {showApplyForm && (
            <form onSubmit={handleApply} className="mt-6 border-t pt-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                Apply for this job
              </h3>
              {error && (
                <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg mb-4 text-sm">
                  {error}
                </div>
              )}
              <textarea
                value={coverLetter}
                onChange={(e) => setCoverLetter(e.target.value)}
                placeholder="Write a cover letter... (optional)"
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button
                type="submit"
                disabled={applying}
                className="mt-3 bg-indigo-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-indigo-700 transition disabled:opacity-50"
              >
                {applying ? "Submitting..." : "Submit Application"}
              </button>
            </form>
          )}
        </div>

        {/* Job Description */}
        <div className="bg-white rounded-2xl shadow-sm p-8 mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Job Description
          </h2>
          <p className="text-gray-600 leading-relaxed whitespace-pre-line">
            {job.description}
          </p>
        </div>

        {/* Skills */}
        {job.skills?.length > 0 && (
          <div className="bg-white rounded-2xl shadow-sm p-8 mb-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Skills Required
            </h2>
            <div className="flex flex-wrap gap-2">
              {job.skills.map((skill, index) => (
                <span
                  key={index}
                  className="bg-indigo-50 text-indigo-600 px-4 py-2 rounded-full text-sm font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Posted By */}
        <div className="bg-white rounded-2xl shadow-sm p-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Posted By
          </h2>
          <p className="text-gray-600">{job.postedBy?.name}</p>
          <p className="text-gray-400 text-sm">{job.postedBy?.email}</p>
          <p className="text-gray-400 text-sm mt-2">
            Posted on {new Date(job.createdAt).toLocaleDateString()}
          </p>
        </div>

      </div>
    </div>
  );
};

export default JobDetailPage;