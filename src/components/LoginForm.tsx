
import { useState } from "react";
import { authenticate, login } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

interface LoginFormProps {
  onSuccess: () => void;
}

export const LoginForm = ({ onSuccess }: LoginFormProps) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (authenticate(username, password)) {
      login(username);
      toast({
        title: "Welcome back!",
        description: "Successfully logged in.",
      });
      onSuccess();
    } else {
      toast({
        title: "Authentication failed",
        description: "Invalid username or password.",
        variant: "destructive",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="glass-card p-8 max-w-md w-full mx-auto space-y-6 fade-in">
      <div className="space-y-2">
        <h2 className="text-3xl font-century-gothic text-white neon-glow text-center">Login</h2>
        <p className="text-white/60 text-center text-sm">Only authorized poets may enter</p>
      </div>
      <div className="space-y-4">
        <Input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="bg-white/10 border-white/20 text-white placeholder:text-white/40"
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="bg-white/10 border-white/20 text-white placeholder:text-white/40"
        />
        <Button
          type="submit"
          className="w-full animated-border bg-white/10 hover:bg-white/20 text-white transition-all"
        >
          Enter
        </Button>
      </div>
    </form>
  );
};
