import React from "react";
import styles from "./style.module.scss";
import Sidebar from "@/components/sidebar/side-bar";
import Navbar from "@/components/navbar/navbar";
import UserCard from "@/components/userCard";
import UserTable from "@/components/usertable";
import { fetchUsers } from "@/app/lib/utils/api";
import userIcon from "../../../public/assets/images/users.png";
import activeUser from "../../../public/assets/images/user.png";
import Userloan from "../../../public/assets/images/icon.png";
import UserSavings from "../../../public/assets/images/icons.png";
import { User } from "@/types/users";

export default async function DashboardPage() {
  const stats = [
    { title: "USERS", value: "2,453", icon: userIcon },
    { title: "ACTIVE USERS", value: "2,453", icon: activeUser },
    { title: "USERS WITH LOANS", value: "12,453", icon: Userloan },
    { title: "USERS WITH SAVINGS", value: "102,453", icon: UserSavings },
  ];

  let users: User[] = [];
  try {
    const response = await fetchUsers(1, 10);
    users = response.data;
  } catch (error) {
    console.error("Error loading users:", error);
  }

  return (
    <div className={styles.dashboardContainer}>
      <Navbar />
      <div className={styles.bodySection}>
        <Sidebar />
        <main className={styles.mainContent}>
          <div className={styles.content}>
            <h1>Users</h1>
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
              <UserTable users={users} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
