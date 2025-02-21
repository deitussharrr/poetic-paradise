
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
        <div className="text-center md:text-left flex items-center gap-4">
          <img 
            src="https://iili.io/39N2Eaj.png" 
            alt="Astraeus Logo" 
            className="w-10 h-10"
          />
          <h1 className="text-4xl font-century-gothic text-white neon-glow">ASTRAEUS | POETRY</h1>
          {isAuth && (
            <p className="text-white/60 mt-2">
              Welcome back, {getCurrentUser()}
            </p>
          )}
        </div>
        <div className="flex items-center gap-4">
          <a
            href="https://astraeusmedia.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="glass-effect px-4 py-2 text-white hover:bg-white/10 transition-all rounded-md text-sm"
          >
            Home
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
