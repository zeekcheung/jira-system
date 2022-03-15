import React, { ReactNode } from "react";
import { AuthProvider } from "./auth-context";

// 封装全局<AppProvider>组件
export default function AppProvider({ children }: { children: ReactNode }) {
  return <AuthProvider>{children}</AuthProvider>;
}
