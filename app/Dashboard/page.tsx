import { Suspense } from "react";
import DashboardWrapper from "./dashboard-components/ui/dashboard-wrapper";
import { Skeleton } from "@/components/ui/skeleton";

// Loading component for Suspense
function DashboardLoading() {
  return (
    <div className="bg-gray-50 p-8 flex justify-center items-center m-auto h-screen">
      <div className="w-full max-w-4xl space-y-4">
        <Skeleton className="h-8 w-48 bg-gray-200" />
        <Skeleton className="h-64 w-full bg-gray-200" />
      </div>
    </div>
  );
}

const page = () => {
  return (
    <div className="h-screen">
      <Suspense fallback={<DashboardLoading />}>
        <DashboardWrapper /> 
      </Suspense>
    </div>
  );
};

export default page;
