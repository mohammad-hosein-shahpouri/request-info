import { useContext, useState } from "react";
import {
  Wifi,
  Server,
  Building2,
  Phone,
  Globe,
  Hash,
  Copy,
  Check,
} from "lucide-react";
import { NetworkInfoContext } from "utils/models/Context";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";

export function NetworkCard() {
  const { Info } = useContext(NetworkInfoContext);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  if (!Info) return null;

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const items = [
    {
      label: "ISP Name",
      value: Info.isp || "Unknown",
      icon: Wifi,
      copyable: true,
      key: "isp",
    },
    {
      label: "Organization",
      value: Info.organization || "Unknown",
      icon: Building2,
      copyable: true,
      key: "org",
    },
    {
      label: "Connection Type",
      value: Info.connection_type || "Direct / Wire",
      icon: Server,
      copyable: false,
      key: "conn",
    },
    {
      label: "Country TLD",
      value: Info.country_tld || "—",
      icon: Globe,
      copyable: false,
      key: "tld",
    },
    {
      label: "Calling Code",
      value: Info.calling_code || "—",
      icon: Phone,
      copyable: false,
      key: "calling",
    },
    {
      label: "Geoname ID",
      value: Info.geoname_id || "—",
      icon: Hash,
      copyable: true,
      key: "geoname",
    },
  ];

  return (
    <Card className="p-5 sm:p-6">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-secondary/30 bg-secondary/10 text-secondary">
            <Server className="h-4 w-4 shrink-0" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-foreground leading-tight">
              Network & Routing
            </h3>
            <p className="text-xs text-muted-foreground">
              Provider & routing infrastructure
            </p>
          </div>
        </div>

        <Badge variant="secondary" className="text-[10px]">
          ASN & Telecom
        </Badge>
      </div>

      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.key}
              className="flex h-[52px] items-center justify-between rounded-lg border border-border/80 bg-muted/20 px-3 transition-colors hover:border-secondary/40 hover:bg-muted/40"
            >
              <div className="flex items-center gap-2.5 min-w-0 pr-2">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-border/60 bg-muted/60 text-secondary">
                  <Icon className="h-3.5 w-3.5 shrink-0" />
                </div>
                <div className="min-w-0">
                  <div className="text-[11px] font-mono text-muted-foreground truncate leading-tight">
                    {item.label}
                  </div>
                  <div className="text-xs font-medium text-foreground truncate mt-0.5">
                    {item.value}
                  </div>
                </div>
              </div>

              {item.copyable ? (
                <button
                  onClick={() => handleCopy(item.value, item.key)}
                  title={`Copy ${item.label}`}
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                >
                  {copiedKey === item.key ? (
                    <Check className="h-3.5 w-3.5 shrink-0 text-secondary" />
                  ) : (
                    <Copy className="h-3.5 w-3.5 shrink-0" />
                  )}
                </button>
              ) : (
                <div className="h-7 w-7 shrink-0" />
              )}
            </div>
          );
        })}
      </div>
    </Card>
  );
}
