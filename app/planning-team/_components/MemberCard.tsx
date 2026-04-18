'use client';

import Image from 'next/image';
import styles from './MemberCard.module.css';
import type { MemberCardProps } from '../_data/type';

export default function MemberCard({ name, position, quote, photo, sns }: MemberCardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.photoWrap}>
        {photo ? (
          <Image src={photo} alt={name} width={90} height={90} className={styles.photo} />
        ) : (
          <div className={styles.photoPlaceholder}>
            <span>{name[0]}</span>
          </div>
        )}
      </div>

      <div className={styles.info}>
        <div className={styles.header}>
          <p className={styles.name}>{name}</p>
          <p className={styles.position}>{position}</p>
        </div>

        <p className={styles.quote}>{quote}</p>

        {sns && sns.length > 0 && (
          <ul className={styles.snsList}>
            {sns.map((s) => (
              <li key={s.label}>
                <a
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.snsLink}
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
