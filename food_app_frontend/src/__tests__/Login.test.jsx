import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Login from "../components/LoginPopup/Login.jsx";
import axios from "axios";
import { StoreContext } from "../context/Contextapi.jsx";
import { vi } from "vitest";

vi.mock("axios");

describe("Login Component", () => {
  const mockSetToken = vi.fn();
  const mockSetShowLogin = vi.fn();

  const renderComponent = () =>
    render(
      <StoreContext.Provider value={{ url: "yourURL", setToken: mockSetToken }}>
        <Login setShowLogin={mockSetShowLogin} />
      </StoreContext.Provider>
    );

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("renders Login heading and input fields", () => {
    renderComponent();

    const heading = screen.getByRole("heading", { name: "Login" });
    expect(heading).toBeInTheDocument();

    expect(screen.getByPlaceholderText("Your email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();

    expect(screen.queryByPlaceholderText("Your name")).not.toBeInTheDocument();
  });

  test("switches to Sign Up mode", () => {
    renderComponent();

    const switchLink = screen.getByText(/Create a new account\?/i);
    fireEvent.click(screen.getByText("Click here"));

    expect(screen.getByRole("heading", { name: "Sign Up" })).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Your name")).toBeInTheDocument();
  });

  test("handles input changes", () => {
    renderComponent();

    const emailInput = screen.getByPlaceholderText("Your email");
    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    expect(emailInput.value).toBe("test@example.com");

    const passwordInput = screen.getByPlaceholderText("Password");
    fireEvent.change(passwordInput, { target: { value: "123456" } });
    expect(passwordInput.value).toBe("123456");
  });

 test("submits login form successfully", async () => {
  axios.post.mockResolvedValueOnce({
    data: { success: true, token: "mockToken123" },
  });

  renderComponent();

  fireEvent.change(screen.getByPlaceholderText("Your email"), {
    target: { value: "test@example.com" },
  });
  fireEvent.change(screen.getByPlaceholderText("Password"), {
    target: { value: "123456" },
  });

  const checkbox = screen.getByRole("checkbox");
  fireEvent.click(checkbox);
  expect(checkbox.checked).toBe(true);

  const loginButton = screen.getByRole("button", { name: "Login" });
  fireEvent.click(loginButton);

  await waitFor(() => {
    expect(axios.post).toHaveBeenCalledWith(
      "yourURL/api/user/login",
      {
        email: "test@example.com",
        password: "123456",
        name: "", // name is empty in Login mode
      }
    );
  });

  expect(mockSetToken).toHaveBeenCalledWith("mockToken123");
  expect(mockSetShowLogin).toHaveBeenCalledWith(false);
});


 test("shows alert on login failure", async () => {
  // Mock alert function
  const alertMock = vi.spyOn(window, "alert").mockImplementation(() => {});

  // Mock failed login response
  axios.post.mockResolvedValueOnce({
    data: { success: false, message: "Invalid credentials" },
  });

  renderComponent();

  // Fill the form
  fireEvent.change(screen.getByPlaceholderText("Your email"), {
    target: { value: "wrong@example.com" },
  });
  fireEvent.change(screen.getByPlaceholderText("Password"), {
    target: { value: "wrongpass" },
  });

  // Check the checkbox
  const checkbox = screen.getByRole("checkbox");
  fireEvent.click(checkbox);

  // Submit the form
  fireEvent.click(screen.getByRole("button", { name: "Login" }));

  // Wait for alert to be called
  await waitFor(() => {
    expect(alertMock).toHaveBeenCalledWith("Invalid credentials");
  });
});

  test("closes modal when cross icon is clicked", () => {
    renderComponent();

    const crossIcon = screen.getByRole("img",{alt:"cross icon"});
    fireEvent.click(crossIcon);

    expect(mockSetShowLogin).toHaveBeenCalledWith(false);
  });
});