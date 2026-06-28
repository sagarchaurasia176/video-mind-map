"use client";

export default function UseCasesSection() {
  return (
    <section className="py-24 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Built for Different Learning Goals
          </h2>
        </div>

        {/* Use Case Cards */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Use Case 1 */}
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 hover:border-indigo-600 transition-colors">
            <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
              <svg
                className="w-6 h-6 text-indigo-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
            </div>
            <h3 className="text-base font-bold text-gray-900 mb-2">
              Learning a new technology
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Generate a roadmap before starting a long tutorial series
            </p>
          </div>

          {/* Use Case 2 */}
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 hover:border-indigo-600 transition-colors">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <svg
                className="w-6 h-6 text-green-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                />
              </svg>
            </div>
            <h3 className="text-base font-bold text-gray-900 mb-2">
              Preparing for interviews
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Break large interview prep videos into organized topics
            </p>
          </div>

          {/* Use Case 3 */}
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 hover:border-indigo-600 transition-colors">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <svg
                className="w-6 h-6 text-purple-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
            </div>
            <h3 className="text-base font-bold text-gray-900 mb-2">
              Revision
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Review important concepts without searching through timestamps
            </p>
          </div>

          {/* Use Case 4 */}
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 hover:border-indigo-600 transition-colors">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
              <svg
                className="w-6 h-6 text-orange-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <h3 className="text-base font-bold text-gray-900 mb-2">
              Self-paced learning
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Study one concept at a time while keeping the overall structure visible
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
