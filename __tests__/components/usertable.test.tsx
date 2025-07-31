import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import UserTable from "@/components/usertable/index";
import type { User } from "@/types/users";
import { FilterFormValues } from "@/components/shared/filter-modal";

jest.mock("@/components/shared/filter-modal", () => {
  const MockFilterDropdown = ({
    onApply,
  }: {
    onApply: (filters: FilterFormValues) => void;
  }) => {
    return (
      <button onClick={() => onApply({} as FilterFormValues)}>Filter</button>
    );
  };
  MockFilterDropdown.displayName = "MockFilterDropdown";
  return MockFilterDropdown;
});

jest.mock("@/components/shared/user-actions-menu", () => {
  const MockUserActionsMenu = () => (
    <div data-testid="actions-menu">Actions</div>
  );
  MockUserActionsMenu.displayName = "MockUserActionsMenu";
  return MockUserActionsMenu;
});

jest.mock("@/components/stausBadge/status-badge", () => {
  const MockStatusBadge = ({ status }: { status: string }) => (
    <span>{status}</span>
  );
  MockStatusBadge.displayName = "MockStatusBadge";
  return MockStatusBadge;
});

describe("UserTable", () => {
  const mockUsers: User[] = [
    {
      id: "1",
      organization: "Org A",
      username: "johndoe",
      fullName: "John Doe",
      email: "john@example.com",
      phoneNumber: "1234567890",
      dateJoined: "2023-01-01T00:00:00Z",
      status: "active",
      accountBalance: "1000",
      accountNumber: "123456789",
      bvn: "12345678901",
      gender: "Male",
    },
    {
      id: "2",
      organization: "Org B",
      username: "janedoe",
      fullName: "Jane Doe",
      email: "jane@example.com",
      phoneNumber: "0987654321",
      dateJoined: "2023-02-01T00:00:00Z",
      status: "inactive",
      accountBalance: "2000",
      accountNumber: "987654321",
      bvn: "10987654321",
      gender: "Female",
    },
  ];

  it("renders all table headers", () => {
    render(<UserTable users={mockUsers} onApplyFilters={jest.fn()} />);

    expect(screen.getByText(/organization/i)).toBeInTheDocument();
    expect(screen.getByText(/username/i)).toBeInTheDocument();
    expect(screen.getByText(/email/i)).toBeInTheDocument();
    expect(screen.getByText(/phone number/i)).toBeInTheDocument();
    expect(screen.getByText(/date joined/i)).toBeInTheDocument();
    expect(screen.getByText(/status/i)).toBeInTheDocument();
  });

  it("renders all users", () => {
    render(<UserTable users={mockUsers} onApplyFilters={jest.fn()} />);
    expect(screen.getByText("johndoe")).toBeInTheDocument();
    expect(screen.getByText("janedoe")).toBeInTheDocument();
  });

  it("calls onApplyFilters when filter button is clicked", () => {
    const mockOnApply = jest.fn();
    render(<UserTable users={mockUsers} onApplyFilters={mockOnApply} />);

    const filterButtons = screen.getAllByText(/filter/i);
    fireEvent.click(filterButtons[0]);

    expect(mockOnApply).toHaveBeenCalledTimes(1);
  });

  it("renders correct status text for each user", () => {
    render(<UserTable users={mockUsers} onApplyFilters={jest.fn()} />);
    expect(screen.getByText(/^active$/i)).toBeInTheDocument();
    expect(screen.getByText(/^inactive$/i)).toBeInTheDocument();
  });

  it("renders correct status text for each user", () => {
    render(<UserTable users={mockUsers} onApplyFilters={jest.fn()} />);

    expect(screen.getByText(/^active$/i)).toBeInTheDocument();
    expect(screen.getByText(/^inactive$/i)).toBeInTheDocument();
  });
});
