import ProblemItem from "@/modules/PortfolioProblems/ui/ProblemItem.tsx";
import AddProblem from "@/modules/PortfolioProblems/ui/AddProblem.tsx";
import {useGetProblems} from "@/modules/PortfolioProblems/api/useGetProblems.ts";

const Problems = () => {
  const {data, isPending} = useGetProblems()
  if(isPending) return 'Загрузка...'
  return (
    <div className="mt-12">
      <div className="flex gap-4 items-center mb-12">
        <h1 className="text-2xl font-semibold">Точки роста</h1>
        <AddProblem />
      </div>
      <div className="grid grid-cols-1 gap-4">
        {data?.data.map((el) => (
          <ProblemItem {...el} key={el.name + el.id} />
        ))}
      </div>
    </div>
  );
};

export default Problems;
