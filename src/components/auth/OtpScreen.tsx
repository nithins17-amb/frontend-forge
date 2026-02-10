import { useState, useEffect, useCallback } from "react";
import { Loader2, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator } from "@/components/ui/input-otp";
import { useToast } from "@/hooks/use-toast";

interface OtpScreenProps {
  onVerified: () => void;
}

const OtpScreen = ({ onVerified }: OtpScreenProps) => {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [verified, setVerified] = useState(false);
  const [countdown, setCountdown] = useState(60);
  const { toast } = useToast();

  useEffect(() => {
    if (countdown <= 0) return;
    const t = setInterval(() => setCountdown((c) => c - 1), 1000);
    return () => clearInterval(t);
  }, [countdown]);

  const handleResend = useCallback(() => {
    setCountdown(60);
    toast({ title: "OTP Resent", description: "A new code has been sent." });
  }, [toast]);

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length < 6) {
      toast({ title: "Incomplete OTP", description: "Please enter all 6 digits.", variant: "destructive" });
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setVerified(true);
      toast({ title: "Verified!", description: "Your account has been verified." });
      setTimeout(onVerified, 1200);
    }, 1500);
  };

  return (
    <div className="flex w-full max-w-4xl rounded-2xl overflow-hidden shadow-2xl auth-screen-enter min-h-[520px]">
      {/* Left - Info Panel */}
      <div className="hidden md:flex flex-1 items-center justify-center relative overflow-hidden" style={{ background: 'linear-gradient(135deg, hsl(270, 70%, 55%), hsl(280, 80%, 60%), hsl(290, 70%, 50%))' }}>
        <div className="absolute inset-0" style={{ background: 'linear-gradient(-135deg, hsl(0,0%,4%) 0%, transparent 30%)' }} />
        <div className="relative z-10 text-center px-8 space-y-4">
          <h2 className="text-4xl font-extrabold text-foreground tracking-tight">ALMOST THERE!</h2>
          <p className="text-foreground/70 text-sm leading-relaxed max-w-xs mx-auto">
            Verify your identity to<br />complete your registration
          </p>
        </div>
      </div>

      {/* Right - OTP Panel */}
      <div className="flex-1 bg-[hsl(0,0%,4%)] p-10 flex flex-col justify-center">
        <form onSubmit={handleVerify} className="space-y-8 max-w-sm mx-auto w-full">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-foreground">Verify OTP</h1>
            <p className="text-sm text-muted-foreground">Enter the 6-digit code sent to your email/phone</p>
          </div>

          <div className="flex justify-center">
            <InputOTP maxLength={6} value={otp} onChange={setOtp}>
              <InputOTPGroup>
                <InputOTPSlot index={0} className="bg-secondary/30 border-border/50 text-foreground h-12 w-12 text-lg" />
                <InputOTPSlot index={1} className="bg-secondary/30 border-border/50 text-foreground h-12 w-12 text-lg" />
                <InputOTPSlot index={2} className="bg-secondary/30 border-border/50 text-foreground h-12 w-12 text-lg" />
              </InputOTPGroup>
              <InputOTPSeparator />
              <InputOTPGroup>
                <InputOTPSlot index={3} className="bg-secondary/30 border-border/50 text-foreground h-12 w-12 text-lg" />
                <InputOTPSlot index={4} className="bg-secondary/30 border-border/50 text-foreground h-12 w-12 text-lg" />
                <InputOTPSlot index={5} className="bg-secondary/30 border-border/50 text-foreground h-12 w-12 text-lg" />
              </InputOTPGroup>
            </InputOTP>
          </div>

          <div className="text-center">
            {countdown > 0 ? (
              <p className="text-sm text-muted-foreground">
                Resend code in <span className="text-primary font-medium">{countdown}s</span>
              </p>
            ) : (
              <button type="button" onClick={handleResend} className="text-sm text-primary font-medium hover:underline transition-colors">
                Resend OTP
              </button>
            )}
          </div>

          <Button
            type="submit"
            disabled={loading || verified}
            className="w-full gradient-btn text-primary-foreground font-semibold ripple-effect border-0 h-12 rounded-full text-base"
          >
            {verified ? (
              <span className="flex items-center gap-2"><CheckCircle className="h-5 w-5" /> Verified</span>
            ) : loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              "Verify"
            )}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default OtpScreen;
