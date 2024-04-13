import { useMutation } from "@tanstack/react-query";
import newsService from "@/modules/News/api/newsService.ts";
import { AddNewsDto } from "@/modules/News/types/AddNews.dto.ts";
import { queryClient } from "@/main.tsx";

export const useAddNews = () =>
  useMutation({
    mutationFn: (body: AddNewsDto) => newsService.addNews(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["news"] });
    },
  });
