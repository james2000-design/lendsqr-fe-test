import React from "react";
import styles from "./style.module.scss";
import { User } from "@/types/users";
import StatusBadge from "@/components/stausBadge/status-badge";
import FilterDropdown, {
  FilterFormValues,
} from "@/components/shared/filter-modal";
import UserActionsMenu from "../shared/user-actions-menu";

interface UserTableProps {
  users: User[];
  readonly onApplyFilters: (filters: FilterFormValues) => void;
}

const UserTable: React.FC<UserTableProps> = ({ users, onApplyFilters }) => {
  return (
    <table className={styles.userTable}>
      <thead>
        <tr>
          <th>
            <span className={styles.headerCell}>
              ORGANIZATION
              <FilterDropdown onApply={onApplyFilters} />
            </span>
          </th>
          <th>
            <span className={styles.headerCell}>
              USERNAME
              <FilterDropdown onApply={onApplyFilters} />
            </span>
          </th>
          <th>
            <span className={styles.headerCell}>
              EMAIL
              <FilterDropdown onApply={onApplyFilters} />
            </span>
          </th>
          <th>
            <span className={styles.headerCell}>
              PHONE NUMBER
              <FilterDropdown onApply={onApplyFilters} />
            </span>
          </th>
          <th>
            <span className={styles.headerCell}>
              DATE JOINED
              <FilterDropdown onApply={onApplyFilters} />
            </span>
          </th>
          <th>
            <span className={styles.headerCell}>
              STATUS
              <FilterDropdown onApply={onApplyFilters} />
            </span>
          </th>
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
            <td className={styles.actionsCell}>
              <UserActionsMenu
                user={user}
                onBlacklist={() => console.log("Blacklist", user.id)}
                onActivate={() => console.log("Activate", user.id)}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UserTable;
