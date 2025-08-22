import bcrypt from "bcryptjs";

export type User = {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  createdAt: Date;
};

// Use a single global store to avoid per-route module instances
declare global {
  // eslint-disable-next-line no-var
  var __USER_STORE__: User[] | undefined;
}

function store(): User[] {
  if (!globalThis.__USER_STORE__) globalThis.__USER_STORE__ = [];
  return globalThis.__USER_STORE__!;
}

export function findUserByEmail(email: string) {
  return store().find((u) => u.email.toLowerCase() === email.toLowerCase());
}

export async function createUser(input: { name: string; email: string; password: string }) {
  const exists = findUserByEmail(input.email);
  if (exists) throw new Error("User already exists");
  const passwordHash = await bcrypt.hash(input.password, 10);
  const user: User = {
    id: Date.now().toString(),
    name: input.name,
    email: input.email,
    passwordHash,
    createdAt: new Date(),
  };
  store().unshift(user);
  return user;
}

export async function verifyUser(email: string, password: string) {
  const user = findUserByEmail(email);
  if (!user) return null;
  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) return null;
  return { id: user.id, name: user.name, email: user.email };
}