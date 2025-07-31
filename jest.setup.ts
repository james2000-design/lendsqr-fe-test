import "@testing-library/jest-dom";

// Mock Next.js App Router hooks globally
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
  })),
  useSearchParams: jest.fn(() => ({
    get: jest.fn(() => null),
    has: jest.fn(() => false),
    getAll: jest.fn(() => []),
    toString: jest.fn(() => ""),
  })),
  usePathname: jest.fn(() => "/"),
  useParams: jest.fn(() => ({})),
}));
