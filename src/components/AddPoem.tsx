
import { useState } from "react";
import { addPoem } from "@/lib/storage";
import { getCurrentUser } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

interface AddPoemProps {
  onAdd: () => void;
}

export const AddPoem = ({ onAdd }: AddPoemProps) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const author = getCurrentUser();
    if (!author) return;

    addPoem({ title, content, author });
    setTitle("");
    setContent("");
    toast({
      title: "Poem added",
      description: "Your poem has been published successfully.",
    });
    onAdd();
  };

  return (
    <form onSubmit={handleSubmit} className="glass-card p-6 space-y-4 fade-in">
      <div className="space-y-2">
        <h3 className="text-xl font-century-gothic text-white">New Poem</h3>
        <p className="text-white/60 text-sm">Share your poetic thoughts</p>
      </div>
      <Input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        className="bg-white/10 border-white/20 text-white placeholder:text-white/40"
      />
      <Textarea
        placeholder="Write your poem here..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
        className="bg-white/10 border-white/20 text-white placeholder:text-white/40 min-h-[200px]"
      />
      <Button
        type="submit"
        className="w-full animated-border bg-white/10 hover:bg-white/20 text-white transition-all"
      >
        Publish
      </Button>
    </form>
  );
};
