import axios from "axios";

//const API_BASE_URL = "https://animal-guard-api.thyrail.de/api/news";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// (CREATE) - No Authorization Required
export const createNews = async (newsData) => {
  try {
    console.log("Creating news...");
    const response = await axios.post(`${API_BASE_URL}/news/`, newsData, {
      headers: { "Content-Type": "application/json" },
    });
    console.log("News created successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error creating news:", error);
    throw error;
  }
};

//  (READ - GET ALL) - No Authorization Required
export const getAllNews = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/news/`);
    return response.data;
  } catch (error) {
    console.error("Error retrieving the news:", error);
    throw error;
  }
};

// (READ - GET BY ID) - No Authorization Required
export const getNewsById = async (newsId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${newsId}`);
    return response.data;
  } catch (error) {
    console.error(`Error retrieving news with ID ${newsId}:`, error);
    throw error;
  }
};

// (UPDATE) - No Authorization Required
export const updateNews = async (newsId, updatedNewsData) => {
  try {
    const response = await axios.put(
      `${API_BASE_URL}/${newsId}`,
      updatedNewsData,
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    return response.data;
  } catch (error) {
    console.error(`Error updating news with ID ${newsId}:`, error);
    throw error;
  }
};

// (DELETE) - No Authorization Required
export const deleteNews = async (newsId) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/${newsId}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting news with ID ${newsId}:`, error);
    throw error;
  }
};
