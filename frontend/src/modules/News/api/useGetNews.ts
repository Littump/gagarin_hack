import { useQuery } from "@tanstack/react-query";
import newsService from "@/modules/News/api/newsService.ts";

export const useGetNews = () =>
    useQuery({
    queryKey: ["news"],
    queryFn: () => newsService.getNews(),
  });
