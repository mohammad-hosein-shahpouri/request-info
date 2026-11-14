import { Coffee } from "lucide-react";
import { Button } from "./ui/button";

export function BmacButton() {
  return (
    <div className="mx-auto my-6 max-w-xl px-4 text-center sm:text-left">
      <div className="rounded-lg border border-border bg-card p-4 shadow-xs">
        <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-tertiary/30 bg-tertiary/10 text-tertiary">
              <Coffee className="h-4 w-4 shrink-0" />
            </div>
            <div>
              <h4 className="text-xs font-semibold text-foreground leading-tight">
                Support RequestInfo
              </h4>
              <p className="text-[11px] text-muted-foreground mt-0.5">
                Independent, privacy-friendly network intelligence tool
              </p>
            </div>
          </div>

          <a
            href="https://www.coffeete.ir/mohammad-hosein-shahpouri"
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0"
          >
            <Button variant="tertiary" size="sm" className="gap-1.5 h-8 text-xs">
              <Coffee className="h-3.5 w-3.5" />
              <span>Buy a coffee</span>
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
}
