import { IProblem } from "@/modules/PortfolioProblems/types/problems.ts";
import { useDeleteProblem } from "@/modules/PortfolioProblems/api/useDeleteProblem.ts";

const ProblemItem = ({ name, description, id }: IProblem) => {
  const { mutate } = useDeleteProblem();
  const handleDeleteProblem = () => {
    mutate(id);
  };
  return (
    <div className="w-full rounded-full bg-orange-100 flex justify-start items-center py-2 px-6 hover:translate-x-2 transition-all">
      <h4 className="text-lg font-semibold w-2/12 border-r-2 border-white">
        {name}
      </h4>
      <p className="w-9/12 pl-10">{description}</p>
      <button
        type="button"
        onClick={handleDeleteProblem}
        className="link-error w-1/12"
      >
        удалить
      </button>
    </div>
  );
};

export default ProblemItem;
