# DGIST 안전보안팀 소개 랜딩페이지 — 통합 설계서

> Claude Code 구현 참조용
> 2026-03-25 | v8.0 FINAL (인터뷰 반영)

---

## 1. 작업 컨텍스트

### 1.1 목적
Notion 소개 페이지 → DGIST 브랜드 랜딩페이지 재구성.
메일 서명 바로가기 → 이 사이트 → 전체 정보 + 외부 서비스.

### 1.2 범위
- 원페이지 랜딩 (섹션 스크롤), 노션 대체
- 한/영 완전 분리 토글 (형식적 영문 — 외국인 연구원 참고용)
- DGIST 안전 뉴스 자동 크롤링 (ISR 24시간)
- 달구 마스코트 3종 (실험복/보안관/인사)
- **Supabase DB + 관리자 페이지** (동적 콘텐츠 웹 관리)
- Vercel 배포 (기본 도메인), 반응형
- Framer Motion 애니메이션 (스타트업/테크 느낌)
- 라이트모드 전용 (다크모드 미지원)
- 내부용 사이트 (SEO 불필요)

### 1.3 입출력

| 입력 | 출력 |
|------|------|
| Notion 콘텐츠 | Vercel 배포 URL |
| 달구 이미지 3종 | 관리자 페이지 (/admin) |
| 바로가기 URL, 연락처 | |

