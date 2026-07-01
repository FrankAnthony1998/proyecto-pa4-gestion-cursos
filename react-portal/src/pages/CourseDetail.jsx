import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getCourseById } from "../services/courseService";
import { enrollInCourse } from "../services/enrollmentService";
import { getUserId } from "../services/authService";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";

const CourseDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [enrolling, setEnrolling] = useState(false);
    const [enrollResult, setEnrollResult] = useState(null);

    useEffect(() => {
        const loadCourse = async () => {
            try {
                setLoading(true);
                setError("");
                const data = await getCourseById(id);
                setCourse(data);
            } catch (err) {
                console.error(err);
                setError("No se pudo conectar al servidor");
            } finally {
                setLoading(false);
            }
        };

        loadCourse();
    }, [id]);

    const handleInscribirse = async () => {
        const idUsuario = getUserId();

        if (!idUsuario) {
            setEnrollResult({
                success: false,
                message:
                    "No se encontró tu usuario. Vuelve a iniciar sesión e intenta de nuevo.",
            });
            return;
        }

        try {
            setEnrolling(true);
            setEnrollResult(null);
            await enrollInCourse(course._id, idUsuario);
            setEnrollResult({
                success: true,
                message: "¡Inscripción exitosa!",
            });
        } catch (err) {
            console.error(err);
            const backendMessage = err.response?.data?.message;

            if (
                backendMessage ===
                "El estudiante ya se encuentra matriculado en este curso"
            ) {
                setEnrollResult({
                    success: true,
                    message: "Ya estás inscrito en este curso.",
                });
            } else {
                setEnrollResult({
                    success: false,
                    message:
                        backendMessage ||
                        "No se pudo completar la inscripción. Intenta nuevamente.",
                });
            }
        } finally {
            setEnrolling(false);
        }
    };

    if (loading) return <Loader />;
    if (error) return <ErrorMessage message={error} />;
    if (!course) return <ErrorMessage message="Curso no encontrado" />;

    const teacherName =
        typeof course.teacher === "string"
            ? course.teacher
            : course.teacher?.name;

    return (
        <div className="max-w-3xl mx-auto p-6">
            <button
                onClick={() => navigate(-1)}
                className="text-blue-600 font-medium mb-4 inline-block"
            >
                &larr; Volver
            </button>

            <div className="bg-white rounded-lg shadow p-6">
                {course.image && (
                    <img
                        src={course.image}
                        alt={course.name}
                        className="w-full h-64 object-cover rounded mb-4"
                    />
                )}

                <h1 className="text-2xl font-bold mb-2">{course.name}</h1>

                {teacherName && (
                    <p className="text-gray-600 mb-1">
                        <strong>Profesor:</strong> {teacherName}
                    </p>
                )}

                {course.duration && (
                    <p className="text-gray-600 mb-1">
                        <strong>Duración:</strong> {course.duration}
                    </p>
                )}

                {course.price !== undefined && (
                    <p className="text-gray-600 mb-1">
                        <strong>Precio:</strong> S/. {course.price}
                    </p>
                )}

                <p className="mt-4 text-gray-700 leading-relaxed">
                    {course.description}
                </p>

                <button
                    onClick={handleInscribirse}
                    disabled={enrolling}
                    className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition disabled:opacity-50"
                >
                    {enrolling ? "Inscribiendo..." : "Inscribirse"}
                </button>

                {enrollResult && (
                    <div
                        className={`mt-4 px-4 py-2 rounded border ${
                            enrollResult.success
                                ? "bg-green-100 text-green-700 border-green-400"
                                : "bg-red-100 text-red-700 border-red-400"
                        }`}
                    >
                        {enrollResult.message}
                    </div>
                )}
            </div>
        </div>
    );
};

export default CourseDetail;
