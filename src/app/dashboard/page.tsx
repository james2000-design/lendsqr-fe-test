"use client";

import DashboardPage from "@/app/ui/dashboard/dasbboard";
import PageLayout from "@/components/pageLayout/pageLayout";
import React from "react";

const Dashboard = () => {
  return (
    <div>
      <PageLayout>
        <DashboardPage />
      </PageLayout>
    </div>
  );
};

export default Dashboard;
