import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const MyJobsPage = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("searfind_token");

  useEffect(() => {
    const fetchMyJobs = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:5000/api/jobs/my-jobs",
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setJobs(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchMyJobs();
  }, []);

  const deleteJob = async (id) => {
    if (!window.confirm("Are you sure you want to delete this job?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/jobs/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setJobs(jobs.filter((job) => job._id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800">My Posted Jobs</h1>
          <Link
            to="/jobs/post"
            className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700"
          >
            Post New Job
          </Link>
        </div>

        {loading ? (
          <div className="text-center py-20 text-gray-500">Loading...</div>
        ) : jobs.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg mb-4">
              You haven't posted any jobs yet!
            </p>
            <Link
              to="/jobs/post"
              className="bg-indigo-600 text-white px-6 py-3 rounded-xl hover:bg-indigo-700"
            >
              Post Your First Job
            </Link>
          </div>
        ) : (
          <div className="grid gap-4">
            {jobs.map((job) => (
              <div
                key={job._id}
                className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
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
                        📍 {job.location}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-sm ${
                        job.status === "active"
                          ? "bg-green-50 text-green-600"
                          : "bg-red-50 text-red-600"
                      }`}>
                        {job.status}
                      </span>
                    </div>
                    <p className="text-gray-400 text-sm mt-2">
                      {job.totalApplications} applications received
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <Link
                      to={`/jobs/${job._id}`}
                      className="bg-indigo-50 text-indigo-600 px-4 py-2 rounded-lg text-sm hover:bg-indigo-100"
                    >
                      View
                    </Link>
                    <button
                      onClick={() => deleteJob(job._id)}
                      className="bg-red-50 text-red-600 px-4 py-2 rounded-lg text-sm hover:bg-red-100"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyJobsPage;
