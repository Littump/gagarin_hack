import { useMutation } from "@tanstack/react-query";
import { AddAchievementDto } from "@/modules/PortfolioAchievements/types/addAchievement.dto.ts";
import achievementsService from "@/modules/PortfolioAchievements/api/achievementsService.ts";
import { queryClient } from "@/main.tsx";

export const useAddAchievement = () =>
  useMutation({
    mutationFn: (body: AddAchievementDto) =>
      achievementsService.addAchievement(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["achievements"] });
    },
  });
