import { useTheme } from "@/context/ThemeContext";
import { Moon, Sun } from "lucide-react"; // 图标库（可改）

export default function ThemeToggleButton() {
  const { theme, toggleTheme } = useTheme();

  console.log(theme);

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg bg-bg-light shadow-s hover:shadow-m transition-shadow"
      title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
    >
      {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
    </button>
  );
}
