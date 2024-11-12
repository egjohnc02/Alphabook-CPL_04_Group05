import { db } from "../../firebase/firebase";
import { collection, getDocs } from "firebase/firestore";

// Định nghĩa interface cho dữ liệu News và HotNews
export interface NewsItem {
  content: string;
  img: string;
  title: string;
}

export interface HotNewsItem {
  img: string;
  title: string;
}

// Hàm lấy tất cả dữ liệu từ collection "News"
const getAllNews = async (): Promise<NewsItem[]> => {
  const newsData = collection(db, "News");
  const newsSnapshot = await getDocs(newsData);
  const newsList: NewsItem[] = newsSnapshot.docs.map(doc => doc.data() as NewsItem);
  return newsList;
};

// Hàm lấy tất cả dữ liệu từ collection "HotNews"
const getAllHotNews = async (): Promise<HotNewsItem[]> => {
  const hotNewsData = collection(db, "HotNews");
  const hotNewsSnapshot = await getDocs(hotNewsData);
  const hotNewsList: HotNewsItem[] = hotNewsSnapshot.docs.map(doc => doc.data() as HotNewsItem);
  return hotNewsList;
};

export { getAllNews, getAllHotNews };
