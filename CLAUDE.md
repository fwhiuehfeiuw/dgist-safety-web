# DGIST 안전보안팀 소개 랜딩페이지

## 프로젝트 개요
DGIST 안전보안팀의 공식 소개 랜딩페이지. 기존 Notion 페이지를 대체하며, 메일 서명 바로가기 용도.
Supabase DB + 관리자 페이지로 동적 콘텐츠 관리. 내부용 사이트 (SEO 불필요).

## 기술 스택
- Next.js 14 (App Router, SSG + ISR)
- Tailwind CSS
- **Framer Motion** (스타트업/테크 느낌 애니메이션)
- Supabase (PostgreSQL, 무료)
- Vercel 배포 (기본 도메인)
- Lucide React (아이콘)
- Pretendard (폰트, CDN)
- cheerio (뉴스 크롤링)
- 라이트모드 전용 (다크모드 미지원)

## 디자인 방향
- DGIST 공식 브랜드 톤: 파란색 계열, 공공기관 신뢰감
- 마스코트: 달구 3종 활용
  - **실험복 달구** (정면): 히어로 섹션 우측 — /public/images/dalgu-lab.png
  - **보안관 달구**: 업무소개 섹션 보안관리 열 — /public/images/dalgu-security.png
  - **인사하는 달구**: 푸터 — /public/images/dalgu-greeting.png
- 톤: 깔끔하고 전문적, 너무 딱딱하지 않게 (달구로 친근감)

### 컬러
```
--primary: #003876        /* DGIST 메인 블루 */
--primary-dark: #002855   /* 헤더, 히어로 */
--primary-light: #E8F0FE  /* 연한 블루 배경 */
--accent: #0066CC         /* 링크, 버튼 */
--dalgu-blue: #5B9BD5     /* 달구 블루 */
--text: #1A1A1A
--text-sub: #666666
--bg-alt: #F5F5F5
--safety-green: #2E8B57
--warning: #E67E22
--danger: #E74C3C
```

### 폰트
Pretendard (한글+영문 통일) — 700/500/400
CDN: https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css

### 애니메이션 (Framer Motion)
- 스타트업/테크 느낌: 패럴랙스 스크롤, 카운터 애니메이션, 마우스 트래킹 효과
- 섹션 진입 시: fade-in + 슬라이드 업
- 카드 호버: lift + shadow
- 히어로: 달구 등장 애니메이션

### 네비게이션
- **데스크탑 헤더**: 6개 메뉴 + 언어토글
  - 바로가기 | 안전정보(뉴스+이슈) | 업무소개 | 제도 | 연락처 | [KO|EN]
- **모바일**: 달구 얼굴 FAB 버튼 (우측 하단 고정)
  - 클릭 시 섹션 이동 메뉴 펼침

### 로딩
- Supabase 데이터 영역: 스켈레톤(placeholder) 표시

## 한/영 토글
- React Context 기반, Header 우측 KO|EN 버튼
- /src/lib/i18n.ts에 translations.ko / translations.en 전체 텍스트
- localStorage로 선택 기억
- 형식적 영문 (주 사용자는 한국어, 영문은 외국인 연구원 참고용)

## 페이지 구성 (원페이지, 12개 섹션)

### 1. 히어로
- 달구(실험복 정면) 우측 배치
- "DGIST Safety & Security Team"
- "매월 4일은 안전점검의 날"
- 풀폭 배너, --primary-dark 배경
- **CTA 버튼 2개**:
  - AI 안전관리 챗봇 (주력 CTA, 강조 스타일): https://notebooklm.google.com/notebook/7deebde8-d58d-434e-b56e-1bdb8eb1d7b0
  - 안전보안관리시스템 (부 CTA): https://safety.dgist.ac.kr/gshm/main/home.do

### 2. 바로가기 (카드 3장)
- DGIST 홈페이지: https://www.dgist.ac.kr
- AI 안전관리 챗봇: https://notebooklm.google.com/notebook/7deebde8-d58d-434e-b56e-1bdb8eb1d7b0
- 안전보안관리시스템: https://safety.dgist.ac.kr/gshm/main/home.do
- 호버 시 lift + shadow, 새 탭

### 3. DGIST 안전 뉴스 (Supabase: safety_news)
- API Route로 dgist.ac.kr 보도자료 크롤링 → Supabase 캐시
- "안전" 키워드 필터, 최신 3~5건
- 크롤링 우선, ISR 24시간 재검증
- 관리자 페이지에서 수동 추가/삭제 가능
- 실패 시 fallback: 보도자료 바로가기 링크

### 4. 연구실 안전이슈 (Supabase: safety_issues + 바로가기)
- 최근 이슈 리스트 (일자|키워드) — 관리자 페이지에서 입력
- **URL이 있는 이슈만 클릭 가능** (없으면 텍스트만)
- labs.go.kr 안전이슈 바로가기 카드 (바로가기 카드와 다른 스타일)
- labs.go.kr 사고사례 바로가기 카드

