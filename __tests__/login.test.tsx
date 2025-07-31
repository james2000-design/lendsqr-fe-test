import { render, screen, fireEvent } from "@testing-library/react";
import LoginPage from "@/app/auth/login/page";
import { useRouter } from "next/navigation";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("LoginPage", () => {
  const pushMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue({ push: pushMock });
    localStorage.clear();
  });

  it(" should log in successfully with valid email & password", () => {
    render(<LoginPage />);

    fireEvent.change(screen.getByPlaceholderText(/email/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText(/password/i), {
      target: { value: "password123" },
    });

    fireEvent.click(screen.getByRole("button", { name: /log in/i }));

    expect(localStorage.getItem("isLoggedIn")).toBe("true");
    expect(pushMock).toHaveBeenCalledWith("/dashboard");
  });

  it(" should NOT log in with empty fields", () => {
    render(<LoginPage />);

    fireEvent.click(screen.getByRole("button", { name: /log in/i }));

    expect(localStorage.getItem("isLoggedIn")).toBeNull();
    expect(pushMock).not.toHaveBeenCalled();
  });

  it(" should toggle password visibility when clicking SHOW/HIDE", () => {
    render(<LoginPage />);

    const passwordInput = screen.getByPlaceholderText(/password/i);
    const toggleBtn = screen.getByRole("button", { name: /show/i });

    expect(passwordInput).toHaveAttribute("type", "password");

    fireEvent.click(toggleBtn);
    expect(passwordInput).toHaveAttribute("type", "text");
    expect(toggleBtn).toHaveTextContent(/hide/i);

    fireEvent.click(toggleBtn);
    expect(passwordInput).toHaveAttribute("type", "password");
    expect(toggleBtn).toHaveTextContent(/show/i);
  });
});
