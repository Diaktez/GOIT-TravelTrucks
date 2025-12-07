'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import css from './Header.module.css';

export default function Header() {
  const pathname = usePathname();
  return (
    <header className={css.header}>
      <div className={`container ${css.wrapper}`}>
        <Link href="/">
          <svg width={136} height={16}>
            <use href="/icons.svg#logo"></use>
          </svg>
        </Link>
        <nav className={css.navWrapper}>
          <ul className={css.nav}>
            <li>
              <Link
                prefetch={false}
                href="/"
                className={`${css.navLink} ${
                  pathname === '/' ? css.active : ''
                }`}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                prefetch={false}
                href="/catalog"
                className={`${css.navLink} ${
                  pathname === '/catalog' ? css.active : ''
                }`}
              >
                Catalog
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
