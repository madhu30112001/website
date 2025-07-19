import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import globalReducer from "../redux/slice/globalSlice";
import { expect, vi } from "vitest";


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

const renderWithReduxAndRouter = (ui, { preloadedState = {}, route = "/" } = {}) => {
  const store = configureStore({
    reducer: {
      global: globalReducer,
    },
    preloadedState,
  });

  window.history.pushState({}, "Test page", route);

  return render(
    <Provider store={store}>
      <MemoryRouter initialEntries={[route]}>
        <Routes>
          <Route path="*" element={ui} />
        </Routes>
      </MemoryRouter>
    </Provider>
  );
};

const mockSetShowLogin = vi.fn();

describe("Navbar Component - Redux", () => {
  test("should render nav items", () => {
    renderWithReduxAndRouter(<Navbar setShowLogin={mockSetShowLogin} />, {
      preloadedState: {
        global: {
          foodList: [],
          cartItems: {},
          userOrders: [],
          token: "",
          loading: false,
          error: null,
        },
      },
    });

    expect(screen.getByAltText("")).toBeInTheDocument();
    expect(screen.getByText(/home/i)).toBeInTheDocument();
    expect(screen.getByText(/menu/i)).toBeInTheDocument();
    expect(screen.getByText(/mobile-app/i)).toBeInTheDocument();
    expect(screen.getByText(/contact/i)).toBeInTheDocument();
  });

  test("clicking 'Sign in' calls setShowLogin(true)", () => {
    renderWithReduxAndRouter(<Navbar setShowLogin={mockSetShowLogin} />, {
      preloadedState: {
        global: {
          foodList: [],
          cartItems: {},
          userOrders: [],
          token: "",
          loading: false,
          error: null,
        },
      },
    });

    fireEvent.click(screen.getByRole("button", { name: /sign in/i }));
    expect(mockSetShowLogin).toHaveBeenCalledWith(true);
  });

  test("shows cart icon with red dot when cart has items", () => {
    renderWithReduxAndRouter(<Navbar setShowLogin={mockSetShowLogin} />, {
      preloadedState: {
        global: {
          foodList: [
            { _id: "1", price: 10 },
            { _id: "2", price: 20 },
          ],
          cartItems: {
            "1": 2,
            "2": 1,
          },
          userOrders: [],
          token: "",
          loading: false,
          error: null,
        },
      },
    });

    expect(screen.getByTestId("cart-shopping-icon")).toBeInTheDocument();
    expect(document.querySelector(".dot")).toBeInTheDocument();
  });

  test("renders Logout and Orders when user is logged in", () => {
    renderWithReduxAndRouter(<Navbar setShowLogin={mockSetShowLogin} />, {
      preloadedState: {
        global: {
          foodList: [],
          cartItems: {},
          userOrders: [],
          token: "mockToken123",
          loading: false,
          error: null,
        },
      },
    });

    expect(screen.getByTestId("user-circle-icon")).toBeInTheDocument();
    expect(screen.getByText(/Orders/i)).toBeInTheDocument();
    expect(screen.getByText(/Logout/i)).toBeInTheDocument();
  });
});
