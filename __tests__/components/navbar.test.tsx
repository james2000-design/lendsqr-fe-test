import { render, screen, fireEvent } from "@testing-library/react";
import Navbar from "@/components/navbar/navbar";

describe("Navbar", () => {
  it("renders logo, search, docs link, notification, and user info", () => {
    render(<Navbar />);

    expect(screen.getByAltText(/logo/i)).toBeInTheDocument();

    expect(
      screen.getByPlaceholderText(/search for anything/i)
    ).toBeInTheDocument();

    expect(screen.getByRole("link", { name: /docs/i })).toBeInTheDocument();

    expect(screen.getByTestId("navbar-notification-icon")).toBeInTheDocument();

    expect(screen.getByAltText(/user/i)).toBeInTheDocument();

    expect(screen.getByText(/adedeji/i)).toBeInTheDocument();
  });

  it("calls onMenuClick when mobile menu button is clicked", () => {
    const onMenuClick = jest.fn();
    render(<Navbar onMenuClick={onMenuClick} />);

    const menuButton = screen.getByTestId("mobile-menu-button");
    fireEvent.click(menuButton);

    expect(onMenuClick).toHaveBeenCalledTimes(1);
  });
});