### 1.4 제약조건
- DGIST 브랜드 (#003876 파란색)
- 챗봇(NotebookLM) / 관리시스템 = 외부 링크
- 안전이슈(labs.go.kr) = 바로가기
- 뉴스 크롤링 실패 시 → fallback
- 연락처 노출 허용 (이름 미표시, 분야+전화+이메일만)

---

## 2. 데이터 분류: 정적 vs 동적

| 구분 | 저장소 | 관리 방식 | 해당 데이터 |
|------|--------|----------|-----------|
| **정적** | constants.ts | 코드 수정 (거의 안 바뀜) | 바로가기 URL, 소관규정 7개, 업무소개, 법령 링크, 위치, 안전보건 목표 |
| **동적** | Supabase | 관리자 페이지에서 수정 | 안전이슈, 뉴스, 특화제도, 연락처, 강조주간 |

---

## 3. Supabase 테이블 설계

### 3.1 `safety_news` (DGIST 안전 뉴스 — 크롤링 캐시)

| 컬럼 | 타입 | 설명 |
|------|------|------|
| id | uuid (PK) | |
| title | text | 기사 제목 |
| url | text | 원문 링크 |
| date | date | 게시일 |
| source | text | 출처 (dgist.ac.kr) |
| is_auto | boolean | 크롤링 자동 수집 여부 |
| created_at | timestamp | |

### 3.2 `safety_issues` (연구실 안전이슈 — 수동 입력)

| 컬럼 | 타입 | 설명 |
|------|------|------|
| id | uuid (PK) | |
| date | date | 이슈 일자 |
| keyword_ko | text | 이슈 키워드 (한글) |
| keyword_en | text | 이슈 키워드 (영문) |
| url | text | 원문 링크 (선택 — URL 있는 것만 클릭 가능) |
| is_active | boolean | 표시 여부 |
| created_at | timestamp | |

### 3.3 `safety_programs` (특화 제도 10개)

| 컬럼 | 타입 | 설명 |
|------|------|------|
| id | uuid (PK) | |
| title_ko | text | 제도명 (한글) |
| title_en | text | 제도명 (영문) |
| desc_ko | text | 설명 (한글) |
| desc_en | text | 설명 (영문) |
| color | text | 카드 상단 색상 (hex) |
| sort_order | int | 표시 순서 |
| created_at | timestamp | |

### 3.4 `contacts` (연락처)

| 컬럼 | 타입 | 설명 |
|------|------|------|
| id | uuid (PK) | |
| field_ko | text | 분야명 (한글) |
| field_en | text | 분야명 (영문) |
| phone | text | 전화번호 |
| email | text | 이메일 |
| sort_order | int | |
| created_at | timestamp | |

### 3.5 `emphasis_week` (강조주간)

| 컬럼 | 타입 | 설명 |
|------|------|------|
| id | uuid (PK) | |
| title_ko | text | 제목 (한글) |
| title_en | text | 제목 (영문) |
| youtube_url | text | YouTube URL |
| blog_url | text | 블로그 URL (선택) |
| year | int | 연도 |
| created_at | timestamp | |

---

## 4. 관리자 페이지 (`/admin`)

### 4.1 접근 방식
- URL: `/admin`
- 비밀번호 보호 (환경변수 ADMIN_PASSWORD)
- 로그인 후 세션 유지 (sessionStorage)
- 사용자: 1~2명, 수정 로그 불필요

### 4.2 관리 가능 항목

| 탭 | 기능 | CRUD |
|----|------|------|
| **안전이슈** | 이슈 키워드 추가/수정/삭제, 표시 on/off | 전체 |
| **안전 뉴스** | 크롤링 결과 확인, 수동 추가/삭제 | 전체 |
| **특화 제도** | 10개 제도 내용 수정 | 수정만 |
| **연락처** | 전화번호/이메일 수정 (연 1~2회) | 수정만 |
| **강조주간** | 영상 URL 추가/수정 | 전체 |

### 4.3 관리자 UI

```
┌─────────────────────────────────────┐
│ 🔐 DGIST 안전보안팀 관리자           │
├─────────────────────────────────────┤
│ [안전이슈] [뉴스] [제도] [연락처] [강조주간] │
├─────────────────────────────────────┤
│                                     │
│  ┌───────────────────────────────┐  │
│  │ 안전이슈 관리                  │  │
│  │ + 이슈 추가                   │  │
│  │                               │  │
│  │ ☑ 2026-03-15 | 화학물질 누출   │ [수정] [삭제] │
│  │ ☑ 2026-02-20 | 전기 안전사고   │ [수정] [삭제] │
│  └───────────────────────────────┘  │
│                                     │
└─────────────────────────────────────┘
```

---

## 5. 워크플로우

```
[1] 초기화 → Next.js 14 + Tailwind + Framer Motion + CLAUDE.md
[2] Supabase 세팅 → 테이블 5개 생성 + 초기 데이터 시딩 (MCP)
[3] 디자인 시스템 → 컬러/폰트/달구 3종/공통 컴포넌트
[4] i18n → 한/영 번역 + 토글
[5] 랜딩 섹션 구현 → 12개 섹션 (Supabase에서 데이터 fetch)
[6] 뉴스 크롤링 → API Route + Supabase 캐시 (ISR 24시간)
[7] 관리자 페이지 → /admin + 비밀번호 + CRUD (5탭)
[8] 반응형 & Framer Motion 애니메이션
[9] 배포 → GitHub → Vercel (환경변수 설정)
```

### 검증

| 단계 | 성공 기준 | 실패 시 |
|------|----------|--------|
| 초기화 | localhost 접속 | 재시도 |
| Supabase | 테이블 생성, 시드 완료 | 에스컬레이션 |
| 섹션 | Supabase 데이터 표시 + 스켈레톤 로딩 | 재시도 |
| 크롤링 | 뉴스 표시 | fallback |
| 관리자 | 로그인 → CRUD 동작 | 재시도 |
| 배포 | HTTP 200, 환경변수 정상 | 에스컬레이션 |

---

## 6. 폴더 구조

```
/dgist-safety-landing
├── CLAUDE.md
├── /.claude/skills/
│   └── content-builder/SKILL.md
├── /src
│   ├── /app
│   │   ├── layout.tsx
│   │   ├── page.tsx                     # 랜딩 (원페이지)
│   │   ├── globals.css
│   │   ├── /admin                       # ★ 관리자 페이지
│   │   │   ├── page.tsx                 # 로그인
│   │   │   ├── /dashboard
│   │   │   │   └── page.tsx             # 관리 대시보드
│   │   │   └── layout.tsx               # 관리자 레이아웃
│   │   └── /api
│   │       ├── /news/route.ts           # 뉴스 크롤링
│   │       ├── /auth/route.ts           # 관리자 인증
│   │       └── /admin                   # 관리자 CRUD API
│   │           ├── /issues/route.ts
│   │           ├── /news/route.ts
│   │           ├── /programs/route.ts
│   │           ├── /contacts/route.ts
│   │           └── /emphasis/route.ts
│   ├── /components
│   │   ├── /layout
│   │   │   ├── Header.tsx               # 데스크탑 네비 (6개 메뉴)
│   │   │   ├── Footer.tsx
│   │   │   ├── SectionWrapper.tsx       # Framer Motion 래퍼
│   │   │   ├── LanguageToggle.tsx
│   │   │   └── MobileFAB.tsx            # ★ 달구 FAB (모바일 네비)
│   │   ├── /sections
│   │   │   ├── HeroSection.tsx          # CTA 2개 포함
│   │   │   ├── QuickLinksSection.tsx
│   │   │   ├── SafetyNews.tsx
│   │   │   ├── SafetyIssues.tsx
│   │   │   ├── TeamOverview.tsx         # 보안관 달구 포함
│   │   │   ├── SafetyManagement.tsx
│   │   │   ├── ContactSection.tsx
│   │   │   ├── SafetyPrograms.tsx       # 정적 카드 (클릭 없음)
│   │   │   ├── Regulations.tsx          # 텍스트만 (링크 없음)
│   │   │   ├── EmphasisWeek.tsx         # 썸네일 + 새 탭
│   │   │   └── LocationSection.tsx
│   │   ├── /admin                       # ★ 관리자 컴포넌트
│   │   │   ├── IssuesManager.tsx
│   │   │   ├── NewsManager.tsx
│   │   │   ├── ProgramsManager.tsx
│   │   │   ├── ContactsManager.tsx
│   │   │   └── EmphasisManager.tsx
│   │   └── /ui
│   │       ├── Skeleton.tsx             # ★ 스켈레톤 로딩
│   │       ├── Modal.tsx
│   │       └── DataTable.tsx
│   ├── /lib
│   │   ├── constants.ts                 # 정적 데이터만
│   │   ├── i18n.ts                      # 한/영 번역
│   │   └── supabase.ts                  # ★ Supabase 클라이언트
│   └── /hooks
│       ├── useLanguage.ts
│       └── useAuth.ts                   # ★ 관리자 인증
├── /public
│   ├── /images
│   │   ├── dalgu-lab.png                # 실험복 달구 (히어로)
│   │   ├── dalgu-security.png           # 보안관 달구 (업무소개)
│   │   ├── dalgu-greeting.png           # 인사하는 달구 (푸터)
│   │   └── dgist-logo.png
│   └── /docs/
├── /supabase
│   └── seed.sql                         # ★ 초기 데이터 시딩
├── next.config.mjs
├── tailwind.config.ts
└── package.json
```

---

## 7. 디자인

### 7.1 컬러
```
--primary: #003876  --primary-dark: #002855  --primary-light: #E8F0FE
--accent: #0066CC   --dalgu-blue: #5B9BD5
--text: #1A1A1A     --text-sub: #666666      --bg-alt: #F5F5F5
--safety-green: #2E8B57  --warning: #E67E22  --danger: #E74C3C
```

### 7.2 폰트
Pretendard 700/500/400

### 7.3 마스코트 (3종)
- **실험복 달구** (정면): 히어로 섹션 우측
- **보안관 달구**: 업무소개 섹션 보안관리 열
- **인사하는 달구**: 푸터

### 7.4 애니메이션 (Framer Motion)
- **스타트업/테크 느낌**: 패럴랙스 스크롤, 카운터 애니메이션, 마우스 트래킹 효과
- 섹션 진입 시: 부드러운 fade-in + 살짝 슬라이드 업
- 카드 호버: lift + shadow 트랜지션
- 히어로: 달구 등장 애니메이션, 타이핑 효과 (선택)
- 스크롤 기반 리비링 (Intersection Observer + Framer Motion)

### 7.5 네비게이션

**데스크탑 헤더** (6개 메뉴 + 언어토글):
```
[DGIST 로고] 바로가기 | 안전정보 | 업무소개 | 제도 | 연락처 | [KO|EN]
```
- "안전정보"는 뉴스+이슈 섹션 묶음

**모바일**: 달구 얼굴 FAB 버튼
- 우측 하단 고정
- 클릭 시 섹션 이동 메뉴 펼침
- 달구 아이콘으로 브랜드 아이덴티티 강화

### 7.6 로딩
- Supabase 데이터 영역: 스켈레톤(placeholder) 표시
- SSG/ISR 빌드 시 정적 생성되는 영역은 로딩 없음

---

## 8. 섹션 구성 (최종 — 12개)

| # | 섹션 | 데이터 소스 | UI |
|---|------|-----------|-----|
| 1 | **히어로** | 정적 (i18n) | 풀폭 배너 + 실험복 달구 + CTA 2개 |
| 2 | **바로가기** | 정적 (constants) | 카드 3장 (호버 lift+shadow) |
| 3 | **DGIST 안전 뉴스** | **Supabase** (크롤링 캐시 + 수동) | 카드 리스트 |
| 4 | **연구실 안전이슈** | **Supabase** + 외부 바로가기 | 이슈 리스트 + labs.go.kr 카드 (별도 스타일) |
| 5 | **업무 소개** | 정적 (i18n) | 3컬럼 + 보안관 달구 |
| 6 | **안전보건경영** | 정적 (i18n + 이미지) | 배너 ("2026년 안전보건 목표") + 2컬럼 |
| 7 | **연락처** | **Supabase** | 반응형 테이블 (이름 미표시) |
| 8 | **특화 제도** | **Supabase** | 카드 그리드 5x2 (정적, 클릭 없음) |
| 9 | **소관 규정** | 정적 (constants) | 2컬럼 리스트 (텍스트만, 링크 없음) |
| 10 | **강조주간** | **Supabase** | 썸네일 카드 (클릭 → 새 탭 YouTube) |
| 11 | **위치** | 정적 (constants) | Google Maps embed (iframe) |
| 12 | **푸터** | 정적 | 주소 + 대표번호 053-785-1263 + 인사하는 달구 |

---

## 9. 섹션별 상세

### 9.1 히어로
- 풀폭 배너, --primary-dark 배경
- "DGIST Safety & Security Team"
- "매월 4일은 안전점검의 날"
- 실험복 달구 (정면) 우측 배치
- **CTA 버튼 2개**:
  - **AI 안전관리 챗봇** (주력 CTA — 크고 눈에 띄는 스타일, 새 서비스 강조)
  - 안전보안관리시스템 (부 CTA — 보조 스타일)
- Framer Motion 달구 등장 애니메이션

### 9.2 바로가기 (카드 3장)
- DGIST 홈페이지, AI 안전관리 챗봇, 안전보안관리시스템
- 호버 시 lift + shadow, 새 탭

### 9.3 DGIST 안전 뉴스
- API Route로 dgist.ac.kr 보도자료 크롤링 → Supabase `safety_news`에 캐시
- "안전" 키워드 필터, 최신 3~5건
- **크롤링 우선** — ISR 24시간 재검증
- 관리자 페이지에서 수동 추가/삭제 가능
- 실패 시 fallback: 보도자료 바로가기 링크

### 9.4 연구실 안전이슈
- Supabase `safety_issues`에서 최근 건 표시 (일자|키워드)
- **URL이 있는 이슈만 클릭 가능** (없으면 텍스트만 표시)
- 관리자 페이지에서 수동 입력
- labs.go.kr 바로가기 카드 (안전이슈 + 사고사례) — **바로가기 카드와 다른 스타일** (컴팩트)
- 샘플 이슈 2~3건 시딩

### 9.5 업무 소개
- 3컬럼: 안전관리 / 보건관리 / 보안관리
- 간소화: 영역명 + 핵심 키워드만
- **보안관리 열에 보안관 달구 배치**

### 9.6 안전보건경영
- 상단: **"2026 안전보건 목표: 중대재해 제로 유지"** 배너 (정적 텍스트)
- 하단: 2컬럼 (ISO 45001 인증 / 경영방침)
- 이미지: 추후 제공 → 플레이스홀더로 구현

### 9.7 연락처
- 7개 분야별 전화/이메일
- **이름 미표시** (분야 + 전화 + 이메일만)
- 반응형 테이블
- 이메일 → mailto:, 전화 → tel:
- 수정 빈도: 연 1~2회

### 9.8 특화 제도
- 10개 **정적 카드** (클릭 동작 없음)
- 카드 그리드 5x2
- 각 카드: 컬러 바(상단) + 제목 + 설명 1~2줄

### 9.9 소관 규정
- 2컬럼: 안전 분야 / 보안 분야
- **텍스트만 (링크/다운로드 없음)**

### 9.10 강조주간
- YouTube 썸네일 카드 + DGIST DNA 블로그 링크
- **클릭 시 새 탭에서 YouTube 열기** (인라인 재생 없음)

### 9.11 위치
- Google Maps embed (iframe, API 키 불필요)
- 주소: 대구광역시 달성군 현풍읍 테크노중앙대로 333 DGIST E1 7층 704호

### 9.12 푸터
- 팀 주소, **대표번호 053-785-1263**, Copyright
- 인사하는 달구 (dalgu-greeting.png)
- 간결하게 (확장 정보 불필요)

---

## 10. 한/영 토글

- React Context, Header KO|EN 버튼
- i18n.ts에 translations.ko / translations.en 전체 텍스트
- localStorage로 선택 기억
- **형식적 영문** — 주 사용자는 한국어, 영문은 참고용
- 전환 시 부드러운 애니메이션 (선택)

---

## 11. 바로가기 URL

| 서비스 | URL |
|--------|-----|
| DGIST 홈페이지 | https://www.dgist.ac.kr |
| AI 안전관리 챗봇 | https://notebooklm.google.com/notebook/7deebde8-d58d-434e-b56e-1bdb8eb1d7b0 |
| 안전보안관리시스템 | https://safety.dgist.ac.kr/gshm/main/home.do |
| 연구실 안전이슈 | https://www.labs.go.kr/brdartcl/boardarticleList.do |
| DGIST 보도자료 | https://www.dgist.ac.kr/prog/bbsArticle/BBSMSTR_000000000080/list.do |

---

## 12. 기술 스택

| 항목 | 선택 |
|------|------|
| 프레임워크 | Next.js 14 (App Router, SSG + ISR) |
| DB | **Supabase** (PostgreSQL, 무료 티어) |
| 스타일 | Tailwind CSS |
| 애니메이션 | **Framer Motion** |
| 배포 | Vercel (기본 도메인) |
| i18n | React Context + i18n.ts |
| 크롤링 | API Route + cheerio → Supabase 캐시 (ISR 24시간) |
| 인증 | 단순 비밀번호 (환경변수) |
| 지도 | Google Maps embed (iframe) |
| 아이콘 | Lucide React |
| 폰트 | Pretendard CDN |

---

## 13. 환경변수 (Vercel)

```
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGci...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGci...     # 관리자 API용 (서버사이드)
ADMIN_PASSWORD=xxxxxxxx                    # 관리자 로그인 비밀번호
```

---

## 14. 구현 순서

```
Phase 1 — 기반
  Next.js + Tailwind + Framer Motion + CLAUDE.md
  Supabase 프로젝트 확인/생성 (MCP) + 테이블 5개 생성
  seed.sql로 초기 데이터 시딩
  컬러/폰트/달구 3종 배치
  supabase.ts 클라이언트 설정
  constants.ts (정적) + i18n.ts (번역)
  공통 컴포넌트 (SectionWrapper, Skeleton, MobileFAB)

Phase 2 — 랜딩 핵심
  히어로 (CTA 2개 포함) → 바로가기
  업무소개 (보안관 달구) → 연락처 (Supabase) → 위치 → 푸터

Phase 3 — 동적 콘텐츠
  뉴스 크롤링 API → Supabase 캐시 → SafetyNews
  SafetyIssues (Supabase + labs.go.kr 바로가기)
  한/영 토글 전체 적용

Phase 4 — 상세 섹션
  안전보건경영 (2026 목표 배너 + 플레이스홀더)
  특화 제도 10개 (Supabase, 정적 카드)
  소관 규정, 강조주간

Phase 5 — 관리자 페이지
  /admin 로그인 (비밀번호)
  대시보드 레이아웃 + 탭 5개
  각 탭 CRUD UI + API Route

Phase 6 — 마무리
  반응형 (375px~1440px)
  Framer Motion 애니메이션 전체 적용
  스켈레톤 로딩
  Vercel 환경변수 설정 + 배포
```

---

## 15. 리스크

| 리스크 | 대응 |
|--------|------|
| Supabase 무료 한도 초과 | 내부용 사이트라 트래픽 매우 적음, 문제 없음 |
| 뉴스 크롤링 차단 | fallback + 수동 입력 (관리자 페이지) |
| 관리자 비밀번호 유출 | 환경변수 변경으로 즉시 교체 |
| Supabase 장애 | 정적 fallback 데이터 (constants.ts) |
| 영문 번역 | 형식적 수준, 노션 영문 참고 + LLM 번역 |
| Framer Motion 번들 크기 | 내부용이라 성능 영향 미미 |

---

## 16. 에이전트 구조

**단일 에이전트** — 스킬 1개 (`content-builder`)

CLAUDE.md 핵심 섹션:
1. 프로젝트 개요 (노션 대체, Supabase 관리)
2. 디자인 (DGIST 파란색, 달구 3종, Framer Motion)
3. 12개 섹션 + 데이터 소스 (정적 vs Supabase)
4. 한/영 토글 (형식적 영문)
5. 뉴스 크롤링 + Supabase 캐시 (ISR 24시간)
6. 관리자 페이지 (/admin, 5탭)
7. 바로가기 URL
8. 기술 스택 + 환경변수
9. Supabase 테이블 스키마 (5개)
