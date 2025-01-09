import { useEffect } from "react";
import { THEMES } from "../constants";
import { useThemeStore } from "../store/useThemeStore";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook

const SettingsPage = () => {
  const { theme, setTheme } = useThemeStore();
  const navigate = useNavigate(); // Create navigate function

  // Apply the theme to the root element
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <div className="h-screen container mx-auto px-4 pt-20 max-w-5xl">
      <div className="space-y-6">
        <h2 className="text-lg font-semibold">Theme</h2>

        {/* Informing the user about available modes */}
        <p className="text-sm text-gray-500">
          You can switch between various themes, including Dark and Light modes. <br />
          But now, only Dark and Light modes are available. In the future, we will add other color themes.
        </p>

        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2">
          {THEMES.map((t) => (
            <button
              key={t}
              className={`group flex flex-col items-center gap-1.5 p-2 rounded-lg transition-colors ${
                theme === t ? "bg-base-200" : "hover:bg-base-200/50"
              }`}
              onClick={() => setTheme(t)}
            >
              <div className="relative h-8 w-full rounded-md overflow-hidden" data-theme={t}>
                <div className="absolute inset-0 grid grid-cols-4 gap-px p-1">
                  <div className="rounded bg-primary"></div>
                  <div className="rounded bg-secondary"></div>
                  <div className="rounded bg-accent"></div>
                  <div className="rounded bg-neutral"></div>
                </div>
              </div>
              <span className="text-[11px] font-medium truncate w-full text-center">
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </span>
            </button>
          ))}
        </div>

        {/* Back Button */}
        <div className="mt-6">
          <button
            onClick={() => navigate("/")}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Back to Main Page
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;