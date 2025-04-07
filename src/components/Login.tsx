import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { FiUser, FiMail, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';

interface FormData {
  username: string;
  email: string;
  password: string;
}

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/dashboard');
    }
  }, [navigate]);

  const onSubmit = async (data: FormData) => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', data);
      const { token, expireTime } = response.data;
      const expirationTime = new Date().getTime() + expireTime * 1000;

      localStorage.setItem('token', token);
      localStorage.setItem('expirationTime', expirationTime.toString());
      navigate('/dashboard');
    } catch (error) {
      console.error("Login failed", error);
      alert("Login failed, please check your credentials.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen px-4 py-10 bg-white">
      <div className="w-[100%] sm:max-w-md p-8 space-y-8 bg-white rounded-2xl shadow-2xl">
        <h2 className="text-4xl font-extrabold text-indigo-700 font-serif text-left">Login</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 font-serif">

          {/* Username */}
          <div>
            <label htmlFor="username" className="block text-lg font-medium text-gray-800 mb-1 text-left">Username</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                <FiUser />
              </span>
              <input
                id="username"
                type="text"
                {...register('username', { required: 'Username is required' })}
                className={`w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-lg ${errors.username ? 'border-red-500' : ''}`}
              />
            </div>
            {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-lg font-medium text-gray-800 mb-1 text-left">Email</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                <FiMail />
              </span>
              <input
                id="email"
                type="email"
                {...register('email', { required: 'Email is required' })}
                className={`w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-lg ${errors.email ? 'border-red-500' : ''}`}
              />
            </div>
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-lg font-medium text-gray-800 mb-1 text-left">Password</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                <FiLock />
              </span>
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                {...register('password', { required: 'Password is required' })}
                className={`w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-lg ${errors.password ? 'border-red-500' : ''}`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-lg rounded-lg shadow-md transition-all duration-200 ease-in-out"
          >
            Login
          </button>
        </form>

        {/* Register Link */}
        <div className="text-sm text-gray-700 text-left">
          Don&apos;t have an account?{' '}
          <Link to="/register" className="text-indigo-600 hover:underline font-medium">Register</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
