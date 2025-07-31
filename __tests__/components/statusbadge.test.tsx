import React from "react";
import { render, screen } from "@testing-library/react";
import StatusBadge from "@/components/stausBadge/status-badge";
import styles from "@/components/stausBadge/style.module.scss";

describe("StatusBadge", () => {
  const statuses: Array<
    ["active" | "inactive" | "pending" | "blacklisted", string, string]
  > = [
    ["active", "Active", styles.active],
    ["inactive", "Inactive", styles.inactive],
    ["pending", "Pending", styles.pending],
    ["blacklisted", "Blacklisted", styles.blacklisted],
  ];

  it.each(statuses)(
    "renders the correct text and class for status '%s'",
    (status, expectedText, expectedClass) => {
      render(<StatusBadge status={status} />);
      const badge = screen.getByText(expectedText);
      expect(badge).toBeInTheDocument();
      expect(badge).toHaveClass(styles.badge);
      expect(badge).toHaveClass(expectedClass);
    }
  );
});
