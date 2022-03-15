import { useAuth } from "context/auth-context";
import React from "react";
import ProjectList from "./project-list";

export default function AuthenticatedApp() {
  const { logout } = useAuth();
  return (
    <div>
      <button onClick={logout}>登出</button>
      <ProjectList />
    </div>
  );
}
