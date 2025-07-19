const mockedPost = vi.fn();

vi.mock("../../utils/axiosSetup", () => {
  return {
    __esModule: true,
    default: {
      post: mockedPost,
    },
  };
});

vi.mock("../redux/slice/globalSlice", async () => {
  const actual = await vi.importActual("../redux/slice/globalSlice");

  const mockedLoginThunk = ({ data }) => async () => {
    if (data.email === "invalid@example.com") {
      return {
        payload: { success: false, message: "Invalid credentials" },
      };
    } else if (data.email === "nouser@example.com") {
      return {
        payload: { success: false, message: "User does not exist" },
      };
    } else {
      return {
        payload: { success: true, token: "mockToken123" },
      };
    }
  };

  mockedLoginThunk.fulfilled = {
    match: (action) => action?.payload?.success === true,
  };

  mockedLoginThunk.rejected = {
    match: (action) => action?.payload?.success === false,
  };

  return {
    __esModule: true,
    ...actual,
    loginUser: mockedLoginThunk,
  };
});


import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { vi } from "vitest";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import globalReducer from "../redux/slice/globalSlice";
import Login from "../components/LoginPopup/Login.jsx";

const mockSetShowLogin = vi.fn();

describe("Login Component - Redux Version", () => {
  const renderWithRedux = (component) => {
    const store = configureStore({
      reducer: { global: globalReducer },
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

    return render(
      <Provider store={store}>
        {React.cloneElement(component, { setShowLogin: mockSetShowLogin })}
      </Provider>
    );
  };

  beforeEach(() => {
    vi.clearAllMocks();
    mockedPost.mockReset();
  });

  test("renders Login heading and input fields", () => {
    renderWithRedux(<Login />);
    expect(screen.getByRole("heading", { name: "Login" })).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Your email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
    expect(screen.queryByPlaceholderText("Your name")).not.toBeInTheDocument();
  });

  test("switches to Sign Up mode", () => {
    renderWithRedux(<Login />);
    fireEvent.click(screen.getByText("Click here"));
    expect(screen.getByRole("heading", { name: "Sign Up" })).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Your name")).toBeInTheDocument();
  });

  test("handles input changes", () => {
    renderWithRedux(<Login />);
    const emailInput = screen.getByPlaceholderText("Your email");
    const passwordInput = screen.getByPlaceholderText("Password");

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "123456" } });

    expect(emailInput.value).toBe("test@example.com");
    expect(passwordInput.value).toBe("123456");
  });

 test("submits login form successfully", async () => {
  renderWithRedux(<Login />);

  fireEvent.change(screen.getByPlaceholderText("Your email"), {
    target: { value: "test@example.com" },
  });
  fireEvent.change(screen.getByPlaceholderText("Password"), {
    target: { value: "123456" },
  });
  fireEvent.click(screen.getByRole("checkbox"));
  fireEvent.click(screen.getByRole("button", { name: "Login" }));

  await waitFor(() => {
    expect(mockSetShowLogin).toHaveBeenCalledWith(false);
  });
});



  test("shows alert on login failure", async () => {
    const alertMock = vi.spyOn(window, "alert").mockImplementation(() => {});

    mockedPost.mockResolvedValueOnce({
      data: { success: false, message: "Invalid credentials" },
    });

    renderWithRedux(<Login />);

    fireEvent.change(screen.getByPlaceholderText("Your email"), {
      target: { value: "invalid@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "wrongpass" },
    });
    fireEvent.click(screen.getByRole("checkbox"));
    fireEvent.click(screen.getByRole("button", { name: "Login" }));

    await waitFor(() => {
      expect(alertMock).toHaveBeenCalledWith({ success: false, message: "Invalid credentials" });
    });

    alertMock.mockRestore();
  });

  test("closes modal when cross icon is clicked", () => {
    renderWithRedux(<Login />);
    fireEvent.click(screen.getByRole("img", { alt: "cross icon" }));
    expect(mockSetShowLogin).toHaveBeenCalledWith(false);
  });
});
