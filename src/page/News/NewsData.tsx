import { db } from "../../firebase/firebase";
import { collection, getDocs } from "firebase/firestore";

// Định nghĩa interface cho dữ liệu News và HotNews

export interface HotNewsItem {
  id:string;
  img: string;
  title: string;
}

export interface NewsItem {
  content: string;
  id: string,
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

// Hàm lấy tất cả dữ liệu từ collection "HotNews"
const getAllPressNews = async (): Promise<NewsItem[]> => {
  const pressNewData = collection(db, "PressNews");
  const pressNewsSnapshot = await getDocs(pressNewData);
  const pressNewsList: NewsItem[] = pressNewsSnapshot.docs.map(doc => doc.data() as NewsItem);
  return pressNewsList;
};
// Hàm lấy tất cả dữ liệu từ collection "HotNews"
const getAllInternalNews = async (): Promise<NewsItem[]> => {
  const internalNewsData = collection(db, "InternalNews");
  const internalNewsSnapshot = await getDocs(internalNewsData);
  const internalNewsList: NewsItem[] = internalNewsSnapshot.docs.map(doc => doc.data() as NewsItem);
  return internalNewsList;
};
// Hàm lấy tất cả dữ liệu từ collection "HotNews"
const getAllRecruitmentNews = async (): Promise<NewsItem[]> => {
  const recruitmentNewsData = collection(db, "RecruitmentNews");
  const recruitmentNewsSnapshot = await getDocs(recruitmentNewsData);
  const recruitmentNewsList: NewsItem[] = recruitmentNewsSnapshot.docs.map(doc => doc.data() as NewsItem);
  return recruitmentNewsList;
};
// Hàm lấy tất cả dữ liệu từ collection "HotNews"
const getAllEventNews = async (): Promise<NewsItem[]> => {
  const eventNewsData = collection(db, "event");
  const eventNewsSnapshot = await getDocs(eventNewsData);
  const eventNewsList: NewsItem[] = eventNewsSnapshot.docs.map(doc => doc.data() as NewsItem);
  return eventNewsList;
};
export { getAllNews, getAllHotNews, getAllPressNews, getAllRecruitmentNews, getAllInternalNews, getAllEventNews };
