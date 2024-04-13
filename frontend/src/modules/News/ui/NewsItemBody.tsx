import { INewsItem } from "@/modules/News/types/INewsItem.ts";
import { getEventKindRussian } from "@/modules/News/helpers/getEventKind.ts";

const NewsItemBody = ({
  name,
  avatar,
  link,
  date_start,
  date_finish,
  description,
  kind,
  points,
  place,
}: INewsItem) => {
  return (
    <div className="flex gap-24 py-12 px-8 items-center">
      <div className="w-5/12 flex flex-col gap-6">
        <h2 className="text-2xl font-semibold">{name}</h2>
        <ul className="text-gray-600">
          <li>
            <span className="text-violet-500">Дата начала:</span> {date_start}
          </li>
          <li>
            <span className="text-violet-500">Дата окончания:</span>{" "}
            {date_finish}
          </li>
          <li>
            <span className="text-violet-500">Место:</span> {place}
          </li>
          <li>
            <span className="text-violet-500">Тип:</span>{" "}
            {getEventKindRussian(kind)}
          </li>
          <li>
            <span className="text-green-600">Бонусы:</span> {points}
          </li>
        </ul>
        <p className="text-sm text-gray-600 leading-6">{description}</p>
        <a href={link} className="my-btn w-80">
          Посмотреть
        </a>
      </div>
      <div className="w-7/12 flex justify-end">
        <img src={avatar} alt="" className="rounded-xl h-96 shadow-lg" />
      </div>
    </div>
  );
};

export default NewsItemBody;
