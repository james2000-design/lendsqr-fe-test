import { render, screen, fireEvent } from "@testing-library/react";
import Sidebar from "@/components/sidebar/sidebar";
import "@testing-library/jest-dom";

const mockPush = jest.fn();
const mockOnClose = jest.fn();

jest.mock("next/navigation", () => ({
  useRouter: () => ({ push: mockPush }),
  usePathname: () => "/users",
}));

beforeEach(() => {
  mockPush.mockClear();
  mockOnClose.mockClear();
  localStorage.clear();
});

describe("Sidebar Component", () => {
  it("renders all sections", () => {
    render(<Sidebar isOpen={true} onClose={mockOnClose} />);

    expect(screen.getByText(/CUSTOMERS/i)).toBeInTheDocument();
    expect(screen.getByText(/BUSINESSES/i)).toBeInTheDocument();
    expect(screen.getByText(/SETTINGS/i)).toBeInTheDocument();
  });

  it("calls onClose when overlay is clicked", () => {
    render(<Sidebar isOpen={true} onClose={mockOnClose} />);

    fireEvent.click(screen.getByTestId("sidebar-overlay"));
    expect(mockOnClose).toHaveBeenCalled();
  });

  it("navigates to login on logout", () => {
    render(<Sidebar isOpen={true} onClose={mockOnClose} />);

    const logoutButton = screen.getByRole("button", { name: /logout/i });
    fireEvent.click(logoutButton);

    expect(localStorage.getItem("isLoggedIn")).toBeNull();
    expect(mockPush).toHaveBeenCalledWith("/auth/login");
  });

  it("highlights active menu item based on pathname", () => {
    render(<Sidebar isOpen={true} onClose={mockOnClose} />);

    const activeItem = screen.getByText(/Users/i).closest("li");
    expect(activeItem?.className).toContain("active");
  });

  it("closes when Escape key is pressed", () => {
    render(<Sidebar isOpen={true} onClose={mockOnClose} />);

    fireEvent.keyDown(document, { key: "Escape" });
    expect(mockOnClose).toHaveBeenCalled();
  });
});
