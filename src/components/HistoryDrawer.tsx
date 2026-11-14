import { useContext, useState, useEffect } from "react";
import {
  History,
  X,
  Trash2,
  Globe,
  ArrowRight,
} from "lucide-react";
import { NetworkInfoContext } from "utils/models/Context";
import { GetHistory, ClearHistory } from "utils/history/History";
import { History as HistoryModel } from "utils/models/History";
import { Button } from "./ui/button";
import dayjs from "dayjs";

export function HistoryDrawer() {
  const { historyOpen, setHistoryOpen, refetch } = useContext(NetworkInfoContext);
  const [historyData, setHistoryData] = useState<{ [key: string]: HistoryModel[] }>({});

  const reloadHistory = () => {
    const data = GetHistory<{ [key: string]: HistoryModel[] }>();
    setHistoryData(data || {});
  };

  useEffect(() => {
    if (historyOpen) {
      reloadHistory();
    }
  }, [historyOpen]);

  if (!historyOpen) return null;

  const handleClear = () => {
    if (window.confirm("Are you sure you want to clear your lookup history?")) {
      ClearHistory();
      setHistoryData({});
    }
  };

  const handleItemClick = (item: HistoryModel) => {
    if (item.IP) {
      refetch(item.IP);
    } else {
      refetch(item.Location);
    }
    setHistoryOpen(false);
  };

  const dates = Object.keys(historyData).sort(
    (a, b) => dayjs(b, "DD MMMM YYYY").valueOf() - dayjs(a, "DD MMMM YYYY").valueOf()
  );

  const totalEntries = dates.reduce(
    (acc, date) => acc + (historyData[date]?.length || 0),
    0
  );

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-background/80 backdrop-blur-xs transition-opacity"
        onClick={() => setHistoryOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 flex max-w-full pl-10">
        <div className="w-screen max-w-md border-l border-border bg-card shadow-xl">
          <div className="flex h-full flex-col">
            {/* Drawer Header */}
            <div className="flex items-center justify-between border-b border-border px-5 py-4">
              <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-tertiary/30 bg-tertiary/10 text-tertiary">
                  <History className="h-4 w-4 shrink-0" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-foreground leading-tight">
                    Lookup History
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    {totalEntries} recorded connections
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                {totalEntries > 0 && (
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    onClick={handleClear}
                    title="Clear all history"
                    className="text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                  >
                    <Trash2 className="h-3.5 w-3.5 shrink-0" />
                  </Button>
                )}

                <Button
                  variant="ghost"
                  size="icon-sm"
                  onClick={() => setHistoryOpen(false)}
                >
                  <X className="h-3.5 w-3.5 shrink-0" />
                </Button>
              </div>
            </div>

            {/* History List */}
            <div className="flex-1 overflow-y-auto p-5 space-y-5">
              {totalEntries === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-muted text-muted-foreground">
                    <History className="h-5 w-5" />
                  </div>
                  <h4 className="mt-3 text-xs font-medium text-foreground">
                    No history recorded
                  </h4>
                  <p className="mt-1 text-[11px] text-muted-foreground max-w-[200px]">
                    Your IP lookups and network queries will be saved locally.
                  </p>
                </div>
              ) : (
                dates.map((dateKey) => {
                  const logs = (historyData[dateKey] || []).slice().reverse();
                  return (
                    <div key={dateKey} className="space-y-2">
                      <div className="sticky top-0 z-10 bg-card py-1 font-mono text-[11px] font-medium tracking-wider text-muted-foreground uppercase">
                        {dateKey}
                      </div>

                      <div className="space-y-1.5">
                        {logs.map((item, idx) => (
                          <div
                            key={idx}
                            onClick={() => handleItemClick(item)}
                            className="group flex cursor-pointer items-center justify-between rounded-lg border border-border/80 bg-muted/20 p-2.5 transition-colors hover:border-tertiary/40 hover:bg-muted/50"
                          >
                            <div className="min-w-0 flex items-center gap-2.5">
                              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md border border-tertiary/30 bg-tertiary/10 font-mono text-[10px] font-semibold text-tertiary">
                                {item.LocationShort || <Globe className="h-3 w-3 shrink-0" />}
                              </span>

                              <div className="min-w-0">
                                <div className="text-xs font-medium text-foreground truncate group-hover:text-primary">
                                  {item.Location}
                                </div>
                                <div className="flex items-center gap-2 text-[11px] font-mono text-muted-foreground mt-0.5">
                                  {item.IP && (
                                    <span>{item.IP}</span>
                                  )}
                                  {item.IP && (
                                    <span className="h-1 w-1 shrink-0 rounded-full bg-border" />
                                  )}
                                  <span>{item.Time}</span>
                                </div>
                              </div>
                            </div>

                            <ArrowRight className="h-3.5 w-3.5 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
