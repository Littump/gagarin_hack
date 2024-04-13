import { useQuery } from "@tanstack/react-query";
import newsService from "@/modules/News/api/newsService.ts";

export const useGetPriorityNews = () =>
  useQuery({
    queryKey: ["priority_news"],
    queryFn: () => newsService.getPriorityNews(),
  });
