import { useState, useContext, FormEvent } from "react";
import { Search, Zap, RotateCw, X, AlertCircle } from "lucide-react";
import { NetworkInfoContext } from "utils/models/Context";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

const PRESET_IPS = [
  { label: "My IP", query: "" },
  { label: "1.1.1.1 (Cloudflare)", query: "1.1.1.1" },
  { label: "8.8.8.8 (Google)", query: "8.8.8.8" },
  { label: "9.9.9.9 (Quad9)", query: "9.9.9.9" },
  { label: "github.com", query: "github.com" },
];

export function SearchBar() {
  const { refetch, loading, error } = useContext(NetworkInfoContext);
  const [inputVal, setInputVal] = useState("");
  const [localError, setLocalError] = useState<string | null>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const query = inputVal.trim();
    setLocalError(null);
    refetch(query);
  };

  const handleChipClick = (query: string) => {
    setInputVal(query);
    setLocalError(null);
    refetch(query);
  };

  const clearInput = () => {
    setInputVal("");
    setLocalError(null);
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="flex items-center gap-2 w-full">
        <div className="relative flex-1">
          <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 flex items-center justify-center text-muted-foreground">
            <Search className="h-4 w-4 shrink-0" />
          </div>

          <Input
            type="text"
            value={inputVal}
            onChange={(e) => {
              setInputVal(e.target.value);
              if (localError) setLocalError(null);
            }}
            placeholder="Search IPv4, IPv6, or domain (e.g. 1.1.1.1, github.com)..."
            disabled={loading}
            className="h-10 pl-9 pr-9 text-xs sm:text-sm rounded-lg"
          />

          {inputVal && !loading && (
            <button
              type="button"
              onClick={clearInput}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 flex h-6 w-6 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
              title="Clear input"
            >
              <X className="h-3.5 w-3.5 shrink-0" />
            </button>
          )}
        </div>

        <Button
          type="submit"
          variant={loading ? "tertiary" : "secondary"}
          size="default"
          disabled={loading}
          className="h-10 px-4 sm:px-5 shrink-0 gap-2 font-medium transition-colors disabled:opacity-90"
        >
          {loading ? (
            <>
              <RotateCw className="h-4 w-4 shrink-0 animate-spin" />
              <span>Resolving...</span>
            </>
          ) : (
            <>
              <Zap className="h-4 w-4 shrink-0" />
              <span>Lookup</span>
            </>
          )}
        </Button>
      </form>

      {/* Preset Quick Chips */}
      <div className="mt-2 flex flex-wrap items-center gap-1.5 text-xs">
        <span className="font-mono text-[11px] text-muted-foreground mr-0.5">
          presets:
        </span>
        {PRESET_IPS.map((preset) => (
          <button
            key={preset.label}
            type="button"
            onClick={() => handleChipClick(preset.query)}
            disabled={loading}
            className="inline-flex items-center rounded-md border border-border/80 bg-muted/30 px-2 py-0.5 font-mono text-[11px] text-muted-foreground transition-colors hover:border-border hover:bg-muted/70 hover:text-foreground"
          >
            {preset.label}
          </button>
        ))}
      </div>

      {/* Error Message Alert */}
      {(localError || error) && (
        <div className="mt-3 flex items-center justify-between rounded-xl border border-destructive/20 bg-destructive/10 p-3 text-xs text-destructive">
          <div className="flex items-center gap-2 min-w-0">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span className="font-semibold shrink-0">Lookup failed:</span>
            <span className="truncate">{localError || error}</span>
          </div>
          <button
            onClick={() => setLocalError(null)}
            className="ml-2 flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-destructive/80 hover:bg-destructive/20 hover:text-destructive"
          >
            <X className="h-3.5 w-3.5 shrink-0" />
          </button>
        </div>
      )}
    </div>
  );
}
