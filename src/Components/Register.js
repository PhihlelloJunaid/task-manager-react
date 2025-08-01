import React, { useState } from "react";

const Register = ({ onLoginClick, onRegisterSuccess }) => {
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    idNumber: "",
    studentNumber: "",
    phone: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: ""
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.surname) newErrors.surname = "Surname is required";
    if (!formData.idNumber) newErrors.idNumber = "ID/Passport is required";
    if (!formData.studentNumber) newErrors.studentNumber = "Student number is required";
    if (!formData.phone) newErrors.phone = "Phone number is required";
    if (!formData.email.includes('@')) newErrors.email = "Valid email required";
    if (formData.username.length < 4) newErrors.username = "Username too short";
    if (formData.password.length < 8) newErrors.password = "Password must be 8+ characters";
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Passwords don't match";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onRegisterSuccess();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-gray-800 bg-opacity-80 rounded-xl p-8 shadow-2xl border border-white border-opacity-10 backdrop-blur-sm">
        <h2 className="text-2xl font-bold text-white mb-6">Create Account</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Personal Information */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-300 text-sm mb-1">Name*</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full bg-gray-700 bg-opacity-70 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 border border-gray-600"
                required
              />
              {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
            </div>
            
            <div>
              <label className="block text-gray-300 text-sm mb-1">Surname*</label>
              <input
                type="text"
                name="surname"
                value={formData.surname}
                onChange={handleChange}
                className="w-full bg-gray-700 bg-opacity-70 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 border border-gray-600"
                required
              />
              {errors.surname && <p className="text-red-400 text-xs mt-1">{errors.surname}</p>}
            </div>
          </div>

          {/* ID and Student Info */}
          <div>
            <label className="block text-gray-300 text-sm mb-1">ID/Passport Number*</label>
            <input
              type="text"
              name="idNumber"
              value={formData.idNumber}
              onChange={handleChange}
              className="w-full bg-gray-700 bg-opacity-70 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 border border-gray-600"
              required
            />
            {errors.idNumber && <p className="text-red-400 text-xs mt-1">{errors.idNumber}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-300 text-sm mb-1">Student Number*</label>
              <input
                type="text"
                name="studentNumber"
                value={formData.studentNumber}
                onChange={handleChange}
                className="w-full bg-gray-700 bg-opacity-70 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 border border-gray-600"
                required
              />
              {errors.studentNumber && <p className="text-red-400 text-xs mt-1">{errors.studentNumber}</p>}
            </div>

            <div>
              <label className="block text-gray-300 text-sm mb-1">Phone Number*</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full bg-gray-700 bg-opacity-70 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 border border-gray-600"
                required
              />
              {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone}</p>}
            </div>
          </div>

          {/* Account Information */}
          <div>
            <label className="block text-gray-300 text-sm mb-1">Email*</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-gray-700 bg-opacity-70 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 border border-gray-600"
              required
            />
            {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
          </div>

          <div>
            <label className="block text-gray-300 text-sm mb-1">Username*</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full bg-gray-700 bg-opacity-70 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 border border-gray-600"
              required
            />
            {errors.username && <p className="text-red-400 text-xs mt-1">{errors.username}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-300 text-sm mb-1">Password*</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full bg-gray-700 bg-opacity-70 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 border border-gray-600"
                required
              />
              {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password}</p>}
            </div>

            <div>
              <label className="block text-gray-300 text-sm mb-1">Confirm Password*</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full bg-gray-700 bg-opacity-70 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 border border-gray-600"
                required
              />
              {errors.confirmPassword && <p className="text-red-400 text-xs mt-1">{errors.confirmPassword}</p>}
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white py-3 px-4 rounded-lg font-bold transition-all transform hover:scale-[1.01] shadow-lg mt-4"
          >
            Register
          </button>
        </form>

        <div className="mt-6 text-center text-gray-400">
          Already have an account?{" "}
          <button
            onClick={onLoginClick}
            className="text-purple-300 hover:text-purple-200 font-medium hover:underline"
          >
            Login Here
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;