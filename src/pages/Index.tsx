import { useState, useEffect } from "react";
import LoginScreen from "@/components/auth/LoginScreen";
import SignupScreen from "@/components/auth/SignupScreen";
import OtpScreen from "@/components/auth/OtpScreen";
import WelcomeScreen from "@/components/auth/WelcomeScreen";

type Screen = "login" | "signup" | "otp" | "welcome";

const Index = () => {
  const [screen, setScreen] = useState<Screen>("login");
  const [animKey, setAnimKey] = useState(0);

  const switchScreen = (next: Screen) => {
    setAnimKey((k) => k + 1);
    setScreen(next);
  };

  return (
    <div className="min-h-screen gradient-bg flex items-center justify-center p-4">
      {/* Decorative orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-accent/10 blur-3xl" />
      </div>

      <div
        key={animKey}
        className="relative z-10 w-full max-w-md glass-card rounded-2xl p-8 shadow-2xl auth-screen-enter"
      >
        {screen === "login" && (
          <LoginScreen onSwitchToSignup={() => switchScreen("signup")} onSubmit={() => switchScreen("otp")} />
        )}
        {screen === "signup" && (
          <SignupScreen onSwitchToLogin={() => switchScreen("login")} onSubmit={() => switchScreen("otp")} />
        )}
        {screen === "otp" && <OtpScreen onVerified={() => switchScreen("welcome")} />}
        {screen === "welcome" && <WelcomeScreen />}
      </div>
    </div>
  );
};

export default Index;
