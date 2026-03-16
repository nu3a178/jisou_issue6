import { Card } from "@/components/atom/card";
import "@testing-library/jest-dom";
import { cleanup, render, screen } from "@testing-library/react";
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

beforeEach(() => {
  render(
    <Card
      title="Test Title"
      thumbnail="https://picsum.photos/200"
      url="https://google.com"
      description="Test Description"
      content="<p>Test Content</p>"
      date={new Date("2026-01-01").toLocaleDateString()}
    />,
  );
});

afterEach(() => {
  cleanup();
});

describe("Card", () => {
  it("カードにタイトルが表示されていることのテスト", () => {
    const card = screen.getByText("Test Title");
    expect(card).toBeInTheDocument();
  });
  it("カードがリンクを持っていることのテスト", () => {
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "https://google.com");
  });
  it("カードに画像が表示されていることのテスト", () => {
    const image = screen.getByRole("img");
    expect(image).toHaveAttribute("src", "https://picsum.photos/200");
  });
  it("カードに説明が表示されていることのテスト", () => {
    const description = screen.getByText("Test Description");
    expect(description).toBeInTheDocument();
  });
  it("カードにコンテンツが表示されていることのテスト", () => {
    const content = screen.getByText("Test Content");
    expect(content).toBeInTheDocument();
    const rawContent = screen.queryByText("<p>Test Content</p>");
    expect(rawContent).not.toBeInTheDocument();
  });
  it("カードに日付が表示されていることのテスト", () => {
    const date = screen.getByText("2026/1/1");
    expect(date).toBeInTheDocument();
  });
});
