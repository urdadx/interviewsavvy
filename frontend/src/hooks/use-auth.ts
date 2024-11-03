import { useContext } from "react";
import { userContext } from "../contexts/user-context";

export default function useAuth() {
  return useContext(userContext);
}
