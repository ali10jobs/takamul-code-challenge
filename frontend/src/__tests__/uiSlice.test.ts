import uiReducer, { toggleLocale, setLocale } from "@/store/uiSlice";

describe("UI Slice — Locale Toggle", () => {
  const initialState = {
    locale: "en" as const,
    isRTL: false,
    isServicesDropdownOpen: false,
    isSearchOpen: false,
  };

  it("should toggle locale from EN to AR and set RTL to true", () => {
    const state = uiReducer(initialState, toggleLocale());
    expect(state.locale).toBe("ar");
    expect(state.isRTL).toBe(true);
  });

  it("should toggle locale from AR back to EN and set RTL to false", () => {
    const arState = { ...initialState, locale: "ar" as const, isRTL: true };
    const state = uiReducer(arState, toggleLocale());
    expect(state.locale).toBe("en");
    expect(state.isRTL).toBe(false);
  });

  it("should set locale to AR with setLocale and flip RTL direction", () => {
    const state = uiReducer(initialState, setLocale("ar"));
    expect(state.locale).toBe("ar");
    expect(state.isRTL).toBe(true);
  });

  it("should set locale to EN with setLocale and RTL stays false", () => {
    const state = uiReducer(initialState, setLocale("en"));
    expect(state.locale).toBe("en");
    expect(state.isRTL).toBe(false);
  });
});
