import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminDashboard({  onLogout }) {
  const [employees, setEmployees] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [newEmpEmail, setNewEmpEmail] = useState("");
  const [newEmpPassword, setNewEmpPassword] = useState("");
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskAssignedTo, setTaskAssignedTo] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchEmployees();
    fetchTasks();
  }, []);

  const fetchEmployees = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/auth/employees");
      setEmployees(res.data.employees);
    } catch {
      setError("Failed to load employees");
    }
  };

  const fetchTasks = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/tasks");
      setTasks(res.data.tasks);
    } catch {
      setError("Failed to load tasks");
    }
  };

  const handleAddEmployee = async () => {
    setError("");
    if (!newEmpEmail || !newEmpPassword) {
      setError("Please fill employee email and password");
      return;
    }
    try {
      setLoading(true);
      await axios.post("http://localhost:5000/api/auth/employee", {
        email: newEmpEmail,
        password: newEmpPassword,
      });
      setNewEmpEmail("");
      setNewEmpPassword("");
      fetchEmployees();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add employee");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteEmployee = async (id) => {
    if (!window.confirm("Delete this employee?")) return;
    try {
      setLoading(true);
      await axios.delete(`http://localhost:5000/api/auth/employee/${id}`);
      fetchEmployees();
      fetchTasks();
    } catch {
      setError("Failed to delete employee");
    } finally {
      setLoading(false);
    }
  };

  const handleAssignTask = async () => {
    setError("");
    if (!taskTitle || !taskAssignedTo) {
      setError("Fill task title and select employee");
      return;
    }
    try {
      setLoading(true);
      await axios.post("http://localhost:5000/api/tasks", {
        title: taskTitle,
        description: taskDescription,
        assignedTo: taskAssignedTo,
      });
      setTaskTitle("");
      setTaskDescription("");
      setTaskAssignedTo("");
      fetchTasks();
    } catch {
      setError("Failed to assign task");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteTask = async (id) => {
    if (!window.confirm("Delete this task?")) return;
    try {
      setLoading(true);
      await axios.delete(`http://localhost:5000/api/tasks/${id}`);
      fetchTasks();
    } catch {
      setError("Failed to delete task");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Left colored side */}
      <div className="w-40 bg-slate-600"></div>

      {/* Center content area */}
      <div className="flex-grow max-w-5xl mx-auto p-6 bg-white shadow-lg rounded-lg">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Welcome, Admin</h1>
          <button
            onClick={onLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
          >
            Logout
          </button>
        </div>

        {error && (
          <p className="text-red-600 font-medium mb-4">
            <b>Error: </b> {error}
          </p>
        )}

        {/* Add Employee */}
        <section className="bg-white shadow rounded p-4 mb-6">
          <h2 className="text-xl font-semibold mb-4 text-blue-600">Add Employee</h2>
          <div className="flex flex-wrap gap-3">
            <input
              type="email"
              required
              placeholder="Employee Email"
              value={newEmpEmail}
              onChange={(e) => setNewEmpEmail(e.target.value)}
              className="border border-gray-300 rounded px-3 py-2 w-full sm:w-auto"
            />
            <input
              type="password"
              placeholder="Password"
              value={newEmpPassword}
              onChange={(e) => setNewEmpPassword(e.target.value)}
              className="border border-gray-300 rounded px-3 py-2 w-full sm:w-auto"
            />
            <button
              onClick={handleAddEmployee}
              disabled={loading}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
            >
              Add
            </button>
          </div>
        </section>

        {/* Assign Task */}
        <section className="bg-white shadow rounded p-4 mb-6">
          <h2 className="text-xl font-semibold mb-4 text-green-600">Assign Task</h2>
          <div className="flex flex-wrap gap-3">
            <input
              type="text"
              placeholder="Task Title"
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
              className="border border-gray-300 rounded px-3 py-2 w-full sm:w-auto"
            />
            <input
              type="text"
              placeholder="Description (optional)"
              value={taskDescription}
              onChange={(e) => setTaskDescription(e.target.value)}
              className="border border-gray-300 rounded px-3 py-2 w-full sm:w-auto"
            />
            <select
              value={taskAssignedTo}
              onChange={(e) => setTaskAssignedTo(e.target.value)}
              className="border border-gray-300 rounded px-3 py-2 w-full sm:w-auto"
            >
              <option value="">Select Employee</option>
              {employees.map((emp) => (
                <option key={emp._id} value={emp._id}>
                  {emp.email}
                </option>
              ))}
            </select>
            <button
              onClick={handleAssignTask}
              disabled={loading}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
            >
              Assign
            </button>
          </div>
        </section>

        {/* Employees and Tasks */}
        <section className="bg-white shadow rounded p-4">
          <h2 className="text-xl font-semibold mb-4 text-purple-600">Employees & Tasks</h2>
          {employees.length === 0 ? (
            <p>No employees added yet.</p>
          ) : (
            <ul className="space-y-6">
              {employees.map((emp) => (
                <li key={emp._id}>
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-gray-800">{emp.email}</span>
                    <button
                      onClick={() => handleDeleteEmployee(emp._id)}
                      className="text-red-500 hover:underline text-sm"
                      disabled={loading}
                    >
                      Delete Employee
                    </button>
                  </div>

                  <ul className="ml-4 mt-2 list-disc text-sm">
                    {tasks
                      .filter((t) => t.assignedTo._id === emp._id)
                      .map((task) => (
                        <li key={task._id} className="mt-1">
                          <span className="font-medium">{task.title}</span>{" "}
                          {task.completed ? (
                            <span className="text-green-500">[Completed]</span>
                          ) : (
                            <span className="text-yellow-600">[Pending]</span>
                          )}
                          <button
                            onClick={() => handleDeleteTask(task._id)}
                            disabled={loading}
                            className="ml-2 text-red-500 hover:underline text-xs"
                          >
                            Delete Task
                          </button>
                        </li>
                      ))}
                  </ul>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>

      {/* Right colored side */}
      <div className="w-40 bg-slate-600"></div>
    </div>
  );
}
