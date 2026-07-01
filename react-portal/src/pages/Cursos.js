import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { getCourses } from "../services/courseService";
import "./Cursos.css";

const Cursos = () => {
  const { logout, user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadCourses = async () => {
      try {
        const data = await getCourses();
        setCourses(data);
      } catch (err) {
        console.error(err);
        setError("No se pudo conectar al servidor");
      } finally {
        setLoading(false);
      }
    };

    loadCourses();
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleVerDetalle = (id) => {
    navigate(`/cursos/${id}`);
  };

  if (loading) return <h2 className="cursos-status">Cargando cursos...</h2>;

  if (error) return <h2 className="cursos-status cursos-error">{error}</h2>;

  return (
    <div className="cursos-container">
      <header className="cursos-header">
        <h1>Bienvenido, {user?.email}</h1>
        <button className="logout-btn" onClick={handleLogout}>
          Cerrar sesión
        </button>
      </header>

      <hr className="cursos-divider" />

      <h2 className="cursos-titulo">Lista de cursos</h2>

      <div className="cursos-grid">
        {courses.map((course) => (
          <div className="curso-card" key={course._id}>
            <h3 className="curso-nombre">{course.name}</h3>
            <p className="curso-descripcion">{course.description}</p>
            <p className="curso-profesor">
              <strong>Profesor:</strong> {course.teacher?.name}
            </p>
            <span className="curso-categoria">{course.category}</span>

            <button
              className="curso-detalle-btn"
              onClick={() => handleVerDetalle(course._id)}
            >
              Ver detalle
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cursos;