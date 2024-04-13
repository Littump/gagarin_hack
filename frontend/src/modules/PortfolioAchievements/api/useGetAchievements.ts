
import {useQuery} from "@tanstack/react-query";
import achievementsService from "@/modules/PortfolioAchievements/api/achievementsService.ts";

export const useGetAchievements = () =>
    useQuery({
        queryKey: ['achievements'],
        queryFn: () => achievementsService.getAchievements(),
    });
