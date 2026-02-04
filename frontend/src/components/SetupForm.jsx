import React, { useState } from "react";

const SetupForm = ({ onStart }) => {
  const [formData, setFormData] = useState({
    role: "",
    seniority: "Mid",
    numQuestions: 5,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onStart(formData);
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Configure Your Interview
        </h2>
        <p className="text-gray-600">
          Customize your practice session to match your specific needs
        </p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="role"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Job Role
          </label>
          <input
            type="text"
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base shadow-sm"
            placeholder="e.g., Software Engineer, Product Manager"
          />
        </div>

        <div>
          <label
            htmlFor="seniority"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Seniority Level
          </label>
          <select
            id="seniority"
            name="seniority"
            value={formData.seniority}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base shadow-sm"
          >
            <option value="Junior">Junior</option>
            <option value="Mid">Mid</option>
            <option value="Senior">Senior</option>
            <option value="Staff">Staff</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="numQuestions"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Number of Questions
          </label>
          <input
            type="number"
            id="numQuestions"
            name="numQuestions"
            min="1"
            max="20"
            value={formData.numQuestions}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base shadow-sm"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-4 px-6 rounded-xl hover:from-blue-700 hover:to-indigo-800 focus:outline-none focus:ring-4 focus:ring-blue-300 focus:ring-offset-2 text-base font-semibold mt-4 active:scale-95 transition-all duration-200 shadow-md hover:shadow-lg"
          onTouchStart={(e) => e.currentTarget.classList.add("scale-95")}
          onTouchEnd={(e) => e.currentTarget.classList.remove("scale-95")}
        >
          Start Interview Session
        </button>
      </form>
    </div>
  );
};

export default SetupForm;
