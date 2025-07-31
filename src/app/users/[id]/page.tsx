import PageLayout from "@/components/pageLayout/pageLayout";
import UserDetails from "@/app/ui/user-details/user-details";
import React from "react";

export default async function UserDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <PageLayout>
      <UserDetails id={id} />
    </PageLayout>
  );
}
