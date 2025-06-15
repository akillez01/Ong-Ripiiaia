import { Button } from "@/components/ui/button";
import { Monitor, Moon, Sun } from "lucide-react";
import { useState } from "react";
import { useTheme } from "./ThemeProvider";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setOpen((v) => !v)}
        className="h-9 w-9 rounded-md border border-slate-200 bg-white hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700"
        aria-label="Alternar tema"
      >
        {theme === "dark" ? (
          <Moon className="h-4 w-4" />
        ) : theme === "light" ? (
          <Sun className="h-4 w-4" />
        ) : (
          <Monitor className="h-4 w-4" />
        )}
      </Button>
      {open && (
        <div className="absolute right-0 mt-2 w-36 bg-white dark:bg-slate-800 rounded shadow-lg z-50">
          <button
            className={`flex items-center w-full px-3 py-2 text-sm hover:bg-slate-100 dark:hover:bg-slate-700 ${
              theme === "light"
                ? "font-bold text-emerald-600"
                : "text-gray-700 dark:text-gray-200"
            }`}
            onClick={() => {
              setTheme("light");
              setOpen(false);
            }}
          >
            <Sun className="mr-2 h-4 w-4" /> Claro
          </button>
          <button
            className={`flex items-center w-full px-3 py-2 text-sm hover:bg-slate-100 dark:hover:bg-slate-700 ${
              theme === "dark"
                ? "font-bold text-emerald-400"
                : "text-gray-700 dark:text-gray-200"
            }`}
            onClick={() => {
              setTheme("dark");
              setOpen(false);
            }}
          >
            <Moon className="mr-2 h-4 w-4" /> Escuro
          </button>
          <button
            className={`flex items-center w-full px-3 py-2 text-sm hover:bg-slate-100 dark:hover:bg-slate-700 ${
              theme === "system"
                ? "font-bold text-emerald-500"
                : "text-gray-700 dark:text-gray-200"
            }`}
            onClick={() => {
              setTheme("system");
              setOpen(false);
            }}
          >
            <Monitor className="mr-2 h-4 w-4" /> Sistema
          </button>
        </div>
      )}
    </div>
  );
}
