// User roles supported by the system
export type UserRole = "user" | "admin";

// Base user shape (shared fields)
export interface BaseUser {
  _id: string;
  name: string;
  email: string;
  role: UserRole;
  createdAt?: string;
  updatedAt?: string;
}

// Full user (admin views, profile pages)
export interface User extends BaseUser {
  age?: number;

  // OAuth providers
  googleId?: string;
  githubId?: string;
}

// Lightweight user reference (orders, reviews, etc.)
export interface UserRef {
  _id: string;
  name: string;
  email: string;
}
