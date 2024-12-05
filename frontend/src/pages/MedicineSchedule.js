import React, { useState, useEffect } from "react";
import axios from "axios";

const MedicineSchedule = () => {
  const [medicines, setMedicines] = useState([]);
  const [name, setName] = useState("");
  const [dosage, setDosage] = useState("");
  const [scheduleTime, setScheduleTime] = useState("");
  const role = localStorage.getItem("role");

  useEffect(() => {
    const fetchMedicines = async () => {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:3000/api/medicines", {
        headers: { "x-access-token": token },
      });
      setMedicines(response.data);
    };

    fetchMedicines();
  }, []);

  const handleAddMedicine = async () => {
    if (role !== "user") {
      alert("Only users can add medicine schedules.");
      return;
    }

    const token = localStorage.getItem("token");
    await axios.post(
      "http://localhost:3000/api/medicine",
      { name, dosage, schedule_time: scheduleTime },
      { headers: { "x-access-token": token } }
    );
    // Refresh the medicine list
    window.location.reload();
  };

  const handleAcknowledge = async (medicineId) => {
    const token = localStorage.getItem("token");
    await axios.post(
      "http://localhost:3000/api/acknowledge",
      { medicine_id: medicineId },
      { headers: { "x-access-token": token } }
    );
    // Refresh the medicine list
    window.location.reload();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-green-400 to-blue-500 p-4">
      <div className="w-full max-w-4xl p-8 space-y-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center text-gray-800">
          Medicine Schedule
        </h2>
        {role === "user" && (
          <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Medicine Name"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            <input
              type="text"
              value={dosage}
              onChange={(e) => setDosage(e.target.value)}
              placeholder="Dosage"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            <input
              type="time"
              value={scheduleTime}
              onChange={(e) => setScheduleTime(e.target.value)}
              placeholder="Schedule Time"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            <button
              onClick={handleAddMedicine}
              className="w-full md:w-auto px-4 py-2 font-bold text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              Add Medicine
            </button>
          </div>
        )}
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 border">Name</th>
                <th className="px-4 py-2 border">Dosage</th>
                <th className="px-4 py-2 border">Schedule Time</th>
                <th className="px-4 py-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {medicines.map((medicine) => (
                <tr key={medicine.id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border">{medicine.name}</td>
                  <td className="px-4 py-2 border">{medicine.dosage}</td>
                  <td className="px-4 py-2 border">{medicine.schedule_time}</td>
                  <td className="px-4 py-2 border">
                    <button
                      onClick={() => handleAcknowledge(medicine.id)}
                      className="px-4 py-2 font-bold text-white bg-green-600 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-600"
                    >
                      Acknowledge
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

export default MedicineSchedule;
