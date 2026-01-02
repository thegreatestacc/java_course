"use client";

import { AuthProvider } from "./useAuth";

export function AuthProviderWrapper({ children }: { children: React.ReactNode }) {
  return <AuthProvider>{children}</AuthProvider>;
}


