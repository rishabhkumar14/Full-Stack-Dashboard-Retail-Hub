import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Dashboard from "../pages/Dashboard";

// Mock the fetch function
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({}),
  })
);

test("renders dashboard component", () => {
  render(<Dashboard drawerOpen={false} />);
  const welcomeText = screen.getByText(/Welcome to, RetailHuB/i);
  expect(welcomeText).toBeInTheDocument();
});

test("fetches weather data on button click", async () => {
  render(<Dashboard drawerOpen={false} />);
  const button = screen.getByRole("button", { name: /Get Store Data/i });
  fireEvent.click(button);
  await waitFor(() => {
    expect(fetch).toHaveBeenCalledWith(
      "https://open-weather13.p.rapidapi.com/city/mumbai/EN",
      expect.any(Object)
    );
  });
});

test("renders card metrics", async () => {
  render(<Dashboard drawerOpen={false} />);
  const metrics = screen.getAllByRole("heading", { level: 4 });
  expect(metrics).toHaveLength(6);
});

test("renders bar chart", async () => {
  render(<Dashboard drawerOpen={false} />);
  const barChart = screen.getByRole("heading", {
    name: /Customized Bar Chart/i,
  });
  expect(barChart).toBeInTheDocument();
});

test("renders pie chart", async () => {
  render(<Dashboard drawerOpen={false} />);
  const pieChart = screen.getByRole("heading", {
    name: /Expense Distribution/i,
  });
  expect(pieChart).toBeInTheDocument();
});

test("renders line chart", async () => {
  render(<Dashboard drawerOpen={false} />);
  const lineChart = screen.getByRole("heading", {
    name: /Monthly Performance/i,
  });
  expect(lineChart).toBeInTheDocument();
});

test("renders area chart", async () => {
  render(<Dashboard drawerOpen={false} />);
  const areaChart = screen.getByRole("heading", {
    name: /Monthly Sales Area Chart/i,
  });
  expect(areaChart).toBeInTheDocument();
});
