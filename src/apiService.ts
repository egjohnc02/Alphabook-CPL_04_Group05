import axios from "axios";

const API_Provinces = "https://provinces.open-api.vn/api/";

export const getProvinces = async () => {
  try {
    const response = await axios.get(`${API_Provinces}?depth=3`);
    return response.data;
  } catch (error) {
    console.error("Error fetching provinces:", error);
    throw error;
  }
};