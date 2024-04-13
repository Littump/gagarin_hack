import { useMutation } from "@tanstack/react-query";
import loginService from "./loginService.ts";
import LoginDto from "@/modules/Login/types/login.dto.ts";

export const useLogin = () =>
  useMutation({
    mutationFn: (body: LoginDto) => loginService.login(body),
  });
