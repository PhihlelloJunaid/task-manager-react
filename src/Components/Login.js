import React, { useState } from "react";

const Login = ({ onRegisterClick, onLoginSuccess }) => {
  const colors = {
    primary: 'bg-indigo-600 hover:bg-indigo-700 text-white',
    secondary: 'bg-white hover:bg-gray-100 text-indigo-600',
    error: 'text-red-500 bg-red-50',
    card: 'bg-white bg-opacity-90 backdrop-blur-sm',
    text: 'text-gray-700',
    header: 'text-blue-900' // header stays blue
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    if (!email.includes('@')) {
      setError("Please enter a valid email");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }
    setError("");
    onLoginSuccess();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-200 to-blue-100 flex flex-col items-center justify-center p-4">
      <h1 className={`text-3xl font-bold mb-2 ${colors.header}`}>Task Management System</h1>
      <p className={`text-lg mb-8 ${colors.header}`}>Welcome back! Please log in</p>

      <div className={`w-full max-w-md ${colors.card} rounded-xl shadow-xl p-8`}>
        <form onSubmit={handleLogin} className="space-y-5">
          <div className="space-y-4">
            <div className="space-y-1">
              <label className={`block text-sm font-medium ${colors.text}`}>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError("");
                }}
                className={`w-full px-4 py-3 border ${
                  error && !email.includes('@') ? 'border-red-500' : 'border-gray-300'
                } rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                placeholder="your@email.com"
              />
            </div>

            <div className="space-y-1">
              <label className={`block text-sm font-medium ${colors.text}`}>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError("");
                }}
                className={`w-full px-4 py-3 border ${
                  error && password.length < 6 ? 'border-red-500' : 'border-gray-300'
                } rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                placeholder="••••••••"
              />
            </div>
          </div>

          {error && (
            <div className={`p-3 rounded-lg ${colors.error}`}>
              {error}
            </div>
          )}

          <button
            type="submit"
            className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${colors.primary}`}
          >
            Log In
          </button>
        </form>

        <div className="flex items-center my-6">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="mx-4 text-gray-500">or</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        <button
          type="button"
          className={`w-full py-3 px-4 rounded-lg font-medium transition-colors border border-gray-300 ${colors.secondary}`}
        >
          Continue with Google
        </button>

        <div className={`mt-6 text-center text-sm ${colors.text}`}>
          Don't have an account?{" "}
          <button
            onClick={onRegisterClick}
            className={`font-medium text-indigo-600 hover:text-indigo-800 hover:underline`}
          >
            Register here
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
