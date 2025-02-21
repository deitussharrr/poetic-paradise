
import { Poem } from "@/lib/storage";

export const PoemCard = ({ poem }: { poem: Poem }) => {
  return (
    <article className="glass-card p-6 space-y-4 fade-in">
      <header className="space-y-1">
        <h2 className="text-2xl font-century-gothic text-white neon-glow">{poem.title}</h2>
        <p className="text-white/60 text-sm">
          By {poem.author} • {new Date(poem.createdAt).toLocaleDateString()}
        </p>
      </header>
      <div className="prose prose-invert">
        <pre className="whitespace-pre-wrap font-century-gothic text-white/80 leading-relaxed">
          {poem.content}
        </pre>
      </div>
    </article>
  );
};
