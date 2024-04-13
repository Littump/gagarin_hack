import { IServiceItem } from "@/modules/Services/types/ServicesTypes.ts";
import { useState } from "react";
import Modal from "@/ui/Modal.tsx";

interface Props {
  service: IServiceItem;
}

const ServiceItemHeading = ({ service }: Props) => {
  return (
    <div className="py-6 px-4 rounded-xl text-start border border-gray-400 flex gap-8 items-center">
      <img src={service.image} alt="" className="h-32" />
      <div className="flex flex-col gap-2">
        <h3 className="text-lg font-semibold">{service.name}</h3>
        <p className="text-sm text-gray-400">{service.description}</p>
      </div>
    </div>
  );
};
const ServiceItem = ({ service }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <Modal
      className="w-[500px]"
      heading={<ServiceItemHeading service={service} />}
      setIsModalOpen={setIsModalOpen}
      isModalOpen={isModalOpen}
    >
      <div className="flex gap-6 flex-col">
        <img src={service.image} alt="" className="w-full h-40 mt-10" />
        <div className="flex flex-col gap-4 w-full text-center">
          <h1 className="text-xl font-semibold">{service.name}</h1>
          <p className="text-sm text-gray-400">{service.description}</p>
          <a href={service.link} className="my-btn w-full ">
            Перейти
          </a>
        </div>
      </div>
    </Modal>
  );
};

export default ServiceItem;
