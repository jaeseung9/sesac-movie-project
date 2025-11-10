<div id="top"></div>

<h1 align="center">🎬 MovieHub — Admin Panel & AI Chatbot</h1>

<p align="center">
  Next.js 기반 영화 플랫폼 + <b>관리자 대시보드</b> + <b>Gemini AI 영화 추천 챗봇</b><br/>
  관리자 페이지로 회원/FAQ/공지사항을 관리하고, 사용자 화면에는 플로팅 챗봇을 제공합니다.
</p>

---

## 🗓 개발 기간
**2025.10.20 ~ 2025.10.24**

---

## 📚 Table of Contents
1. [프로젝트 소개](#about)
2. [데모](#demo)
3. [주요 기여 기능](#features)
4. [기술 스택](#stack)
5. [프로젝트 구조](#structure)
6. [상세 기능 설명](#details)
7. [AI 챗봇 특징 & 예시 시나리오](#chatbot)
8. [실행 방법](#run)
9. [환경 변수 (.env.local)](#env)
10. [느낀점 & 설계 의도](#insights)
11. [개선 예정 & 로드맵](#roadmap)
12. [크레딧](#credits)

<a href="#top">⬆ Back to top</a>

---

## 1) 프로젝트 소개 <a id="about"></a>
Next.js로 구축한 **영화 플랫폼**입니다.  
관리자(Admin) 영역에서는 **회원 / FAQ / 공지사항**을 관리하고, 사용자 화면에는 **Gemini 기반 영화 추천 챗봇**을 플로팅 UI로 제공합니다.

<a href="#top">⬆ Back to top</a>

---

## 2) 데모 <a id="demo"></a>
- ▶ **Web Demo (GitHub Pages)**: https://jaeseung9.github.io/sesac-movie-project/video.html  
- 🎥 **YouTube**: https://youtu.be/REPLACE_WITH_YOUTUBE_ID

> GitHub README에서는 보안 정책상 동영상이 직접 재생되지 않을 수 있어, 상단 배지/링크를 통해 시청하도록 구성했습니다.

<a href="#top">⬆ Back to top</a>

---

## 3) 🚀 주요 기여 기능 (내가 직접 구현한 파트) <a id="features"></a>

| 기능 | 설명 |
|---|---|
| **Admin 회원 관리** | 회원 목록 조회, 검색, 상태 필터(활성/휴면/정지), 정보 수정, 신규 회원 추가, 삭제 |
| **FAQ 관리 페이지** | FAQ 리스트 & 상세보기 Modal, 수정/읽기 모드 토글 |
| **공지사항 작성 페이지** | 제목/내용 작성, 상단 고정/NEW 표시, LocalStorage 기반 저장 |
| **관리자 UI 디자인 시스템** | 색상·여백·타이포·버튼·테이블 등 **Design Token** 단일 정의 |
| **AI 영화 추천 챗봇** | **Gemini API** + 최근 대화 맥락 기반 추천, 플로팅 UI |

<a href="#top">⬆ Back to top</a>

---

## 4) 🧱 사용 기술 스택 <a id="stack"></a>

**Frontend**: Next.js, React Hooks, CSS-in-JS, LocalStorage  
**Backend / API**: Next.js Route Handler API, Google Gemini API  
**UI/UX**: 관리자 전용 Design Token System (Color / Spacing / Typography / Components)

<a href="#top">⬆ Back to top</a>

---

## 5) 📁 프로젝트 구조 (공백/포맷 유지) <a id="structure"></a>

```bash
app/
 ├ admin/
 │  ├ _components/
 │  │  └ AdminLayout.js           # 관리자 UI 공통 레이아웃
 │  ├ _lib/style/
 │  │  └ adminTokens.js           # 관리자 전용 Design System
 │  ├ users/
 │  │  └ page.js                  # 회원 관리 (조회/추가/수정/삭제/검색)
 │  ├ fqa/
 │  │  └ page.js                  # FAQ 관리 (리스트/상세/수정/삭제)
 │  └ notice/
 │     └ create/page.js           # 공지사항 작성 페이지
 │
 ├ api/
 │  └ chatbot/
 │     └ route.js                 # Gemini 기반 영화 추천 챗봇 API
 │
 └ components/
    └ Chatbot.js                  # 사용자 화면 플로팅 챗봇 UI
'''
<a href="#top">⬆ Back to top</a>

6) 🛠 상세 기능 설명 <a id="details"></a>
✅ 회원 관리 (Admin)

이름 / 이메일 / 전화번호 검색

회원 상태 필터 (활성 / 휴면 / 정지)

회원 상세 수정 & 신규 등록

LocalStorage 저장으로 데모 환경에서 로그인 상태 유지

통계 카드 UI로 회원 현황 시각화

📋 FAQ 관리

FAQ 리스트 테이블 UI

질문 클릭 → Modal 상세 보기

수정 모드 / 읽기 모드 토글

삭제 & 신규 추가 가능

📌 공지사항 작성

제목 / 내용 입력

상단 고정, NEW 강조 옵션

LocalStorage 저장 (시연용/데모용으로 간편)

🎨 관리자 전용 UI 디자인 시스템 (Design Tokens)

색상 / 여백 / 폰트 / 컴포넌트 스타일 중앙 집중 관리

일관된 스타일과 유지보수성 향상

<a href="#top">⬆ Back to top</a>

7) 🤖 AI 영화 추천 챗봇 (Google Gemini 2.0 Flash) <a id="chatbot"></a>
✨ 챗봇 특징
기능	설명
영화 추천	장르 / 계절 / 감성 / 키워드 기반 추천
대화 맥락 유지	최근 10개 대화 기록 반영
Fallback 대응	API 실패 시 룰 기반 응답으로 자동 전환
UI	화면 우측 하단 플로팅 버튼, 오픈/클로즈 애니메이션, 자동 스크롤, 엔터 전송
🎥 추천 예시 시나리오
사용자 질문	챗봇 응답 예시
가을 감성 영화 추천해줘	라라랜드 / 비포 선라이즈 / 인터스텔라 등 감성/색감/OST 설명 포함 추천
왜 그 영화야?	이전 메시지 맥락 기억 → 스토리/색감/OST/감정선 근거로 설명
액션 추천해줘	존윅 / 매드맥스 / 미션임파서블 등 스타일별 추천

<a href="#top">⬆ Back to top</a>

8) 💻 실행 방법 <a id="run"></a>
# 1) 의존성 설치
npm install

# 2) 개발 서버 실행
npm run dev


기본 포트는 http://localhost:3000 입니다.

<a href="#top">⬆ Back to top</a>

9) 🔑 환경 변수 설정 (.env.local) <a id="env"></a>
GOOGLE_GEMINI_API_KEY=YOUR_API_KEY_HERE


<a href="#top">⬆ Back to top</a>

10) 🌱 느낀점 & 설계 의도 <a id="insights"></a>

화면만 만드는 것이 아니라 데이터 흐름 / 상태 관리 / 유지보수성 중심으로 설계했습니다.

챗봇은 단답이 아닌 맥락 기반의 설득력 있는 추천 경험을 목표로 했습니다.

관리자 페이지는 디자인 토큰을 활용한 시스템화로 확장성을 고려했습니다.

<a href="#top">⬆ Back to top</a>

11) 🧭 개선 예정 & 로드맵 <a id="roadmap"></a>

 LocalStorage 기반 데이터를 Mock API / DB로 전환하여 실제 CRUD 확장

 관리자 통계 대시보드에 차트(막대/선/원형) 추가

 챗봇 대화 히스토리 영구 저장 및 추천 결과 즐겨찾기/공유 기능

 접근성(ARIA) 및 키보드 내비게이션 강화

 배포 스크립트/워크플로우(빌드 → 배포) 자동화

<a href="#top">⬆ Back to top</a>

12) 👏 크레딧 <a id="credits"></a>

Author: 서재승 (Seo Jae Seung)

Email: seojaeseung9@gmail.com

Blog: https://seungcoding.tistory.com/

GitHub: https://github.com/jaeseung9

<a href="#top">⬆ Back to top</a>
