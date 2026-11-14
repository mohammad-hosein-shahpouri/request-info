import { useState, useEffect } from "react";
import {
  osName,
  osVersion,
  browserName,
  browserVersion,
  isMobile,
  isTablet,
} from "react-device-detect";
import {
  Monitor,
  Smartphone,
  Tablet,
  Activity,
  Apple,
  Terminal,
  Compass,
  Globe,
} from "lucide-react";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";

export function ClientCard() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [screenRes, setScreenRes] = useState("");

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    const updateScreen = () => {
      setScreenRes(
        `${window.screen.width} × ${window.screen.height} (${window.devicePixelRatio || 1}x)`
      );
    };
    updateScreen();
    window.addEventListener("resize", updateScreen);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
      window.removeEventListener("resize", updateScreen);
    };
  }, []);

  const getOsIcon = () => {
    const name = (osName || "").toLowerCase();
    if (name.includes("mac") || name.includes("ios")) return Apple;
    if (name.includes("linux")) return Terminal;
    if (name.includes("android")) return Smartphone;
    return Monitor;
  };

  const getBrowserIcon = () => {
    const name = (browserName || "").toLowerCase();
    if (name.includes("safari")) return Compass;
    return Globe;
  };

  const deviceType = isMobile ? "Mobile Device" : isTablet ? "Tablet" : "Desktop PC";
  const OsIcon = getOsIcon();
  const BrowserIcon = getBrowserIcon();
  const FormFactorIcon = isMobile ? Smartphone : isTablet ? Tablet : Monitor;

  return (
    <Card className="p-5 sm:p-6">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-secondary/30 bg-secondary/10 text-secondary">
            <Monitor className="h-4 w-4 shrink-0" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-foreground leading-tight">
              Client & Device
            </h3>
            <p className="text-xs text-muted-foreground">
              Browser environment diagnostics
            </p>
          </div>
        </div>

        <Badge
          variant="secondary"
          className="gap-1.5 text-[10px]"
        >
          <span
            className={`h-1.5 w-1.5 shrink-0 rounded-full ${
              isOnline ? "bg-emerald-500" : "bg-destructive"
            }`}
          />
          <span>{isOnline ? "Online" : "Offline"}</span>
        </Badge>
      </div>

      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        {/* Operating System */}
        <div className="flex h-[52px] items-center gap-2.5 rounded-lg border border-border/80 bg-muted/20 px-3 transition-colors hover:border-secondary/40 hover:bg-muted/40">
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-border/60 bg-muted/60 text-secondary">
            <OsIcon className="h-3.5 w-3.5 shrink-0" />
          </div>
          <div className="min-w-0">
            <div className="text-[11px] font-mono text-muted-foreground truncate leading-tight">
              Operating System
            </div>
            <div className="text-xs font-medium text-foreground truncate mt-0.5">
              {osName ? `${osName} ${osVersion}` : "Unknown OS"}
            </div>
          </div>
        </div>

        {/* Browser */}
        <div className="flex h-[52px] items-center gap-2.5 rounded-lg border border-border/80 bg-muted/20 px-3 transition-colors hover:border-secondary/40 hover:bg-muted/40">
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-border/60 bg-muted/60 text-secondary">
            <BrowserIcon className="h-3.5 w-3.5 shrink-0" />
          </div>
          <div className="min-w-0">
            <div className="text-[11px] font-mono text-muted-foreground truncate leading-tight">
              Web Browser
            </div>
            <div className="text-xs font-medium text-foreground truncate mt-0.5">
              {browserName ? `${browserName} ${browserVersion}` : "Unknown Browser"}
            </div>
          </div>
        </div>

        {/* Display Resolution */}
        <div className="flex h-[52px] items-center gap-2.5 rounded-lg border border-border/80 bg-muted/20 px-3 transition-colors hover:border-secondary/40 hover:bg-muted/40">
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-border/60 bg-muted/60 text-secondary">
            <Activity className="h-3.5 w-3.5 shrink-0" />
          </div>
          <div className="min-w-0">
            <div className="text-[11px] font-mono text-muted-foreground truncate leading-tight">
              Display Resolution
            </div>
            <div className="text-xs font-mono font-medium text-foreground truncate mt-0.5">
              {screenRes || "1920 × 1080"}
            </div>
          </div>
        </div>

        {/* Device Type */}
        <div className="flex h-[52px] items-center gap-2.5 rounded-lg border border-border/80 bg-muted/20 px-3 transition-colors hover:border-secondary/40 hover:bg-muted/40">
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-border/60 bg-muted/60 text-secondary">
            <FormFactorIcon className="h-3.5 w-3.5 shrink-0" />
          </div>
          <div className="min-w-0">
            <div className="text-[11px] font-mono text-muted-foreground truncate leading-tight">
              Form Factor
            </div>
            <div className="text-xs font-medium text-foreground truncate mt-0.5">
              {deviceType}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
