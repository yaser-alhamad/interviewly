import React, { useState } from "react";
import SetupForm from "./components/SetupForm";
import QuestionPlayer from "./components/QuestionPlayer";
import Recorder from "./components/Recorder";
import Feedback from "./components/Feedback";
import Welcome from "./components/Welcome";
import ChoosePlan from "./components/ChoosePlan";

const API_BASE_URL = "http://localhost:8000";

function App() {
  const [step, setStep] = useState(null); // Initialize step to null to show Welcome screen first
  const [sessionId, setSessionId] = useState(null);
  const [role, setRole] = useState("");
  const [seniority, setSeniority] = useState("");
  const [numQuestions, setNumQuestions] = useState(5);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [feedback, setFeedback] = useState(null);

  // Handlers for ChoosePlan component buttons
  const handleSubscribeMonthly = () => {
    setStep("setup"); // Transition to setup after subscribing
  };

  const handleSubscribeAnnual = () => {
    setStep("setup"); // Transition to setup after subscribing
  };

  const startInterview = async (interviewData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/interview/start`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(interviewData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setSessionId(data.session_id);
      setRole(interviewData.role);
      setSeniority(interviewData.seniority);
      setNumQuestions(interviewData.numQuestions);
      setTotalQuestions(interviewData.numQuestions);
      setStep("interview"); // Transition to interview step
    } catch (error) {
      console.error("Error starting interview:", error);
      // Failed to start interview. Please try again.
    }
  };

  const submitAnswer = async (answer) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/interview/answer?session_id=${sessionId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ answer }),
        },
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Move to next question or finish interview
      if (currentQuestionIndex + 1 >= totalQuestions) {
        // Interview completed, get feedback
        setTimeout(async () => {
          try {
            const feedbackResponse = await fetch(
              `${API_BASE_URL}/interview/feedback?session_id=${sessionId}`,
            );
            if (!feedbackResponse.ok) {
              throw new Error(`HTTP error! status: ${feedbackResponse.status}`);
            }
            const feedbackData = await feedbackResponse.json();
            setFeedback(feedbackData);
            setStep("feedback");
          } catch (error) {
            console.error("Error getting feedback:", error);
            // Interview completed, but failed to get feedback. Please try again.
          }
        }, 1000); // Small delay to allow backend to process
      } else {
        setCurrentQuestionIndex((prev) => prev + 1);
        // Refresh the question after updating the index
        setTimeout(() => {
          if (window.questionPlayerRefresh) {
            window.questionPlayerRefresh();
          }
        }, 100); // Small delay to ensure the state update has occurred
      }
    } catch (error) {
      console.error("Error submitting answer:", error);
      // Failed to submit answer. Please try again.
    }
  };

  const resetInterview = () => {
    setStep("setup"); // Reset to setup
    setSessionId(null);
    setCurrentQuestionIndex(0);
    setFeedback(null);
  };

  // Handlers for Welcome screen buttons
  const handleStartFreeTrial = () => {
    setStep("choose-plan"); // Transition to choose-plan from welcome
  };

  const handleSignIn = () => {
    console.log("Sign in clicked");
    // Implement sign-in logic or navigate to a sign-in screen
  };

  const handlePricing = () => {
    console.log("Pricing clicked");
    // Implement navigation to pricing page or modal
  };

  return (
    <div className="App min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      {/* Render Welcome component if step is null */}
      {step === null && (
        <Welcome
          onStartFreeTrial={handleStartFreeTrial}
          onSignIn={handleSignIn}
          onPricing={handlePricing}
        />
      )}

      {/* Render Choose Plan component */}
      {step === "choose-plan" && (
        <ChoosePlan
          onStartFreeTrial={() => setStep("setup")} // Free trial goes to setup
          onSubscribeMonthly={handleSubscribeMonthly}
          onSubscribeAnnual={handleSubscribeAnnual}
        />
      )}

      {/* Render Setup, Interview, or Feedback screens */}
      {(step === "setup" || step === "interview" || step === "feedback") && (
        <>
          <header className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-4 sticky top-0 z-10 shadow-lg">
            <div className="container mx-auto max-w-4xl flex justify-between items-center">
              <h1 className="text-xl md:text-2xl font-bold text-center flex items-center">
                <svg
                  className="w-8 h-8 mr-2"
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
                Interviewly
              </h1>
              <div className="flex items-center space-x-4">
                <span className="hidden md:block text-sm opacity-90">
                  {role ? `${role} (${seniority})` : "Ready to Interview"}
                </span>
              </div>
            </div>
          </header>
          <main className="container mx-auto px-4 py-6 max-w-4xl">
            {step === "setup" && <SetupForm onStart={startInterview} />}

            {step === "interview" && sessionId && (
              <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 transition-all duration-300">
                <div className="mb-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-4">
                    <h2 className="text-lg md:text-xl font-bold text-gray-800">
                      {role} Interview ({seniority})
                    </h2>
                    <div className="flex items-center justify-center bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                      Question {currentQuestionIndex + 1} of {totalQuestions}
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className="bg-blue-600 h-2.5 rounded-full transition-all duration-500 ease-in-out"
                      style={{
                        width: `${((currentQuestionIndex + 1) / totalQuestions) * 100}%`,
                      }}
                    ></div>
                  </div>
                </div>
                <QuestionPlayer sessionId={sessionId} />
                <Recorder onSubmit={submitAnswer} />
              </div>
            )}

            {step === "feedback" && feedback && (
              <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
                <Feedback
                  feedback={feedback}
                  role={role}
                  seniority={seniority}
                  onReset={resetInterview}
                />
              </div>
            )}
          </main>
        </>
      )}
    </div>
  );
}

export default App;
