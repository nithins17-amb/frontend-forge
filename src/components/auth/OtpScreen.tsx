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
    <form onSubmit={handleVerify} className="space-y-6">
      <div className="text-center space-y-1">
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Verify OTP</h1>
        <p className="text-sm text-muted-foreground">Enter the 6-digit code sent to your email/phone</p>
      </div>

      <div className="flex justify-center">
        <InputOTP maxLength={6} value={otp} onChange={setOtp}>
          <InputOTPGroup>
            <InputOTPSlot index={0} className="bg-secondary/50 border-border/50 text-foreground h-12 w-12 text-lg" />
            <InputOTPSlot index={1} className="bg-secondary/50 border-border/50 text-foreground h-12 w-12 text-lg" />
            <InputOTPSlot index={2} className="bg-secondary/50 border-border/50 text-foreground h-12 w-12 text-lg" />
          </InputOTPGroup>
          <InputOTPSeparator />
          <InputOTPGroup>
            <InputOTPSlot index={3} className="bg-secondary/50 border-border/50 text-foreground h-12 w-12 text-lg" />
            <InputOTPSlot index={4} className="bg-secondary/50 border-border/50 text-foreground h-12 w-12 text-lg" />
            <InputOTPSlot index={5} className="bg-secondary/50 border-border/50 text-foreground h-12 w-12 text-lg" />
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
        className="w-full gradient-btn text-primary-foreground font-semibold ripple-effect border-0 h-11"
      >
        {verified ? (
          <CheckCircle className="h-5 w-5 text-green-400" />
        ) : loading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          "Verify"
        )}
      </Button>
    </form>
  );
};

export default OtpScreen;
