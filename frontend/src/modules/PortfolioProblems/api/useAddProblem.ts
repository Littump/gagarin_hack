import { useMutation } from "@tanstack/react-query";
import problemsService from "@/modules/PortfolioProblems/api/problemsService.ts";
import { AddProblemDto } from "@/modules/PortfolioProblems/types/addProblem.dto.ts";
import { queryClient } from "@/main.tsx";

export const useAddProblem = () =>
  useMutation({
    mutationFn: (body: AddProblemDto) => problemsService.addProblem(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["problems"] });
    },
  });
