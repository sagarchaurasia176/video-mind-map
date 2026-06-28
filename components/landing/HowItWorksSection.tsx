"use client";

import { ArrowBigLeft, ArrowBigRight, ArrowBigRightDashIcon } from "lucide-react";

export default function HowItWorksSection() {
  return (
    <section className="py-24 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            From Video to Structured Learning
          </h2>
        </div>

        {/* Steps */}
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Step 1 */}
            <div className="relative">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-white border-2 border-indigo-600 rounded-xl flex items-center justify-center card-shadow">
                  <svg
                    className="w-8 h-8 text-indigo-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                    />
                  </svg>
                </div>
                <h3 className="text-base font-bold text-gray-900 mb-2">
                  Paste a YouTube video link
                </h3>
              
              </div>
              {/* Arrow for desktop */}
              <div className="hidden md:block absolute top-8 -right-4 text-gray-300">
                <ArrowBigRightDashIcon/>
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-white border-2 border-indigo-600 rounded-xl flex items-center justify-center card-shadow">
                  <svg
                    className="w-8 h-8 text-indigo-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
                <h3 className="text-base font-bold text-gray-900 mb-2">
                  The transcript is extracted
                </h3>
               
              </div>
              {/* Arrow for desktop */}
              <div className="hidden md:block absolute top-8 -right-4 text-gray-300">
                <ArrowBigRightDashIcon/>
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-white border-2 border-indigo-600 rounded-xl flex items-center justify-center card-shadow">
                  <svg
                    className="w-8 h-8 text-indigo-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                    />
                  </svg>
                </div>
                <h3 className="text-base font-bold text-gray-900 mb-2">
                  AI identifies transcript
                </h3>
               
              </div>
              {/* Arrow for desktop */}
              <div className="hidden md:block absolute top-8 -right-4 text-gray-300">
                <ArrowBigRightDashIcon/>
              </div>
            </div>

            {/* Step 4 */}
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-white border-2 border-indigo-600 rounded-xl flex items-center justify-center card-shadow">
                <svg
                  className="w-8 h-8 text-indigo-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                  />
                </svg>
              </div>
              <h3 className="text-base font-bold text-gray-900 mb-2">
               Finally roadmap is generated
              </h3>
              
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
