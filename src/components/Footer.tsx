import { Link } from "react-router-dom";
import { Mail, MapPin, Phone } from "lucide-react";
import { Logo } from "@/components/Logo";
import { siteMeta } from "@/data/mock";

export function Footer() {
  return (
    <footer className="mt-16 bg-primary-deep text-primary-foreground">
      <div className="container-page grid gap-10 py-12 md:grid-cols-4">
        <div className="md:col-span-2">
          <Logo light />
          <p className="mt-4 max-w-md text-sm text-primary-foreground/75">
            Official website of {siteMeta.name}. The portal is structured for clean public access and
            future backend integration of news, courses, trainee information and administrative updates.
          </p>
        </div>

        <div>
          <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-accent">Quick Links</h4>
          <ul className="mt-4 space-y-2 text-sm">
            <li><Link to="/about" className="transition-colors hover:text-accent">About</Link></li>
            <li><Link to="/training-information" className="transition-colors hover:text-accent">Training Information</Link></li>
            <li><Link to="/knowledge-centre" className="transition-colors hover:text-accent">Knowledge Centre</Link></li>
            <li><Link to="/contact" className="transition-colors hover:text-accent">Contact</Link></li>
            <li><Link to="/login" className="transition-colors hover:text-accent">Admin Login</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-accent">Contact</h4>
          <ul className="mt-4 space-y-3 text-sm">
            <li className="flex gap-2"><MapPin className="mt-0.5 h-4 w-4 shrink-0" /> {siteMeta.addressLines.join(", ")}</li>
            <li className="flex gap-2"><Phone className="mt-0.5 h-4 w-4 shrink-0" /> {siteMeta.phone}</li>
            <li className="flex gap-2"><Mail className="mt-0.5 h-4 w-4 shrink-0" /> {siteMeta.email}</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-page flex flex-col gap-2 py-4 text-xs text-primary-foreground/60 sm:flex-row sm:justify-between">
          <span>© {new Date().getFullYear()} {siteMeta.shortName}. All rights reserved.</span>
          <span>{siteMeta.authority}</span>
        </div>
      </div>
    </footer>
  );
}
