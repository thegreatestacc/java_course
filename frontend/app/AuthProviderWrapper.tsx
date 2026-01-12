"use client";

import { AuthProvider } from "./useAuth";
import "./utils/authInterceptor";

export function AuthProviderWrapper({ children }: { children: React.ReactNode }) {
  return <AuthProvider>{children}</AuthProvider>;
}







