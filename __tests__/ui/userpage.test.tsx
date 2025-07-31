import {
  render,
  screen,
  fireEvent,
  waitFor,
  within,
} from "@testing-library/react";
import UserPage from "@/app/ui/user-page/user-page";
import { generateMockUsers } from "@/app/lib/utils/mockData";

beforeEach(() => {
  localStorage.clear();
});
beforeEach(() => {
  localStorage.clear();
  jest.clearAllMocks();
});

jest.mock("@/app/lib/utils/mockData", () => ({
  generateMockUsers: jest.fn(),
}));

describe("UserPage", () => {
  const mockUsers = Array.from({ length: 25 }, (_, i) => ({
    id: `id-${i}`,
    organization: "Lendsqr",
    username: `user${i}`,
    email: `user${i}@test.com`,
    phoneNumber: `080000000${i}`,
    dateJoined: new Date(2024, 1, 1).toISOString(),
    status: "active",
    fullName: `User ${i}`,
    accountBalance: "₦200,000",
    accountNumber: "1234567890",
    bvn: "12345678901",
    gender: "Male",
  }));

  it("renders stats correctly", async () => {
    (generateMockUsers as jest.Mock).mockReturnValue({
      users: mockUsers,
      total: mockUsers.length,
    });

    render(<UserPage />);

    const statHeadings = screen.getAllByRole("heading", { name: /USERS/i });
    expect(statHeadings.length).toBeGreaterThan(0);
    expect(screen.getByText(/ACTIVE USERS/i)).toBeInTheDocument();
    expect(screen.getByText(/USERS WITH LOANS/i)).toBeInTheDocument();
    expect(screen.getByText(/USERS WITH SAVINGS/i)).toBeInTheDocument();
  });

  it("loads users from localStorage if available", async () => {
    localStorage.setItem("mockUsers", JSON.stringify(mockUsers));

    render(<UserPage />);

    expect(generateMockUsers).not.toHaveBeenCalled();

    expect(await screen.findByText(/^user0$/i)).toBeInTheDocument();
  });

  it("paginates users", async () => {
    (generateMockUsers as jest.Mock).mockReturnValue({
      users: mockUsers,
      total: mockUsers.length,
    });

    render(<UserPage />);

    await screen.findByText(/^user0$/i);

    const table = screen.getByRole("table");
    expect(within(table).getAllByText(/^user0$/i).length).toBeGreaterThan(0);

    fireEvent.click(screen.getByRole("button", { name: /2/i }));

    await waitFor(() => {
      expect(
        screen.getByRole("cell", { name: /^user10$/i })
      ).toBeInTheDocument();
    });
  });

  it("filters users by username", async () => {
    (generateMockUsers as jest.Mock).mockReturnValue({
      users: mockUsers,
      total: mockUsers.length,
    });

    render(<UserPage />);

    await screen.findByText(/^user0$/i);

    const usernameHeader = screen.getByText(/username/i).closest("th")!;
    const filterButton = within(usernameHeader).getByRole("button", {
      name: /filter/i,
    });
    fireEvent.click(filterButton);

    const searchInput = await screen.findByLabelText(/username/i);

    fireEvent.change(searchInput, { target: { value: "user5" } });

    const applyBtn = screen.getByRole("button", { name: /apply/i });
    fireEvent.click(applyBtn);

    await waitFor(() => {
      expect(screen.getByText(/^user5$/i)).toBeInTheDocument();
    });
  });

  it("shows 'No users found' when there are no users", async () => {
    (generateMockUsers as jest.Mock).mockReturnValue({
      users: [],
      total: 0,
    });

    render(<UserPage />);

    expect(await screen.findByText(/no users found/i)).toBeInTheDocument();
  });

  it("handles invalid JSON in localStorage gracefully", async () => {
    localStorage.setItem("mockUsers", "{bad json}");

    (generateMockUsers as jest.Mock).mockReturnValue({
      users: mockUsers,
      total: mockUsers.length,
    });

    render(<UserPage />);

    expect(await screen.findByText(/^user0$/i)).toBeInTheDocument();
  });

  it("shows 'No users found' when filter has no matches", async () => {
    (generateMockUsers as jest.Mock).mockReturnValue({
      users: mockUsers,
      total: mockUsers.length,
    });

    render(<UserPage />);

    await screen.findByText(/^user0$/i);

    const usernameHeader = screen.getByText(/username/i).closest("th")!;
    const filterButton = within(usernameHeader).getByRole("button", {
      name: /filter/i,
    });
    fireEvent.click(filterButton);

    const searchInput = await screen.findByLabelText(/username/i);
    fireEvent.change(searchInput, { target: { value: "noSuchUser" } });

    fireEvent.click(screen.getByRole("button", { name: /apply/i }));

    expect(await screen.findByText(/no users found/i)).toBeInTheDocument();
  });
});
