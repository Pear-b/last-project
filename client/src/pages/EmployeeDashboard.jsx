import { useEffect, useState } from "react";
import axios from "axios";

export default function EmployeeDashboard({ user, onLogout }) {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (user?.id) {
      fetchTasks();
    }
  }, [user]);

  const fetchTasks = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.get(`http://localhost:5000/api/tasks/employee/${user.id}`);
      setTasks(res.data.tasks);
    } catch {
      setError("Failed to load tasks");
    } finally {
      setLoading(false);
    }
  };

  const markComplete = async (taskId) => {
    setLoading(true);
    setError("");
    try {
      await axios.put(`http://localhost:5000/api/tasks/${taskId}/complete`);
      await fetchTasks();
    } catch {
      setError("Failed to update task");
    } finally {
      setLoading(false);
    }
  };

  const pendingCount = tasks.filter(t => !t.completed).length;
  const completedCount = tasks.filter(t => t.completed).length;

  return (
    <>
      {/* Fixed left box */}
      <div className="fixed top-0 left-0 bg-slate-800 rounded-r shadow p-6 text-white w-72 h-screen overflow-auto z-50 flex flex-col justify-center">

        <h2 className="text-lg font-semibold mb-4">Employee Guidelines</h2>
        <ul className="list-disc ml-5 text-sm space-y-2">
          <li>🕘 Be punctual and adhere to your shift timings.</li>
          <li>💬 Communicate professionally with clients and team members.</li>
          <li>🔒 Maintain confidentiality of company data.</li>
          <li>🧹 Keep your workspace clean and organized.</li>
          <li>📧 Check emails regularly and respond promptly.</li>
          <li>🚫 Avoid misuse of company resources or time.</li>
          <li>✔️ Follow task deadlines and report delays proactively.</li>
        </ul>
      </div>

      {/* Fixed right box */}
      <div className="fixed top-0 right-0 bg-slate-800 rounded-l shadow p-6 text-white w-72 h-screen overflow-auto z-50 flex flex-col justify-center">

        <h2 className="text-lg font-semibold mb-4">Company Policies</h2>
        <ul className="list-disc ml-5 text-sm space-y-2">
          <li>📅 Annual leave policy: 20 days per year.</li>
          <li>💼 Sick leave policy: 10 days per year.</li>
          <li>🏖️ Remote work policy: Flexible based on project needs.</li>
          <li>📝 Performance reviews: Biannual.</li>
          <li>💰 Salary payment: Monthly, on the last working day.</li>
        </ul>
      </div>

      {/* Main content with adjusted padding */}
      <div className="min-h-screen bg-gradient-to-r from-gray-100 via-white to-gray-100 p-6 pt-6 px-80">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-800">
              Welcome, <span className="text-blue-600">{user?.email}</span>
            </h1>
            <button
              onClick={onLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
            >
              Logout
            </button>
          </div>

          {error && <p className="text-red-600 mb-4">{error}</p>}

          {/* Task Summary */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
            <div className="bg-white rounded shadow p-4 text-center">
              <h2 className="text-lg font-semibold text-gray-700">Total</h2>
              <p className="text-2xl font-bold">{tasks.length}</p>
            </div>
            <div className="bg-yellow-100 rounded shadow p-4 text-center">
              <h2 className="text-lg font-semibold text-yellow-800">Pending</h2>
              <p className="text-2xl font-bold">{pendingCount}</p>
            </div>
            <div className="bg-green-100 rounded shadow p-4 text-center">
              <h2 className="text-lg font-semibold text-green-800">Completed</h2>
              <p className="text-2xl font-bold">{completedCount}</p>
            </div>
          </div>

          {/* Task List */}
          <div className="bg-white rounded shadow p-4 mb-6">
            <h2 className="text-xl font-semibold text-blue-600 mb-4">Your Tasks</h2>
            {loading ? (
              <p>Loading tasks...</p>
            ) : tasks.length === 0 ? (
              <p className="text-gray-600">No tasks assigned yet.</p>
            ) : (
              <ul className="space-y-4">
                {tasks.map((task) => (
                  <li key={task._id} className="border-b pb-2">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">{task.title}</p>
                        <p className="text-sm text-gray-600">{task.description || "No description"}</p>
                      </div>
                      <div>
                        {task.completed ? (
                          <span className="text-green-600 font-semibold">Completed</span>
                        ) : (
                          <button
                            onClick={() => markComplete(task._id)}
                            className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded text-sm"
                            disabled={loading}
                          >
                            Mark Complete
                          </button>
                        )}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
