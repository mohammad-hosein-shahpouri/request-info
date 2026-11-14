import { useState, useContext } from "react";
import {
  Copy,
  Check,
  RotateCw,
  Zap,
  ShieldCheck,
  Server,
  Globe,
} from "lucide-react";
import { NetworkInfoContext } from "utils/models/Context";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

export function HeroCard() {
  const { Info, refetch, loading } = useContext(NetworkInfoContext);
  const [copied, setCopied] = useState(false);

  if (!Info) return null;

  const handleCopy = () => {
    if (Info.ip) {
      navigator.clipboard.writeText(Info.ip);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const isIpv6 = Info.ip.includes(":");
  const flagUrl = `${import.meta.env["VITE_FLAG_IMAGE_URL"] || "https://purecatamphetamine.github.io/country-flag-icons/3x2/"}${Info.country_code2}${import.meta.env["VITE_FLAG_IMAGE_TYPE"] || ".svg"}`;

  return (
    <div className="rounded-xl border border-border bg-card p-5 sm:p-6 shadow-xs">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        {/* Main IP & Connection Title */}
        <div className="flex-1 space-y-2.5">
          <div className="flex flex-wrap items-center gap-1.5">
            <Badge variant="primary" className="gap-1.5 py-1 leading-none">
              <span className="relative flex h-2 w-2 shrink-0 items-center justify-center">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
              </span>
              <span className="leading-none">{isIpv6 ? "IPv6" : "IPv4"}</span>
            </Badge>

            {Info.ping_ms !== undefined && (
              <Badge variant="tertiary" className="gap-1">
                <Zap className="h-3 w-3 shrink-0 text-tertiary" />
                <span>{Info.ping_ms} ms ping</span>
              </Badge>
            )}

            {Info.is_eu && (
              <Badge variant="outline" className="font-mono text-[11px] gap-1">
                <ShieldCheck className="h-3 w-3 shrink-0 text-muted-foreground" />
                <span>EU Region</span>
              </Badge>
            )}

            {Info.resolved_from && (
              <Badge variant="secondary" className="gap-1 max-w-full">
                <Globe className="h-3 w-3 shrink-0 text-secondary" />
                <span className="truncate max-w-[200px] sm:max-w-[300px]">
                  dns: {Info.resolved_from}
                </span>
              </Badge>
            )}
          </div>

          <div>
            <div className="text-[11px] font-mono tracking-wider text-muted-foreground uppercase">
              Connected Public IP
            </div>
            <div className="mt-1 flex flex-wrap items-center gap-2.5">
              <h1 className="font-mono text-3xl font-bold tracking-tight text-foreground select-all sm:text-4xl md:text-5xl leading-none">
                {Info.ip}
              </h1>

              <div className="flex items-center gap-1">
                <Button
                  variant="outline"
                  size="icon-sm"
                  onClick={handleCopy}
                  title="Copy IP address"
                  className={copied ? "border-primary/50 text-primary" : "text-muted-foreground hover:text-foreground"}
                >
                  {copied ? (
                    <Check className="h-3.5 w-3.5 shrink-0 text-primary" />
                  ) : (
                    <Copy className="h-3.5 w-3.5 shrink-0" />
                  )}
                </Button>

                <Button
                  variant="outline"
                  size="icon-sm"
                  onClick={() => refetch(Info.ip)}
                  disabled={loading}
                  title="Refresh connection status"
                  className="text-muted-foreground hover:text-foreground"
                >
                  <RotateCw className={`h-3.5 w-3.5 shrink-0 ${loading ? "animate-spin" : ""}`} />
                </Button>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs text-muted-foreground font-mono">
            <span className="inline-flex items-center gap-1.5 text-foreground font-medium">
              <Server className="h-3.5 w-3.5 shrink-0 text-secondary" />
              <span>{Info.isp || Info.organization || "Unknown Provider"}</span>
            </span>
            {Info.organization && Info.organization !== Info.isp && (
              <span className="text-muted-foreground">
                ({Info.organization})
              </span>
            )}
          </div>
        </div>

        {/* Country & Flag Showcase Badge */}
        <div className="flex items-center gap-3.5 rounded-lg border border-border bg-muted/20 p-3 sm:p-4 shrink-0">
          <div className="overflow-hidden rounded-md border border-border shadow-xs shrink-0">
            <img
              src={flagUrl}
              alt={Info.country_name}
              className="aspect-[3/2] h-10 w-auto object-cover sm:h-12 shrink-0"
              onError={(e) => {
                if (Info.country_flag) {
                  (e.target as HTMLImageElement).src = Info.country_flag;
                }
              }}
            />
          </div>

          <div className="min-w-0">
            <h2 className="text-sm font-semibold text-foreground sm:text-base truncate leading-tight">
              {Info.country_name}
            </h2>

            <p className="text-xs text-muted-foreground truncate mt-0.5">
              {[Info.city, Info.state_prov, Info.country_capital]
                .filter(Boolean)
                .slice(0, 2)
                .join(", ")}
            </p>

            <div className="mt-1 flex items-center gap-1.5 text-[11px] font-mono text-muted-foreground">
              <span className="text-primary font-medium">{Info.country_code2}</span>
              <span className="text-border">/</span>
              <span>{Info.country_code3}</span>
              <span className="text-border">/</span>
              <span className="truncate">{Info.continent_name}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
