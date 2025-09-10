import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import 'bootstrap-icons/font/bootstrap-icons.css';
import Register from "./pages/Auth/Register";
import Dashboard from "./pages/Auth/Dashboard";
import Login from "./pages/Auth/Login";
import Layout from "./components/Layout";
import AccountHistory from "./pages/Auth/AccountHistory";

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
      </Routes>
    </Router>
  );
}

export default App;
