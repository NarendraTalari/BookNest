import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    let payload = { name, email, password };

    axios
      .post("http://localhost:4000/signup", payload)
      .then((result) =>{
        alert('Account created')
        console.log(result)
        navigate('/login')
      })
      .catch((err) => {
        console.log(err);
        alert("Failed to create an account");
      });
  };

  let formHandle1 = (e) => {
    e.preventDefault();
    navigate("/");
  };

  return (
    <div>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-white to-blue-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="relative max-w-md w-full bg-white/80 backdrop-blur-md p-10 rounded-2xl shadow-2xl border border-indigo-100 overflow-hidden">
          {/* Decorative blurred background */}
          <div className="absolute -z-10 -top-10 -right-10 w-40 h-40 bg-indigo-400 opacity-20 rounded-full blur-2xl"></div>
          <div className="absolute -z-10 -bottom-10 -left-10 w-40 h-40 bg-blue-300 opacity-20 rounded-full blur-2xl"></div>

          <div className="mb-8 text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-2 tracking-tight drop-shadow-sm">
              Create your account
            </h2>
            <p className="text-gray-500 text-sm">Join us and start your reading journey!</p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Name Input */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                name="name"
                type="text"
                autoComplete="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 p-3 block w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 bg-white/90 shadow-sm transition"
                placeholder="Name"
                required
              />
            </div>
            {/* Email Input */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email address
              </label>
              <input
                name="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 p-3 block w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 bg-white/90 shadow-sm transition"
                placeholder="Email address"
                required
              />
            </div>
            {/* Password Input */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 p-3 block w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 bg-white/90 shadow-sm transition"
                placeholder="Password"
              />
            </div>
            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-3 px-4 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:ring-offset-2 transition-all duration-300 text-lg"
              >
                Sign up
              </button>
            </div>
          </form>

          <div className="mt-6 text-center">
            <span className="text-gray-600 text-sm">Already have an account?</span>
            <button
              onClick={formHandle1}
              className="ml-2 text-indigo-600 font-semibold hover:underline focus:outline-none focus:ring-2 focus:ring-indigo-300 rounded transition-all duration-200 text-sm"
            >
              Log in
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
