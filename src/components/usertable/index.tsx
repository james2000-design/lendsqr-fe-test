// src/components/UserTable/index.tsx
import React from "react";
import styles from "./style.module.scss";
import { User } from "@/types/users";
import StatusBadge from "@/components/stausBadge/status-badge";
import Image from "next/image";

interface UserTableProps {
  users: User[];
}

const UserTable: React.FC<UserTableProps> = ({ users }) => {
  return (
    <table className={styles.userTable}>
      <thead>
        <tr>
          <th>ORGANIZATION</th>
          <th>USERNAME</th>
          <th>EMAIL</th>
          <th>PHONE NUMBER</th>
          <th>DATE JOINED</th>
          <th>STATUS</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id}>
            <td>{user.organization}</td>
            <td>{user.username}</td>
            <td>{user.email}</td>
            <td>{user.phoneNumber}</td>
            <td>{new Date(user.dateJoined).toLocaleDateString()}</td>
            <td>
              <StatusBadge status={user.status} />
            </td>
            <td>
              <button className={styles.viewButton}>
                <Image
                  src="/assets/images/more.png"
                  alt="View Details"
                  width={20}
                  height={20}
                />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UserTable;
