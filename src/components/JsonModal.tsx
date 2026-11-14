import { useContext, useState } from "react";
import {
  Code,
  X,
  Copy,
  Check,
  Download,
  Terminal,
} from "lucide-react";
import { NetworkInfoContext } from "utils/models/Context";
import { Button } from "./ui/button";

export function JsonModal() {
  const { Info, jsonModalOpen, setJsonModalOpen } = useContext(NetworkInfoContext);
  const [copiedJson, setCopiedJson] = useState(false);
  const [copiedCurl, setCopiedCurl] = useState(false);

  if (!jsonModalOpen || !Info) return null;

  const jsonString = JSON.stringify(Info, null, 2);

  const handleCopyJson = () => {
    navigator.clipboard.writeText(jsonString);
    setCopiedJson(true);
    setTimeout(() => setCopiedJson(false), 2000);
  };

  const handleCopyCurl = () => {
    const curlCmd = `curl -s "${import.meta.env.VITE_INFO_URL}${import.meta.env.VITE_API_KEY}&ip=${Info.ip}"`;
    navigator.clipboard.writeText(curlCmd);
    setCopiedCurl(true);
    setTimeout(() => setCopiedCurl(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([jsonString], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `request-info-${Info.ip}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-background/80 backdrop-blur-xs transition-opacity"
        onClick={() => setJsonModalOpen(false)}
      />

      <div className="relative w-full max-w-2xl overflow-hidden rounded-xl border border-border bg-card shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border px-5 py-3.5">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-secondary/30 bg-secondary/10 text-secondary">
              <Code className="h-4 w-4 shrink-0" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-foreground leading-tight">
                Raw Network Payload
              </h3>
              <p className="text-xs text-muted-foreground">
                JSON telemetry data for {Info.ip}
              </p>
            </div>
          </div>

          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => setJsonModalOpen(false)}
          >
            <X className="h-3.5 w-3.5 shrink-0" />
          </Button>
        </div>

        {/* Toolbar */}
        <div className="flex flex-wrap items-center gap-1.5 border-b border-border bg-muted/20 px-5 py-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleCopyJson}
            className="gap-1.5 h-7 px-2.5 text-xs text-muted-foreground hover:text-foreground"
          >
            {copiedJson ? (
              <Check className="h-3.5 w-3.5 shrink-0 text-secondary" />
            ) : (
              <Copy className="h-3.5 w-3.5 shrink-0" />
            )}
            <span>{copiedJson ? "Copied" : "Copy JSON"}</span>
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={handleCopyCurl}
            className="gap-1.5 h-7 px-2.5 text-xs text-muted-foreground hover:text-foreground"
          >
            {copiedCurl ? (
              <Check className="h-3.5 w-3.5 shrink-0 text-secondary" />
            ) : (
              <Terminal className="h-3.5 w-3.5 shrink-0" />
            )}
            <span>{copiedCurl ? "Copied" : "Copy cURL"}</span>
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={handleDownload}
            className="gap-1.5 h-7 px-2.5 text-xs text-muted-foreground hover:text-foreground"
          >
            <Download className="h-3.5 w-3.5 shrink-0" />
            <span>Download .json</span>
          </Button>
        </div>

        {/* Code Content */}
        <div className="max-h-[60vh] overflow-y-auto bg-muted/40 p-5 text-xs">
          <pre className="font-mono text-foreground leading-relaxed selection:bg-secondary/20">
            {jsonString}
          </pre>
        </div>
      </div>
    </div>
  );
}
