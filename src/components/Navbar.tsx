import { useContext } from "react";
import {
  Globe,
  Moon,
  Sun,
  Laptop,
  Code,
  History,
  Crosshair,
} from "lucide-react";
import { NetworkInfoContext, ThemeMode } from "utils/models/Context";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { cn } from "lib/utils";

function ThemeToggle({
  theme,
  setTheme,
}: {
  theme: ThemeMode;
  setTheme: (mode: ThemeMode) => void;
}) {
  return (
    <div className="flex items-center rounded-lg border border-border bg-muted/30 p-0.5 shrink-0">
      <button
        onClick={() => setTheme("light")}
        title="Light theme"
        className={cn(
          "flex h-7 w-7 items-center justify-center rounded-md text-xs transition-colors",
          theme === "light"
            ? "bg-background text-foreground shadow-xs font-medium"
            : "text-muted-foreground hover:text-foreground"
        )}
      >
        <Sun className="h-3.5 w-3.5 shrink-0" />
      </button>
      <button
        onClick={() => setTheme("dark")}
        title="Dark theme"
        className={cn(
          "flex h-7 w-7 items-center justify-center rounded-md text-xs transition-colors",
          theme === "dark"
            ? "bg-background text-foreground shadow-xs font-medium"
            : "text-muted-foreground hover:text-foreground"
        )}
      >
        <Moon className="h-3.5 w-3.5 shrink-0" />
      </button>
      <button
        onClick={() => setTheme("system")}
        title="System theme"
        className={cn(
          "flex h-7 w-7 items-center justify-center rounded-md text-xs transition-colors",
          theme === "system"
            ? "bg-background text-foreground shadow-xs font-medium"
            : "text-muted-foreground hover:text-foreground"
        )}
      >
        <Laptop className="h-3.5 w-3.5 shrink-0" />
      </button>
    </div>
  );
}

export function Navbar() {
  const {
    Info,
    refetch,
    loading,
    theme,
    setTheme,
    historyOpen,
    setHistoryOpen,
    setJsonModalOpen,
  } = useContext(NetworkInfoContext);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/95 backdrop-blur-xs">
      <div className="mx-auto flex max-w-7xl flex-col gap-2.5 px-4 py-2.5 sm:flex-row sm:items-center sm:justify-between sm:gap-0 sm:px-6">
        {/* Row 1 on mobile, Left column on desktop */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-primary/30 bg-primary/10 text-primary">
              <Globe className="h-4 w-4" />
            </div>

            <div className="flex flex-col justify-center">
              <div className="flex items-center gap-1.5">
                <span className="text-sm font-semibold tracking-tight text-foreground leading-none">
                  RequestInfo
                </span>
                <Badge variant="primary" className="text-[10px] px-1.5 py-0 leading-tight">
                  v2.0
                </Badge>
              </div>
              <p className="hidden text-[11px] text-muted-foreground sm:block mt-0.5 leading-none">
                IP & Network Intelligence
              </p>
            </div>
          </div>

          {/* Theme switcher on Row 1 (Mobile only) */}
          <div className="sm:hidden">
            <ThemeToggle theme={theme} setTheme={setTheme} />
          </div>
        </div>

        {/* Row 2 on mobile, Right column on desktop */}
        <div className="flex items-center gap-1.5">
          <div className="grid grid-cols-3 gap-1.5 w-full sm:flex sm:w-auto">
            {/* Quick "My IP" Button */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => refetch("")}
              disabled={loading}
              title="Reset to your current IP"
              className="gap-1.5 h-8 px-2 text-xs text-muted-foreground hover:text-foreground justify-center sm:justify-start"
            >
              <Crosshair className="h-3.5 w-3.5 shrink-0 text-primary" />
              <span className="inline sm:hidden md:inline">My IP</span>
            </Button>

            {/* Raw JSON Modal Trigger */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setJsonModalOpen(true)}
              disabled={!Info}
              title="Inspect raw JSON data"
              className="gap-1.5 h-8 px-2 text-xs text-muted-foreground hover:text-foreground justify-center sm:justify-start"
            >
              <Code className="h-3.5 w-3.5 shrink-0 text-secondary" />
              <span className="inline sm:hidden md:inline">Raw JSON</span>
            </Button>

            {/* History Drawer Trigger */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setHistoryOpen(!historyOpen)}
              title="View lookup history"
              className="gap-1.5 h-8 px-2 text-xs text-muted-foreground hover:text-foreground justify-center sm:justify-start"
            >
              <History className="h-3.5 w-3.5 shrink-0 text-tertiary" />
              <span className="inline sm:hidden md:inline">History</span>
            </Button>
          </div>

          {/* Theme switcher on desktop (sm+ only) */}
          <div className="hidden sm:flex">
            <ThemeToggle theme={theme} setTheme={setTheme} />
          </div>
        </div>
      </div>
    </header>
  );
}
