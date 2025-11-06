🎬 MovieHub — Admin Panel & AI Chatbot


📎 유튜브 링크
https://youtu.be/AVKieFa0nQY?si=cL048gsrlPEunhGj

Next.js 기반 영화 플랫폼 + 관리자 대시보드 + Gemini AI 영화 추천 챗봇
관리자 페이지를 통해 회원 / FAQ / 공지사항을 관리하고,
사용자 화면에서는 영화 추천 챗봇이 플로팅 UI 형태로 제공됩니다.

🚀 주요 기여 기능 (내가 직접 구현한 파트)
기능	설명
Admin 회원 관리	회원 목록 조회, 검색, 상태 필터, 정보 수정, 신규 회원 추가, 삭제 기능 구현
FAQ 관리 페이지	FAQ 리스트 & 상세보기 Modal 및 수정 기능
공지사항 작성 페이지	제목/내용 작성 + 상단 고정/NEW 표시 + LocalStorage 저장
관리자 UI 디자인 시스템 구축	색상·여백·타이포·버튼·테이블 스타일 토큰 단일 정의
AI 영화 추천 챗봇	Gemini API + 이전 대화 맥락 기반 추천 챗봇 API & 플로팅 UI
🧱 사용 기술 스택
분야	기술
Frontend	Next.js, React Hooks, CSS-in-JS, LocalStorage 상태 관리
Backend / API	Next.js Route Handler API, Google Gemini API
UI/UX	관리자 전용 Design Token System (Color / Spacing / Typography / Components)
📁 프로젝트 구조 (공백/포맷 유지)
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
```

🛠 상세 기능 설명
1) ✅ 회원 관리 (Admin)

이름 / 이메일 / 전화번호 검색

회원 상태 필터 (활성 / 휴면 / 정지)

회원 상세 수정 & 신규 등록

LocalStorage 저장 → 로그인 상태 유지 가능

통계 카드 UI로 회원 현황 시각화

2) 📋 FAQ 관리

FAQ 리스트 테이블 UI

질문 클릭 → Modal 상세 보기

수정 모드 / 읽기 모드 토글

삭제 & 신규 FAQ 추가 가능

3) 📌 공지사항 작성

제목 / 내용 입력

상단 고정, NEW 강조 표시 옵션

LocalStorage 저장 방식 → 데모/시연 환경에서 유용

4) 🎨 관리자 전용 UI 디자인 시스템 (Design Tokens)

색상 / 여백 / 폰트 / 컴포넌트 스타일 중앙 집중 관리

유지보수성 + 통일된 관리자 UI 제공

🤖 AI 영화 추천 챗봇 (Google Gemini 2.0 Flash)
✨ 챗봇 특징
기능	설명
영화 추천	장르 / 계절 / 감성 / 키워드 기반 추천
대화 맥락 유지	최근 10개의 대화 기록을 바탕으로 답변
Fallback 대응	API 실패 시 rule-based 응답 자동 전환
챗봇 UI

화면 우측 하단 플로팅 버튼

부드러운 오픈/클로즈 애니메이션

자동 스크롤, 말풍선 스타일, 입력창 엔터 전송

🎥 추천 예시 시나리오
사용자 질문	챗봇 응답 예시
가을 감성 영화 추천해줘	라라랜드 / 비포 선라이즈 / 인터스텔라 중 상황에 맞춰 감성 설명 포함 추천
왜 그 영화야?	이전 메시지 기억 → 스토리/색감/OST/감정선 근거로 설득력 있게 설명
액션 추천해줘	존윅 / 매드맥스 / 미션임파서블 등 스타일별 추천
💻 실행 방법
npm install
npm run dev

🔑 환경 변수 설정 (.env.local)
GOOGLE_GEMINI_API_KEY=YOUR_API_KEY_HERE

🌱 느낀점 & 설계 의도 (면접 어필용)

화면만 만들어놓는 것이 아닌 데이터 흐름 / 상태 관리 / 유지보수성 중심 설계를 목표로 함

챗봇은 단답 아닌 맥락 기반 감성 추천 경험 제공에 집중

관리자 페이지는 UI 시스템화로 확장 가능성을 고려해 설계

