'use client';

import styles from './Loader.module.css';

interface LoaderProps {
  size?: number;
}

export default function Loader({ size = 130 }: LoaderProps) {
  const borderWidth = size / 10;

  return (
    <div className={styles.loaderWrapper}>
      <div
        className={styles.loaderSpinner}
        style={{
          width: `${size}px`,
          height: `${size}px`,
          borderWidth: `${borderWidth}px`,
        }}
      />
    </div>
  );
}
