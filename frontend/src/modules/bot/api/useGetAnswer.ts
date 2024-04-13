import { useMutation } from "@tanstack/react-query";
import botService from "@/modules/bot/api/botService.ts";
export const useGetAnswer = () =>
  useMutation({
    mutationFn: (q: string) => botService.getAnswer(q),
  });
