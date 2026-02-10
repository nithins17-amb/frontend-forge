import { useState } from "react";
import { Eye, EyeOff, Loader2, User, Lock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";

interface LoginScreenProps {
  onSwitchToSignup: () => void;
  onSubmit: () => void;
}

const LoginScreen = ({ onSwitchToSignup, onSubmit }: LoginScreenProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast({ title: "Missing fields", description: "Please fill in all fields.", variant: "destructive" });
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast({ title: "OTP Sent", description: "A verification code has been sent to your email." });
      onSubmit();
    }, 1500);
  };

  return (
    <div className="flex w-full max-w-4xl rounded-2xl overflow-hidden shadow-2xl auth-screen-enter min-h-[520px]">
      {/* Left - Form Panel */}
      <div className="flex-1 bg-[hsl(0,0%,4%)] p-10 flex flex-col justify-center">
        <form onSubmit={handleSubmit} className="space-y-8 max-w-sm mx-auto w-full">
          <h1 className="text-3xl font-bold text-foreground">Login</h1>

          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-muted-foreground font-medium">Username</label>
              <div className="relative">
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-transparent border-0 border-b border-border/50 rounded-none pl-0 pr-10 focus-visible:ring-0 focus-visible:border-primary input-glow transition-all text-foreground"
                />
                <User className="absolute right-0 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-muted-foreground font-medium">Password</label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-transparent border-0 border-b border-border/50 rounded-none pl-0 pr-10 focus-visible:ring-0 focus-visible:border-primary input-glow transition-all text-foreground"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-6 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
                <Lock className="absolute right-0 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              </div>
            </div>
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full gradient-btn text-primary-foreground font-semibold ripple-effect border-0 h-12 rounded-full text-base"
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Login"}
          </Button>

          <p className="text-center text-sm text-muted-foreground">
            Don't have an account?{" "}
            <button type="button" onClick={onSwitchToSignup} className="text-primary font-semibold hover:underline transition-colors">
              Sign Up
            </button>
          </p>
        </form>
      </div>

      {/* Right - Welcome Panel */}
      <div className="hidden md:flex flex-1 items-center justify-center relative overflow-hidden" style={{ background: 'linear-gradient(135deg, hsl(270, 70%, 55%), hsl(280, 80%, 60%), hsl(290, 70%, 50%))' }}>
        {/* Diagonal clip overlay */}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, hsl(0,0%,4%) 0%, transparent 30%)' }} />
        <div className="relative z-10 text-center px-8 space-y-4">
          <h2 className="text-4xl font-extrabold text-foreground tracking-tight">WELCOME BACK!</h2>
          <p className="text-foreground/70 text-sm leading-relaxed max-w-xs mx-auto">
            To keep connected with us please<br />login with your personal info
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
