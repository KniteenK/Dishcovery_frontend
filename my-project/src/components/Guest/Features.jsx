import React from "react";


const Features = () => {
  return (
    <div>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto flex flex-wrap">
          <div className="lg:w-1/2 w-full mb-10 lg:mb-0 rounded-lg overflow-hidden">
            <img
              alt="feature"
              className="object-cover object-center h-full w-full"
              src="/features.jpg"
              width={720}
              height={600}
            />
          </div>
          <div className="flex flex-col flex-wrap lg:py-6 -mb-10 lg:w-1/2 lg:pl-12 lg:text-left text-center">
            <div className="flex flex-col mb-10 lg:items-start items-center">
              <div className="w-12 h-12 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="w-6 h-6"
                viewBox="0 0 24 24"
                >
                <path d="M4 7h16l-4-4" />
                <path d="M20 17H4l4 4" />
                </svg>
      
              </div>
              <div className="flex-grow">
                <h2 className="text-gray-900 text-lg title-font font-medium mb-3">
                ⁠Healthy Swap
                </h2>
                <p className="leading-relaxed text-base">
                Transform your recipes with healthier alternatives! This feature helps you replace unhealthy ingredients in any dish with nutritious substitutes, ensuring you enjoy tasty meals without compromising on health.

                </p>
    
              </div>
            </div>
            <div className="flex flex-col mb-10 lg:items-start items-center">
              <div className="w-12 h-12 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="w-6 h-6"
                viewBox="0 0 24 24"
                >
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
              </div>
              <div className="flex-grow">
                <h2 className="text-gray-900 text-lg title-font font-medium mb-3">
                ⁠ ⁠Meal Recommender

                </h2>
                <p className="leading-relaxed text-base">
                et meal recommendations tailored to your unique dietary needs. Simply set your nutritional limits for breakfast, lunch, and dinner, and let us suggest delicious recipes that fit your preferences perfectly.
                </p>
              </div>
            </div>
            <div className="flex flex-col mb-10 lg:items-start items-center">
              <div className="w-12 h-12 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="w-6 h-6"
                viewBox="0 0 24 24"
                >
                <path d="M5 13l4 4L19 7" />
                </svg>
                            </div>
              <div className="flex-grow">
                <h2 className="text-gray-900 text-lg title-font font-medium mb-3">
                ⁠ ⁠Ingredient Compatibility Checker

                </h2>
                <p className="leading-relaxed text-base">
                Want to experiment with new ingredients? Use our Compatibility Checker to input your favorite ingredients and discover which ones work best together. Then, let us generate creative recipes just for you, combining your selected ingredients in delicious ways!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Features;