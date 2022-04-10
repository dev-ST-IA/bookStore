import { AuthContext } from "../context/_authContext";
import { useContext } from "react";

export function useAuth() {
  return useContext(AuthContext);
}
