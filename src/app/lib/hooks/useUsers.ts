import { useState, useEffect } from "react";
import { fetchUsers } from "@/utils/api";

interface User {
  id: string;
  organization: string;
  username: string;
  email: string;
  phoneNumber: string;
  dateJoined: string;
  status: "active" | "inactive" | "pending" | "blacklisted";
  // ... other fields
}

interface Pagination {
  page: number;
  pageSize: number;
  total: number;
}

export const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [pagination, setPagination] = useState<Pagination>({
    page: 1,
    pageSize: 10,
    total: 0,
  });

  useEffect(() => {
    const loadUsers = async () => {
      try {
        setLoading(true);
        const response = await fetchUsers(pagination.page, pagination.pageSize);
        setUsers(response.data);
        setPagination((prev) => ({
          ...prev,
          total: response.pagination.total,
        }));
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, [pagination.page, pagination.pageSize]);

  return { users, loading, error, pagination, setPagination };
};
