import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../../constants/query-keys";
import { api } from "../../api";
import type { ApiResponse } from "shared/dist/api-response";
import type { Problem } from "shared/dist/problem";

export default function useFetchProblemById(problemIdOrSlug: string) {
  return useQuery<ApiResponse<Problem>>({
    queryKey: QUERY_KEYS.PROBLEM(problemIdOrSlug),
    queryFn: async () => {
      try {
        const { data: problem, status } = await api.get(
          `/problems/${problemIdOrSlug}`,
        );
        if (status !== 200) {
          throw new Error(problem?.error?.message || "An error occurred");
        }
        return problem;
      } catch (error) {
        throw new Error((error as Error).message);
      }
    },
    staleTime: 300000,
    refetchOnWindowFocus: false,
  });
}
