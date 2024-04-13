import { NavLink, useNavigate } from "react-router-dom";
import { useBearStore } from "@/modules/Quiz/store/store.ts";
import { useEffect } from "react";
import ResultChart from "@/ui/ResultChart.tsx";

const ResultQuiz = () => {
  const { result } = useBearStore();
  const { setStep } = useBearStore();
  useEffect(() => {
    setStep("testIsEnded");
  }, []);
  const navigate = useNavigate();
  const handleRepeat = () => {
    setStep("test");
    navigate("/test/test/1");
  };
  return (
    <div>
      <h2 className="font-bold text-2xl">Ваш результат</h2>
      <div className="w-[320px] my-4 ml-28">
        <ResultChart result={result} />
      </div>
      <button onClick={handleRepeat} className="my-btn mt-6 w-64 mr-6">
        Пройти ещё раз
      </button>
      <NavLink to={"/portfolio"} className="my-btn mt-6 w-64">
        В портфолио
      </NavLink>
    </div>
  );
};

export default ResultQuiz;
