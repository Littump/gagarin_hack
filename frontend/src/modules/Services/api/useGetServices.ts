import { useQuery } from "@tanstack/react-query";
import serviceService from "@/modules/Services/api/serviceService.ts";

export const useGetServices = () =>
  useQuery({
    queryKey: ["services"],
    queryFn: () => serviceService.getServices(),
  });
