import { useMutation } from "@tanstack/react-query";
import { queryClient } from "@/main.tsx";
import { AddServiceDto } from "@/modules/Services/types/addService.dto.ts";
import serviceService from "@/modules/Services/api/serviceService.ts";

export const useAddService = () =>
  useMutation({
    mutationFn: (body: AddServiceDto) => serviceService.addService(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["services"] });
    },
  });
