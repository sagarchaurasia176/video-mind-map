"use client";

import { useEffect, useState } from "react";
import ResizeableComponent from "./dashboard-center-component";
import Image from "next/image";
import Loader from "@/app/loading";

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
          <Loader/>
          </div>
      </div>
    );
  }

  return <ResizeableComponent />;
}