import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Exploremenu } from "../components/ExploreMenu/Exloremenu";
import { vi } from "vitest";

vi.mock("../../assets/assets", () => ({
  menu_list: [
    {
      menu_name: "Salad",
      menu_image: "./menu_1.png",
    },
    {
      menu_name: "Rolls",
      menu_image:"./menu_2.png",
    },
    {
      menu_name: "Deserts",
      menu_image: "./menu_3.png",
    },
    {
      menu_name: "Sandwich",
      menu_image: "./menu_4.png",
    },
  ],
}));

describe("ExploreMenu", () => {

  const mockSetCategory = vi.fn();

  test("renders correct explore menu", () => {
    render(<Exploremenu category="All" setCategory={mockSetCategory} />);
    expect(screen.getByText(/Explore our menu/i)).toBeInTheDocument();
    expect(
      screen.getByText(
        /Lorem ipsum dolor sit amet consectetur adipisicing elit\. Quos fugit voluptates, ab enim error nihil dolores sequi totam labore aliquam iste beatae aut minima eaque voluptas veritatis quis, ducimus laudantium\./i,
        { normalizeWhitespace: true }
      )
    ).toBeInTheDocument();
    expect(screen.getByText(/Salad/i)).toBeInTheDocument();
    expect(screen.getByText(/Rolls/i)).toBeInTheDocument();
    expect(screen.getByText(/Deserts/i)).toBeInTheDocument();
    expect(screen.getByText(/Sandwich/i)).toBeInTheDocument();
  });

  test("calls set category when clicking", () => {
    render(<Exploremenu category="All" setCategory={mockSetCategory} />);
    const click = screen.getByText(/Salad/i);
    fireEvent.click(click);
    expect(mockSetCategory).toHaveBeenCalled();
  });

  test("active class to be called when selected", () => {
    render(<Exploremenu category="Salad" setCategory={mockSetCategory} />);
    const select = screen.getByText(/Salad/i);
    const image = select.previousSibling;
    expect(image).toHaveClass("active");
  });
});
