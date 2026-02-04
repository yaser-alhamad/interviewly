import React from "react";

const FeatureCard = ({ icon, title, description }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 flex items-center space-x-4 mb-4">
      <div className="flex-shrink-0">{icon}</div>
      <div>
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  );
};

const Welcome = ({ onStartFreeTrial, onSignIn, onPricing }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col">
      {/* Hero Section */}
      <div className="flex-grow flex items-center justify-center py-12 px-4">
        <div className="max-w-4xl w-full">
          {/* Main Content Area */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Ace Your Next Interview
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10">
              Practice with AI-powered mock interviews, get instant feedback,
              and build confidence.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16">
              <button
                onClick={onStartFreeTrial}
                className="bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white font-bold py-4 px-8 rounded-xl text-lg shadow-lg transition-all duration-300 transform hover:scale-105"
              >
                Start Free Trial
              </button>
              <button
                onClick={onSignIn}
                className="bg-white text-gray-800 font-semibold py-4 px-8 rounded-xl text-lg shadow-md border border-gray-200 hover:shadow-lg transition-all duration-300"
              >
                Sign In
              </button>
            </div>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <FeatureCard
              icon={
                <svg
                  className="w-12 h-12 text-blue-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
              }
              title="AI-Powered Feedback"
              description="Get detailed insights on your performance from our advanced AI"
            />
            <FeatureCard
              icon={
                <svg
                  className="w-12 h-12 text-indigo-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  ></path>
                </svg>
              }
              title="Secure & Private"
              description="Your data is encrypted and never shared with third parties"
            />
            <FeatureCard
              icon={
                <svg
                  className="w-12 h-12 text-purple-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 11H5a2 2 0 00-2 2v5a2 2 0 002 2h14a2 2 0 002-2v-5a2 2 0 00-2-2zM7 11V7a4 4 0 018 0v4H7z"
                  ></path>
                </svg>
              }
              title="Industry Standard"
              description="Trusted by 500+ companies worldwide for interview preparation"
            />
          </div>

          {/* Bottom Links */}
          <div className="text-center">
            <div className="flex flex-col md:flex-row justify-center space-y-2 md:space-y-0 md:space-x-8 text-base">
              <button
                onClick={onSignIn}
                className="text-gray-600 hover:text-blue-600 hover:underline"
              >
                Already have an account? Sign in
              </button>
              <button
                onClick={onPricing}
                className="text-gray-600 hover:text-blue-600 hover:underline"
              >
                View Pricing Plans
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-6 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} Interviewly. All rights reserved.
      </footer>
    </div>
  );
};

export default Welcome;
