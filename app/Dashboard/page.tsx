import { Suspense } from "react";
import DashboardWrapper from "./dashboard-components/ui/dashboard-wrapper";
import { Skeleton } from "@/components/ui/skeleton";
import { Container, Flex, Text } from "@radix-ui/themes";

// Loading component for Suspense
function DashboardLoading() {
  return (
    <div className="bg-white p-4 flex justify-center items-center m-auto">
      <Container size="1">
        <Flex direction="column" gap="2">
          <Text>
            <Skeleton>Lorem ipsum dolor sit amet.</Skeleton>
          </Text>

          <Skeleton>
            <Text>Lorem ipsum dolor sit amet</Text>
          </Skeleton>
        </Flex>
      </Container>
    </div>
  );
}

const page = () => {
  return (
    <div className="h-full">
      <Suspense fallback={<DashboardLoading />}>
        {/* dashboard-ui */}
        <DashboardWrapper /> 
      </Suspense>
    </div>
  );
};

export default page;
