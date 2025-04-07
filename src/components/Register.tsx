import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';

interface RegisterFormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const Register = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<RegisterFormData>();

  const navigate = useNavigate();
  const password = watch('password');

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const onSubmit = async (data: RegisterFormData) => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', data);
      const { token, expireTime } = response.data;
      const expirationTime = new Date().getTime() + expireTime * 1000;
      localStorage.setItem('token', token);
      localStorage.setItem('expirationTime', expirationTime.toString());
      navigate('/dashboard');
    } catch (error: any) {
      console.error('Registration error:', error.response?.data || error.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen px-4 py-10 bg-white">
      <div className="w-full sm:max-w-md p-8 space-y-6 bg-white rounded-2xl shadow-2xl">
        <h2 className="text-4xl font-extrabold text-indigo-700 font-serif text-left">Register</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 font-serif">

          {/* Username */}
          <div className="relative">
            <label className="block text-lg font-medium text-gray-800 mb-1 text-left">Username</label>
            <div className="relative">
              <input
                type="text"
                {...register('username', {
                  required: 'Username is required',
                  minLength: { value: 3, message: 'At least 3 characters' }
                })}
                className={`w-full pl-10 pr-4 py-2 border rounded-lg shadow-sm text-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${errors.username ? 'border-red-500' : 'border-gray-300'}`}
              />
              <FaUser className="absolute left-3 top-3.5 text-gray-500 text-lg" />
            </div>
            {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>}
          </div>

          {/* Email */}
          <div className="relative">
            <label className="block text-lg font-medium text-gray-800 mb-1 text-left">Email</label>
            <div className="relative">
              <input
                type="email"
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: 'Enter a valid email'
                  }
                })}
                className={`w-full pl-10 pr-4 py-2 border rounded-lg shadow-sm text-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
              />
              <FaEnvelope className="absolute left-3 top-3.5 text-gray-500 text-lg" />
            </div>
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>

          {/* Password */}
          <div className="relative">
            <label className="block text-lg font-medium text-gray-800 mb-1 text-left">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                {...register('password', {
                  required: 'Password is required',
                  minLength: { value: 8, message: 'Minimum 8 characters' },
                  validate: value =>
                    [/[A-Z]/, /[a-z]/, /[0-9]/, /[^A-Za-z0-9]/].every(pattern => pattern.test(value)) ||
                    'Must include uppercase, lowercase, number, and symbol'
                })}
                className={`w-full pl-10 pr-10 py-2 border rounded-lg shadow-sm text-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
              />
              <FaLock className="absolute left-3 top-3.5 text-gray-500 text-lg" />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3.5 text-gray-500 cursor-pointer text-lg"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <label className="block text-lg font-medium text-gray-800 mb-1 text-left">Confirm Password</label>
            <div className="relative">
              <input
                type={showConfirm ? 'text' : 'password'}
                {...register('confirmPassword', {
                  required: 'Confirm your password',
                  validate: value => value === password || 'Passwords do not match'
                })}
                className={`w-full pl-10 pr-10 py-2 border rounded-lg shadow-sm text-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'}`}
              />
              <FaLock className="absolute left-3 top-3.5 text-gray-500 text-lg" />
              <span
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-3 top-3.5 text-gray-500 cursor-pointer text-lg"
              >
                {showConfirm ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-lg rounded-lg shadow-md transition-all duration-200 ease-in-out"
          >
            Register
          </button>
        </form>

        <div className="text-sm text-gray-700 text-left">
          Already have an account?{' '}
          <Link to="/login" className="text-indigo-600 hover:underline font-medium">Login</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
