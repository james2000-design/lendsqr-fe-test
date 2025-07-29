import React from "react";
import styles from "./style.module.scss";

type Status = "active" | "inactive" | "pending" | "blacklisted";

interface StatusBadgeProps {
  status: Status;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const statusConfig = {
    active: {
      text: "Active",
      className: styles.active,
    },
    inactive: {
      text: "Inactive",
      className: styles.inactive,
    },
    pending: {
      text: "Pending",
      className: styles.pending,
    },
    blacklisted: {
      text: "Blacklisted",
      className: styles.blacklisted,
    },
  };

  return (
    <span className={`${styles.badge} ${statusConfig[status].className}`}>
      {statusConfig[status].text}
    </span>
  );
};

export default StatusBadge;
