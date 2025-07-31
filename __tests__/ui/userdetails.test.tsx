import { render, screen, fireEvent } from "@testing-library/react";
import UserDetails from "@/app/ui/user-details/user-details";
import { useRouter } from "next/navigation";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));
const mockPush = jest.fn();
beforeEach(() => {
  localStorage.clear();
  jest.clearAllMocks();
  (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
});
describe("UserDetails", () => {
  const mockUser = {
    id: "1",
    fullName: "John Doe",
    username: "johndoe",
    referral: "Friend Referral",
    phoneNumber: "08012345678",
    email: "john@example.com",
    bvn: "12345678901",
    gender: "Male",
    maritalStatus: "Single",
    children: "None",
    residenceType: "Parent's Apartment",
    educationLevel: "B.Sc",
    employmentStatus: "Employed",
    employmentSector: "FinTech",
    employmentDuration: "2 years",
    officeEmail: "john.doe@company.com",
    monthlyIncome: "₦200,000 - ₦400,000",
    loanRepayment: "40,000",
    duration_in_month: "12",
    accountBalance: "₦200,000",
    accountNumber: "1234567890",
    twitter: "@johndoe",
    facebook: "John Doe",
    instagram: "@johndoe",
    linkedin: "@johndoe",
    guarantor: {
      fullName: "Jane Doe",
      phoneNumber: "08098765432",
      email: "jane@example.com",
      relationship: "Sister",
    },
  };

  it("loads user from localStorage using user_{id}", () => {
    localStorage.setItem(`user_1`, JSON.stringify(mockUser));

    render(<UserDetails id="1" />);

    expect(
      screen.getByRole("heading", { name: /john doe/i, level: 2 })
    ).toBeInTheDocument();

    expect(screen.getByText(/friend referral/i)).toBeInTheDocument();
  });

  it("loads user from all_users if user_{id} is not found", () => {
    localStorage.setItem("all_users", JSON.stringify([mockUser]));

    render(<UserDetails id="1" />);

    expect(
      screen.getByRole("heading", { name: /john doe/i, level: 2 })
    ).toBeInTheDocument();
    expect(screen.getByText(/friend referral/i)).toBeInTheDocument();
  });

  it("shows not found message if no user data exists", () => {
    render(<UserDetails id="99" />);

    expect(screen.getByText(/user data not found/i)).toBeInTheDocument();
  });

  it("navigates back to /users when back button clicked", () => {
    localStorage.setItem(`user_1`, JSON.stringify(mockUser));

    render(<UserDetails id="1" />);

    fireEvent.click(screen.getByRole("button", { name: /back to users/i }));
    expect(mockPush).toHaveBeenCalledWith("/users");
  });

  it("renders key sections of user details", () => {
    localStorage.setItem(`user_1`, JSON.stringify(mockUser));

    render(<UserDetails id="1" />);

    expect(screen.getByText(/personal information/i)).toBeInTheDocument();
    expect(screen.getByText(/education and employment/i)).toBeInTheDocument();
    expect(screen.getByText(/socials/i)).toBeInTheDocument();
    expect(screen.getByText(/guarantor/i)).toBeInTheDocument();
  });

  it("handles invalid JSON in localStorage gracefully", () => {
    localStorage.setItem(`user_1`, "{invalid-json");

    render(<UserDetails id="1" />);

    expect(screen.getByText(/user data not found/i)).toBeInTheDocument();
  });

  it("handles missing fields in user object", () => {
    localStorage.setItem(`user_1`, JSON.stringify({ id: "1" }));

    render(<UserDetails id="1" />);

    expect(screen.getByText(/user data not found/i)).toBeInTheDocument();
  });
});
