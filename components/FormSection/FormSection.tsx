'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import styles from './FormSection.module.css';
import PrivacyModal from './PrivacyModal';
import FormField from './FormField';

const schema = z.object({
  teamName: z.string().min(1, '팀명을 입력해주세요'),
  leader: z.string().min(1, '팀 대표자 이름을 입력해주세요'),
  phone: z
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
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/applications`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    console.log(data);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className={styles.container}>
        <div className={styles.card}>
          <div className={styles.successWrap}>
            <h2 className={styles.title}>신청이 완료되었습니다</h2>
            <p className={styles.subtitle}>
              L♡vE and PeacE에 관심을 가지고 참여해주셔서 감사합니다.
              <br />
              <br />
              선정 공연팀에게는 추후 개별 안내가 갈 예정입니다.
              <br />
              문의사항은 Instagram @project_lovenpeace로 연락 바랍니다.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className={styles.container}>
        <div className={styles.card}>
          <h2 className={styles.title}>공연팀 참가 신청</h2>
          <p className={styles.subtitle}>L♡vE and PeacE 공연팀은 선착순으로 모집됩니다.</p>

          <form className={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
            <FormField
              label="팀명"
              placeholder="팀명은 추후 변경 가능합니다."
              error={errors.teamName}
              registration={register('teamName')}
            />

            <div className={styles.row}>
              <FormField
                label="팀 대표"
                placeholder="대표자 이름"
                error={errors.leader}
                registration={register('leader')}
              />
              <FormField
                label="대표자 연락처"
                type="tel"
                placeholder="010-0000-0000"
                error={errors.phone}
                registration={register('phone')}
              />
            </div>

            <FormField
              label="팀원"
              placeholder="예: 명수진(V) 강세진(B) 김이레(G) 고보민(G) 최지훈(D)"
              error={errors.members}
              registration={register('members')}
            />

            <FormField
              label="예상 곡 장르 / 가수"
              placeholder="예: 인디, 메탈, JPOP 등"
              error={errors.genre}
              registration={register('genre')}
            />

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
              {isSubmitting ? '신청 중...' : '아직 신청기간이 아닙니다.'}
            </button>
          </form>
        </div>
      </div>

      {showPrivacy && <PrivacyModal onClose={() => setShowPrivacy(false)} />}
    </>
  );
}
