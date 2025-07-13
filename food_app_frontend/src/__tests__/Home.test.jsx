import { screen, render } from "@testing-library/react";
import Home from "../pages/Home";
import { vi } from "vitest";
import "@testing-library/jest-dom";
vi.mock("../components/Fooddisplay/FoodDisplay", () => ({
  default: () => <div>Mock Food display</div>,
}));
vi.mock("../components/ExploreMenu/Exloremenu", () => ({
  Exploremenu: () => <div>Mock Explore Menu</div>,
}));
vi.mock("../components/Header/Header", () => ({
  default: () => <div>Mock Header</div>,
}));
vi.mock("../components/AppDownload/AppDownload", () => ({
  default: () => <div>Mock Appdownload</div>,
}));

describe("Home Component", () => {
  test("renders all main sections properly", () => {
    render(
        <Home />
    );

    expect(screen.getByText(/Mock Explore Menu/i)).toBeInTheDocument();
    expect(screen.getByText(/Mock Food display/i)).toBeInTheDocument();
    expect(screen.getByText(/Mock Header/i)).toBeInTheDocument();
    expect(screen.getByText(/Mock Appdownload/i)).toBeInTheDocument();
  });
});
