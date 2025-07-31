"use client";

import styles from "./style.module.scss";
import UserCard from "../../../components/usercard/index";
import UserTable from "../../../components/usertable/index";

import userIcon from "@/../../public/assets/images/users.png";
import activeUser from "@/../../public/assets/images/user.png";
import Userloan from "@/../../public/assets/images/icon.png";
import UserSavings from "@/../../public/assets/images/icons.png";
import { generateMockUsers } from "@/app/lib/utils/mockData";
import { User } from "@/types/users";
import { FilterFormValues } from "@/components/shared/filter-modal";
import { useEffect, useState } from "react";
import Pagination from "@/components/pagination";

export default function UserPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState<FilterFormValues>({});
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const pageSize = 10;
  const totalUsers = 500;

  const stats = [
    { title: "USERS", value: "2,453", icon: userIcon },
    { title: "ACTIVE USERS", value: "2,453", icon: activeUser },
    { title: "USERS WITH LOANS", value: "12,453", icon: Userloan },
    { title: "USERS WITH SAVINGS", value: "102,453", icon: UserSavings },
  ];

  useEffect(() => {
    let parsed: User[] | null = null;
    try {
      const stored = localStorage.getItem("mockUsers");
      if (stored) {
        parsed = JSON.parse(stored);
      }
    } catch {}

    if (Array.isArray(parsed) && parsed.length > 0) {
      setAllUsers(parsed);
    } else {
      const { users } = generateMockUsers(1, totalUsers);
      setAllUsers(users);
      localStorage.setItem("mockUsers", JSON.stringify(users));
    }
  }, []);

  const filteredUsers = allUsers.filter((user: User) => {
    return (
      (!filters.organization || user.organization === filters.organization) &&
      (!filters.username ||
        user.username.toLowerCase().includes(filters.username.toLowerCase())) &&
      (!filters.email ||
        user.email.toLowerCase().includes(filters.email.toLowerCase())) &&
      (!filters.phoneNumber ||
        user.phoneNumber.includes(filters.phoneNumber)) &&
      (!filters.dateJoined ||
        new Date(user.dateJoined).toISOString().split("T")[0] ===
          filters.dateJoined) &&
      (!filters.status ||
        user.status.toLowerCase() === filters.status.toLowerCase())
    );
  });

  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );
  return (
    <div className={styles.content}>
      <h2>Users</h2>
      <div className={styles.statsContainer}>
        {stats.map((stat, index) => (
          <UserCard
            key={stat.title || index}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
          />
        ))}
      </div>
      <div className={styles.usersTableContainer}>
        <div>
          <UserTable users={paginatedUsers} onApplyFilters={setFilters} />
          <Pagination
            currentPage={currentPage}
            pageSize={pageSize}
            totalCount={filteredUsers.length}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>
    </div>
  );
}
