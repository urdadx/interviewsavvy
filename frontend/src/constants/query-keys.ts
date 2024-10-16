export const QUERY_KEYS = {
  ME: ["me"],
  WAITLIST: ["waitlist"],
  PROBLEM_LIST: ["problemList"],
  PROBLEM: (problemId: string) => ["problem", { problemId }],
};
