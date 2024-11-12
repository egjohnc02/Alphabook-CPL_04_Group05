import { db } from "../../firebase/firebase"
import { collection, getDocs } from "firebase/firestore"

// Hàm lấy tất cả dữ liệu từ collection "News"
const getAllNews = async () => {
    const newsData = collection(db, "News");
    const newsSnapshot = await getDocs(newsData);
    const newsList = newsSnapshot.docs.map(doc => doc.data()); // Lấy dữ liệu từ mỗi tài liệu
    return newsList;
}
const getAllHotNews = async () =>{
    const newsData = collection(db, "HotNews");
    const newsSnapshot = await getDocs(newsData);
    const newsHotList = newsSnapshot.docs.map(doc => doc.data()); // Lấy dữ liệu từ mỗi tài liệu
    return newsHotList;
}
export {getAllHotNews};
export default getAllNews;
