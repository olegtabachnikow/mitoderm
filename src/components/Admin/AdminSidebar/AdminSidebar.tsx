'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
// import { Calendar, Image, LogOut, ExternalLink } from 'lucide-react';
import styles from './AdminSidebar.module.scss';

const navItems = [
  {
    to: '/admin/programs',
    icon: '/images/icons/calendar.svg',
    label: 'Programs',
    desc: 'Training & workshops',
  },
  {
    to: '/admin/media',
    icon: '/images/icons/meadia.svg',
    label: 'Media',
    desc: 'Images & assets',
  },
];

export function AdminSidebar({ onLogout }: { onLogout: () => void }) {
  const pathname = usePathname();

  return (
    <aside className={styles.aside}>
      <div className={styles.logoSection}>
        <div className={styles.logoRow}>
          <div className={styles.logoMark}>
            <span className={styles.logoLetter}>M</span>
          </div>
          <div>
            <h1 className={styles.title}>MITODERM</h1>
            <p className={styles.subtitle}>Admin Panel</p>
          </div>
        </div>
      </div>

      <nav className={styles.nav}>
        <p className={styles.navSectionLabel}>Management</p>
        {navItems.map((item) => {
          const isActive =
            pathname === item.to || pathname.startsWith(item.to + '/');
          return (
            <Link
              key={item.to}
              href={item.to}
              className={`${styles.navLink} ${isActive ? styles.navLinkActive : styles.navLinkInactive}`}
            >
              <div
                className={`${styles.iconWrap} ${isActive ? styles.iconWrapActive : styles.iconWrapInactive}`}
              >
                <Image
                  src={item.icon}
                  className={styles.navIcon}
                  width={18}
                  height={18}
                  alt={item.label}
                />
              </div>
              <div>
                <span className={styles.navLabel}>{item.label}</span>
                <span
                  className={`${styles.navDesc} ${isActive ? styles.navDescActive : styles.navDescInactive}`}
                >
                  {item.desc}
                </span>
              </div>
            </Link>
          );
        })}

        <div className={styles.refBlock}>
          <p className={styles.navSectionLabel}>Reference</p>
          <Link href="/content-list" target="_blank" className={styles.refLink}>
            <div className={styles.refIconWrap}>
              <Image
                src="/images/icons/contentListIcon.svg"
                className={styles.refIcon}
                width={16}
                height={16}
                alt="content list icon"
              />
            </div>
            <div>
              <span className={styles.refLabel}>Content List</span>
              <span className={styles.refHint}>Opens in new tab</span>
            </div>
          </Link>
        </div>
      </nav>

      <div className={styles.footer}>
        <div className={styles.userRow}>
          <div className={styles.avatar}>AD</div>
          <div className={styles.userMeta}>
            <p className={styles.userName}>Admin</p>
            <p className={styles.userEmail}>admin@mitoderm.com</p>
          </div>
        </div>
        <button type="button" onClick={onLogout} className={styles.signOut}>
          <Image
            src="/images/icons/logOutIcon.svg"
            className={styles.signOutIcon}
            width={16}
            height={16}
            alt="sign out"
          />{' '}
          Sign Out
        </button>
      </div>
    </aside>
  );
}
