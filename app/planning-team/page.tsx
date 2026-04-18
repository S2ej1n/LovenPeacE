import MemberCard from '@/app/planning-team/_components/MemberCard';
import styles from './page.module.css';
import { MEMBERS } from './_data/members';

export default function PlanningTeam() {
  return (
    <div className={styles.scene}>
      <div className={styles.scrollArea}>
        <p className={styles.heading}>PLANNING TEAM</p>
        <p className={styles.sub}>L♡vE and PeacE의 기획팀을 소개합니다.</p>
        <ul className={styles.list}>
          {MEMBERS.map((member) => (
            <li key={member.name}>
              <MemberCard {...member} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
