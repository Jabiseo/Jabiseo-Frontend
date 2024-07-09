import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Home from "../src/app/page";

describe("Page", () => {
  it("메인 페이지 랜딩 테스트", () => {
    const { container } = render(<Home />);
    const home = screen.getByText("자비서");

    expect(home).toBeInTheDocument();
  });
});
