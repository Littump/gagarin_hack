import { NavLink, useNavigate, useParams } from "react-router-dom";
import data from "../config/quiz.json";
import { useEffect, useState } from "react";
import { Field, Form, Formik } from "formik";
import { useBearStore } from "@/modules/Quiz/store/store.ts";
import { useGetQuestions } from "@/modules/Quiz/api/useGetQuestions.ts";
import { useSetResult } from "@/modules/Quiz/api/useSetResult.ts";
import { countResult } from "@/modules/Quiz/helpers/countResult.ts";

const TestQuiz = () => {
  const { id } = useParams<{ id: string }>();
  const { setResult } = useBearStore();
  const { data: data_res, isPending } = useGetQuestions();
  console.log(data_res);
  const { mutate } = useSetResult();
  const [error, setError] = useState(false);
  const { step, setStep } = useBearStore();
  const num_id = id ? +id : undefined;
  const quizzes = data_res?.data.questions;
  const navigate = useNavigate();
  useEffect(() => {
    if (quizzes && num_id && (num_id <= 0 || num_id > quizzes.length)) {
      navigate("test/1");
    }
  }, []);
  useEffect(() => {
    if (num_id === 1 && step === "portfolioIsEnded") setStep("test");
  }, [num_id]);

  if (!num_id || !quizzes) return;
  const quiz = quizzes[num_id - 1];
  let next_url = `/test/test/${num_id + 1}`;
  let prev_url = `/test/test/${num_id - 1}`;
  if (num_id === quizzes.length) next_url = `/test/result`;
  if (num_id === 1) prev_url = `/test/portfolio/${data.portfolio.length}`;
  const initialValues = {};
  // @ts-ignore
  initialValues[num_id] = [];
  if (isPending) return "загрузка";
  return (
    <Formik initialValues={initialValues} onSubmit={() => {}}>
      {({ values }) => {
        const handleNext = () => {
          // @ts-ignore
          if (!values[num_id] || values[num_id].length === 0) setError(true);
          else {
            setError(false);
            if (num_id === quizzes.length) {
              //мутация
              const answers: string[][] = [];
              for (const key in values) {
                // @ts-ignore
                answers.push(values[key] as string[]);
              }
              const result = countResult(quizzes, answers);
              mutate(result);
              setResult(result);
              navigate("/test/result");
            } else navigate(next_url);
          }
        };
        return (
          <Form>
            <h2 className="font-bold text-2xl">Опрос</h2>
            <h3 className="text-lg font-semibold my-6">{quiz.text}</h3>
            <div
              role="group"
              aria-labelledby="checkbox-group"
              className="flex flex-col gap-4 text-sm text-gray-600"
            >
              {quiz.variants.map((el) => (
                <label
                  key={el.id + "вариант"}
                  className="flex gap-2 items-center cursor-pointer py-3 px-4 rounded-full transition-all hover:bg-violet-100 hover:text-violet-700"
                >
                  <Field
                    type="checkbox"
                    name={num_id}
                    value={el.text}
                    className="checkbox checkbox-primary"
                  />
                  {el.text}
                </label>
              ))}
              <span className="text-red-500">
                {error && "Выберите хотя бы один вариант"}
              </span>
            </div>

            <NavLink to={prev_url} className="my-btn mt-6 w-64 mr-6">
              Назад
            </NavLink>
            <button
              type="button"
              onClick={handleNext}
              className="my-btn mt-6 w-64"
            >
              Дальше
            </button>
          </Form>
        );
      }}
    </Formik>
  );
};

export default TestQuiz;
