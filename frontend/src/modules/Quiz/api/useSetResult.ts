import { useMutation } from "@tanstack/react-query";
import { queryClient } from "@/main.tsx";
import quizService from "@/modules/Quiz/api/quizService.ts";

export const useSetResult = () =>
  useMutation({
    mutationFn: (percentage: number) => quizService.setResult(percentage),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["test_result"] });
    },
  });
