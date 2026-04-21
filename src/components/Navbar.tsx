import { useState } from "react";
import { LayoutDashboard, LogIn, Menu, X } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { siteMeta } from "@/data/mock";

const links = [
  { to: "/", label: "Home", end: true },
  { to: "/about", label: "About" },
  { to: "/training-information", label: "Training Information" },
  { to: "/knowledge-centre", label: "Knowledge Centre" },
  { to: "/trainees-information", label: "Trainees Information" },
  { to: "/e-magazine", label: "E-Magazine" },
  { to: "/facilities", label: "Facilities" },
  { to: "/contact", label: "Contact" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const { user } = useAuth();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/85 backdrop-blur supports-[backdrop-filter]:bg-background/70">
      <div className="gov-band text-primary-foreground">
        <div className="container-page flex h-7 items-center justify-between text-[11px]">
          <span className="hidden sm:inline">{siteMeta.authority}</span>
          <span className="sm:hidden">Ministry of Railways</span>
          <span className="hidden md:inline opacity-80">{siteMeta.phone}</span>
        </div>
      </div>

      <div className="container-page flex h-16 items-center justify-between">
        <Logo />

        <nav className="hidden items-center gap-1 lg:flex">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className="rounded-md px-3 py-2 text-sm font-medium text-foreground/80 transition-colors hover:bg-secondary hover:text-primary"
              activeClassName="!bg-secondary !text-primary"
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          {user ? (
            <Button asChild size="sm">
              <NavLink to="/dashboard">
                <LayoutDashboard className="h-4 w-4" />
                Dashboard
              </NavLink>
            </Button>
          ) : (
            <Button asChild size="sm">
              <NavLink to="/login">
                <LogIn className="h-4 w-4" />
                Admin Login
              </NavLink>
            </Button>
          )}
        </div>

        <button
          aria-label="Toggle menu"
          className="inline-flex h-10 w-10 items-center justify-center rounded-md text-foreground hover:bg-secondary lg:hidden"
          onClick={() => setOpen((state) => !state)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="animate-fade-in-up border-t border-border bg-background lg:hidden">
          <nav className="container-page flex flex-col py-3">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.end}
                className="rounded-md px-3 py-3 text-sm font-medium text-foreground/80 hover:bg-secondary"
                activeClassName="!bg-secondary !text-primary"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </NavLink>
            ))}
            <div className="mt-2 border-t border-border pt-3">
              {user ? (
                <Button asChild className="w-full" onClick={() => setOpen(false)}>
                  <NavLink to="/dashboard">Dashboard</NavLink>
                </Button>
              ) : (
                <Button asChild className="w-full" onClick={() => setOpen(false)}>
                  <NavLink to="/login">Admin Login</NavLink>
                </Button>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
