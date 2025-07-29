import { NextResponse } from "next/server";
import { generateMockUsers } from "@/app/lib/utils/mockData";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page") || "1");
  const pageSize = parseInt(searchParams.get("pageSize") || "10");

  const { users, total } = generateMockUsers(page, pageSize);

  await new Promise((resolve) => setTimeout(resolve, 500));

  return NextResponse.json({
    data: users,
    pagination: {
      page,
      pageSize,
      total,
    },
  });
}
