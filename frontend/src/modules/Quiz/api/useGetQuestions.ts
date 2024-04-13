import { useQuery } from "@tanstack/react-query";
import quizService from "@/modules/Quiz/api/quizService.ts";

export const useGetQuestions = () =>
  useQuery({
    queryKey: ["questions"],
    queryFn: () => quizService.getQuestions(),
  });
