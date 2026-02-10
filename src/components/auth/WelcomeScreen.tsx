import { CheckCircle } from "lucide-react";

const WelcomeScreen = () => (
  <div className="flex w-full max-w-4xl rounded-2xl overflow-hidden shadow-2xl auth-screen-enter min-h-[520px]">
    <div className="flex-1 bg-[hsl(0,0%,4%)] flex items-center justify-center p-10">
      <div className="text-center space-y-6">
        <div className="flex justify-center">
          <div className="rounded-full p-5" style={{ background: 'linear-gradient(135deg, hsla(270, 70%, 55%, 0.2), hsla(290, 70%, 50%, 0.2))' }}>
            <CheckCircle className="h-14 w-14 text-primary" />
          </div>
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Welcome!</h1>
        <p className="text-muted-foreground max-w-xs mx-auto">Your account is ready. You're all set to get started.</p>
      </div>
    </div>
    <div className="hidden md:flex flex-1 items-center justify-center relative overflow-hidden" style={{ background: 'linear-gradient(135deg, hsl(270, 70%, 55%), hsl(280, 80%, 60%), hsl(290, 70%, 50%))' }}>
      <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, hsl(0,0%,4%) 0%, transparent 30%)' }} />
      <div className="relative z-10 text-center px-8 space-y-4">
        <h2 className="text-4xl font-extrabold text-foreground tracking-tight">YOU'RE IN!</h2>
        <p className="text-foreground/70 text-sm leading-relaxed max-w-xs mx-auto">
          Start exploring and make<br />the most of your experience
        </p>
      </div>
    </div>
  </div>
);

export default WelcomeScreen;
