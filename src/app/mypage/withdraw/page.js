'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

// 탈퇴 사유 목록
const REASONS = [
  '추천 결과가 마음에 들지 않음',
  '사용이 불편함',
  '더 이상 사용할 일이 없음',
];

export default function WithdrawPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('loggedInUser'));
    console.log(data);
    setUser(data);

    // 로그인하지 않은 경우 로그인 페이지로 리다이렉트
    if (!data) {
      alert('로그인이 필요합니다.');
      router.push('/login');
    }
  }, [router]);

  // 1. 상태 관리
  const [selectedReasons, setSelectedReasons] = useState([]);
  const [otherReason, setOtherReason] = useState('');
  const [password, setPassword] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);

  // 2. 유효성 검사 (버튼 활성화)
  useEffect(() => {
    // 비밀번호가 입력되었는지 확인
    const isPwdEntered = password.length > 0;

    // 사유가 선택되었는지 (체크박스 또는 기타 필드) 확인
    const isReasonSelected =
      selectedReasons.length > 0 || otherReason.trim().length > 0;

    // 모든 조건 만족 시 버튼 활성화
    setIsFormValid(isPwdEntered && isReasonSelected);
  }, [selectedReasons, otherReason, password]);

  // 3. 핸들러
  const handleCheckboxChange = (reason) => {
    setSelectedReasons((prev) =>
      prev.includes(reason)
        ? prev.filter((r) => r !== reason)
        : [...prev, reason]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isFormValid) {
      alert('탈퇴 사유(최소 1개)와 비밀번호를 입력해 주세요.');
      return;
    }

    // 로그인된 사용자가 없으면 중단
    if (!user) {
      alert('로그인 정보를 찾을 수 없습니다.');
      router.push('/login');
      return;
    }

    // 1️⃣ 비밀번호 검증
    if (password !== user.password) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    const finalReasons = selectedReasons.slice();
    if (otherReason.trim()) {
      finalReasons.push(`(기타 사유): ${otherReason.trim()}`);
    }

    try {
      // 2️⃣ members 목록에서 해당 사용자 삭제
      const membersData = localStorage.getItem('members');
      if (membersData) {
        const members = JSON.parse(membersData);
        // 이메일로 회원 찾아서 삭제
        const updatedMembers = members.filter(
          (member) => member.email !== user.email
        );
        localStorage.setItem('members', JSON.stringify(updatedMembers));
        console.log('회원 데이터 삭제 완료:', user.email);
      }

      // 3️⃣ 로그아웃 처리 (로그인 정보 삭제)
      localStorage.removeItem('loggedInUser');
      localStorage.removeItem('loggedInAdmin');

      // 4️⃣ 탈퇴 로그 기록 (선택사항)
      console.log('Withdrawal completed. Reasons:', finalReasons);

      // 5️⃣ 사용자에게 알림
      alert('회원 탈퇴가 완료되었습니다. 이용해주셔서 감사합니다.');

      // 6️⃣ 메인 페이지로 이동 (브라우저 히스토리 초기화)
      window.location.href = '/';
    } catch (error) {
      console.error('탈퇴 처리 중 오류 발생:', error);
      alert('탈퇴 처리 중 오류가 발생했습니다. 다시 시도해주세요.');
    }
  };

  const handleBack = () => {
    router.back(); // 이전 페이지(마이페이지)로 돌아가기
  };

  // 로딩 중이거나 사용자 정보가 없으면 아무것도 렌더링하지 않음
  if (!user) {
    return null;
  }

  // 4. 렌더링
  return (
    <div style={styles.container}>
      <div style={styles.overlay}></div>

      <div style={styles.content}>
        <h1 style={styles.title}>😥 회원 탈퇴</h1>
        <p style={styles.description}>
          탈퇴 시 모든 정보가 삭제되며 복구할 수 없습니다.
        </p>

        <div style={styles.userInfo}>
          <p style={styles.userInfoText}>
            <strong>{user.name}</strong>님 ({user.email})
          </p>
        </div>

        <div style={styles.formWrapper}>
          <h3 style={styles.sectionTitle}>탈퇴 사유를 선택해주세요</h3>

          {/* 체크박스 목록 */}
          <div style={styles.checkboxList}>
            {REASONS.map((reason) => (
              <div key={reason} style={styles.checkboxContainer}>
                <label style={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    checked={selectedReasons.includes(reason)}
                    onChange={() => handleCheckboxChange(reason)}
                    style={styles.checkboxInput}
                  />
                  <span style={styles.checkboxText}>{reason}</span>
                </label>
              </div>
            ))}
          </div>

          {/* 기타 사유 및 비밀번호 */}
          <h3 style={styles.sectionTitle}>기타 사유</h3>
          <div style={styles.formGroup}>
            <input
              type="text"
              value={otherReason}
              onChange={(e) => setOtherReason(e.target.value)}
              style={styles.input}
              placeholder="탈퇴 사유를 입력해주세요"
            />
          </div>

          <h3 style={styles.sectionTitle}>비밀번호 확인 *</h3>
          <div style={styles.formGroup}>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
              placeholder="현재 비밀번호를 입력해주세요"
            />
          </div>

          <div style={styles.warningBox}>
            <p style={styles.warningText}>
              ⚠️ 탈퇴 후에는 계정 복구가 불가능합니다.
            </p>
            <p style={styles.warningText}>⚠️ 모든 데이터가 즉시 삭제됩니다.</p>
          </div>

          <div style={styles.actions}>
            <button
              type="button"
              style={isFormValid ? styles.buttonPrimary : styles.buttonDisabled}
              disabled={!isFormValid}
              onClick={handleSubmit}
            >
              탈퇴하기
            </button>
            <button
              type="button"
              style={styles.buttonBack}
              onClick={handleBack}
            >
              ← 뒤로
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* --- 스타일 정의 --- */
const styles = {
  // 1. 컨테이너 스타일
  container: {
    minHeight: '100vh',
    color: 'white',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    background:
      'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '50px 20px',
    position: 'relative',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background:
      'radial-gradient(circle at top right, rgba(102, 126, 234, 0.1), transparent 50%), radial-gradient(circle at bottom left, rgba(118, 75, 162, 0.1), transparent 50%)',
    zIndex: 1,
  },
  // 2. 콘텐츠 스타일
  content: {
    maxWidth: '650px',
    width: '100%',
    padding: '50px',
    textAlign: 'center',
    background: 'rgba(255, 255, 255, 0.05)',
    backdropFilter: 'blur(20px)',
    borderRadius: '20px',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    zIndex: 2,
    position: 'relative',
  },
  title: {
    fontSize: '32px',
    marginBottom: '15px',
    fontWeight: '700',
    background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  },
  description: {
    fontSize: '14px',
    color: 'rgba(255, 255, 255, 0.6)',
    marginBottom: '20px',
    fontWeight: '500',
  },
  userInfo: {
    background: 'rgba(255, 255, 255, 0.08)',
    borderRadius: '12px',
    padding: '16px',
    marginBottom: '30px',
    border: '1px solid rgba(255, 255, 255, 0.15)',
  },
  userInfoText: {
    margin: 0,
    fontSize: '15px',
    color: 'rgba(255, 255, 255, 0.9)',
  },
  formWrapper: {
    textAlign: 'left',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  sectionTitle: {
    fontSize: '16px',
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: '12px',
    fontWeight: '600',
  },
  checkboxList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    marginBottom: '10px',
  },
  checkboxContainer: {
    background: 'rgba(255, 255, 255, 0.05)',
    borderRadius: '12px',
    padding: '16px 20px',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    transition: 'all 0.2s ease',
    cursor: 'pointer',
  },
  checkboxLabel: {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    fontSize: '15px',
    color: 'rgba(255, 255, 255, 0.9)',
  },
  checkboxInput: {
    marginRight: '15px',
    width: '20px',
    height: '20px',
    cursor: 'pointer',
    accentColor: '#f5576c',
  },
  checkboxText: {
    fontWeight: '500',
  },
  formGroup: {
    marginBottom: '10px',
  },
  input: {
    width: '100%',
    padding: '14px 18px',
    background: 'rgba(255, 255, 255, 0.08)',
    border: '1px solid rgba(255, 255, 255, 0.15)',
    color: 'white',
    borderRadius: '12px',
    fontSize: '15px',
    boxSizing: 'border-box',
    transition: 'all 0.3s ease',
    outline: 'none',
  },
  warningBox: {
    background: 'rgba(245, 87, 108, 0.1)',
    border: '1px solid rgba(245, 87, 108, 0.3)',
    borderRadius: '12px',
    padding: '16px',
    marginTop: '10px',
  },
  warningText: {
    margin: '4px 0',
    fontSize: '13px',
    color: 'rgba(255, 255, 255, 0.8)',
    fontWeight: '500',
  },
  actions: {
    display: 'flex',
    justifyContent: 'flex-start',
    gap: '12px',
    marginTop: '30px',
    paddingTop: '30px',
    borderTop: '1px solid rgba(255, 255, 255, 0.1)',
  },
  buttonPrimary: {
    background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    color: 'white',
    border: 'none',
    padding: '14px 32px',
    fontSize: '15px',
    cursor: 'pointer',
    borderRadius: '25px',
    fontWeight: '600',
    transition: 'all 0.3s ease',
    flexGrow: 1,
    maxWidth: '200px',
    boxShadow: '0 4px 15px rgba(245, 87, 108, 0.4)',
  },
  buttonDisabled: {
    background: 'rgba(255, 255, 255, 0.1)',
    color: 'rgba(255, 255, 255, 0.4)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    padding: '14px 32px',
    fontSize: '15px',
    cursor: 'not-allowed',
    borderRadius: '25px',
    fontWeight: '600',
    flexGrow: 1,
    maxWidth: '200px',
  },
  buttonBack: {
    background: 'rgba(255, 255, 255, 0.1)',
    color: 'white',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    padding: '14px 32px',
    fontSize: '15px',
    cursor: 'pointer',
    borderRadius: '25px',
    fontWeight: '600',
    transition: 'all 0.3s ease',
    flexGrow: 1,
    maxWidth: '200px',
  },
};
