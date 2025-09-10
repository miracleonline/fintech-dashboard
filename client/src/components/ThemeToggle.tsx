import { Sun, Moon } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="top-4 right-4 p-2 rounded-full 
                 bg-gray-200 dark:bg-gray-800 hover:scale-105 transition"
    >
      {theme === "light" ? (
        <Moon className="w-5 h-5 text-brand" />
      ) : (
        <Sun className="w-5 h-5 text-yellow-400" />
      )}
    </button>
  );
}
