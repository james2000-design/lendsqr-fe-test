import { render, screen, fireEvent } from "@testing-library/react";
import PageLayout from "@/components/pageLayout/pageLayout";

jest.mock("@/components/navbar/navbar", () => {
  return function MockNavbar({ onMenuClick }: { onMenuClick: () => void }) {
    return (
      <nav data-testid="mock-navbar">
        <button data-testid="menu-btn" onClick={onMenuClick}>
          Menu
        </button>
      </nav>
    );
  };
});

jest.mock("@/components/sidebar/sidebar", () => {
  return function MockSidebar({
    isOpen,
    onClose,
  }: {
    isOpen: boolean;
    onClose: () => void;
  }) {
    return (
      <aside data-testid="mock-sidebar">
        {isOpen ? (
          <>
            <p>Sidebar Open</p>
            <button onClick={onClose}>Close</button>
          </>
        ) : (
          <p>Sidebar Closed</p>
        )}
      </aside>
    );
  };
});

describe("PageLayout", () => {
  it("renders Navbar, Sidebar, and children", () => {
    render(
      <PageLayout>
        <div>Test Content</div>
      </PageLayout>
    );

    expect(screen.getByTestId("mock-navbar")).toBeInTheDocument();
    expect(screen.getByTestId("mock-sidebar")).toBeInTheDocument();
    expect(screen.getByText("Test Content")).toBeInTheDocument();
  });

  it("toggles sidebar when menu button is clicked", () => {
    render(
      <PageLayout>
        <div>Test Content</div>
      </PageLayout>
    );

    expect(screen.getByText(/sidebar closed/i)).toBeInTheDocument();

    fireEvent.click(screen.getByTestId("menu-btn"));
    expect(screen.getByText(/sidebar open/i)).toBeInTheDocument();

    fireEvent.click(screen.getByText(/close/i));
    expect(screen.getByText(/sidebar closed/i)).toBeInTheDocument();
  });
});
