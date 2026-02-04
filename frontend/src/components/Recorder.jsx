import React, { useState } from "react";
import useSpeechRecognition from "../hooks/useSpeechRecognition";

const Recorder = ({ onSubmit }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    isListening,
    transcript,
    isSupported,
    startListening,
    stopListening,
    resetTranscript,
  } = useSpeechRecognition();

  const handleSubmit = async () => {
    if (!transcript.trim()) {
      // Please record an answer before submitting
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit(transcript);
      resetTranscript();
    } catch (error) {
      console.error("Error submitting answer:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isSupported) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
        <p>
          Your browser does not support speech recognition. Please use Chrome or
          Edge for the best experience.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <div className="flex items-center justify-center mb-6">
        <div className="bg-indigo-100 text-indigo-800 w-10 h-10 rounded-full flex items-center justify-center mr-3">
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
              d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
            ></path>
          </svg>
        </div>
        <h3 className="text-lg sm:text-xl font-semibold text-gray-800">
          Record Your Answer
        </h3>
      </div>

      <div className="mb-6">
        <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl p-5 min-h-[120px]">
          {transcript ? (
            <p className="text-gray-800 break-words text-base leading-relaxed">
              {transcript}
            </p>
          ) : (
            <p className="text-gray-500 italic text-base">
              Your spoken answer will appear here...
            </p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        {!isListening ? (
          <button
            onClick={startListening}
            className="bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 px-6 rounded-xl hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-4 focus:ring-green-300 focus:ring-offset-2 text-base font-medium active:scale-95 transition-transform shadow-md hover:shadow-lg flex items-center justify-center"
            onTouchStart={(e) => e.currentTarget.classList.add("scale-95")}
            onTouchEnd={(e) => e.currentTarget.classList.remove("scale-95")}
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
              ></path>
            </svg>
            Start Recording
          </button>
        ) : (
          <button
            onClick={stopListening}
            className="bg-gradient-to-r from-red-500 to-red-600 text-white py-3 px-6 rounded-xl hover:from-red-600 hover:to-red-700 focus:outline-none focus:ring-4 focus:ring-red-300 focus:ring-offset-2 text-base font-medium active:scale-95 transition-transform shadow-md hover:shadow-lg flex items-center justify-center"
            onTouchStart={(e) => e.currentTarget.classList.add("scale-95")}
            onTouchEnd={(e) => e.currentTarget.classList.remove("scale-95")}
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 10a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z"
              ></path>
            </svg>
            Stop Recording
          </button>
        )}

        <button
          onClick={handleSubmit}
          disabled={isSubmitting || !transcript.trim()}
          className={`py-3 px-6 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-300 focus:ring-offset-2 text-base font-medium active:scale-95 transition-transform shadow-md hover:shadow-lg flex items-center justify-center ${
            isSubmitting || !transcript.trim()
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-gradient-to-r from-blue-600 to-indigo-700 text-white hover:from-blue-700 hover:to-indigo-800"
          }`}
          onTouchStart={(e) =>
            !isSubmitting &&
            !!transcript.trim() &&
            e.currentTarget.classList.add("scale-95")
          }
          onTouchEnd={(e) => e.currentTarget.classList.remove("scale-95")}
        >
          {isSubmitting ? (
            <>
              <svg
                className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Submitting...
            </>
          ) : (
            <>
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                ></path>
              </svg>
              Submit Answer
            </>
          )}
        </button>
      </div>

      {isListening && (
        <div className="mt-4 flex items-center justify-center">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse mr-2"></div>
            <span className="text-red-500 font-medium">
              Recording... Speak now
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Recorder;
