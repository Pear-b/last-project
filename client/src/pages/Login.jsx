import { useState } from 'react';
import axios from 'axios';

export default function Login({ setUser }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');

    try {
      const adminRes = await axios.post('http://localhost:5000/api/auth/admin/login', { email, password });
      if (adminRes.data.success) {
        setUser({ role: 'admin', email });
        return;
      }
    } catch {
      // Optionally set an error or log it, but continue to employee login attempt
    }

    try {
      const empRes = await axios.post('http://localhost:5000/api/auth/employee/login', { email, password });
      if (empRes.data.success) {
        setUser({ role: 'employee', email, id: empRes.data.employeeId });
      } else {
        setError('Invalid credentials');
      }
    } catch {
      setError('Invalid credentials');
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-300 px-4 py-8 relative'>
      {/* Left panel */}
      <div className='absolute top-0 left-0 h-full w-[25%] bg-slate-800 text-white p-10 flex flex-col items-center justify-center z-10'>
        <img src='eee.png' alt='logo' className='rounded-lg shadow-md mb-6 w-32 h-32 object-cover' />
        <p className='text-sm italic text-center'>
          “Success is the sum of small efforts, repeated day in and day out.”
        </p>
      </div>

      {/* Right panel */}
      <div className='absolute top-0 right-0 h-full w-[25%] bg-slate-800 text-white p-10 flex flex-col justify-center z-10 space-y-4'>
        <h3 className='text-2xl font-semibold'>Why Choose Us?</h3>
        <ul className='text-sm space-y-2'>
          <li>✔️ Manage employees efficiently</li>
          <li>✔️ Assign and track tasks seamlessly</li>
          <li>✔️ Secure and reliable platform</li>
          <li>✔️ Easy-to-use interface</li>
        </ul>
      </div>

      {/* Center login box */}
      <div className='z-20 w-full max-w-md bg-white p-10 rounded-xl shadow-2xl'>
        <h2 className='text-2xl font-bold text-center mb-4'>Welcome</h2>
        <p className='text-center text-sm text-gray-600 mb-6'>Please login to access your dashboard</p>

        <form onSubmit={handleSubmit} className='space-y-4'>
          <input
            type='email'
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            placeholder='Email'
            className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
          />
          <input
            type='password'
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            placeholder='Password'
            className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
          />
          <button
            type='submit'
            className='w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200'
          >
            Login
          </button>
          {error && (
            <p className='text-red-600 text-sm text-center'>{error}</p>
          )}
        </form>

        <p className='text-center text-sm text-gray-600 mt-4'>
          Forgot your password?{' '}
          <button
            onClick={() => alert('Please contact your admin or tech support')}
            className='text-blue-500 hover:underline'
          >
            Click here
          </button>
        </p>
      </div>
    </div>
  );
}
