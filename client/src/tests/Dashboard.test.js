import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import Dashboard from "../pages/Dashboard";

test("weather button fetches data from the correct API endpoint", () => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve({ weather: [{ main: "Rainy" }] }),
      ok: true,
    })
  );

  render(<Dashboard />);
  const weatherButton = screen.getByRole("button", { name: /Get Started/i });

  fireEvent.click(weatherButton);

  expect(global.fetch).toHaveBeenCalledWith(
    "https://open-weather13.p.rapidapi.com/city/mumbai/EN",
    expect.any(Object)
  );
});
