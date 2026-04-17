'use client';

import styles from './InfoIntro.module.css';

interface Props {
  isActive: boolean;
}

export default function InfoIntro({ isActive }: Props) {
  return (
    <div className={styles.container}>
      <div className={`${styles.inner} ${isActive ? styles.blurActive : ''}`}>
        <p>
          사회에 막 발을 내딛은 우리,<br />
          아직 가진 건 많지 않아도 — 사랑을 나눌 수는 있잖아요.
        </p>
        <p className={styles.sub}>
          L♡vE and PeacE 는 작은 나눔도 사랑이 될 수 있다는 마음으로,<br />
          밴드 공연과 자율 기부를 함께하는 컨셉으로 기획되었습니다.
        </p>
        <p>
          우리는 거창하지 않더라도<br />
          지금 우리가 가진 것들로<br />
          누군가에게 긍정적인 영향을 줄 수 있다고 믿습니다.
        </p>
        <p className={styles.call}>우리, 함께 하지 않을래요?</p>
      </div>
    </div>
  );
}
