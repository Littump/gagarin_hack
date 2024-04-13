import { INewsItem } from "@/modules/News/types/INewsItem.ts";

const NewsItemHeading = ({
  name,
  avatar,
  date_start,
  date_finish,
}: INewsItem) => {
  return (
    <article className="w-72 flex items-start text-start flex-col gap-1 ">
      <img src={avatar} alt="" className="rounded-xl h-48 w-full" />
      <div className="flex flex-col gap-2">
        <h2 className="font-semibold">{name}</h2>
        <p className="text-sm text-gray-400">
          {date_start} - {date_finish}
        </p>
      </div>
    </article>
  );
};

export default NewsItemHeading;
