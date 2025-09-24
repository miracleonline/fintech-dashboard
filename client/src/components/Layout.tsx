import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; 
import { jwtDecode } from "jwt-decode";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login"); 
      return;
    }

    try {
      const decoded: { exp: number } = jwtDecode(token);

      // Check expiry
      const currentTime = Date.now() / 1000;
      if (decoded.exp < currentTime) {
        localStorage.removeItem("token");
        navigate("/login");
        return;
      }

      // ****Fetch user info here using /api/auth/me
      setLoading(false);
    } catch (err) {
      console.error("Invalid token", err);
      localStorage.removeItem("token");
      navigate("/login");
    }
  }, [navigate]);

  if (loading) {
    return <div className="text-center py-10">Loading...</div>; // You can replace with spinner
  }

  return (
    <div className="relative min-h-screen bg-gray-100 dark:bg-gray-950">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Mobile overlay when sidebar is open */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content area (Header + Page) */}
      <div className="flex flex-col min-h-screen lg:ml-[280px]">
        {/* Header */}
        <Header onToggleSidebar={() => setSidebarOpen((prev) => !prev)} />

        {/* Main content */}
        <main className="flex-1 pt-[100px] p-4">
          {children}
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}
