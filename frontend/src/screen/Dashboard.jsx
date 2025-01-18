import React, { useState, useEffect } from "react";
import axios from "../config/axios.js";

const Dashboard = () => {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 5; 

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/submit/view?page=${currentPage}&limit=${itemsPerPage}`); 
        setSubmissions(response.data.submissions);
        setTotalPages(response.data.totalPages);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchSubmissions();
  }, [currentPage]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Submissions Dashboard</h1>

      {loading ? (
        <div className="text-center text-lg">Loading...</div>
      ) : error ? (
        <div className="text-center text-red-500 text-lg">{error}</div>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="table-auto w-full bg-white shadow-md rounded-lg">
              <thead>
                <tr className="bg-gray-800 text-white">
                  <th className="px-4 py-2">Name</th>
                  <th className="px-4 py-2">Country</th>
                  <th className="px-4 py-2">Company</th>
                  <th className="px-4 py-2">Questions</th>
                  <th className="px-4 py-2">Created At</th>
                </tr>
              </thead>
              <tbody>
                {submissions && submissions.map((submission, index) => (
                  <tr
                    key={submission._id}
                    className={`${index % 2 === 0 ? "bg-gray-100" : "bg-white"} hover:bg-gray-200`}
                  >
                    <td className="px-4 py-2">{submission.name}</td>
                    <td className="px-4 py-2">{submission.country}</td>
                    <td className="px-4 py-2">{submission.company}</td>
                    <td className="px-4 py-2">{submission.questions.join(", ")}</td>
                    <td className="px-4 py-2">{new Date(submission.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-center mt-6 space-x-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700"
              disabled={currentPage === 1}
            >
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => handlePageChange(i + 1)}
                className={`px-4 py-2 rounded ${
                  currentPage === i + 1
                    ? "bg-yellow-500 text-white"
                    : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                }`}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700"
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
