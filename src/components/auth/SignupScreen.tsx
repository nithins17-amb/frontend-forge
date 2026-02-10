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
      className="absolute right-6 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
      aria-label={show ? "Hide password" : "Show password"}
    >
      {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
    </button>
  );

  const inputClass = "bg-transparent border-0 border-b border-border/50 rounded-none pl-0 pr-10 focus-visible:ring-0 focus-visible:border-primary input-glow transition-all text-foreground";

  return (
    <div className="flex w-full max-w-4xl rounded-2xl overflow-hidden shadow-2xl auth-screen-enter min-h-[520px]">
      {/* Left - Welcome Panel */}
      <div className="hidden md:flex flex-1 items-center justify-center relative overflow-hidden" style={{ background: 'linear-gradient(135deg, hsl(270, 70%, 55%), hsl(280, 80%, 60%), hsl(290, 70%, 50%))' }}>
        <div className="absolute inset-0" style={{ background: 'linear-gradient(-135deg, hsl(0,0%,4%) 0%, transparent 30%)' }} />
        <div className="relative z-10 text-center px-8 space-y-4">
          <h2 className="text-4xl font-extrabold text-foreground tracking-tight">HELLO!</h2>
          <p className="text-foreground/70 text-sm leading-relaxed max-w-xs mx-auto">
            Enter your personal details<br />and start your journey with us
          </p>
        </div>
      </div>

      {/* Right - Form Panel */}
      <div className="flex-1 bg-[hsl(0,0%,4%)] p-10 flex flex-col justify-center">
        <form onSubmit={handleSubmit} className="space-y-5 max-w-sm mx-auto w-full">
          <h1 className="text-3xl font-bold text-foreground">Sign Up</h1>

          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs uppercase tracking-widest text-muted-foreground font-medium">Full Name</label>
              <div className="relative">
                <Input placeholder="" value={form.name} onChange={(e) => update("name", e.target.value)} className={inputClass} />
                <User className="absolute right-0 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs uppercase tracking-widest text-muted-foreground font-medium">Email</label>
              <div className="relative">
                <Input type="email" value={form.email} onChange={(e) => update("email", e.target.value)} className={inputClass} />
                <Mail className="absolute right-0 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs uppercase tracking-widest text-muted-foreground font-medium">Phone</label>
              <div className="relative">
                <Input type="tel" placeholder="+1 (555) 000-0000" value={form.phone} onChange={(e) => update("phone", e.target.value)} className={inputClass} />
                <Phone className="absolute right-0 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs uppercase tracking-widest text-muted-foreground font-medium">Password</label>
              <div className="relative">
                <Input type={showPassword ? "text" : "password"} value={form.password} onChange={(e) => update("password", e.target.value)} className={`${inputClass} pr-16`} />
                <PasswordToggle show={showPassword} onToggle={() => setShowPassword(!showPassword)} />
                <Lock className="absolute right-0 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs uppercase tracking-widest text-muted-foreground font-medium">Confirm Password</label>
              <div className="relative">
                <Input type={showConfirm ? "text" : "password"} value={form.confirm} onChange={(e) => update("confirm", e.target.value)} className={`${inputClass} pr-16`} />
                <PasswordToggle show={showConfirm} onToggle={() => setShowConfirm(!showConfirm)} />
                <Lock className="absolute right-0 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              </div>
            </div>
          </div>

          <Button type="submit" disabled={loading} className="w-full gradient-btn text-primary-foreground font-semibold ripple-effect border-0 h-12 rounded-full text-base">
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Create Account"}
          </Button>

          <p className="text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <button type="button" onClick={onSwitchToLogin} className="text-primary font-semibold hover:underline transition-colors">
              Sign In
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignupScreen;