### 5. 업무 소개 (정적, i18n)
- 3컬럼: 안전관리 / 보건관리 / 보안관리
- 간소화: 영역명 + 핵심 키워드만
  - 안전관리: 연구실안전, 산업안전, 중대재해, 재난관리, 방사선안전
  - 보건관리: 산업보건, 건강관리실
  - 보안관리: 비상대비, 일반보안, 시설보안
- **보안관리 열에 보안관 달구 배치**

### 6. 안전보건경영 (정적, i18n + 이미지)
- 통합 섹션: 안전보건 목표 + ISO 45001 + 경영방침
- 상단: **"2026 안전보건 목표: 중대재해 제로 유지"** 배너
- 하단: 2컬럼 (ISO 45001 인증 / 경영방침 이미지 — 추후 제공, 플레이스홀더)

### 7. 연락처 (Supabase: contacts)
- 7개 분야별 전화/이메일
- **이름 미표시** (분야 + 전화 + 이메일만)
- 반응형 테이블
- 이메일 → mailto:, 전화 → tel:
- 관리자 페이지에서 수정 가능 (연 1~2회)

### 8. 연구실사고 예방 특화 제도 (Supabase: safety_programs)
- 10개 카드 그리드 (5x2)
- **정적 카드 (클릭 동작 없음)**
- 각 카드: 컬러 바(상단) + 제목 + 설명 1~2줄
- 컬러: 보라/파랑/청록/하늘/연보라 교차
- 제도 목록:
  1. 위험물 처리 지원
  2. 연구실안전관리사 자격 취득 지원
  3. 외국인 대상 연구실 안전관리 교육
  4. 사고 실험실 재발방지 특별교육
  5. 실험복 세탁 서비스
  6. 안전보호구 착용 불시점검
  7. 우수연구실 포상
  8. 안전보호구 및 안전장비 지원
  9. 안전 체험학습장
  10. 안전·보건·보안 강조주간

### 9. 소관 규정 (정적, constants)
- 2컬럼: 안전 분야 / 보안 분야
- **텍스트만 (링크/다운로드 없음)**
- 안전: 안전보건관리규정, 방사선안전관리규정, 연구실안전관리지침
- 보안: 보안업무규정, 방첩업무지침, CCTV설치운영지침, 출입통제관리지침

### 10. 강조주간 (Supabase: emphasis_week)
- YouTube 영상 2개 + DGIST DNA 블로그 링크
- **썸네일 카드 (클릭 시 새 탭에서 YouTube 열기)**
- 영상 URL:
  - https://www.youtube.com/watch?v=VMgSbDtpKg4
  - https://www.youtube.com/watch?v=7dAVuQUn31E
- 블로그: https://dgistdna.com/749

### 11. 위치 (정적)
- 주소: 대구광역시 달성군 현풍읍 테크노중앙대로 333 DGIST E1 7층 704호
- Google Maps embed (iframe, API 키 불필요)

### 12. 푸터
- 팀 주소, **대표번호 053-785-1263**, Copyright
- 인사하는 달구 (dalgu-greeting.png)

## 데이터 분류

### 정적 (constants.ts)
- 바로가기 URL 3개
- 소관 규정 (안전3+보안4)
- 업무 소개 키워드
- 위치 정보
- 외부 링크 (labs.go.kr 등)
- 안전보건 목표 문구

### 동적 (Supabase — 5개 테이블)
- safety_news: 뉴스 (크롤링 캐시 + 수동)
- safety_issues: 안전이슈 (수동)
- safety_programs: 특화 제도 10개
- contacts: 연락처 7개
- emphasis_week: 강조주간 영상

## 관리자 페이지 (/admin)
- 비밀번호 보호 (환경변수 ADMIN_PASSWORD)
- **탭 5개**: 안전이슈, 뉴스, 제도, 연락처, 강조주간
- 각 탭에서 CRUD
- 사용자: 1~2명, 수정 로그 불필요
- 수정 즉시 랜딩페이지 반영

## 환경변수
```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
ADMIN_PASSWORD=
```

## 주의사항
- 연락처/이메일 노출 허용 (이름 미표시, 분야+전화+이메일만)
- 뉴스 크롤링 실패 시 반드시 fallback 처리
- 달구 이미지는 /public/images/에 배치 (3종: lab, security, greeting)
- PDF 파일은 /public/docs/에 배치 (사용자가 추후 제공)
- 모바일 반응형 필수 (375px~1440px)
- 라이트모드 전용, SEO 불필요 (내부용)
- 안전보건경영 섹션 이미지는 추후 제공 → 플레이스홀더 사용
