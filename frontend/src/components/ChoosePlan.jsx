import React from "react";

const PlanCard = ({
  title,
  price,
  duration,
  features,
  recommended,
  save,
  onSubscribe,
}) => {
  const isRecommended = recommended;
  const isAnnual = duration === "yr";

  return (
    <div
      className={`relative bg-white rounded-lg shadow-lg p-6 flex flex-col justify-between transition-all duration-300 ease-in-out ${isRecommended ? "border-2 border-teal-500 scale-105" : "border border-gray-200"}`}
    >
      {isRecommended && (
        <div className="absolute top-0 right-0 bg-teal-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
          RECOMMENDED
        </div>
      )}
      {save && (
        <div className="absolute top-0 right-0 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
          Save {save}
        </div>
      )}
      <div className="text-center mb-4">
        <h2 className="text-xl font-bold text-gray-800 mb-1">{title}</h2>
        <p className="text-4xl font-bold text-gray-900">
          ${price}
          <span className="text-lg font-medium text-gray-600">
            {" "}
            /{duration}
          </span>
        </p>
        {duration === "days" && (
          <p className="text-sm text-gray-500">free access</p>
        )}
      </div>

      <ul className="text-left mb-6 space-y-2 flex-grow">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center text-gray-700">
            <svg
              className="w-5 h-5 text-teal-500 mr-2 flex-shrink-0"
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
            {feature}
          </li>
        ))}
      </ul>

      <button
        onClick={onSubscribe}
        className={`w-full py-3 px-6 rounded-full font-bold text-lg transition duration-300 ease-in-out ${isRecommended ? "bg-teal-500 hover:bg-teal-600 text-white" : isAnnual ? "bg-blue-500 hover:bg-blue-600 text-white" : "bg-gray-200 hover:bg-gray-300 text-gray-800"}`}
      >
        {title === "Free Trial" ? "Start Free Trial" : "Subscribe"}
      </button>
    </div>
  );
};

const ChoosePlan = ({
  onStartFreeTrial,
  onSubscribeMonthly,
  onSubscribeAnnual,
}) => {
  const plans = [
    {
      title: "Free Trial",
      price: "0",
      duration: "7 days",
      features: ["7 days free access", "Basic features"],
      recommended: false,
      save: null,
      action: onStartFreeTrial,
    },
    {
      title: "Monthly",
      price: "14.99",
      duration: "mo",
      features: [
        "Voice mock interviews",
        "Detailed AI feedback",
        "Progress tracking",
      ],
      recommended: true,
      save: null,
      action: onSubscribeMonthly,
    },
    {
      title: "Annual",
      price: "99.99",
      duration: "yr",
      features: ["All premium features", "Full progress analytics"],
      recommended: false,
      save: "45%",
      action: onSubscribeAnnual,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col">
      <div className="flex-grow flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-6xl">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Select Your Interview Package
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Choose the plan that best fits your interview preparation needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {plans.map((plan, index) => (
              <PlanCard
                key={index}
                title={plan.title}
                price={plan.price}
                duration={plan.duration}
                features={plan.features}
                recommended={plan.recommended}
                save={plan.save}
                onSubscribe={plan.action}
              />
            ))}
          </div>

          <div className="text-center text-gray-600 flex flex-col items-center space-y-4">
            <button className="text-gray-600 hover:text-blue-600 hover:underline">
              Compare all features
            </button>
            <div className="flex items-center space-x-2 text-sm">
              <svg
                className="w-5 h-5 text-gray-500"
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
              <span>Secure payments · 7-day refund policy</span>
            </div>
          </div>
        </div>
      </div>

      <footer className="py-6 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} Interviewly. All rights reserved.
      </footer>
    </div>
  );
};

export default ChoosePlan;
