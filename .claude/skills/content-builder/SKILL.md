# content-builder — DGIST 안전보안팀 랜딩페이지 콘텐츠 빌더

## 설명
DGIST 안전보안팀 소개 랜딩페이지의 콘텐츠를 구현하고 관리하는 스킬.
설계서(dgist-safety-landing-design-FINAL.md)와 CLAUDE.md를 기반으로 동작한다.

## 트리거
- 섹션 구현, 컴포넌트 생성, 데이터 연동, 관리자 페이지 작업 시

## 핵심 규칙

### 프로젝트 구조
- Next.js 14 App Router (SSG + ISR)
- Tailwind CSS + Framer Motion
- Supabase (PostgreSQL, 무료 티어)
- Vercel 배포 (기본 도메인)

### 데이터 소스 규칙
- **정적 데이터** → `/src/lib/constants.ts` (바로가기 URL, 규정, 업무소개, 위치, 안전보건 목표)
- **동적 데이터** → Supabase 5개 테이블 (safety_news, safety_issues, safety_programs, contacts, emphasis_week)
- **번역 텍스트** → `/src/lib/i18n.ts` (한/영 완전 분리)

### 디자인 규칙
- DGIST 브랜드 컬러: #003876 (primary), #002855 (dark), #E8F0FE (light)
- 폰트: Pretendard 700/500/400
- 달구 마스코트 3종: 실험복(히어로), 보안관(업무소개), 인사(푸터)
- 라이트모드 전용, 다크모드 미지원
- 애니메이션: Framer Motion (스타트업/테크 느낌)
  - 섹션 진입: fade-in + 슬라이드 업
  - 카드 호버: lift + shadow
  - 패럴랙스, 카운터, 마우스 트래킹

### 네비게이션 규칙
- 데스크탑: 6개 메뉴 (바로가기|안전정보|업무소개|제도|연락처) + KO|EN 토글
- 모바일: 달구 얼굴 FAB 버튼 (우측 하단)

### 12개 섹션 (순서 고정)
1. 히어로 — CTA 2개 (AI 챗봇 강조, 안전관리시스템 부)
2. 바로가기 — 카드 3장
3. DGIST 안전 뉴스 — 크롤링 우선(ISR 24h), fallback 필수
4. 연구실 안전이슈 — URL 있는 것만 클릭, labs.go.kr 카드(별도 스타일)
5. 업무 소개 — 3컬럼 + 보안관 달구
6. 안전보건경영 — "2026 목표: 중대재해 제로 유지" + 이미지 플레이스홀더
7. 연락처 — 이름 미표시, 분야+전화+이메일만
8. 특화 제도 — 정적 카드 (클릭 없음), 5x2 그리드
9. 소관 규정 — 텍스트만 (링크 없음)
10. 강조주간 — 썸네일 카드 (새 탭 YouTube)
11. 위치 — Google Maps embed (iframe)
12. 푸터 — 대표번호 053-785-1263 + 인사 달구

### 관리자 페이지 규칙
- `/admin` → 비밀번호 인증 (ADMIN_PASSWORD 환경변수)
- 5개 탭: 안전이슈, 뉴스, 제도, 연락처, 강조주간
- 사용자 1~2명, 로그 불필요
- CRUD API: `/api/admin/{issues|news|programs|contacts|emphasis}`
- 서버사이드에서 SUPABASE_SERVICE_ROLE_KEY 사용

### 로딩 규칙
- Supabase 데이터 영역: 스켈레톤(Skeleton) 컴포넌트 표시
- SSG/ISR 영역: 로딩 없음

### 주의사항
- 뉴스 크롤링 실패 시 반드시 fallback 처리
- 연락처/이메일 노출 허용 (이름만 미표시)
- 안전보건경영 이미지: 추후 제공 예정 → 플레이스홀더
- 모바일 반응형 필수 (375px~1440px)
- SEO 불필요 (내부용 사이트)

## 환경변수
```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
ADMIN_PASSWORD=
```
