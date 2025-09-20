import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import 'bootstrap-icons/font/bootstrap-icons.css';
import Register from "./pages/Auth/Register";
import Dashboard from "./pages/Auth/Dashboard";
import Login from "./pages/Auth/Login";
import Layout from "./components/Layout";
import AccountHistory from "./pages/Auth/AccountHistory";
import Account from "./pages/Auth/Account";
import UpdateAccount from "./pages/Auth/UpdateAccount";
import PlansPage from "./pages/Auth/PlansPage";
import BeneficiariesPage from "./pages/Auth/BeneficiariesPage";
import SettingsPage from "./pages/Auth/SettingsPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* Protected layout */}
        <Route
          path="/dashboard"
          element={
            <Layout>
              <Dashboard />
            </Layout>
          }
        />
        <Route
          path="/history"
          element={
            <Layout>
              <AccountHistory />
            </Layout>
          }
        />
        <Route
          path="/account"
          element={
            <Layout>
              <Account />
            </Layout>
          }
        />
        <Route
          path="/update"
          element={
            <Layout>
              <UpdateAccount />
            </Layout>
          }
        />
        <Route
          path="/upgrade"
          element={
            <Layout>
              <PlansPage />
            </Layout>
          }
        />
        <Route
          path="/beneficiaries"
          element={
            <Layout>
              <BeneficiariesPage />
            </Layout>
          }
        />
        <Route
          path="/settings"
          element={
            <Layout>
              <SettingsPage />
            </Layout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
