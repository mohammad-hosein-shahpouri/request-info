import { version, type SVGProps } from "react";

const TelegramIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="m20.665 3.717-17.73 6.837c-1.21.486-1.203 1.161-.222 1.462l4.552 1.42 10.532-6.645c.498-.303.953-.14.579.192l-8.533 7.701h-.002l-.313 4.673c.46 0 .663-.211.921-.46l2.211-2.15 4.6 3.398c.848.467 1.457.227 1.668-.785l3.019-14.228c.309-1.239-.473-1.8-1.282-1.417z" />
  </svg>
);

const GithubIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

const LinkedinIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
  </svg>
);

const ReactIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="-11.5 -10.23174 23 20.46348" fill="currentColor" width="1em" height="1em" {...props}>
    <circle cx="0" cy="0" r="2.05" fill="#61dafb" />
    <g stroke="#61dafb" strokeWidth="1" fill="none">
      <ellipse rx="11" ry="4.2" />
      <ellipse rx="11" ry="4.2" transform="rotate(60)" />
      <ellipse rx="11" ry="4.2" transform="rotate(120)" />
    </g>
  </svg>
);

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-12 border-t border-border bg-background py-6 text-xs text-muted-foreground">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          {/* Copyright & Creator */}
          <div className="text-center md:text-left">
            <p className="text-xs text-muted-foreground">
              © {currentYear}{" "}
              <span className="font-medium text-foreground">RequestInfo</span>
              {" "}— Developed by{" "}
              <a
                href="https://github.com/mohammad-hosein-shahpouri"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-foreground hover:text-primary transition-colors hover:underline underline-offset-4"
              >
                Mohammad Hosein Shahpouri
              </a>
            </p>
            <p className="mt-0.5 text-[11px] text-muted-foreground">
              Open-source network diagnostics, IP geolocation, and client telemetry.
            </p>
          </div>

          {/* Social Links & Tech Badges */}
          <div className="flex flex-wrap items-center gap-2">
            <a
              href="https://github.com/mohammad-hosein-shahpouri/RequestInfo"
              target="_blank"
              rel="noopener noreferrer"
              title="GitHub Repository"
              className="flex h-8 w-8 items-center justify-center rounded-md border border-border bg-card text-muted-foreground shadow-xs transition hover:border-primary/50 hover:bg-muted hover:text-foreground"
            >
              <GithubIcon className="h-4 w-4 shrink-0" />
            </a>

            <a
              href="https://www.linkedin.com/in/mohammad-hosein-shahpouri/"
              target="_blank"
              rel="noopener noreferrer"
              title="LinkedIn Profile"
              className="flex h-8 w-8 items-center justify-center rounded-md border border-border bg-card text-muted-foreground shadow-xs transition hover:border-secondary/50 hover:bg-muted hover:text-foreground"
            >
              <LinkedinIcon className="h-4 w-4 shrink-0" />
            </a>

            <a
              href="https://t.me/mohammad_hosein_shahpouri"
              target="_blank"
              rel="noopener noreferrer"
              title="Telegram"
              className="flex h-8 w-8 items-center justify-center rounded-md border border-border bg-card text-muted-foreground shadow-xs transition hover:border-secondary/50 hover:bg-muted hover:text-foreground"
            >
              <TelegramIcon className="h-4 w-4 shrink-0" />
            </a>

            <div className="flex h-8 items-center gap-1.5 rounded-md border border-border bg-muted/40 px-2.5 font-mono text-[11px] text-muted-foreground">
              <ReactIcon className="h-3.5 w-3.5 shrink-0" />
              <span>React {version}</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
