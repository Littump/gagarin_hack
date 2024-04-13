import {useQuery} from "@tanstack/react-query";
import problemsService from "@/modules/PortfolioProblems/api/problemsService.ts";

export const useGetProblems = () =>
    useQuery({
        queryKey: ['problems'],
        queryFn: () => problemsService.getProblems(),
    });
