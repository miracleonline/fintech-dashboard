// src/layouts/Layout.tsx
import { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "../components/Header";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

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
      </div>
    </div>
  );
}
