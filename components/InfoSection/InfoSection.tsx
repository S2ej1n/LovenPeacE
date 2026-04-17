'use client';

import styles from './InfoSection.module.css';

interface Props {
  isActive: boolean;
}

export default function InfoSection({ isActive }: Props) {
  return (
    <div className={styles.container}>
      <div className={`${styles.card} ${isActive ? styles.blurActive : ''}`}>

        {/* 정보 카드 3열 */}
        <div className={styles.grid}>
          <div className={styles.infoCard}>
            <h3 className={styles.cardTitle}>공연 정보</h3>
            <ul className={styles.cardList}>
              <li>
                <span className={styles.itemLabel}>일시</span>
                <span>2026. 07. 10 (금) PM 6:00</span>
              </li>
              <li>
                <span className={styles.itemLabel}>장소</span>
                <span>바이널 언더그라운드</span>
              </li>
            </ul>
          </div>

          <div className={styles.infoCard}>
            <h3 className={styles.cardTitle}>공연 참가팀 안내</h3>
            <ul className={styles.cardList}>
              <li>
                <span className={styles.itemLabel}>참가비</span>
                <span>참가 팀에 한해 공지 예정</span>
              </li>
              <li>
                <span className={styles.itemLabel}>러닝타임</span>
                <span>팀당 총 25분 <br />(세팅 및 철수 포함)</span>
              </li>
              <li>
                <span className={styles.itemLabel}>곡 수</span>
                <span>제한 없음 <br />(단, 공연 시간 엄수 필수)</span>
              </li>
            </ul>
          </div>

          <div className={styles.infoCard}>
            <h3 className={styles.cardTitle}>자율 기부 안내</h3>
            <ul className={styles.cardList}>
              <li>
                <span>3,000원 이상 기부 시 <br />L♡vE and PeacE 뱃지 증정</span>
              </li>
              <li>
                <span>모든 기부금은 사이트에 <br />투명하게 기록·공개됩니다</span>
              </li>
            </ul>
          </div>
        </div>

        {/* 참고사항 */}
        <div className={styles.noteWrap}>
          <h3 className={styles.cardTitle}>참고사항</h3>
          <ul className={styles.noteList}>
            <li>공연은 타임테이블에 맞춰 진행됩니다. 타임테이블은 추후 공개될 예정입니다.</li>
            <li>원활한 진행을 위해 리허설 및 세팅 협조 부탁드립니다.</li>
            <li>본 공연은 촬영이 진행되며, 일부 장면은 홍보 및 기록으로 활용될 수 있습니다.</li>
          </ul>
        </div>

      </div>
    </div>
  );
}
