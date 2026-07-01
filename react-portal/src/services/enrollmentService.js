import axios from "axios";
import { getToken } from "./authService";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3000";

const authHeaders = () => ({
    headers: { Authorization: `Bearer ${getToken()}` },
});

export const enrollInCourse = async (courseId, studentId) => {
    const response = await axios.post(
        `${API_URL}/api/enrollments`,
        { studentId, courseId },
        authHeaders(),
    );
    return response.data;
};

export const getMyCourses = async (studentId) => {
    const response = await axios.get(
        `${API_URL}/api/enrollments/student/${studentId}`,
        authHeaders(),
    );
    return response.data.data ?? response.data;
};
