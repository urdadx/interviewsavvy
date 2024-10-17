import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../../constants/query-keys";
import { api } from "../../api";

export default function useFetchProblemList() {
  return useQuery({
    queryKey: QUERY_KEYS.PROBLEM_LIST,
    queryFn: async () => {
      try {
        const { data: problemList, status } = await api.get("/problems");
        if (status !== 200) {
          throw new Error(problemList?.error?.message || "An error occurred");
        }
        return problemList as { data: unknown[]; meta: unknown[] };
      } catch (error) {
        throw new Error((error as Error).message);
      }
    },
    staleTime: 300000,
    refetchOnWindowFocus: false,
  });
}
