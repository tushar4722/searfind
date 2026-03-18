import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const JobsPage = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("");
  const [type, setType] = useState("");

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get("http://localhost:5000/api/jobs", {
        params: { keyword, location, type },
      });
      setJobs(data.jobs);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchJobs(); }, []);

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Header */}
      <div className="bg-indigo-600 py-12 px-4">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold text-white mb-6">
            Find Your Dream Job 💼
          </h1>
          {/* Search Bar */}
          <div className="bg-white rounded-xl p-4 flex flex-wrap gap-3">
            <input
              type="text"
              placeholder="Job title or keyword..."
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            <input
              type="text"
              placeholder="Location..."
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none"
            >
              <option value="">All Types</option>
              <option value="full-time">Full Time</option>
              <option value="part-time">Part Time</option>
              <option value="contract">Contract</option>
              <option value="internship">Internship</option>
              <option value="freelance">Freelance</option>
            </select>
            <button
              onClick={fetchJobs}
              className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700"
            >
              Search
            </button>
          </div>
        </div>
      </div>

      {/* Jobs List */}
      <div className="max-w-5xl mx-auto px-4 py-8">
        {loading ? (
          <div className="text-center py-20 text-gray-500">Loading jobs...</div>
        ) : jobs.length === 0 ? (
          <div className="text-center py-20 text-gray-500">
            No jobs found. Try different keywords!
          </div>
        ) : (
          <div className="grid gap-4">
            {jobs.map((job) => (
              <Link
                to={`/jobs/${job._id}`}
                key={job._id}
                className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition border border-gray-100"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800">
                      {job.title}
                    </h2>
                    <p className="text-indigo-600 font-medium mt-1">
                      {job.company}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-3">
                      <span className="bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full text-sm">
                        {job.type}
                      </span>
                      <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm">
                        {job.location}
                      </span>
                      <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm">
                        {job.experience}
                      </span>
                      {job.isRemote && (
                        <span className="bg-green-50 text-green-600 px-3 py-1 rounded-full text-sm">
                          Remote
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    {job.salary?.min && (
                      <p className="text-green-600 font-semibold">
                        ${job.salary.min.toLocaleString()} - ${job.salary.max?.toLocaleString()}
                      </p>
                    )}
                    <p className="text-gray-400 text-sm mt-1">
                      {new Date(job.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Post Job Button */}
        <div className="mt-8 text-center">
          <Link
            to="/jobs/post"
            className="bg-indigo-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-indigo-700"
          >
            Post a Job
          </Link>
        </div>
      </div>
    </div>
  );
};

export default JobsPage;