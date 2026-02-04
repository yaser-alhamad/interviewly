import React, { useEffect, useState, useRef } from "react";

const QuestionPlayer = ({ sessionId }) => {
  const [question, setQuestion] = useState("");
  const fetchCountRef = useRef(0);

  const fetchQuestion = async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/interview/question?session_id=${sessionId}`,
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setQuestion(data.question);
      fetchCountRef.current += 1; // Increment fetch count to trigger any dependent updates
    } catch (error) {
      console.error("Error fetching question:", error);
      // Failed to load question. Please try again.
    }
  };

  useEffect(() => {
    // Fetch question when component mounts or sessionId changes
    fetchQuestion();
  }, [sessionId]);

  // Expose the fetchQuestion function via a ref so parent can call it
  useEffect(() => {
    // Store the fetchQuestion function in a ref accessible by parent components
    window.questionPlayerRefresh = fetchQuestion;
  }, [fetchQuestion]);

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl shadow-inner p-6 mb-6 border border-blue-100">
      <div className="flex items-center justify-center mb-4">
        <div className="bg-blue-100 text-blue-800 w-10 h-10 rounded-full flex items-center justify-center mr-3">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
            ></path>
          </svg>
        </div>
        <h3 className="text-lg sm:text-xl font-semibold text-gray-800">
          Interview Question
        </h3>
      </div>
      <div className="flex items-center justify-center min-h-[120px] sm:min-h-[140px] bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <p className="text-gray-800 text-lg sm:text-xl text-center break-words leading-relaxed">
          {question || "Loading question..."}
        </p>
      </div>
    </div>
  );
};

export default QuestionPlayer;
