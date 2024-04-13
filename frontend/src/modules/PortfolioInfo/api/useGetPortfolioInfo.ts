import {useQuery} from "@tanstack/react-query";
import portfolioInfoService from './portofolioInfoService.ts'
export const useGetPortfolioInfo = () =>
    useQuery({
        queryKey: ['portfolioInfo'],
        queryFn: () => portfolioInfoService.getMe(),
    });
