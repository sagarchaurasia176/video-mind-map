"use client";

import { BetweenHorizontalStart, StepForward } from "lucide-react";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative pt-32 pb-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text Content */}
          <div className="max-w-2xl">
            {/* Headline */}
            <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Turn YouTube Lessons into a Learning Roadmap
            </h1>

            {/* Subheading */}
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Paste the link to any educational YouTube video. The platform reads the transcript, 
              identifies the important concepts, organizes them into a logical sequence, and generates 
              an interactive roadmap you can follow.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-start gap-4">
              <Link
                href="/Dashboard"
                className="px-6 py-3 text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors"
              >
                Generate Roadmap
              </Link>
              <button className="px-6 py-3 text-base font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 rounded-lg transition-colors">
                View Example
              </button>
            </div>
          </div>

          {/* Right Column - Roadmap Preview */}
          <div className="relative">
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-8 card-shadow">
              {/* Mockup of roadmap */}
              <div className="space-y-6">
                {/* Root node */}
                <div className="flex items-center gap-4">
                  <div className="flex-shrink-0 w-3 h-3 bg-indigo-600 rounded-full"></div>
                  <div className="flex-1 bg-white border-2 border-gray-900 rounded-lg p-4">
                    <div className="inline-flex items-center gap-1 px-2 py-1 bg-gray-900 text-white text-xs font-semibold rounded-full mb-2">
                      <BetweenHorizontalStart />
                       Start
                    </div>
                    <p className="text-sm font-bold text-gray-900">Introduction to Machine Learning</p>
                    <p className="text-xs text-gray-600 mt-1">Core concepts and overview</p>
                  </div>
                </div>

                {/* Connection line */}
                <div className="flex items-center gap-4 pl-1.5">
                  <div className="w-px h-8 bg-gray-300"></div>
                </div>

                {/* Child nodes */}
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-3 h-3 bg-indigo-600 rounded-full mt-4"></div>
                  <div className="flex-1 space-y-4">
                    <div className="bg-white border border-gray-300 rounded-lg p-4">
                      <div className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 text-gray-600 text-xs font-semibold rounded-full mb-2">
                        <StepForward /> Step
                      </div>
                      <p className="text-sm font-bold text-gray-900">Supervised vs Unsupervised Learning</p>
                      <p className="text-xs text-gray-600 mt-1">Key differences and use cases</p>
                    </div>

                    <div className="bg-white border border-gray-300 rounded-lg p-4">
                      <div className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 text-gray-600 text-xs font-semibold rounded-full mb-2">
                        <StepForward /> Step
                      </div>
                      <p className="text-sm font-bold text-gray-900">Training Data & Features</p>
                      <p className="text-xs text-gray-600 mt-1">Understanding datasets</p>
                    </div>

                    <div className="bg-white border border-gray-300 rounded-lg p-4 opacity-60">
                      <div className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 text-gray-600 text-xs font-semibold rounded-full mb-2">
                        <StepForward /> Step
                      </div>
                      <p className="text-sm font-bold text-gray-900">Model Evaluation</p>
                      <p className="text-xs text-gray-600 mt-1">Metrics and validation</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Label */}
              <div className="mt-6 pt-4 border-t border-gray-200">
                <p className="text-xs text-gray-500 text-center">Interactive roadmap preview</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
