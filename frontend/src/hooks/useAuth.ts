import { useContext } from "react";
import { User, userContext } from "../contexts/user-context";

export default function useAuth() {
  return useContext(userContext);
}
