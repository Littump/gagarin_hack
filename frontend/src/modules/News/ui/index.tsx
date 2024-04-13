import NewsFeed from "@/modules/News/ui/NewsFeed.tsx";
import AddNews from "@/modules/News/ui/addNews.tsx";
import { useGetNews } from "@/modules/News/api/useGetNews.ts";
import img_url from "@/config/img_url.ts";
import { useState } from "react";
import { useGetPriorityNews } from "@/modules/News/api/useGetPriorityNews.ts";

const News = () => {
  const { data: data_date, isPending } = useGetNews();
  const { data: data_priority } = useGetPriorityNews();
  const [filter, setFilter] = useState(false);
  let data = filter ? data_priority : data_date;
  if (isPending || !data) return "загрузка...";
  return (
    <div>
      <div className="flex gap-8 mb-10 items-center">
        <h1 className="text-2xl font-semibold mt-4 mb-2">
          Новости нашего колледжа
        </h1>
        <AddNews />
        <label className="my-btn w-40 text-center bg-blue-500 hover:bg-blue-600">
          <input
            type="checkbox"
            checked={filter}
            className="hidden"
            onChange={(e) => setFilter(e.target.checked)}
          />
          {filter ? "Релевантные" : "По дате"}
        </label>
      </div>

      <NewsFeed
        news={data.data.map((el) => ({ ...el, avatar: img_url + el.avatar }))}
      ></NewsFeed>
    </div>
  );
};

export default News;
