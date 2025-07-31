import { render, screen, fireEvent } from "@testing-library/react";
import Pagination from "@/components/pagination/index";

describe("Pagination Component", () => {
  const onPageChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders correct pagination info", () => {
    render(
      <Pagination
        currentPage={1}
        pageSize={10}
        totalCount={50}
        onPageChange={onPageChange}
      />
    );

    expect(screen.getByText(/showing 1-10 out of 50/i)).toBeInTheDocument();
  });

  it("disables previous button on first page", () => {
    render(
      <Pagination
        currentPage={1}
        pageSize={10}
        totalCount={50}
        onPageChange={onPageChange}
      />
    );

    const prevButton = screen.getByRole("button", { name: "<" });
    expect(prevButton).toBeDisabled();
  });

  it("disables next button on last page", () => {
    render(
      <Pagination
        currentPage={5}
        pageSize={10}
        totalCount={50}
        onPageChange={onPageChange}
      />
    );

    const nextButton = screen.getByRole("button", { name: ">" });
    expect(nextButton).toBeDisabled();
  });

  it("calls onPageChange when a page number is clicked", () => {
    render(
      <Pagination
        currentPage={1}
        pageSize={10}
        totalCount={50}
        onPageChange={onPageChange}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: "2" }));
    expect(onPageChange).toHaveBeenCalledWith(2);
  });

  it("shows ellipsis when total pages are large", () => {
    render(
      <Pagination
        currentPage={5}
        pageSize={10}
        totalCount={200}
        onPageChange={onPageChange}
      />
    );

    expect(screen.getAllByText("...").length).toBeGreaterThan(0);
  });

  it("navigates to next and previous pages", () => {
    render(
      <Pagination
        currentPage={2}
        pageSize={10}
        totalCount={50}
        onPageChange={onPageChange}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: ">" }));
    expect(onPageChange).toHaveBeenCalledWith(3);

    fireEvent.click(screen.getByRole("button", { name: "<" }));
    expect(onPageChange).toHaveBeenCalledWith(1);
  });
});
