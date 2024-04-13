import Modal from "@/ui/Modal.tsx";
import NewsItemHeading from "@/modules/News/ui/NewsItemHeading.tsx";
import NewsItemBody from "@/modules/News/ui/NewsItemBody.tsx";
import { useState } from "react";
import { INewsItem } from "@/modules/News/types/INewsItem.ts";

const NewsItem = (news: INewsItem) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <Modal
      className="w-[1050px]"
      isModalOpen={isModalOpen}
      setIsModalOpen={setIsModalOpen}
      heading={<NewsItemHeading {...news} />}
    >
      <NewsItemBody {...news} />
    </Modal>
  );
};

export default NewsItem;
