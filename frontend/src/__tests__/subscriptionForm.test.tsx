import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { I18nextProvider } from "react-i18next";
import { configureStore } from "@reduxjs/toolkit";
import uiReducer from "@/store/uiSlice";
import searchReducer from "@/store/searchSlice";
import i18n from "@/i18n/index";
import Footer from "@/components/layout/Footer";

// Mock the subscribeEmail function
jest.mock("@/lib/strapi", () => ({
  subscribeEmail: jest.fn(),
}));

import { subscribeEmail } from "@/lib/strapi";
const mockSubscribe = subscribeEmail as jest.MockedFunction<
  typeof subscribeEmail
>;

function renderWithProviders(ui: React.ReactElement) {
  const store = configureStore({
    reducer: {
      ui: uiReducer,
      search: searchReducer,
    },
  });

  return render(
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>{ui}</I18nextProvider>
    </Provider>
  );
}

describe("Footer Subscription Form — Formik Validation", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should reject an invalid email format", async () => {
    renderWithProviders(<Footer />);
    const user = userEvent.setup();

    const emailInput = screen.getByPlaceholderText("Email");
    const submitButton = screen.getByRole("button", { name: /subscribe/i });

    await user.type(emailInput, "not-an-email");
    await user.click(submitButton);

    await waitFor(() => {
      expect(
        screen.getByText("Please enter a valid email address.")
      ).toBeInTheDocument();
    });
  });

  it("should show success state for a valid email", async () => {
    mockSubscribe.mockResolvedValue({ success: true });
    renderWithProviders(<Footer />);
    const user = userEvent.setup();

    const emailInput = screen.getByPlaceholderText("Email");
    const submitButton = screen.getByRole("button", { name: /subscribe/i });

    await user.type(emailInput, "valid@email.com");
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText("Successfully subscribed!")).toBeInTheDocument();
    });
  });

  it("should show duplicate email error from API", async () => {
    mockSubscribe.mockResolvedValue({
      success: false,
      error: "duplicate",
    });
    renderWithProviders(<Footer />);
    const user = userEvent.setup();

    const emailInput = screen.getByPlaceholderText("Email");
    const submitButton = screen.getByRole("button", { name: /subscribe/i });

    await user.type(emailInput, "existing@email.com");
    await user.click(submitButton);

    await waitFor(() => {
      expect(
        screen.getByText("This email is already subscribed.")
      ).toBeInTheDocument();
    });
  });
});
