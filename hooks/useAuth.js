import { AuthContext } from "../context/_authContext";
import React from "react";

export default function useAuth() {
  return React.useContext(AuthContext);
}
