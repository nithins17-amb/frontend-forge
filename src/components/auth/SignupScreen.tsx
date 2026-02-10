import { useState } from "react";
import { Eye, EyeOff, Loader2, Mail, Lock, User, Phone } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface SignupScreenProps {
  onSwitchToLogin: () => void;
  onSubmit: () => void;
}

const SignupScreen = ({ onSwitchToLogin, onSubmit }: SignupScreenProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "", confirm: "" });
  const { toast } = useToast();

  const update = (key: string, value: string) => setForm((f) => ({ ...f, [key]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.password || !form.confirm) {
      toast({ title: "Missing fields", description: "Please fill in all required fields.", variant: "destructive" });
      return;
    }
    if (form.password !== form.confirm) {
      toast({ title: "Password mismatch", description: "Passwords do not match.", variant: "destructive" });
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast({ title: "OTP Sent", description: "A verification code has been sent to your email." });
      onSubmit();
    }, 1500);
  };

  const PasswordToggle = ({ show, onToggle }: { show: boolean; onToggle: () => void }) => (
    <button
      type="button"
      onClick={onToggle}
      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
      aria-label={show ? "Hide password" : "Show password"}
    >
      {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
    </button>
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="text-center space-y-1">
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Create Account</h1>
        <p className="text-sm text-muted-foreground">Join us today</p>
      </div>

      <div className="space-y-3">
        <div className="relative">
          <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Full Name" value={form.name} onChange={(e) => update("name", e.target.value)} className="pl-10 bg-secondary/50 border-border/50 input-glow transition-all" />
        </div>

        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input type="email" placeholder="Email address" value={form.email} onChange={(e) => update("email", e.target.value)} className="pl-10 bg-secondary/50 border-border/50 input-glow transition-all" />
        </div>

        <div className="relative">
          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input type="tel" placeholder="+1 (555) 000-0000" value={form.phone} onChange={(e) => update("phone", e.target.value)} className="pl-10 bg-secondary/50 border-border/50 input-glow transition-all" />
        </div>

        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input type={showPassword ? "text" : "password"} placeholder="Password" value={form.password} onChange={(e) => update("password", e.target.value)} className="pl-10 pr-10 bg-secondary/50 border-border/50 input-glow transition-all" />
          <PasswordToggle show={showPassword} onToggle={() => setShowPassword(!showPassword)} />
        </div>

        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input type={showConfirm ? "text" : "password"} placeholder="Confirm Password" value={form.confirm} onChange={(e) => update("confirm", e.target.value)} className="pl-10 pr-10 bg-secondary/50 border-border/50 input-glow transition-all" />
          <PasswordToggle show={showConfirm} onToggle={() => setShowConfirm(!showConfirm)} />
        </div>
      </div>

      <Button type="submit" disabled={loading} className="w-full gradient-btn text-primary-foreground font-semibold ripple-effect border-0 h-11">
        {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Create Account"}
      </Button>

      <p className="text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <button type="button" onClick={onSwitchToLogin} className="text-primary font-medium hover:underline transition-colors">
          Sign In
        </button>
      </p>
    </form>
  );
};

export default SignupScreen;
