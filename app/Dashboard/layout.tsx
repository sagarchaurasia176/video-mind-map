import "./dashboard-css.css";
import { SidebarProvider } from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AppSidebar } from "./app-sidebar";
import SessionGuard from "@/components/SessionGuard";
// import { ThemeProvider } from "@/components/ui/theme-provider";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    // <ThemeProvider>
      <TooltipProvider>
        <SessionGuard>
          <SidebarProvider defaultOpen={true}>
            <AppSidebar />
            <main className="w-full h-full" data-theme="cerberus">
              {children}
            </main>
          </SidebarProvider>
        </SessionGuard>
      </TooltipProvider>
    // </ThemeProvider>
  );
}
