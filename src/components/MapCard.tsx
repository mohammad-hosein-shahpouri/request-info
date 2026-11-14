import { useContext, useState } from "react";
import {
  MapPin,
  Copy,
  Check,
  ExternalLink,
  RotateCw,
} from "lucide-react";
import { NetworkInfoContext } from "utils/models/Context";
import { Card } from "./ui/card";
import { Button } from "./ui/button";

export function MapCard() {
  const { Info } = useContext(NetworkInfoContext);
  const [copiedCoords, setCopiedCoords] = useState(false);
  const [mapKey, setMapKey] = useState<number>(0);
  const zoomLevel = 14;

  const lat = Number(Info?.latitude);
  const lng = Number(Info?.longitude);
  const hasValidCoords = !isNaN(lat) && !isNaN(lng);

  if (!Info) return null;

  const handleCopyCoords = () => {
    navigator.clipboard.writeText(`${lat}, ${lng}`);
    setCopiedCoords(true);
    setTimeout(() => setCopiedCoords(false), 2000);
  };

  const handleRefreshMap = () => {
    setMapKey((prev) => prev + 1);
  };

  // Google Maps official embed URL permanently locked to Hybrid view (!5e3)
  const googleMapEmbedUrl = `https://www.google.com/maps/embed?origin=mfe&pb=!1m4!2m1!1s${lat},${lng}!5e3!6i${zoomLevel}`;
  const googleMapDirectUrl = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;

  return (
    <Card className="p-5 sm:p-6">
      {/* Header & Controls */}
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-primary/30 bg-primary/10 text-primary">
            <MapPin className="h-4 w-4 shrink-0" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-foreground leading-tight">
              Geographic Location
            </h3>
            <p className="text-xs text-muted-foreground">
              Google Maps
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
          {hasValidCoords && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleCopyCoords}
              title="Copy coordinates"
              className="font-mono text-xs gap-1.5 text-muted-foreground hover:text-foreground"
            >
              <span>
                {lat.toFixed(4)}, {lng.toFixed(4)}
              </span>
              {copiedCoords ? (
                <Check className="h-3.5 w-3.5 shrink-0 text-primary" />
              ) : (
                <Copy className="h-3.5 w-3.5 shrink-0" />
              )}
            </Button>
          )}
          {/* 
          <Button
            variant="outline"
            size="icon-sm"
            onClick={handleRefreshMap}
            title="Reload Google Maps view"
          >
            <RotateCw className="h-3.5 w-3.5 shrink-0" />
          </Button> */}

          <a
            href={googleMapDirectUrl}
            target="_blank"
            rel="noopener noreferrer"
            title="Open in Google Maps"
          >
            <Button variant="outline" size="sm" className="gap-1.5 text-xs">
              <span>Google Maps</span>
              <ExternalLink className="h-3 w-3 shrink-0" />
            </Button>
          </a>
        </div>
      </div>

      {/* Google Maps Hybrid Embed Container */}
      <div className="relative overflow-hidden rounded-lg border border-border bg-muted/20">
        {hasValidCoords ? (
          <iframe
            key={`${mapKey}-${zoomLevel}`}
            title={`Google Map Hybrid View for ${Info.city || Info.country_name}`}
            src={googleMapEmbedUrl}
            className="h-[280px] w-full sm:h-[380px] border-0"
            loading="lazy"
            allowFullScreen
          />
        ) : (
          <div className="flex h-[280px] sm:h-[380px] flex-col items-center justify-center text-center p-6 text-muted-foreground">
            <MapPin className="h-8 w-8 mb-2 opacity-50" />
            <p className="text-sm font-medium">Coordinates unavailable</p>
          </div>
        )}
      </div>

      {/* Location Attributes Grid */}
      <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-6 text-xs">
        <div className="flex h-[52px] flex-col justify-center rounded-lg border border-border/80 bg-muted/20 px-3">
          <span className="text-[11px] font-mono text-muted-foreground block truncate leading-tight">
            City
          </span>
          <p className="mt-0.5 font-medium text-foreground truncate">
            {Info.city || "—"}
          </p>
        </div>

        <div className="flex h-[52px] flex-col justify-center rounded-lg border border-border/80 bg-muted/20 px-3">
          <span className="text-[11px] font-mono text-muted-foreground block truncate leading-tight">
            State / Region
          </span>
          <p className="mt-0.5 font-medium text-foreground truncate">
            {Info.state_prov || "—"}
          </p>
        </div>

        <div className="flex h-[52px] flex-col justify-center rounded-lg border border-border/80 bg-muted/20 px-3">
          <span className="text-[11px] font-mono text-muted-foreground block truncate leading-tight">
            District
          </span>
          <p className="mt-0.5 font-medium text-foreground truncate">
            {Info.district || "—"}
          </p>
        </div>

        <div className="flex h-[52px] flex-col justify-center rounded-lg border border-border/80 bg-muted/20 px-3">
          <span className="text-[11px] font-mono text-muted-foreground block truncate leading-tight">
            Capital
          </span>
          <p className="mt-0.5 font-medium text-foreground truncate">
            {Info.country_capital || "—"}
          </p>
        </div>

        <div className="flex h-[52px] flex-col justify-center rounded-lg border border-border/80 bg-muted/20 px-3">
          <span className="text-[11px] font-mono text-muted-foreground block truncate leading-tight">
            Postal Code
          </span>
          <p className="mt-0.5 font-mono font-medium text-foreground truncate">
            {Info.zipcode || "—"}
          </p>
        </div>

        <div className="flex h-[52px] flex-col justify-center rounded-lg border border-border/80 bg-muted/20 px-3">
          <span className="text-[11px] font-mono text-muted-foreground block truncate leading-tight">
            Continent
          </span>
          <p className="mt-0.5 font-medium text-foreground truncate">
            {Info.continent_name || "—"}
          </p>
        </div>
      </div>
    </Card>
  );
}
