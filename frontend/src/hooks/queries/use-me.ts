import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../../constants/query-keys";
import { api } from "../../api";

export default function useMe() {
  return useQuery({
    queryKey: QUERY_KEYS.ME,
    queryFn: async () => {
      try {
        const { data: user, status } = await api.get("/auth/me");
        if (status !== 200) {
          throw new Error(user?.error?.message || "An error occurred");
        }
        return user;
      } catch (error) {
        throw new Error((error as Error).message);
      }
    },
    staleTime: 300000,
    refetchOnWindowFocus: false,
  });
}
