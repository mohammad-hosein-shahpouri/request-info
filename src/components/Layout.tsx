import { ReactNode } from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { HistoryDrawer } from "./HistoryDrawer";
import { JsonModal } from "./JsonModal";

type LayoutProps = {
  children: ReactNode;
};

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-background text-foreground">
      <Navbar />

      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-6 sm:px-6 lg:px-8">
        {children}
      </main>

      <Footer />

      {/* Slide-over Drawers & Modals */}
      <HistoryDrawer />
      <JsonModal />
    </div>
  );
}
