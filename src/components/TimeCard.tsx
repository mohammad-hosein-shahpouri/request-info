import { useContext, useEffect, useState } from "react";
import { Clock, Sun, Globe } from "lucide-react";
import { NetworkInfoContext } from "utils/models/Context";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import dayjs from "dayjs";

export function TimeCard() {
  const { Info } = useContext(NetworkInfoContext);
  const [localTime, setLocalTime] = useState<string>("");
  const [localDate, setLocalDate] = useState<string>("");

  const offsetHours = Info?.time_zone?.offset ?? 0;
  const tzName = Info?.time_zone?.name || "UTC";
  const isDst = Boolean(Info?.time_zone?.is_dst);

  useEffect(() => {
    const updateTime = () => {
      const nowUtc = Date.now() + new Date().getTimezoneOffset() * 60000;
      const targetTime = new Date(nowUtc + offsetHours * 3600000);
      const d = dayjs(targetTime);

      setLocalTime(d.format("HH:mm:ss"));
      setLocalDate(d.format("dddd, D MMMM YYYY"));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, [offsetHours]);

  if (!Info) return null;

  const sign = offsetHours >= 0 ? "+" : "-";
  const absOffset = Math.abs(offsetHours);
  const wholeHours = Math.floor(absOffset);
  const minutes = Math.round((absOffset - wholeHours) * 60);
  const formattedOffset = `UTC${sign}${String(wholeHours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;

  return (
    <Card className="p-5 sm:p-6">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-tertiary/30 bg-tertiary/10 text-tertiary">
            <Clock className="h-4 w-4 shrink-0" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-foreground leading-tight">
              Local Time & Zone
            </h3>
            <p className="text-xs text-muted-foreground">
              Live clock & timezone data
            </p>
          </div>
        </div>

        <Badge variant="tertiary" className="gap-1.5 text-[10px]">
          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-tertiary" />
          <span>Live Clock</span>
        </Badge>
      </div>

      {/* Main Clock Banner */}
      <div className="rounded-lg border border-border bg-muted/20 p-4 transition-colors hover:border-tertiary/30">
        <div className="flex items-center justify-between">
          <div className="font-mono text-3xl font-bold tracking-tight text-foreground sm:text-4xl leading-none">
            {localTime || "—:—:—"}
          </div>
          <span className="inline-flex items-center rounded-md border border-tertiary/30 bg-tertiary/10 px-2 py-0.5 font-mono text-xs font-medium text-tertiary">
            {formattedOffset}
          </span>
        </div>
        <div className="mt-2 text-xs font-mono text-muted-foreground">
          {localDate || "Loading date..."}
        </div>
      </div>

      {/* Sub attributes */}
      <div className="mt-2.5 grid grid-cols-2 gap-2 text-xs">
        <div className="rounded-lg border border-border/80 bg-muted/20 p-2.5 transition-colors hover:border-tertiary/30">
          <div className="flex items-center gap-1.5 text-[11px] font-mono text-muted-foreground">
            <Globe className="h-3 w-3 shrink-0 text-tertiary" />
            <span>Time Zone</span>
          </div>
          <div className="mt-1 font-mono text-xs font-medium text-foreground truncate">
            {tzName}
          </div>
        </div>

        <div className="rounded-lg border border-border/80 bg-muted/20 p-2.5 transition-colors hover:border-tertiary/30">
          <div className="flex items-center gap-1.5 text-[11px] font-mono text-muted-foreground">
            <Sun className="h-3 w-3 shrink-0 text-tertiary" />
            <span>Daylight Saving</span>
          </div>
          <div className="mt-1 text-xs font-medium text-foreground truncate">
            {isDst ? (
              <span className="text-emerald-600 dark:text-emerald-400 font-mono">
                DST Active
              </span>
            ) : (
              <span className="text-muted-foreground font-mono">
                Standard Time
              </span>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}
