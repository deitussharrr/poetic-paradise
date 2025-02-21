
import { Poem, deletePoem } from "@/lib/storage";
import { getCurrentUser } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface PoemCardProps {
  poem: Poem;
  onDelete: () => void;
}

export const PoemCard = ({ poem, onDelete }: PoemCardProps) => {
  const currentUser = getCurrentUser();
  const { toast } = useToast();
  const isAuthor = currentUser === poem.author;

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this poem?")) {
      deletePoem(poem.id);
      toast({
        title: "Poem deleted",
        description: "Your poem has been removed successfully.",
      });
      onDelete();
    }
  };

  return (
    <article className="glass-card p-6 space-y-4 fade-in">
      <header className="flex items-start justify-between gap-4">
        <div className="space-y-1">
          <h2 className="text-2xl font-century-gothic text-white neon-glow">{poem.title}</h2>
          <p className="text-white/60 text-sm">
            By {poem.author} • {new Date(poem.createdAt).toLocaleDateString()}
          </p>
        </div>
        {isAuthor && (
          <Button
            variant="ghost"
            size="icon"
            onClick={handleDelete}
            className="text-white/40 hover:text-white hover:bg-white/10"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        )}
      </header>
      <div className="prose prose-invert">
        <pre className="whitespace-pre-wrap font-century-gothic text-white/80 leading-relaxed">
          {poem.content}
        </pre>
      </div>
    </article>
  );
};
