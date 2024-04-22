// index.js
import React from "react";
import ReactDOM from "react-dom";
import "./styles/index.css";
import Navbar from "./components/navbar/navbar.js";
import Dashboard from "./pages/Dashboard.js";
import Inventory from "./pages/inventory/Inventory.js";
import Vendors from "./pages/vendors/Vendors.js";
import Finances from "./pages/finances/Finances.js";
import Nonexisting from "./components/notFound.js";
import { AppProvider, useAppContext } from "./appContext.js";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

const App = () => {
  const { drawerOpen, toggleDrawer } = useAppContext();

  return (
    <Router>
      <div>
        <Navbar drawerOpen={drawerOpen} toggleDrawer={toggleDrawer} />
        <Routes>
          {/* Route to Dashboard */}
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/vendors" element={<Vendors />} />
          <Route path="/finances" element={<Finances />} />
          <Route path="*" element={<Nonexisting />} />
        </Routes>
      </div>
    </Router>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppProvider>
      <App />
    </AppProvider>
  </React.StrictMode>
);
