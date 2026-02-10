import { CheckCircle } from "lucide-react";

const WelcomeScreen = () => (
  <div className="text-center space-y-4 py-8">
    <div className="flex justify-center">
      <div className="rounded-full bg-green-500/20 p-4">
        <CheckCircle className="h-12 w-12 text-green-400" />
      </div>
    </div>
    <h1 className="text-2xl font-bold tracking-tight text-foreground">Welcome!</h1>
    <p className="text-muted-foreground">Your account is ready. You're all set to get started.</p>
  </div>
);

export default WelcomeScreen;
