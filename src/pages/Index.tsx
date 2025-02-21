
import { useState, useEffect } from "react";
import { LoginForm } from "@/components/LoginForm";
import { AddPoem } from "@/components/AddPoem";
import { PoemCard } from "@/components/PoemCard";
import { Button } from "@/components/ui/button";
import { isAuthenticated, logout, getCurrentUser } from "@/lib/auth";
import { getPoems, type Poem } from "@/lib/storage";
import { useToast } from "@/components/ui/use-toast";

const Index = () => {
  const [poems, setPoems] = useState<Poem[]>([]);
  const [isAuth, setIsAuth] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    setIsAuth(isAuthenticated());
    setPoems(getPoems());
  }, []);

  const handleLogout = () => {
    logout();
    setIsAuth(false);
    toast({
      title: "Goodbye!",
      description: "You have been logged out.",
    });
  };

  const refreshPoems = () => {
    setPoems(getPoems());
  };

  if (!isAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <LoginForm onSuccess={() => setIsAuth(true)} />
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 md:p-8 max-w-4xl mx-auto space-y-8">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-century-gothic text-white neon-glow">Poetic Paradise</h1>
          <p className="text-white/60">Welcome back, {getCurrentUser()}</p>
        </div>
        <Button
          onClick={handleLogout}
          className="glass-effect hover:bg-white/10 text-white transition-all"
        >
          Logout
        </Button>
      </header>
      
      <AddPoem onAdd={refreshPoems} />
      
      <div className="space-y-6">
        {poems.map((poem) => (
          <PoemCard key={poem.id} poem={poem} />
        ))}
        {poems.length === 0 && (
          <p className="text-center text-white/60 py-8">No poems yet. Be the first to share!</p>
        )}
      </div>
    </div>
  );
};

export default Index;
