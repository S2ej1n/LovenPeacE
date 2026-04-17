'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import styles from './FormSection.module.css';
import PrivacyModal from './PrivacyModal';

const schema = z.object({
  teamName: z.string().min(1, '팀명을 입력해주세요'),
  leader: z.string().min(1, '팀 대표자 이름을 입력해주세요'),
  contact: z
    .string()
    .min(1, '연락처를 입력해주세요')
    .regex(/^010-?\d{4}-?\d{4}$/, '올바른 연락처를 입력해주세요'),
  members: z.string().min(1, '팀원을 입력해주세요'),
  genre: z.string().min(1, '예상 곡 장르 또는 가수를 입력해주세요. 팀원들의 선호 장르를 입력해도 괜찮습니다.'),
  privacy: z.literal(true, {
    error: '개인정보 및 초상권 사용에 동의해주세요',
  }),
});

type FormValues = z.infer<typeof schema>;

export default function FormSection() {
  const [submitted, setSubmitted] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { privacy: undefined },
  });

  const onSubmit = async (data: FormValues) => {
    // TODO: 실제 제출 처리
    console.log(data);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className={styles.container}>
        <div className={styles.card}>
          <div className={styles.successWrap}>
            <span className={styles.successIcon}>♥</span>
            <h2 className={styles.title}>신청이 완료되었어요</h2>
            <p className={styles.subtitle}>Love and Peace와 함께해줘서 고마워요</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className={styles.container}>
        <div className={styles.card}>
          <h2 className={styles.title}>공연 신청하기</h2>
          <p className={styles.subtitle}>Love and Peace와 함께해요</p>

          <form className={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
            {/* 팀명 */}
            <div className={styles.field}>
              <label className={styles.label}>팀명</label>
              <input
                className={`${styles.input} ${errors.teamName ? styles.inputError : ''}`}
                type="text"
                placeholder="팀명은 추후 변경 가능합니다."
                {...register('teamName')}
              />
              {errors.teamName && <span className={styles.error}>{errors.teamName.message}</span>}
            </div>

            {/* 팀 대표 / 연락처 */}
            <div className={styles.row}>
              <div className={styles.field}>
                <label className={styles.label}>팀 대표</label>
                <input
                  className={`${styles.input} ${errors.leader ? styles.inputError : ''}`}
                  type="text"
                  placeholder="대표자 이름"
                  {...register('leader')}
                />
                {errors.leader && <span className={styles.error}>{errors.leader.message}</span>}
              </div>
              <div className={styles.field}>
                <label className={styles.label}>대표자 연락처</label>
                <input
                  className={`${styles.input} ${errors.contact ? styles.inputError : ''}`}
                  type="tel"
                  placeholder="010-0000-0000"
                  {...register('contact')}
                />
                {errors.contact && <span className={styles.error}>{errors.contact.message}</span>}
              </div>
            </div>

            {/* 팀원 */}
            <div className={styles.field}>
              <label className={styles.label}>팀원</label>
              <input
                className={`${styles.input} ${errors.members ? styles.inputError : ''}`}
                type="text"
                placeholder="예: 명수진(V) 강세진(B) 김이레(G) 고보민(G) 최지훈(D)"
                {...register('members')}
              />
              {errors.members && <span className={styles.error}>{errors.members.message}</span>}
            </div>

            {/* 예상 곡 장르 or 가수 */}
            <div className={styles.field}>
              <label className={styles.label}>예상 곡 장르 / 가수</label>
              <input
                className={`${styles.input} ${errors.genre ? styles.inputError : ''}`}
                type="text"
                placeholder="예: 인디, 메탈, JPOP 등"
                {...register('genre')}
              />
              {errors.genre && <span className={styles.error}>{errors.genre.message}</span>}
            </div>

            {/* 개인정보 동의 */}
            <div className={styles.privacyWrap}>
              <div className={styles.privacyRow}>
                <label className={styles.privacyLabel}>
                  <input
                    className={styles.checkbox}
                    type="checkbox"
                    {...register('privacy')}
                  />
                  <span className={styles.privacyText}>
                    개인정보 수집·이용 및 초상권 사용에 동의합니다
                  </span>
                </label>
                <button
                  type="button"
                  className={styles.privacyDetailBtn}
                  onClick={() => setShowPrivacy(true)}
                >
                  자세히 보기
                </button>
              </div>
              {errors.privacy && <span className={styles.error}>{errors.privacy.message}</span>}
            </div>

            <button
              className={styles.submitBtn}
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? '신청 중...' : '신청하기 ♥'}
            </button>
          </form>
        </div>
      </div>

      {showPrivacy && <PrivacyModal onClose={() => setShowPrivacy(false)} />}
    </>
  );
}
