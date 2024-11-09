import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../app/store";
import { updateSettings } from "../features/settings/settingsSlice";
import { Settings } from "../types/types";
import { FaMoon, FaSun, FaDesktop } from "react-icons/fa";
import { useSystemTheme } from "../hooks/useSystemTheme";

type ThemeKey = Settings["theme"];

const themes: Record<ThemeKey, { icon: React.ReactNode; label: string }> = {
  light: {
    icon: <FaSun />,
    label: "Light",
  },
  dark: {
    icon: <FaMoon />,
    label: "Dark",
  },
  system: {
    icon: <FaDesktop />,
    label: "System",
  },
};

const ThemeSwitcher: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const settings = useSelector((state: RootState) => state.settings.settings);
  const [isOpen, setIsOpen] = useState(false);
  const systemTheme = useSystemTheme();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleThemeChange = (newTheme: ThemeKey) => {
    dispatch(updateSettings({ theme: newTheme, currency: settings.currency }));
    setIsOpen(false); // Close menu after selecting theme
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const currentTheme = settings.theme;
  const themeIcon =
    currentTheme === "system"
      ? systemTheme === "dark"
        ? themes.dark.icon
        : themes.light.icon
      : themes[currentTheme]?.icon;

  return (
    <div ref={dropdownRef} className="dropdown dropdown-end">
      <button className="btn btn-ghost" onClick={() => setIsOpen(!isOpen)}>
        {themeIcon}
      </button>
      {isOpen && (
        <ul className="menu dropdown-content p-2 shadow bg-base-100 rounded-box w-52">
          {Object.keys(themes).map((key) => {
            const themeKey = key as ThemeKey;
            return (
              <li key={themeKey}>
                <button
                  className={themeKey === currentTheme ? "active" : undefined}
                  onClick={() => handleThemeChange(themeKey)}
                >
                  {themes[themeKey].icon} {themes[themeKey].label}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default ThemeSwitcher;
