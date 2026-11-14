import { useContext } from "react";
import { NetworkInfoContext } from "utils/models/Context";
import { SearchBar } from "./SearchBar";
import { HeroCard } from "./HeroCard";
import { MapCard } from "./MapCard";
import { NetworkCard } from "./NetworkCard";
import { TimeCard } from "./TimeCard";
import { ClientCard } from "./ClientCard";
import { CurrencyCard } from "./CurrencyCard";
import { BmacButton } from "./BmacButton";
import { RotateCw, AlertTriangle, Database } from "lucide-react";
import { DEMO_DATA } from "utils/request/NetworkInformation";
import { Button } from "./ui/button";

export function NetworkInfo() {
  const { Info, loading, error, refetch, SetInfo } = useContext(NetworkInfoContext);

  if (loading && !Info) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center space-y-3 px-4 py-16 text-center">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-border bg-muted/60 text-muted-foreground">
          <RotateCw className="h-5 w-5 animate-spin" />
        </div>
        <div>
          <h3 className="text-sm font-medium text-foreground">
            Detecting Network Intelligence...
          </h3>
          <p className="mt-1 text-xs text-muted-foreground font-mono">
            Fetching geolocation, ISP routing, and client telemetry
          </p>
        </div>
      </div>
    );
  }

  if (error && !Info) {
    return (
      <div className="mx-auto my-12 max-w-md rounded-xl border border-border bg-card p-6 text-center shadow-xs">
        <div className="mx-auto flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-border bg-destructive/10 text-destructive">
          <AlertTriangle className="h-5 w-5 shrink-0" />
        </div>
        <h3 className="mt-3 text-sm font-semibold text-foreground">
          Lookup Request Failed
        </h3>
        <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
          {error}
        </p>
        <p className="mt-1 text-[11px] text-muted-foreground font-mono">
          Check connection or load sample telemetry.
        </p>

        <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
          <Button
            variant="default"
            size="sm"
            onClick={() => refetch()}
            className="gap-1.5 h-8 text-xs"
          >
            <RotateCw className="h-3.5 w-3.5 shrink-0" />
            <span>Retry Detection</span>
          </Button>

          <Button
            variant="secondary"
            size="sm"
            onClick={() => SetInfo(DEMO_DATA)}
            className="gap-1.5 h-8 text-xs"
          >
            <Database className="h-3.5 w-3.5 shrink-0" />
            <span>Load Demo Data</span>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full space-y-4">
      {/* Top Search Bar */}
      <SearchBar />

      {/* Hero IP Card */}
      <HeroCard />

      {/* Bento Grid */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {/* Geographic Map Card (Full width on lg) */}
        <div className="lg:col-span-2">
          <MapCard />
        </div>

        {/* Network & Routing Card */}
        <NetworkCard />

        {/* Local Time & Timezone Card */}
        <TimeCard />

        {/* Client & Device Environment Card */}
        <ClientCard />

        {/* Currency & Regional Locale Card */}
        <CurrencyCard />
      </div>

      {/* Buy Me a Coffee Support Card */}
      <BmacButton />
    </div>
  );
}
