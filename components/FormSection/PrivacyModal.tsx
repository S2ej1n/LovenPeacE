'use client';

import styles from './PrivacyModal.module.css';

interface PrivacyModalProps {
  onClose: () => void;
}

export default function PrivacyModal({ onClose }: PrivacyModalProps) {
  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.sheet} onClick={(e) => e.stopPropagation()}>
        <div className={styles.handle} />
        <h3 className={styles.title}>촬영 및 초상권·저작물 이용 동의</h3>
        <div className={styles.body}>
          <p>
            본인은 <strong>2026년 7월 10일</strong> 진행되는 공연과 관련하여,
            공연 중 촬영되는 사진 및 영상(이하 "촬영물")에 본인의 모습이 포함될 수 있음을
            인지하고 이에 동의합니다.
          </p>
          <p>또한 본인은 아래 사항에 대해 동의합니다.</p>
          <ul>
            <li>
              촬영물은 공연 주최 측의 홍보(SNS, 인스타그램 등), 기록(아카이빙),
              마케팅 자료로 활용될 수 있습니다.
            </li>
            <li>
              촬영자는 촬영물을 본인의 포트폴리오, 전시, SNS 등에 사용할 수 있습니다.
            </li>
            <li>
              촬영물은 편집, 보정, 일부 수정(자막, 크롭 등)이 이루어질 수 있습니다.
            </li>
            <li>
              촬영물의 사용 기간 및 횟수에 제한을 두지 않으며, 별도의 보상은 제공되지 않습니다.
            </li>
            <li>
              본 동의는 철회 요청이 없는 한 지속됩니다.
              (단, 이미 배포된 콘텐츠의 경우 삭제가 어려울 수 있음에 동의합니다.)
            </li>
          </ul>
          <p>
            본인은 위 내용을 충분히 이해하였으며, 초상권 및 저작물 이용에 대해 이의를
            제기하지 않습니다.
          </p>
          <p className={styles.note}>
            ※ 촬영 및 활용을 원치 않을 경우 사전 문의 바랍니다. <br/>
            문의 : Instagram @project_lovenpeace
          </p>
        </div>
        <button className={styles.closeBtn} onClick={onClose}>
          닫기
        </button>
      </div>
    </div>
  );
}
