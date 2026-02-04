import React from "react";

const Feedback = ({ feedback, role, seniority, onReset }) => {
  const {
    overall_score,
    strengths,
    weaknesses,
    question_feedback,
    feedback_summary,
  } = feedback;

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
          Interview Complete!
        </h2>
        <p className="text-lg text-gray-600">
          {role} Position ({seniority} Level)
        </p>
      </div>

      {/* Overall Score Card */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 shadow-inner border border-blue-100">
          <div className="text-center">
            <div className="text-5xl md:text-6xl font-bold text-blue-700 mb-3">
              {overall_score}/10
            </div>
            <div className="text-gray-700 font-semibold text-xl">
              Overall Score
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-6 shadow-inner border border-indigo-100">
          <h3 className="font-bold text-xl text-gray-800 mb-4 text-center">
            Your Performance Summary
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-center">
              <div className="bg-indigo-100 text-indigo-800 px-4 py-2 rounded-full text-sm font-medium">
                <span className="font-semibold">Your Potential:</span>{" "}
                {feedback_summary}
              </div>
            </div>
            <p className="text-center text-gray-700 text-sm mt-2">
              Consider this feedback as you prepare for future interviews
            </p>
          </div>
        </div>
      </div>

      {/* Strengths and Weaknesses */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200">
          <h3 className="font-bold text-xl text-green-800 mb-4 flex items-center justify-center">
            <svg
              className="w-6 h-6 mr-2"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            Key Strengths
          </h3>
          <ul className="space-y-3">
            {strengths.map((strength, index) => (
              <li key={index} className="flex items-start">
                <span className="text-green-500 mr-3 mt-1 flex-shrink-0">
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
                <span className="text-green-700 text-base">{strength}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-6 border border-amber-200">
          <h3 className="font-bold text-xl text-amber-800 mb-4 flex items-center justify-center">
            <svg
              className="w-6 h-6 mr-2"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            Areas for Improvement
          </h3>
          <ul className="space-y-3">
            {weaknesses.map((weakness, index) => (
              <li key={index} className="flex items-start">
                <span className="text-amber-500 mr-3 mt-1 flex-shrink-0">
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
                <span className="text-amber-700 text-base">{weakness}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Question-by-question Feedback */}
      <div className="mb-10">
        <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center pb-2 border-b border-gray-200">
          Detailed Question Feedback
        </h3>
        <div className="space-y-6">
          {question_feedback.map((item, index) => (
            <div
              key={index}
              className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-5 shadow-sm border border-blue-100"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-3">
                <h4 className="font-semibold text-gray-900 text-lg flex-1">
                  <span className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-sm font-bold px-3 py-1.5 rounded-full mr-3">
                    Q{index + 1}
                  </span>
                  {item.question}
                </h4>
                <div className="flex items-center bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-3 py-1.5 rounded-full font-bold">
                  {item.score}/10
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h5 className="font-semibold text-gray-800 mb-2 text-base flex items-center">
                    <svg
                      className="w-4 h-4 mr-2 text-blue-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      ></path>
                    </svg>
                    Your Answer:
                  </h5>
                  <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                    <p className="text-gray-800 italic">"{item.answer}"</p>
                  </div>
                </div>

                <div>
                  <h5 className="font-semibold text-gray-800 mb-2 text-base flex items-center">
                    <svg
                      className="w-4 h-4 mr-2 text-indigo-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      ></path>
                    </svg>
                    Feedback:
                  </h5>
                  <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                    <p className="text-gray-800">{item.feedback}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Reset Button */}
      <div className="flex justify-center">
        <button
          onClick={onReset}
          className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-4 px-8 rounded-xl hover:from-blue-700 hover:to-indigo-800 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all duration-200 shadow-lg hover:shadow-xl w-full max-w-xs active:scale-95 font-semibold text-lg"
          onTouchStart={(e) => e.currentTarget.classList.add("scale-95")}
          onTouchEnd={(e) => e.currentTarget.classList.remove("scale-95")}
        >
          Start New Interview
        </button>
      </div>
    </div>
  );
};

export default Feedback;
