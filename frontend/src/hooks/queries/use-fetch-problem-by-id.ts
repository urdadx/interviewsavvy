import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../../constants/query-keys";
import { api } from "../../api";

export default function useFetchProblemById(problemIdOrSlug: string) {
  return useQuery({
    queryKey: QUERY_KEYS.PROBLEM(problemIdOrSlug),
    queryFn: async () => {
      try {
        const { data: problem, status } = await api.get(
          `/problems/${problemIdOrSlug}`
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
