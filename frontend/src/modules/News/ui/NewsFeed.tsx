import NewsItem from "@/modules/News/ui/NewsItem.tsx";
import { INewsItem } from "@/modules/News/types/INewsItem.ts";

const NewsFeed = ({ news }: { news: INewsItem[] }) => {
  return (
    <div className="grid grid-cols-4 gap-10">
      {news &&
        news.map((item) => (
          <div key={item.id}>
            <NewsItem {...item}></NewsItem>
          </div>
        ))}
    </div>
  );
};

export default NewsFeed;
