import { useState } from "react";
import { ChevronDown, LayoutDashboard, LogIn, Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { NavLink } from "@/components/NavLink";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/hooks/useAuth";
import { siteMeta } from "@/data/mock";

type NavItem =
  | { label: string; to: string; end?: boolean; children?: undefined }
  | { label: string; to?: undefined; end?: undefined; children: { label: string; to: string }[] };

const navItems: NavItem[] = [
  { label: "Home", to: "/", end: true },
  { label: "About", to: "/about" },
  {
    label: "Training",
    children: [
      { label: "Training Information", to: "/training-information" },
      { label: "Trainees Information", to: "/trainees-information" },
      { label: "Results", to: "/results" },
    ],
  },
  {
    label: "Resources",
    children: [
      { label: "Knowledge Centre", to: "/knowledge-centre" },
      { label: "E-Magazine", to: "/e-magazine" },
      { label: "Notices", to: "/notices" },
    ],
  },
  {
    label: "Institute",
    children: [
      { label: "Faculty & Staff", to: "/faculty" },
      { label: "Facilities", to: "/facilities" },
      { label: "Gallery", to: "/gallery" },
    ],
  },
  { label: "Contact", to: "/contact" },
];

function DesktopDropdown({ item }: Readonly<{ item: Extract<NavItem, { children: unknown }> }>) {
  const location = useLocation();
  const isActive = item.children.some((c) => location.pathname.startsWith(c.to));

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={`inline-flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-secondary hover:text-primary focus:outline-none ${
          isActive ? "bg-secondary text-primary" : "text-foreground/80"
        }`}
      >
        {item.label}
        <ChevronDown className="h-3.5 w-3.5 opacity-60" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="min-w-[200px]">
        {item.children.map((child) => (
          <DropdownMenuItem key={child.to} asChild>
            <Link
              to={child.to}
              className={`w-full cursor-pointer ${location.pathname === child.to ? "text-primary font-medium" : ""}`}
            >
              {child.label}
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function Navbar() {
  const [open, setOpen] = useState(false);
  const { user } = useAuth();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/85 backdrop-blur supports-[backdrop-filter]:bg-background/70">
      {/* Gov band */}
      <div className="gov-band text-primary-foreground">
        <div className="container-page flex h-7 items-center justify-between text-[11px]">
          <span className="hidden sm:inline">{siteMeta.authority}</span>
          <span className="sm:hidden">Ministry of Railways</span>
          <span className="hidden md:inline opacity-80">{siteMeta.phone}</span>
        </div>
      </div>

      {/* Main nav bar */}
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <Logo />

        {/* Desktop nav */}
        <nav className="hidden items-center gap-0.5 xl:flex">
          {navItems.map((item) =>
            item.children ? (
              <DesktopDropdown key={item.label} item={item} />
            ) : (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className="rounded-md px-3 py-2 text-sm font-medium text-foreground/80 transition-colors hover:bg-secondary hover:text-primary"
                activeClassName="!bg-secondary !text-primary"
              >
                {item.label}
              </NavLink>
            )
          )}
        </nav>

        {/* Desktop auth buttons */}
        <div className="hidden items-center gap-2 xl:flex shrink-0">
          {user ? (
            <Button asChild size="sm">
              <NavLink to="/dashboard">
                <LayoutDashboard className="h-4 w-4" />
                Dashboard
              </NavLink>
            </Button>
          ) : (
            <>
              <Button asChild size="sm" variant="outline">
                <NavLink to="/trainee-login">Trainee Login</NavLink>
              </Button>
              <Button asChild size="sm">
                <NavLink to="/login">
                  <LogIn className="h-4 w-4" />
                  Admin Login
                </NavLink>
              </Button>
            </>
          )}
        </div>

        {/* Mobile hamburger */}
        <button
          aria-label="Toggle menu"
          className="inline-flex h-10 w-10 items-center justify-center rounded-md text-foreground hover:bg-secondary xl:hidden"
          onClick={() => setOpen((s) => !s)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="animate-fade-in-up border-t border-border bg-background xl:hidden">
          <nav className="container-page flex flex-col py-3 max-h-[80vh] overflow-y-auto">
            {navItems.map((item) =>
              item.children ? (
                <div key={item.label} className="py-1">
                  <div className="px-3 py-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    {item.label}
                  </div>
                  {item.children.map((child) => (
                    <NavLink
                      key={child.to}
                      to={child.to}
                      className="block rounded-md px-6 py-2.5 text-sm font-medium text-foreground/80 hover:bg-secondary"
                      activeClassName="!bg-secondary !text-primary"
                      onClick={() => setOpen(false)}
                    >
                      {child.label}
                    </NavLink>
                  ))}
                </div>
              ) : (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.end}
                  className="rounded-md px-3 py-2.5 text-sm font-medium text-foreground/80 hover:bg-secondary"
                  activeClassName="!bg-secondary !text-primary"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </NavLink>
              )
            )}
            <div className="mt-2 border-t border-border pt-3 flex flex-col gap-2">
              {user ? (
                <Button asChild className="w-full" onClick={() => setOpen(false)}>
                  <NavLink to="/dashboard">Dashboard</NavLink>
                </Button>
              ) : (
                <>
                  <Button asChild variant="outline" className="w-full" onClick={() => setOpen(false)}>
                    <NavLink to="/trainee-login">Trainee Login</NavLink>
                  </Button>
                  <Button asChild className="w-full" onClick={() => setOpen(false)}>
                    <NavLink to="/login">Admin Login</NavLink>
                  </Button>
                </>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
