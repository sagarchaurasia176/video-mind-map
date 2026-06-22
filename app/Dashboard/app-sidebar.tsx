import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {Settings, User } from "lucide-react";

export function AppSidebar() {
  return (
   <Sidebar collapsible="icon" className="bg-slate-100 text-black w-[20%] top-12  h-auto ml-4 rounded-xl overflow-hidden">
      <SidebarHeader className="p-4 flex flex-row items-center text-black justify-between bg-slate-100">
        <SidebarTrigger className="text-black hover:text-white/80" />
      </SidebarHeader>
      <SidebarContent className="overflow-y-auto scrollbar-thin text-black bg-slate-100">
        <SidebarGroup className="bg-slate-100 text-black">
          <SidebarMenu className="space-y-2">
            <SidebarMenuItem>
              <SidebarMenuButton tooltip="Chat" className="text-black hover:bg-slate-800 hover:text-black transition-colors">
                <User className="h-4 w-4" />
                <span>New Chat</span>
              </SidebarMenuButton>
            </SidebarMenuItem>

            {/* side menu  */}
            <SidebarMenuItem>
              <SidebarMenuButton tooltip="Search" className="text-black hover:bg-slate-800 hover:text-black  transition-colors">
                <Settings className="h-4 w-4" />
                <span>Search Chat</span>
              </SidebarMenuButton>
            </SidebarMenuItem>

            {/* history */}
            <SidebarMenuItem>
              <SidebarMenuButton tooltip="Conversations" className="text-black hover:bg-slate-800 hover:text-black  transition-colors">
                <Settings className="h-4 w-4" />
                <span>History</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
