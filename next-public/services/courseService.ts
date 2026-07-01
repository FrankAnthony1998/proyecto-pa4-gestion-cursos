import axios from "axios";
import api from "./api";

export type Course = {
  _id: string;
  name: string;
  description: string;
  category: string;
  teacher: {
    _id: string;
    name: string;
    email: string;
  };
  createdAt: string;
  updatedAt: string;
};

type CoursesResponse = {
  status: string;
  results: number;
  data: Course[];
};

type CourseResponse = {
  status: string;
  data: Course;
};

export async function getCourses(): Promise<Course[]> {
  try {
    const response = await api.get<CoursesResponse>("/api/ofertas");
    return response.data.data;
  } catch {
    throw new Error("No se pudo conectar al servidor");
  }
}

export async function getCourseById(id: string): Promise<Course | undefined> {
  try {
    const response = await api.get<CourseResponse>(`/api/ofertas/${id}`);
    return response.data.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      return undefined;
    }
    throw new Error("No se pudo conectar al servidor");
  }
}
