import { useMutation } from "@tanstack/react-query";
import problemsService from "@/modules/PortfolioProblems/api/problemsService.ts";
import { queryClient } from "@/main.tsx";

export const useDeleteProblem = () =>
  useMutation({
    mutationFn: (id: number) => problemsService.deleteProblem(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["problems"] });
    },
  });
