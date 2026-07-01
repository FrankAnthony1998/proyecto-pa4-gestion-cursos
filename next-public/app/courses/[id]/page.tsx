import Link from "next/link";
import { getCourseById } from "@/services/courseService";
import styles from "./page.module.css";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function CourseDetailPage({ params }: Props) {
  const { id } = await params;
  const course = await getCourseById(id).catch(() => null);

  if (course === null) {
    return (
      <div className={styles.page}>
        <p className={styles.notFound}>No se pudo conectar al servidor</p>
      </div>
    );
  }

  if (!course) {
    return (
      <div className={styles.page}>
        <h1 className={styles.notFound}>Curso no encontrado</h1>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <span className={styles.category}>{course.category}</span>

      <h1 className={styles.title}>{course.name}</h1>

      <p className={styles.description}>{course.description}</p>

      <p className={styles.teacher}>
        <strong>Profesor:</strong> {course.teacher?.name} ({course.teacher?.email})
      </p>

      <Link href="/courses" className={styles.backLink}>
        ← Volver al catálogo
      </Link>
    </div>
  );
}
