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
import ETFChartsPage from "./pages/Auth/ETFChartsPage";
import CryptoChartsPage from "./pages/Auth/CryptoChartsPage";
import FractionalChartsPage from "./pages/Auth/FractionalChartsPage";
import ReferralsPage from "./pages/Auth/ReferralsPage";
import LiveChatPage from "./pages/Auth/LiveChatPage";
import AboutUsPage from "./pages/Auth/AboutUsPage";
import TermsPage from "./pages/Auth/TermsPage";
import FaqPage from "./pages/Auth/FaqPage";
import AccountStatementPage from "./pages/Auth/AccountStatement";
import LoanApplication from "./pages/Auth/LoanApplication";
import WalletAndCards from "./pages/Auth/WalletAndCards";

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
        <Route
          path="/charts/etf"
          element={
            <Layout>
              <ETFChartsPage />
            </Layout>
          }
        />
        <Route
          path="/charts/crypto"
          element={
            <Layout>
              <CryptoChartsPage />
            </Layout>
          }
        />
        <Route
          path="/charts/fractional"
          element={
            <Layout>
              <FractionalChartsPage />
            </Layout>
          }
        />
        <Route
          path="/refer"
          element={
            <Layout>
              <ReferralsPage />
            </Layout>
          }
        />
        <Route
          path="/live-chat"
          element={
            <Layout>
              <LiveChatPage />
            </Layout>
          }
        />
        <Route
          path="/about"
          element={
            <Layout>
              <AboutUsPage />
            </Layout>
          }
        />
        <Route
          path="/terms"
          element={
            <Layout>
              <TermsPage />
            </Layout>
          }
        />
        <Route
          path="/faq"
          element={
            <Layout>
              <FaqPage />
            </Layout>
          }
        />
        <Route
          path="/statement"
          element={
            <Layout>
              <AccountStatementPage />
            </Layout>
          }
        />
        <Route
          path="/loan"
          element={
            <Layout>
              <LoanApplication />
            </Layout>
          }
        />
        <Route
          path="/cards"
          element={
            <Layout>
              <WalletAndCards />
            </Layout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
