import { useQuery } from "@tanstack/react-query";
import portfolioInfoService from "./portofolioInfoService.ts";
export const useGetResult = () =>
  useQuery({
    queryKey: ["test_result"],
    queryFn: () => portfolioInfoService.getResult(),
  });
