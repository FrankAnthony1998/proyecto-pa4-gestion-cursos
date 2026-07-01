import axios from "axios";

const API_URL = "http://localhost:3000";

export const getCourses = async () => {
    const response = await axios.get(`${API_URL}/api/courses`);
    return response.data.data;
};

export const getCourseById = async (id) => {
    const response = await axios.get(`${API_URL}/api/courses/${id}`);
    return response.data.data;
};
