import { useParams } from "@tanstack/react-router";
import useFetchProblemById from "../../hooks/queries/use-fetch-problem-by-id";

export const ProblemDescriptionTab = () => {
  const params = useParams({ from: "/problems/$problem-slug" });
  const { data: problem } = useFetchProblemById(params["problem-slug"]);

  return (
    <div className="">
      <h2 className="text-lg font-semibold mb-4 text-capitalize">
        {problem?.name}
      </h2>
      <div className="text-sm text-muted-foreground">
        <div
        />
        {problem?.description}
      </div>
    </div>
  );
};
