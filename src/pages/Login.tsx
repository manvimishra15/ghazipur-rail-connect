import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, ShieldCheck } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/Logo";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const email = String(form.get("email") ?? "");
    const password = String(form.get("password") ?? "");
    setSubmitting(true);

    try {
      await login({ email, password });
      toast({ title: "Login successful", description: "Admin portal is ready for future backend integration." });
      navigate("/dashboard");
    } catch (error) {
      toast({
        title: "Login failed",
        description: error instanceof Error ? error.message : "Please try again.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-hero text-primary-foreground">
      <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(hsl(var(--primary-foreground)/0.08)_1px,transparent_1px),linear-gradient(90deg,hsl(var(--primary-foreground)/0.08)_1px,transparent_1px)] [background-size:32px_32px]" />

      <div className="container-page relative flex min-h-screen flex-col">
        <div className="flex items-center justify-between py-6">
          <Logo light />
          <Link to="/" className="inline-flex items-center gap-1 text-sm text-primary-foreground/80 hover:text-accent">
            <ArrowLeft className="h-4 w-4" />
            Back to site
          </Link>
        </div>

        <div className="flex flex-1 items-center justify-center pb-16">
          <Card className="w-full max-w-md">
            <CardContent className="p-6 md:p-8">
              <div className="flex items-center gap-2 text-primary">
                <ShieldCheck className="h-5 w-5" />
                <span className="text-xs font-semibold uppercase tracking-wider">Admin Portal</span>
              </div>
              <h1 className="mt-2 font-display text-2xl font-bold text-foreground">Principal / Admin Login</h1>
              <p className="mt-1 text-sm text-muted-foreground">
                Simple login screen prepared for future integration with <code>/api/login</code>.
              </p>

              <form onSubmit={onSubmit} className="mt-6 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Official Email</Label>
                  <Input id="email" name="email" type="email" required defaultValue="admin@zrti-ghazipur.gov.in" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" name="password" type="password" required defaultValue="admin1234" />
                </div>

                <Button type="submit" disabled={submitting} className="w-full">
                  {submitting ? "Signing in..." : "Sign in"}
                </Button>
              </form>

              <p className="mt-4 text-center text-xs text-muted-foreground">
                Only the admin/principal login is retained in the production-ready frontend.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
