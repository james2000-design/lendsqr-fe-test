import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import FilterDropdown, {
  FilterFormValues,
} from "@/components/shared/filter-modal";

describe("FilterDropdown", () => {
  const onApply = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("opens the popover when filter button is clicked", () => {
    render(<FilterDropdown onApply={onApply} />);

    const filterButton = screen.getByLabelText(/filter/i);
    fireEvent.click(filterButton);

    expect(screen.getByLabelText(/Organization/i)).toBeInTheDocument();
  });

  it("fills out the form and applies filters", async () => {
    render(<FilterDropdown onApply={onApply} />);

    fireEvent.click(screen.getByLabelText(/filter/i));

    fireEvent.mouseDown(screen.getByLabelText(/Organization/i));
    const lendsqrOption = await screen.findByText("Lendsqr");
    fireEvent.click(lendsqrOption);

    fireEvent.change(screen.getByLabelText(/Username/i), {
      target: { value: "john" },
    });

    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: "john@example.com" },
    });

    fireEvent.change(screen.getByLabelText(/Phone Number/i), {
      target: { value: "1234567890" },
    });

    fireEvent.change(screen.getByLabelText(/Date Joined/i), {
      target: { value: "2025-07-30" },
    });

    fireEvent.mouseDown(screen.getByLabelText(/Status/i));
    const activeOption = await screen.findByText("Active");
    fireEvent.click(activeOption);

    fireEvent.click(screen.getByRole("button", { name: /apply/i }));

    await waitFor(() => {
      expect(onApply).toHaveBeenCalledWith({
        organization: "Lendsqr",
        username: "john",
        email: "john@example.com",
        phoneNumber: "1234567890",
        dateJoined: "2025-07-30",
        status: "active",
      } as FilterFormValues);
    });
  });

  it("resets the form and calls onApply with empty object", async () => {
    render(<FilterDropdown onApply={onApply} />);

    fireEvent.click(screen.getByLabelText(/filter/i));

    fireEvent.click(screen.getByRole("button", { name: /reset/i }));

    await waitFor(() => {
      expect(onApply).toHaveBeenCalledWith({});
    });
  });
});
