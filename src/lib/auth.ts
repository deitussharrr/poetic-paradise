
interface User {
  username: string;
  password: string;
}

const USERS: User[] = [
  { username: "KK", password: "Kavin@2025" },
  { username: "Tusshar", password: "Teexmoni248" }
];

export const authenticate = (username: string, password: string): boolean => {
  return USERS.some(user => user.username === username && user.password === password);
};

export const isAuthenticated = (): boolean => {
  return localStorage.getItem("auth") === "true";
};

export const getCurrentUser = (): string | null => {
  return localStorage.getItem("currentUser");
};

export const login = (username: string): void => {
  localStorage.setItem("auth", "true");
  localStorage.setItem("currentUser", username);
};

export const logout = (): void => {
  localStorage.removeItem("auth");
  localStorage.removeItem("currentUser");
};
