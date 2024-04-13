import QuizSidebar from "@/modules/Quiz/ui/QuizSidebar.tsx";
import { Outlet } from "react-router-dom";

const Quiz = () => {
  return (
    <div className="flex gap-10">
      <QuizSidebar />
      <div className="w-7/12">
        <Outlet />
      </div>
    </div>
  );
};

export default Quiz;
