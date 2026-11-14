import "assets/styles/Styles.Compiled.css";
import { useState, useEffect, useCallback } from "react";
import { Layout } from "components/Layout";
import { NetworkInfo } from "components/NetworkInfo";
import { ApiResponseType } from "utils/models/ApiResponse";
import { NetworkInfoContext, ThemeMode } from "utils/models/Context";
import { GetInfoAsync } from "utils/request/NetworkInformation";
import { AddToHistory } from "utils/history/History";

type AppProps = {
  initialData?: ApiResponseType;
};

export function App({ initialData }: AppProps) {
  const [networkInfo, setNetworkInfo] = useState<ApiResponseType | null>(
    initialData || null
  );
  const [loading, setLoading] = useState<boolean>(!initialData);
  const [error, setError] = useState<string | null>(null);
  const [historyOpen, setHistoryOpen] = useState(false);
  const [jsonModalOpen, setJsonModalOpen] = useState(false);

  // Theme Management
  const [theme, setThemeState] = useState<ThemeMode>(() => {
    try {
      const saved = localStorage.getItem("requestinfo_theme") as ThemeMode;
      return saved === "light" || saved === "dark" || saved === "system"
        ? saved
        : "system";
    } catch {
      return "system";
    }
  });

  const [resolvedTheme, setResolvedTheme] = useState<"dark" | "light">(() => {
    try {
      const saved = localStorage.getItem("requestinfo_theme") as ThemeMode;
      if (saved === "dark") return "dark";
      if (saved === "light") return "light";
      return window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    } catch {
      return "light";
    }
  });

  const applyTheme = useCallback((mode: ThemeMode) => {
    const isDark =
      mode === "dark" ||
      (mode === "system" &&
        window.matchMedia("(prefers-color-scheme: dark)").matches);

    setResolvedTheme(isDark ? "dark" : "light");

    if (isDark) {
      document.documentElement.classList.add("dark");
      document.documentElement.style.colorScheme = "dark";
    } else {
      document.documentElement.classList.remove("dark");
      document.documentElement.style.colorScheme = "light";
    }
  }, []);

  const setTheme = (mode: ThemeMode) => {
    setThemeState(mode);
    try {
      localStorage.setItem("requestinfo_theme", mode);
    } catch { }
    applyTheme(mode);
  };

  useEffect(() => {
    applyTheme(theme);

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleSystemChange = () => {
      if (theme === "system") {
        applyTheme("system");
      }
    };

    mediaQuery.addEventListener("change", handleSystemChange);
    return () => mediaQuery.removeEventListener("change", handleSystemChange);
  }, [theme, applyTheme]);

  // Fetch logic
  const fetchInfo = useCallback(async (target?: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await GetInfoAsync(target);
      setNetworkInfo(data);

      AddToHistory({
        location: `${data.city || data.country_capital || ""}, ${data.country_name}`,
        locationShort: data.country_code2,
        ip: data.ip,
        isp: data.isp,
      });
    } catch (err: any) {
      console.error("Fetch error:", err);
      setError(err?.message || "Failed to fetch network information");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    document.title = "RequestInfo - IP & Network Intelligence";

    if (!initialData) {
      fetchInfo();
    } else {
      AddToHistory({
        location: `${initialData.city || initialData.country_capital || ""}, ${initialData.country_name}`,
        locationShort: initialData.country_code2,
        ip: initialData.ip,
        isp: initialData.isp,
      });
    }
  }, [fetchInfo, initialData]);

  return (
    <NetworkInfoContext.Provider
      value={{
        Info: networkInfo,
        SetInfo: setNetworkInfo,
        loading,
        error,
        refetch: fetchInfo,
        theme,
        resolvedTheme,
        setTheme,
        historyOpen,
        setHistoryOpen,
        jsonModalOpen,
        setJsonModalOpen,
      }}
    >
      <Layout>
        <NetworkInfo />
      </Layout>
    </NetworkInfoContext.Provider>
  );
}
