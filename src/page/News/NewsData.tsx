import { db } from "../../firebase/firebase";
import { collection, getDocs, query, limit } from "firebase/firestore";

// Định nghĩa interface cho dữ liệu News và HotNews
export interface NewsItem {
  id:string;
  img: string;
  title: string;
  content: string;
  date: string;
  author: string;
}
export interface Event {
  Date?: string;
  content: string;
  id: string,
  img: string;
  title: string;
}
// Hàm lấy tất cả dữ liệu từ collection "News"
const getAllNews = async (): Promise<NewsItem[]> => {
  const newsData = collection(db, "News");
  const newsSnapshot = await getDocs(newsData);
  const newsList: NewsItem[] = newsSnapshot.docs.map((doc) => ({
    id: doc.id, // Lấy ID của document
    ...doc.data(), // Lấy các dữ liệu khác
  })) as NewsItem[]; // Ép kiểu thành NewsItem[]

  return newsList;
};
// Lấy 4 phần tử để hiển thị caroual
const getLimitedNews = async (): Promise<NewsItem[]> => {
  const newsData = collection(db, "News");
  const newsQuery = query(newsData, limit(4)); // Lấy tối đa 4 phần tử
  const newsSnapshot = await getDocs(newsQuery);
  const newsList: NewsItem[] = newsSnapshot.docs.map((doc) => ({
    id: doc.id, // Lấy ID của document
    ...doc.data(), // Lấy các dữ liệu khác
  })) as NewsItem[]; // Ép kiểu thành NewsItem[]
  return newsList;
};
// Lấy 4 phần tử để hiển thị event cua carousel
const getLimitedEvents = async (): Promise<Event[]> => {
  const newsData = collection(db, "event");
  const newsQuery = query(newsData, limit(4)); // Lấy tối đa 4 phần tử
  const newsSnapshot = await getDocs(newsQuery);
  const newsList: Event[] = newsSnapshot.docs.map(doc => doc.data() as Event);
  return newsList;
};

// Hàm lấy tất cả dữ liệu từ collection "HotNews"
const getAllHotNews = async (): Promise<NewsItem[]> => {
  const hotNewsData = collection(db, "HotNews");
  const hotNewsSnapshot = await getDocs(hotNewsData);
  const hotNewsList: NewsItem[] = hotNewsSnapshot.docs.map((doc) => ({
    id: doc.id, // Lấy ID của document
    ...doc.data(), // Lấy các dữ liệu khác
  })) as NewsItem[]; // Ép kiểu thành NewsItem[]
  return hotNewsList;
};

// Hàm lấy tất cả dữ liệu từ collection "HotNews"
const getAllPressNews = async (): Promise<NewsItem[]> => {
  const pressNewData = collection(db, "PressNews");
  const pressNewsSnapshot = await getDocs(pressNewData);
  const pressNewsList: NewsItem[] = pressNewsSnapshot.docs.map((doc) => ({
    id: doc.id, // Lấy ID của document
    ...doc.data(), // Lấy các dữ liệu khác
  })) as NewsItem[]; // Ép kiểu thành NewsItem[]
  return pressNewsList;
};
// Hàm lấy tất cả dữ liệu từ collection "HotNews"
const getAllInternalNews = async (): Promise<NewsItem[]> => {
  const internalNewsData = collection(db, "InternalNews");
  const internalNewsSnapshot = await getDocs(internalNewsData);
  const internalNewsList: NewsItem[] = internalNewsSnapshot.docs.map((doc) => ({
    id: doc.id, // Lấy ID của document
    ...doc.data(), // Lấy các dữ liệu khác
  })) as NewsItem[]; // Ép kiểu thành NewsItem[]
  return internalNewsList;
};
// Hàm lấy tất cả dữ liệu từ collection "HotNews"
const getAllRecruitmentNews = async (): Promise<NewsItem[]> => {
  const recruitmentNewsData = collection(db, "RecruitmentNews");
  const recruitmentNewsSnapshot = await getDocs(recruitmentNewsData);
  const recruitmentNewsList: NewsItem[] = recruitmentNewsSnapshot.docs.map((doc) => ({
    id: doc.id, // Lấy ID của document
    ...doc.data(), // Lấy các dữ liệu khác
  })) as NewsItem[]; // Ép kiểu thành NewsItem[]
  return recruitmentNewsList;
};
// Hàm lấy tất cả dữ liệu từ collection "HotNews"
const getAllEventNews = async (): Promise<NewsItem[]> => {
  const eventNewsData = collection(db, "event");
  const eventNewsSnapshot = await getDocs(eventNewsData);
  const eventNewsList: NewsItem[] = eventNewsSnapshot.docs.map(doc => doc.data() as NewsItem);
  return eventNewsList;
};
export { getAllNews, getAllHotNews, getAllPressNews, getAllRecruitmentNews, getAllInternalNews, getAllEventNews,getLimitedNews,getLimitedEvents };
