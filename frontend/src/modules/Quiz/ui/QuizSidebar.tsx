import { useBearStore } from "@/modules/Quiz/store/store.ts";

const QuizSidebar = () => {
  const { step } = useBearStore();
  return (
    <div className="w-3/12 flex flex-col gap-4">
      <h2 className="text-2xl font-semibold">Статус прохождения:</h2>
      <ul className="flex flex-col gap-4">
        <li className="flex items-center gap-2 py-2 px-4 hover:bg-violet-50 transition rounded-full hover:text-violet-700">
          <input
            type="checkbox"
            checked={step !== "enterlude"}
            onChange={() => {}}
            className="checkbox checkbox-primary cursor-default"
          />
          Введение
        </li>
        <li className="flex items-center gap-2 py-2 px-4 hover:bg-violet-50 transition rounded-full hover:text-violet-700">
          <input
            type="checkbox"
            onChange={() => {}}
            checked={
              step === "test" ||
              step === "testIsEnded" ||
              step === "portfolioIsEnded"
            }
            className="checkbox checkbox-primary cursor-default"
          />
          Цифровое портфолио
        </li>
        <li className="flex items-center gap-2 py-2 px-4 hover:bg-violet-50 transition rounded-full">
          <input
            type="checkbox"
            checked={step === "testIsEnded"}
            onChange={() => {}}
            className="checkbox checkbox-primary cursor-default"
          />
          Тест
        </li>
      </ul>
    </div>
  );
};

export default QuizSidebar;
