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
import { AppProvider, useAppContext } from "./AppContext.js";
import { Auth0Provider, useAuth0 } from "@auth0/auth0-react";
import { AuthTokenProvider } from "./AuthTokenContext.js";
import VerifyUser from "./components/VerifyUser";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

const requestedScopes = ["profile", "email"];

function RequireAuth({ children }) {
  const { isAuthenticated, isLoading } = useAuth0();
  console.log("isauto: ", isAuthenticated, isLoading);
  // If the user is not authenticated, redirect to the home page
  if (!isLoading && !isAuthenticated) {
    alert(
      "You need to Login to access Inventory. Click on the top right to Login."
    );
    return <Navigate to="/" replace />;
  }

  // Otherwise, display the children (the protected page)
  return children;
}

const App = () => {
  const { drawerOpen, toggleDrawer } = useAppContext();

  return (
    <Auth0Provider
      domain={process.env.REACT_APP_AUTH0_DOMAIN}
      clientId={process.env.REACT_APP_AUTH0_CLIENT_ID}
      authorizationParams={{
        redirect_uri: `${window.location.origin}/verify-user`,
        audience: process.env.REACT_APP_AUTH0_AUDIENCE,
        scope: requestedScopes.join(" "),
      }}
    >
      <AuthTokenProvider>
        <Router>
          <div>
            <Navbar drawerOpen={drawerOpen} toggleDrawer={toggleDrawer} />
            <Routes>
              {/* Route to Dashboard */}
              <Route path="/" element={<Navigate to="/dashboard" />} />
              <Route path="/verify-user" element={<VerifyUser />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route
                path="/inventory"
                element={
                  <RequireAuth>
                    <Inventory />
                  </RequireAuth>
                }
              />
              <Route path="/vendors" element={<Vendors />} />
              <Route path="/finances" element={<Finances />} />
              <Route path="*" element={<Nonexisting />} />
            </Routes>
          </div>
        </Router>
      </AuthTokenProvider>
    </Auth0Provider>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppProvider>
      <App />
    </AppProvider>
  </React.StrictMode>
);
