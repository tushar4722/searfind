import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const MyApplicationsPage = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("searfind_token");

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:5000/api/jobs/my-applications",
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setApplications(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchApplications();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case "pending": return "bg-yellow-50 text-yellow-600";
      case "reviewed": return "bg-blue-50 text-blue-600";
      case "shortlisted": return "bg-green-50 text-green-600";
      case "rejected": return "bg-red-50 text-red-600";
      case "hired": return "bg-purple-50 text-purple-600";
      default: return "bg-gray-50 text-gray-600";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800">My Applications</h1>
          <Link
            to="/jobs"
            className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700"
          >
            Browse Jobs
          </Link>
        </div>

        {loading ? (
          <div className="text-center py-20 text-gray-500">Loading...</div>
        ) : applications.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg mb-4">
              You haven't applied to any jobs yet!
            </p>
            <Link
              to="/jobs"
              className="bg-indigo-600 text-white px-6 py-3 rounded-xl hover:bg-indigo-700"
            >
              Browse Jobs
            </Link>
          </div>
        ) : (
          <div className="grid gap-4">
            {applications.map((app) => (
              <div
                key={app._id}
                className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800">
                      {app.job?.title}
                    </h2>
                    <p className="text-indigo-600 font-medium mt-1">
                      {app.job?.company}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-3">
                      <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm">
                        {app.job?.type}
                      </span>
                      <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm">
                        📍 {app.job?.location}
                      </span>
                      {app.job?.salary?.min && (
                        <span className="bg-green-50 text-green-600 px-3 py-1 rounded-full text-sm">
                          ${app.job.salary.min.toLocaleString()} - $
                          {app.job.salary.max?.toLocaleString()}
                        </span>
                      )}
                    </div>
                    <p className="text-gray-400 text-sm mt-2">
                      Applied on{" "}
                      {new Date(app.createdAt).toLocaleDateString()}
                    </p>
                  </div>

                  {/* Status + View */}
                  <div className="flex flex-col items-end gap-2">
                    <span className={`px-4 py-1 rounded-full text-sm font-medium ${getStatusColor(app.status)}`}>
                      {app.status}
                    </span>
                    <Link
                      to={`/jobs/${app.job?._id}`}
                      className="text-indigo-600 text-sm hover:underline"
                    >
                      View Job →
                    </Link>
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

export default MyApplicationsPage;