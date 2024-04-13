import loginService from "./loginService.ts";
import {useQuery} from "@tanstack/react-query";

export const useGetMe = () =>
    useQuery({
        queryKey: ['userInfo'],
        queryFn: () => loginService.getMe(),
    });
