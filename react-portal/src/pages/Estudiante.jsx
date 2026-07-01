import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { getUserId } from "../services/authService";
import { getMyCourses } from "../services/enrollmentService";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";

const Estudiante = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const [enrollments, setEnrollments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const loadEnrollments = async () => {
            const idUsuario = getUserId();

            if (!idUsuario) {
                setError("No se encontró tu usuario.");
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                const data = await getMyCourses(idUsuario);
                setEnrollments(data || []);
            } catch (err) {
                console.error(err);
                setError("No se pudieron cargar tus inscripciones");
            } finally {
                setLoading(false);
            }
        };

        loadEnrollments();
    }, []);

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <div className="max-w-3xl mx-auto p-6">
            <div className="flex items-center justify-between mb-1">
                <h1 className="text-2xl font-bold">
                    Bienvenido, {user?.email}
                </h1>
                <button
                    onClick={handleLogout}
                    className="bg-red-500 hover:bg-red-600 text-white text-sm font-semibold py-2 px-4 rounded-lg transition"
                >
                    Cerrar sesión
                </button>
            </div>
            <p className="text-gray-500 mb-6">
                Este es tu panel de estudiante.
            </p>

            <div className="flex gap-3 mb-8">
                <button
                    onClick={() => navigate("/cursos")}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition"
                >
                    Tus cursos (ver catálogo)
                </button>
            </div>

            <h2 className="text-xl font-semibold mb-4">Tus inscripciones</h2>

            {loading && <Loader />}
            {!loading && error && <ErrorMessage message={error} />}

            {!loading && !error && enrollments.length === 0 && (
                <p className="text-gray-500">
                    Todavía no te has inscrito a ningún curso.
                </p>
            )}

            {!loading && !error && enrollments.length > 0 && (
                <div className="grid gap-4">
                    {enrollments.map((enrollment) => (
                        <div
                            key={enrollment._id || enrollment.courseId?._id}
                            className="bg-white rounded-lg shadow p-4"
                        >
                            <h3 className="font-bold text-lg">
                                {enrollment.courseId?.name || "Curso"}
                            </h3>
                            {enrollment.courseId?.teacher && (
                                <p className="text-gray-600 text-sm">
                                    Profesor:{" "}
                                    {enrollment.courseId.teacher?.name ||
                                        enrollment.courseId.teacher}
                                </p>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Estudiante;
