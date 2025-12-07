import Link from 'next/link';
import styles from './Hero.module.css';
import css from '@/components/UI/Button.module.css';

export default function Hero() {
  return (
    <section className={styles.heroSection}>
      <div className={`container ${styles.content}`}>
        <h1 className={styles.title}>Campers of your dreams</h1>
        <p className={styles.subtitle}>
          You can find everything you want in our catalog
        </p>
        <Link href="/catalog" className={css.button}>
          View Now
        </Link>
      </div>
    </section>
  );
}
