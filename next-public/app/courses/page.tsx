import Link from "next/link";
import { getCourses } from "@/services/courseService";
import styles from "./page.module.css";

export const dynamic = "force-dynamic";

export default async function CoursesPage() {
  const courses = await getCourses().catch(() => null);

  if (courses === null) {
    return (
      <div className={styles.page}>
        <p className={styles.status}>No se pudo conectar al servidor</p>
      </div>
    );
  }

  if (courses.length === 0) {
    return (
      <div className={styles.page}>
        <p className={styles.status}>No hay cursos disponibles.</p>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Catálogo de cursos</h1>

      <div className={styles.grid}>
        {courses.map((course) => (
          <div className={styles.card} key={course._id}>
            <h3 className={styles.cardTitle}>{course.name}</h3>
            <p className={styles.cardDescription}>{course.description}</p>
            <p className={styles.cardTeacher}>
              <strong>Profesor:</strong> {course.teacher?.name}
            </p>
            <span className={styles.cardCategory}>{course.category}</span>

            <Link href={`/courses/${course._id}`} className={styles.cardLink}>
              Ver detalle
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
