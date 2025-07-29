import { User } from "@/types/users";

export const fetchUsers = async (
  page: number = 1,
  pageSize: number = 10
): Promise<{
  data: User[];
  pagination: {
    page: number;
    pageSize: number;
    total: number;
  };
}> => {
  try {
    const response = await fetch(
      `/api/users?page=${page}&pageSize=${pageSize}`,
      { cache: "no-store" }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch users");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};
