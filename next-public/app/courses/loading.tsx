import styles from "./page.module.css";

export default function LoadingCourses() {
  return (
    <div className={styles.page}>
      <p className={styles.status}>Cargando cursos...</p>
    </div>
  );
}
