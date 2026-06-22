"use client";

import { useEffect, useState } from "react";
import ResizeableComponent from "./dashboard-center-component";
import Image from "next/image";

export default function DashboardWrapper() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time or wait for actual data
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000); // Adjust timing as needed

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center gap-4 h-full">
        <div className="text-center">
        <p>almost done....</p>
        <Image alt="gif-loader" src="https://res.cloudinary.com/djfixzkqe/image/upload/v1780909979/arrow_jfgxoe.gif" width={100} height={100} />
          </div>
      </div>
    );
  }

  return <ResizeableComponent />;
}