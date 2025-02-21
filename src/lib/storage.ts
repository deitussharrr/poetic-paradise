
export interface Poem {
  id: string;
  title: string;
  content: string;
  author: string;
  createdAt: string;
}

export const getPoems = (): Poem[] => {
  const poems = localStorage.getItem("poems");
  return poems ? JSON.parse(poems) : [];
};

export const addPoem = (poem: Omit<Poem, "id" | "createdAt">): void => {
  const poems = getPoems();
  const newPoem = {
    ...poem,
    id: Math.random().toString(36).substr(2, 9),
    createdAt: new Date().toISOString(),
  };
  poems.unshift(newPoem);
  localStorage.setItem("poems", JSON.stringify(poems));
};

export const deletePoem = (id: string): void => {
  const poems = getPoems();
  const filteredPoems = poems.filter(poem => poem.id !== id);
  localStorage.setItem("poems", JSON.stringify(filteredPoems));
};
