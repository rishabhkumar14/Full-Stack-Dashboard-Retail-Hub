import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Vendors from "../pages/vendors/Vendors.js";

test("renders Vendors component", () => {
  render(<Vendors drawerOpen={false} />);
  const pageTitle = screen.getByText(/Weekly Sales/i);
  expect(pageTitle).toBeInTheDocument();
});

test("renders card metrics", () => {
  render(<Vendors drawerOpen={false} />);
  const cardMetrics = screen.getAllByRole("heading", { level: 4 });
  expect(cardMetrics).toHaveLength(4);
});

test("renders tab labels", () => {
  render(<Vendors drawerOpen={false} />);
  const vendorDataTab = screen.getByText(/Vendor Data/i);
  const purchaseOrderTab = screen.getByText(/Purchase Order/i);
  expect(vendorDataTab).toBeInTheDocument();
  expect(purchaseOrderTab).toBeInTheDocument();
});

test("switches tabs correctly", () => {
  render(<Vendors drawerOpen={false} />);
  const purchaseOrderTab = screen.getByText(/Purchase Order/i);
  fireEvent.click(purchaseOrderTab);
  const purchaseOrderContent = screen.getByText(/Vendor Purchase Order/i);
  expect(purchaseOrderContent).toBeInTheDocument();
});
