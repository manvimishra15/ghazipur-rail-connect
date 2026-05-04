import { NavLink } from "@/components/NavLink";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Bell, BookOpen, GraduationCap, Images, LayoutDashboard, Megaphone, Newspaper, Train, Users } from "lucide-react";

const menuItems = [
  { label: "Overview", to: "/dashboard", icon: LayoutDashboard, end: true },
  { label: "Announcements", to: "/dashboard/announcements", icon: Megaphone, end: false },
  { label: "Courses", to: "/dashboard/courses", icon: BookOpen, end: false },
  { label: "Gallery", to: "/dashboard/gallery", icon: Images, end: false },
  { label: "Faculty", to: "/dashboard/faculty", icon: Users, end: false },
  { label: "Results", to: "/dashboard/results", icon: GraduationCap, end: false },
  { label: "E-Books", to: "/dashboard/ebooks", icon: BookOpen, end: false },
  { label: "Magazine", to: "/dashboard/magazine", icon: Newspaper, end: false },
  { label: "Notices", to: "/dashboard/notices", icon: Bell, end: false },
];

export function DashboardSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";

  return (
    <Sidebar collapsible="icon" className="border-sidebar-border">
      <SidebarHeader className="border-b border-sidebar-border px-3 py-4">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-sidebar-primary text-sidebar-primary-foreground">
            <Train className="h-4 w-4" />
          </div>
          {!collapsed && (
            <div className="leading-tight">
              <div className="text-sm font-semibold text-sidebar-foreground">ZRTI Ghazipur</div>
              <div className="text-[10px] uppercase tracking-wider text-sidebar-foreground/60">admin portal</div>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          {!collapsed && <SidebarGroupLabel>Workspace</SidebarGroupLabel>}
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.to}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.to}
                      end={item.end}
                      className="text-sidebar-foreground/85 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                      activeClassName="!bg-sidebar-accent !text-sidebar-accent-foreground font-medium"
                    >
                      <item.icon className="mr-2 h-4 w-4" />
                      {!collapsed && <span>{item.label}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
