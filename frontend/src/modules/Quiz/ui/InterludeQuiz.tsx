import { NavLink, useNavigate, useParams } from "react-router-dom";
import data from "../config/quiz.json";
import { useEffect } from "react";
import { useBearStore } from "@/modules/Quiz/store/store.ts";

interface QuizInterface {
  heading: string;
  text: string;
}

const EnterludeQuiz = () => {
  const { id } = useParams<{ id: string }>();
  const { step, setStep } = useBearStore();
  const num_id = id ? +id : undefined;
  const quizzes: QuizInterface[][] = data.enterlude;
  const navigate = useNavigate();
  useEffect(() => {
    if (num_id && (num_id <= 0 || num_id > quizzes.length)) {
      navigate("portfolio/1");
    }
  }, []);
  useEffect(() => {
    if (num_id === quizzes.length && step === "enterlude")
      setStep("enterludeIsEnded");
  }, [num_id]);

  if (!num_id) return;

  const quiz = quizzes[num_id - 1];
  let next_url = `/test/enterlude/${num_id + 1}`;
  let prev_url = `/test/enterlude/${num_id - 1}`;
  if (+num_id === quizzes.length) next_url = `/test/portfolio/1`;
  if (+num_id === 1) prev_url = `/test/`;
  return (
    <div>
      <h2 className="font-bold text-2xl">Введение</h2>
      {quiz.map((el, index) => (
        <div className="flex flex-col gap-4 mt-6" key={el.heading + index}>
          <h2 className="font-semibold text-lg">{el.heading}</h2>
          <p className="text-sm text-gray-600">{el.text}</p>
        </div>
      ))}
      <NavLink to={prev_url} className="my-btn mt-6 w-64 mr-6">
        Назад
      </NavLink>
      <NavLink to={next_url} className="my-btn mt-6 w-64">
        Дальше
      </NavLink>
    </div>
  );
};

export default EnterludeQuiz;
