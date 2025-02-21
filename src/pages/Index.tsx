
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
  const [showLogin, setShowLogin] = useState(false);
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

  if (showLogin) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <LoginForm onSuccess={() => {
          setIsAuth(true);
          setShowLogin(false);
        }} />
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 md:p-8 max-w-4xl mx-auto space-y-8">
      <header className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-center md:text-left">
          <h1 className="text-4xl font-century-gothic text-white neon-glow">Astraeus | Poetry</h1>
          <p className="text-white/60">
            {isAuth ? `Welcome back, ${getCurrentUser()}` : "A collection of poetic excellence"}
          </p>
        </div>
        <div className="flex items-center gap-4">
          <a
            href="https://astraeusmedia.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="glass-effect px-4 py-2 text-white hover:bg-white/10 transition-all rounded-md text-sm"
          >
            Main Site
          </a>
          {isAuth ? (
            <Button
              onClick={handleLogout}
              className="glass-effect hover:bg-white/10 text-white transition-all"
            >
              Logout
            </Button>
          ) : (
            <Button
              onClick={() => setShowLogin(true)}
              className="glass-effect hover:bg-white/10 text-white transition-all"
            >
              Admin Login
            </Button>
          )}
        </div>
      </header>
      
      {isAuth && <AddPoem onAdd={refreshPoems} />}
      
      <div className="space-y-6">
        {poems.map((poem) => (
          <PoemCard key={poem.id} poem={poem} onDelete={refreshPoems} />
        ))}
        {poems.length === 0 && (
          <p className="text-center text-white/60 py-8">No poems yet. Be the first to share!</p>
        )}
      </div>
    </div>
  );
};

export default Index;
