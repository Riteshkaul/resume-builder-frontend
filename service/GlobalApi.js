import axios from "axios";

const API_KEY = import.meta.env.VITE_STRAPI_API_KEY;

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL + "/api/",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
});

const CreatenewResume = (data) => axiosClient.post("/user-resumes", data);

const getUserResume = (userEmail) =>
  axiosClient.get("/user-resumes?filters[userEmail][$eq]=" + userEmail);

const updateResumeDetail = async (id, data) => {
  try {
    console.log(`Updating resume with ID: ${id}`, data);

    const response = await axiosClient.put(`/user-resumes/${id}`, data);

    console.log("Update successful:", response.data);
    return response.data; // Return response data if needed
  } catch (error) {
    console.error("Error updating resume:", {
      message: error.message,
      code: error.code,
      config: error.config,
      response: error.response
        ? {
            status: error.response.status,
            data: error.response.data,
          }
        : undefined,
    });
    throw error; // Optionally rethrow error if you want it to propagate
  }
};
const getResumeById = (id) =>
  axiosClient.get("/user-resumes/" + id + "?populate=*");
const deleteResumeById = (id) => axiosClient.delete("/user-resumes/" + id);
export default {
  CreatenewResume,
  getUserResume,
  updateResumeDetail,
  getResumeById,
  deleteResumeById,
};
