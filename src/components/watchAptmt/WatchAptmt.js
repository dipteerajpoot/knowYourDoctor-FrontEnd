import { useEffect, useState } from "react";
import axios from "axios";
import { format } from "date-fns"; // for formatting dates
import { Button } from "@/components/ui/button"; // shadcn ui

function WatchAptmt({ role }) {
  const [appointments, setAppointments] = useState([]);

  // ✅ Fetch appointments based on role
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await axios.get(`/api/appointments?role=${role}`);
        // sort ascending by date
        const sorted = res.data.sort((a, b) =>
          new Date(a.apmtDate) - new Date(b.apmtDate)
        );
        setAppointments(sorted);
      } catch (err) {
        console.error("Error fetching appointments", err);
      }
    };
    fetchAppointments();
  }, [role]);

  // ✅ Update status (doctor or patient)
  const updateStatus = async (id, status) => {
    try {
      const res = await axios.put(`/api/appointments/${id}`, { status });
      setAppointments(prev =>
        prev.map(apmt => (apmt._id === id ? res.data : apmt))
      );
    } catch (err) {
      console.error("Error updating status", err);
    }
  };

  // ✅ Cancel appointment (patient only)
  const cancelAppointment = async (id) => {
    try {
      await axios.delete(`/api/appointments/${id}`);
      setAppointments(prev => prev.filter(apmt => apmt._id !== id));
    } catch (err) {
      console.error("Error canceling appointment", err);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">
        {role === "patient" ? "My Appointments" : "Patient Requests"}
      </h2>

      <div className="grid gap-4">
        {appointments.map(apmt => {
          const isPast =
            new Date(`${apmt.apmtDate}T${apmt.apmtTime}`) < new Date();

          return (
            <div
              key={apmt._id}
              className="bg-white shadow-md rounded-2xl p-4 flex justify-between items-center border"
            >
              {/* Left Info */}
              <div>
                <p className="font-medium">
                  {role === "doctor" ? apmt.name : apmt.doctorName}
                </p>
                <p className="text-sm text-gray-500">
                  {format(new Date(apmt.apmtDate), "MMM dd, yyyy")} | {apmt.apmtTime}
                </p>
                <p className="text-xs text-gray-400">
                  Reason: {apmt.meetingReason}
                </p>
                <p
                  className={`text-sm mt-1 ${
                    apmt.status === "pending"
                      ? "text-yellow-600"
                      : apmt.status === "confirm"
                      ? "text-green-600"
                      : apmt.status === "reject"
                      ? "text-red-600"
                      : "text-blue-600"
                  }`}
                >
                  Status: {apmt.status}
                </p>
              </div>

              {/* Right Actions */}
              <div className="flex gap-2">
                {role === "patient" && apmt.status === "pending" && (
                  <>
                    <Button
                      variant="outline"
                      onClick={() => cancelAppointment(apmt._id)}
                    >
                      Cancel
                    </Button>
                  </>
                )}

                {role === "doctor" && apmt.status === "pending" && (
                  <>
                    <Button
                      className="bg-green-500 text-white"
                      onClick={() => updateStatus(apmt._id, "confirm")}
                    >
                      Confirm
                    </Button>
                    <Button
                      className="bg-red-500 text-white"
                      onClick={() => updateStatus(apmt._id, "reject")}
                    >
                      Reject
                    </Button>
                  </>
                )}

                {role === "doctor" && apmt.status === "confirm" && isPast && (
                  <Button
                    className="bg-blue-500 text-white"
                    onClick={() => updateStatus(apmt._id, "complete")}
                  >
                    Mark Complete
                  </Button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default WatchAptmt;
