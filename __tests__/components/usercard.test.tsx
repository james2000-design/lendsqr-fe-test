import React from "react";
import { render, screen } from "@testing-library/react";
import UserCard from "@/components/usercard/index";
import styles from "@/components/usercard/style.module.scss";
import type { ImageProps } from "next/image";

jest.mock("next/image", () => {
  const MockImage = ({ src, alt, ...rest }: ImageProps) => {
    return (
      <img src={typeof src === "string" ? src : ""} alt={alt ?? ""} {...rest} />
    );
  };
  MockImage.displayName = "MockNextImage";
  return MockImage;
});

describe("UserCard", () => {
  const mockProps = {
    title: "Users",
    value: "2,345",
    icon: "/mock-icon.png",
  };

  it("renders the title, value, and icon", () => {
    render(<UserCard {...mockProps} />);

    expect(screen.getByText(mockProps.title)).toBeInTheDocument();
    expect(screen.getByText(mockProps.value)).toBeInTheDocument();

    const img = screen.getByAltText(mockProps.title) as HTMLImageElement;
    expect(img).toBeInTheDocument();
    expect(img.src).toContain(mockProps.icon);
  });

  it("applies the correct styles", () => {
    render(<UserCard {...mockProps} />);
    const card = screen.getByText(mockProps.title).closest("div");
    expect(card).toHaveClass(styles.cardHeader);
  });
});
