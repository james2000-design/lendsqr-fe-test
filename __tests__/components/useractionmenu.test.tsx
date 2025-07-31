import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import UserActionsMenu from "@/components/shared/user-actions-menu";
import { useRouter } from "next/navigation";
import { User } from "@/types/users";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

beforeEach(() => {
  Storage.prototype.setItem = jest.fn();
  jest.clearAllMocks();
});
beforeAll(() => {
  Object.defineProperty(HTMLElement.prototype, "scrollTo", {
    value: () => {},
    writable: true,
  });
});
describe("UserActionsMenu", () => {
  const mockPush = jest.fn();
  const mockBlacklist = jest.fn();
  const mockActivate = jest.fn();

  const mockUser: User = {
    id: "123",
    username: "testuser",
    fullName: "Test User",
    email: "test@example.com",
    phoneNumber: "1234567890",
    organization: "Lendsqr",
    dateJoined: "2024-05-20",
    status: "active",
    accountBalance: "5000",
    accountNumber: "1234567890",
    bvn: "2233445566",
    gender: "Male",
  };

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
  });

  it("opens the menu and triggers view details", () => {
    render(
      <UserActionsMenu
        user={mockUser}
        onBlacklist={mockBlacklist}
        onActivate={mockActivate}
      />
    );

    const menuButton = screen.getByRole("button");
    fireEvent.click(menuButton);

    fireEvent.click(screen.getByText(/View Details/i));

    expect(localStorage.setItem).toHaveBeenCalledWith(
      `user_${mockUser.id}`,
      JSON.stringify(mockUser)
    );
    expect(mockPush).toHaveBeenCalledWith(`/users/${mockUser.id}`);
  });

  it("calls onBlacklist when clicking blacklist user", () => {
    render(
      <UserActionsMenu
        user={mockUser}
        onBlacklist={mockBlacklist}
        onActivate={mockActivate}
      />
    );

    fireEvent.click(screen.getByRole("button"));
    fireEvent.click(screen.getByText(/Blacklist User/i));

    expect(mockBlacklist).toHaveBeenCalled();
  });

  it("calls onActivate when clicking activate user", () => {
    render(
      <UserActionsMenu
        user={mockUser}
        onBlacklist={mockBlacklist}
        onActivate={mockActivate}
      />
    );

    fireEvent.click(screen.getByRole("button"));
    fireEvent.click(screen.getByText(/Activate User/i));

    expect(mockActivate).toHaveBeenCalled();
  });
});
