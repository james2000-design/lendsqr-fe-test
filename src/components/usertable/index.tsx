import React from "react";
import styles from "./style.module.scss";
import { User } from "@/types/users";
import StatusBadge from "@/components/stausBadge/status-badge";
import { IoIosMore } from "react-icons/io";
import { IoFilterOutline } from "react-icons/io5";

interface UserTableProps {
  users: User[];
}

const UserTable: React.FC<UserTableProps> = ({ users }) => {
  return (
    <table className={styles.userTable}>
      <thead>
        <tr>
          <th>
            <span className={styles.headerCell}>
              ORGANIZATION
              <IoFilterOutline size={14} />
            </span>
          </th>
          <th>
            <span className={styles.headerCell}>
              USERNAME
              <IoFilterOutline size={14} />
            </span>
          </th>
          <th>
            <span className={styles.headerCell}>
              EMAIL
              <IoFilterOutline size={14} />
            </span>
          </th>
          <th>
            <span className={styles.headerCell}>
              PHONE NUMBER
              <IoFilterOutline size={14} />
            </span>
          </th>
          <th>
            <span className={styles.headerCell}>
              DATE JOINED
              <IoFilterOutline size={14} />
            </span>
          </th>
          <th>
            <span className={styles.headerCell}>
              STATUS
              <IoFilterOutline size={18} />
            </span>
          </th>
          <th></th>
        </tr>
      </thead>

      <tbody>
        {users.map((user) => (
          <tr key={user.id}>
            <td>{user.organization} </td>
            <td>{user.username}</td>
            <td>{user.email}</td>
            <td>{user.phoneNumber}</td>
            <td>{new Date(user.dateJoined).toLocaleDateString()}</td>
            <td>
              <StatusBadge status={user.status} />
            </td>
            <td>
              <button className={styles.viewButton}>
                <IoIosMore size={24} />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UserTable;
