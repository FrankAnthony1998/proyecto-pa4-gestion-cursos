import Link from "next/link";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.hero}>
      <span className={styles.badge}>Instituto San Ignacio de Loyola</span>

      <h1 className={styles.title}>Gestión de Cursos e Inscripciones</h1>

      <p className={styles.description}>
        Explora la oferta académica del ISIL: consulta el catálogo de cursos disponibles,
        su descripción y el docente a cargo, sin necesidad de iniciar sesión.
      </p>

      <Link href="/courses" className={styles.cta}>
        Ver cursos
      </Link>
    </main>
  );
}
