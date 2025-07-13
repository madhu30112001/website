import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import Navbar from "../components/Navbar";
import { expect, vi } from "vitest";
import { StoreContext } from "../context/Contextapi";
vi.mock("@fortawesome/react-fontawesome", () => ({
  FontAwesomeIcon: ({ icon, ...props }) => (
    <span data-testid={`${icon.iconName}-icon`} {...props}>
      {icon.iconName}
    </span>
  ),
}));

vi.mock("../assets/assets", () => ({
  assets: {
    header_pic: "/logo.png",
  },
}));
describe("Navbar component", () => {
  const mockSetShowLogin = vi.fn();
  const mockGetTotalCartAmount = vi.fn(() => 1);
  const mockSetToken = vi.fn();
  const renderWithRouter = (ui, route = "/") => {
    window.history.pushState({}, "Test page", route);
    return render(
      <StoreContext.Provider
        value={{
          getTotalCartAmount: mockGetTotalCartAmount,
          token: "",
          setToken: mockSetToken,
        }}
      >
        <MemoryRouter initialEntries={[route]}>
          <Routes>
            <Route path="*" element={ui} />
          </Routes>
        </MemoryRouter>
      </StoreContext.Provider>
    );
  };

  test("show menus and navitems", () => {
    renderWithRouter(<Navbar setShowLogin={mockSetShowLogin} />);
    expect(screen.getByAltText("")).toBeInTheDocument();
    expect(screen.getByText(/home/i)).toBeInTheDocument();
    expect(screen.getByText(/menu/i)).toBeInTheDocument();
    expect(screen.getByText(/mobile-app/i)).toBeInTheDocument();
    expect(screen.getByText(/contact/i)).toBeInTheDocument();
  });
  test("click on sign in and it will open sign in page", () => {
    renderWithRouter(<Navbar setShowLogin={mockSetShowLogin} />);
    const open = screen.getByRole("button", { name: /sign in/i });
    fireEvent.click(open);
    expect(mockSetShowLogin).toHaveBeenCalledWith(true);
  });
  test("show cart icon with red dot", () => {
    renderWithRouter(<Navbar setShowLogin={mockSetShowLogin} />);
    expect(screen.getByTestId("cart-shopping-icon")).toBeInTheDocument(); //
    expect(document.querySelector(".dot")).toBeInTheDocument();
  });

  test("show logout and orders once logged in", () => {
    render(
      <StoreContext.Provider
        value={{
          getTotalCartAmount: mockGetTotalCartAmount,
          token: "mock token",
          setToken: mockSetToken,
        }}
      >
        <MemoryRouter>
          <Navbar setShowLogin={mockSetShowLogin} />
        </MemoryRouter>
      </StoreContext.Provider>
    );

    expect(screen.getByTestId("user-circle-icon")).toBeInTheDocument();
    expect(screen.getByText(/Orders/i)).toBeInTheDocument();
    expect(screen.getByText(/Logout/i)).toBeInTheDocument();
  });
});
