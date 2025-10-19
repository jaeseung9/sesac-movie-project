"use client";

import { useState } from "react";
import AdminLayout from "@/app/admin/_components/AdminLayout";
import {
  adminColors,
  adminSizes,
  adminStyles,
  mergeStyles,
} from "@/app/admin/_lib/style/adminTokens";

/**
 * 관리자 대시보드 메인 페이지
 * - 통계 카드 4개 표시 (공지사항, 회원, 영화, 리뷰)
 * - 공지사항 목록 테이블
 * - 공지사항 추가/수정/삭제 기능
 */
export default function AdminDashboard() {
  // ========================================
  // 상태 관리
  // ========================================

  /**
   * 공지사항 목록 상태
   * - 현재는 더미 데이터 사용
   * - 나중에 API 연결 시 useEffect로 데이터 가져오기
   */
  const [notices, setNotices] = useState([
    {
      id: 3,
      title: "서비스 정규 업데이트",
      date: "2025-10-15",
      views: 245,
      isNew: true,
    },
    {
      id: 2,
      title: "신규 영화 업데이트",
      date: "2025-10-14",
      views: 189,
      isNew: false,
    },
    {
      id: 1,
      title: "긴급 백업 안내",
      date: "2025-10-10",
      views: 512,
      isNew: false,
    },
  ]);

  // ========================================
  // 이벤트 핸들러
  // ========================================

  /**
   * 공지사항 삭제 핸들러
   * @param {number} id - 삭제할 공지사항 ID
   */
  const handleDelete = (id) => {
    if (confirm("정말 삭제하시겠습니까?")) {
      setNotices(notices.filter((notice) => notice.id !== id));
      alert("삭제되었습니다.");
    }
  };

  /**
   * 공지사항 수정 버튼 클릭 핸들러
   * @param {number} id - 수정할 공지사항 ID
   */
  const handleEdit = (id) => {
    alert("수정 페이지로 이동합니다.");
    // TODO: window.location.href = `/admin/notice/edit/${id}`;
  };

  /**
   * 새 공지사항 작성 버튼 클릭 핸들러
   */
  const handleAdd = () => {
    window.location.href = "/admin/notice/create";
  };

  // ========================================
  // 정적 데이터
  // ========================================

  /**
   * 대시보드 통계 카드 데이터
   */
  const stats = [
    {
      icon: "📢",
      label: "총 공지사항",
      value: "3",
      color: adminColors.statRed,
      bg: adminColors.statRedBg,
    },
    {
      icon: "👥",
      label: "전체 회원",
      value: "1,247",
      color: adminColors.statBlue,
      bg: adminColors.statBlueBg,
    },
    {
      icon: "🎬",
      label: "등록 영화",
      value: "8,532",
      color: adminColors.statYellow,
      bg: adminColors.statYellowBg,
    },
    {
      icon: "⭐",
      label: "리뷰 수",
      value: "15,438",
      color: adminColors.statGreen,
      bg: adminColors.statGreenBg,
    },
  ];

  return (
    <AdminLayout title="대시보드" currentMenu="dashboard">
      {/* ========================================
          통계 카드 그리드
          ======================================== */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: adminSizes.spacing.xl,
          marginBottom: adminSizes.spacing.xxl,
        }}
      >
        {stats.map((stat, index) => (
          <div
            key={index}
            style={mergeStyles(
              adminStyles.card.base,
              adminStyles.card.statCard
            )}
          >
            {/* 카드 상단: 아이콘 + 라벨 */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: adminSizes.spacing.md,
                marginBottom: adminSizes.spacing.lg,
              }}
            >
              {/* 아이콘 */}
              <div
                style={mergeStyles(adminStyles.card.statIcon, {
                  background: stat.bg,
                  color: stat.color,
                })}
              >
                {stat.icon}
              </div>
              {/* 라벨 */}
              <div
                style={{
                  fontSize: "14px",
                  color: adminColors.textTertiary,
                  fontWeight: 500,
                }}
              >
                {stat.label}
              </div>
            </div>
            {/* 수치 */}
            <div style={adminStyles.card.statValue}>{stat.value}</div>
          </div>
        ))}
      </div>

      {/* ========================================
          공지사항 관리 섹션
          ======================================== */}
      <section style={adminStyles.card.base}>
        {/* 섹션 헤더 */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: `20px ${adminSizes.spacing.xl}`,
            borderBottom: `1px solid ${adminColors.border}`,
          }}
        >
          <h2
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              fontSize: "18px",
              fontWeight: 700,
              color: adminColors.textPrimary,
              margin: 0,
            }}
          >
            <span>📢</span>
            공지사항 관리
          </h2>
          <button
            onClick={handleAdd}
            style={mergeStyles(
              adminStyles.button.base,
              adminStyles.button.primary
            )}
          >
            <span>+</span>
            <span>새 공지사항 작성</span>
          </button>
        </div>

        {/* 테이블 */}
        <div style={adminStyles.table.container}>
          <table style={adminStyles.table.table}>
            <thead style={adminStyles.table.thead}>
              <tr>
                <th style={{ ...adminStyles.table.th, width: "80px" }}>번호</th>
                <th style={adminStyles.table.th}>제목</th>
                <th style={{ ...adminStyles.table.th, width: "150px" }}>
                  등록일
                </th>
                <th style={{ ...adminStyles.table.th, width: "100px" }}>
                  조회수
                </th>
                <th style={{ ...adminStyles.table.th, width: "200px" }}>
                  관리
                </th>
              </tr>
            </thead>
            <tbody>
              {notices.map((notice) => (
                <tr key={notice.id}>
                  <td style={adminStyles.table.td}>{notice.id}</td>
                  <td style={adminStyles.table.td}>
                    <div
                      style={{
                        fontWeight: 600,
                        color: adminColors.textPrimary,
                      }}
                    >
                      {notice.title}
                      {notice.isNew && (
                        <span
                          style={mergeStyles(
                            adminStyles.badge.base,
                            adminStyles.badge.error,
                            { marginLeft: "8px" }
                          )}
                        >
                          NEW
                        </span>
                      )}
                    </div>
                  </td>
                  <td
                    style={{
                      ...adminStyles.table.td,
                      color: adminColors.textTertiary,
                    }}
                  >
                    {notice.date}
                  </td>
                  <td style={{ ...adminStyles.table.td, fontWeight: 500 }}>
                    {notice.views}
                  </td>
                  <td style={adminStyles.table.td}>
                    <div style={{ display: "flex", gap: "8px" }}>
                      <button
                        onClick={() => handleEdit(notice.id)}
                        style={mergeStyles(
                          adminStyles.button.base,
                          adminStyles.button.small,
                          adminStyles.button.info
                        )}
                      >
                        수정
                      </button>
                      <button
                        onClick={() => handleDelete(notice.id)}
                        style={mergeStyles(
                          adminStyles.button.base,
                          adminStyles.button.small,
                          adminStyles.button.error
                        )}
                      >
                        삭제
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </AdminLayout>
  );
}
