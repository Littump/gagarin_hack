import Search from "@/ui/Search.tsx";
import ServiceItem from "@/modules/Services/ui/ServiceItem.tsx";
import AddService from "@/modules/Services/ui/AddService.tsx";
import { useGetServices } from "@/modules/Services/api/useGetServices.ts";
import { useState } from "react";

const Services = () => {
  const [search, setSearch] = useState("");
  const { data, isPending } = useGetServices();
  const services = data?.data;
  const servicesFiltered =
    services &&
    services.filter(
      (el) =>
        el.name.toLowerCase().includes(search.toLowerCase()) ||
        el.description.toLowerCase().includes(search.toLowerCase()),
    );
  if (isPending) return "Загрузка...";
  return (
    <div className="flex gap-8 flex-col w-10/12">
      <Search setSearch={setSearch} className="border-violet-600" />
      <div className="flex gap-4 items-center my-6">
        <h1 className="text-2xl font-semibold">Сервисы</h1>
        <AddService />
      </div>
      <div className="grid gap-12 grid-cols-2 w-full">
        {servicesFiltered &&
          servicesFiltered.map((el) => (
            <ServiceItem key={el.id} service={el} />
          ))}
      </div>
    </div>
  );
};

export default Services;
