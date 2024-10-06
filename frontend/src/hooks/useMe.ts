import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../constants/query-keys";
import { api } from "../api";

export default function useMe() {
  return useQuery({
    queryKey: QUERY_KEYS.ME,
    queryFn: async () => {
      const { data: user } = await api.get("/auth/me");
      return user;
    },
    staleTime: 300000,
    refetchOnWindowFocus: false,
  });
}
