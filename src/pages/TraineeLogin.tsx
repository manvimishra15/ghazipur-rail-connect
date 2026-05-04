import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, GraduationCap } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/Logo";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";

export default function TraineeLogin() {
  const { traineeLogin } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const mobile = String(form.get("mobile") ?? "").trim();
    const dob = String(form.get("dob") ?? "").trim();
    setSubmitting(true);
    try {
      await traineeLogin({ mobile, dob });
      toast({ title: "Login successful", description: "Welcome to the trainee portal." });
      navigate("/trainee-portal");
    } catch (error) {
      toast({
        title: "Login failed",
        description: error instanceof Error ? error.message : "Invalid mobile number or date of birth.",
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
                <GraduationCap className="h-5 w-5" />
                <span className="text-xs font-semibold uppercase tracking-wider">Trainee Portal</span>
              </div>
              <h1 className="mt-2 font-display text-2xl font-bold text-foreground">Trainee Login</h1>
              <p className="mt-1 text-sm text-muted-foreground">
                Enter your registered mobile number and date of birth to access your portal.
              </p>

              <form onSubmit={onSubmit} className="mt-6 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="mobile">Mobile Number</Label>
                  <Input
                    id="mobile"
                    name="mobile"
                    type="tel"
                    placeholder="10-digit mobile number"
                    maxLength={10}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dob">Date of Birth</Label>
                  <Input id="dob" name="dob" type="date" required />
                  <p className="text-xs text-muted-foreground">As registered with the institute.</p>
                </div>

                <Button type="submit" disabled={submitting} className="w-full">
                  {submitting ? "Verifying..." : "Login to Portal"}
                </Button>
              </form>

              <div className="mt-4 rounded-lg bg-secondary/60 p-3 text-xs text-muted-foreground">
                <strong>Demo credentials:</strong> Mobile: 9999999999, DOB: 1995-01-15
              </div>

              <p className="mt-4 text-center text-xs text-muted-foreground">
                Are you an admin?{" "}
                <Link to="/login" className="text-primary hover:underline">Admin Login</Link>
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
