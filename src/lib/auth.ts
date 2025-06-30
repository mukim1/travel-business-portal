import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET =
  process.env.JWT_SECRET || "your-secret-key-change-in-production";
const SESSION_DURATION = 7 * 24 * 60 * 60 * 1000; // 7 days

export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: Date;
}

export interface Session {
  userId: string;
  token: string;
  expiresAt: Date;
  createdAt: Date;
}

// In-memory storage (in production, use Redis or similar)
const users = new Map<string, User & { passwordHash: string }>();
const sessions = new Map<string, Session>();

// Seed some demo users
const demoUsers = [
  { email: "demo@example.com", password: "password123", name: "Demo User" },
  { email: "john@example.com", password: "password123", name: "John Doe" },
  { email: "jane@example.com", password: "password123", name: "Jane Smith" },
];

// Initialize demo users
demoUsers.forEach(async (demoUser) => {
  const passwordHash = await bcrypt.hash(demoUser.password, 12);
  const user: User & { passwordHash: string } = {
    id: `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    email: demoUser.email,
    name: demoUser.name,
    passwordHash,
    createdAt: new Date(),
  };
  users.set(demoUser.email, user);
});

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

export async function verifyPassword(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}

export function generateSessionToken(): string {
  return jwt.sign(
    {
      random: Math.random(),
      timestamp: Date.now(),
    },
    JWT_SECRET,
    { expiresIn: "7d" }
  );
}

export async function createSession(userId: string): Promise<string> {
  const sessionToken = generateSessionToken();
  const expiresAt = new Date(Date.now() + SESSION_DURATION);

  const session: Session = {
    userId,
    token: sessionToken,
    expiresAt,
    createdAt: new Date(),
  };

  sessions.set(sessionToken, session);

  // Clean up expired sessions
  cleanupExpiredSessions();

  return sessionToken;
}

export async function validateSession(
  sessionToken: string
): Promise<User | null> {
  try {
    const session = sessions.get(sessionToken);
    if (!session || session.expiresAt < new Date()) {
      if (session) {
        sessions.delete(sessionToken);
      }
      return null;
    }

    const user = Array.from(users.values()).find(
      (u) => u.id === session.userId
    );
    if (!user) {
      sessions.delete(sessionToken);
      return null;
    }

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      createdAt: user.createdAt,
    };
  } catch (error) {
    console.error("Session validation error:", error);
    return null;
  }
}

export async function deleteSession(sessionToken: string): Promise<void> {
  sessions.delete(sessionToken);
}

export async function authenticateUser(
  email: string,
  password: string
): Promise<User | null> {
  try {
    const user = users.get(email.toLowerCase());
    if (!user) {
      return null;
    }

    const isValidPassword = await verifyPassword(password, user.passwordHash);
    if (!isValidPassword) {
      return null;
    }

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      createdAt: user.createdAt,
    };
  } catch (error) {
    console.error("Authentication error:", error);
    return null;
  }
}

export async function registerUser(
  email: string,
  password: string,
  name: string
): Promise<User | null> {
  try {
    const normalizedEmail = email.toLowerCase();

    // Check if user already exists
    if (users.has(normalizedEmail)) {
      throw new Error("User already exists");
    }

    const passwordHash = await hashPassword(password);
    const user: User & { passwordHash: string } = {
      id: `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      email: normalizedEmail,
      name,
      passwordHash,
      createdAt: new Date(),
    };

    users.set(normalizedEmail, user);

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      createdAt: user.createdAt,
    };
  } catch (error) {
    console.error("Registration error:", error);
    return null;
  }
}

function cleanupExpiredSessions() {
  const now = new Date();
  for (const [token, session] of sessions.entries()) {
    if (session.expiresAt < now) {
      sessions.delete(token);
    }
  }
}

// Clean up expired sessions every hour
setInterval(cleanupExpiredSessions, 60 * 60 * 1000);
