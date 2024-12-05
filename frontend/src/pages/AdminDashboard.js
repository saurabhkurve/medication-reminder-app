import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";

const AdminDashboard = () => {
  const [logs, setLogs] = useState([]);
  const [patientId, setPatientId] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const token = localStorage.getItem("token");

  const fetchLogs = useCallback(async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/admin/acknowledgments",
        {
          headers: { "x-access-token": token },
          params: {
            patient_id: patientId,
            start_date: startDate,
            end_date: endDate,
          },
        }
      );
      setLogs(response.data);
    } catch (error) {
      console.error("Error fetching logs:", error);
    }
  }, [patientId, startDate, endDate, token]);

  useEffect(() => {
    fetchLogs();
  }, [fetchLogs]);

  const handleDelete = async (logId) => {
    try {
      await axios.delete(
        `http://localhost:3000/api/admin/acknowledgments/${logId}`,
        {
          headers: { "x-access-token": token },
        }
      );
      // Refresh the logs after deletion
      fetchLogs();
    } catch (error) {
      console.error("Error deleting log:", error);
      alert("Error deleting log. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-indigo-600 p-4">
      <div className="w-full max-w-4xl p-8 space-y-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center text-gray-800">Admin Dashboard</h2>
        <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
          <input
            type="text"
            value={patientId}
            onChange={(e) => setPatientId(e.target.value)}
            placeholder="Patient ID"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            placeholder="Start Date"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            placeholder="End Date"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          <button
            onClick={fetchLogs}
            className="w-full md:w-auto px-4 py-2 font-bold text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
          >
            Fetch Logs
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 border">User ID</th>
                <th className="px-4 py-2 border">Medicine ID</th>
                <th className="px-4 py-2 border">Status</th>
                <th className="px-4 py-2 border">Timestamp</th>
                <th className="px-4 py-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log) => (
                <tr key={log.id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border">{log.user_id}</td>
                  <td className="px-4 py-2 border">{log.medicine_id}</td>
                  <td className="px-4 py-2 border">{log.status}</td>
                  <td className="px-4 py-2 border">{new Date(log.timestamp).toLocaleString()}</td>
                  <td className="px-4 py-2 border">
                    <button
                      onClick={() => handleDelete(log.id)}
                      className="px-4 py-2 font-bold text-white bg-red-600 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;