import { useState } from 'react';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import EmployeeDashboard from './pages/EmployeeDashboard';

export default function App() {
  const [user, setUser] = useState(null); // {role, email, id}

  const handleLogout = () => {
    setUser(null);
  };

  if (!user) return <Login setUser={setUser} />;

  if (user.role === 'admin') {
    return <AdminDashboard user={user} onLogout={handleLogout} />;
  }

  if (user.role === 'employee') {
    return <EmployeeDashboard user={user} onLogout={handleLogout} />;
  }

  return <div>Unknown role</div>;
}
