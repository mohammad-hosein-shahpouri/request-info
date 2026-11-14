import { useContext } from "react";
import { Coins, Languages, Globe } from "lucide-react";
import { NetworkInfoContext } from "utils/models/Context";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";

export function CurrencyCard() {
  const { Info } = useContext(NetworkInfoContext);

  if (!Info) return null;

  const currency = Info.currency;
  const languagesList = Info.languages
    ? Info.languages.split(",").map((l) => l.trim())
    : [];

  return (
    <Card className="p-5 sm:p-6">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-tertiary/30 bg-tertiary/10 text-tertiary">
            <Coins className="h-4 w-4 shrink-0" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-foreground leading-tight">
              Currency & Languages
            </h3>
            <p className="text-xs text-muted-foreground">
              Regional financial and cultural locale
            </p>
          </div>
        </div>

        {currency?.symbol && (
          <span className="flex h-7 px-2 shrink-0 items-center justify-center rounded-md border border-tertiary/30 bg-tertiary/10 font-mono text-xs font-semibold text-tertiary">
            {currency.symbol}
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        {/* Currency Details */}
        <div className="flex h-[52px] flex-col justify-center rounded-lg border border-border/80 bg-muted/20 px-3 transition-colors hover:border-tertiary/30">
          <div className="text-[11px] font-mono text-muted-foreground leading-tight">
            Official Currency
          </div>
          <div className="mt-1 flex items-baseline gap-2 min-w-0">
            <span className="font-mono text-xs font-bold text-tertiary shrink-0">
              {currency?.code || "—"}
            </span>
            <span className="text-xs text-muted-foreground truncate">
              {currency?.name ? `${currency.name} (${currency.symbol || ""})` : "—"}
            </span>
          </div>
        </div>

        {/* Continent */}
        <div className="flex h-[52px] flex-col justify-center rounded-lg border border-border/80 bg-muted/20 px-3 transition-colors hover:border-tertiary/30">
          <div className="flex items-center gap-1.5 text-[11px] font-mono text-muted-foreground leading-tight">
            <Globe className="h-3 w-3 shrink-0 text-tertiary" />
            <span>Continent</span>
          </div>
          <div className="mt-1 flex items-baseline gap-2 min-w-0">
            <span className="font-mono text-xs font-bold text-foreground shrink-0">
              {Info.continent_code || "—"}
            </span>
            <span className="text-xs text-muted-foreground truncate">
              {Info.continent_name || "—"}
            </span>
          </div>
        </div>
      </div>

      {/* Languages pills */}
      <div className="mt-2 rounded-lg border border-border/80 bg-muted/20 p-3">
        <div className="flex items-center gap-1.5 text-[11px] font-mono text-muted-foreground">
          <Languages className="h-3.5 w-3.5 shrink-0" />
          <span>Languages Spoken</span>
        </div>

        <div className="mt-2 flex flex-wrap items-center gap-1.5">
          {languagesList.length > 0 ? (
            languagesList.map((lang) => (
              <Badge
                key={lang}
                variant="outline"
                className="font-mono text-[11px] font-normal text-muted-foreground"
              >
                {lang}
              </Badge>
            ))
          ) : (
            <span className="text-xs font-mono text-muted-foreground">None specified</span>
          )}
        </div>
      </div>
    </Card>
  );
}
