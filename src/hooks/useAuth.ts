import { useContext } from "react";
import { AuthContext, AuthContextProps } from "../context/FakeAuthContext";

export function useAuth(): AuthContextProps {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useCities must be used within a AuthProvider");
  }

  return context;
}
