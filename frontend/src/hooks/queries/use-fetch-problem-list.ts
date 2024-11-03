import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../../constants/query-keys";
import { api } from "../../api";
import type { ApiResponsePaginated } from "shared/dist/api-response";
import type { Problem } from "shared/dist/problem";

export default function useFetchProblemList() {
  return useQuery<ApiResponsePaginated<Problem>>({
    queryKey: QUERY_KEYS.PROBLEM_LIST,
    queryFn: async () => {
      try {
        const { data: problemList, status } = await api.get("/problems");
        if (status !== 200) {
          throw new Error(problemList?.error?.message || "An error occurred");
        }
        return problemList;
      } catch (error) {
        throw new Error((error as Error).message);
      }
    },
    staleTime: 300000,
    refetchOnWindowFocus: false,
  });
}
