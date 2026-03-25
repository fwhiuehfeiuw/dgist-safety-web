-- DGIST 안전보안팀 랜딩페이지 Supabase 초기 세팅
-- 테이블 5개 생성 + 초기 데이터 시딩
-- v8.0 (2026-03-25, 인터뷰 반영 — 캘린더 제거)

-- ============================================
-- 1. safety_news (DGIST 안전 뉴스)
-- ============================================
CREATE TABLE IF NOT EXISTS safety_news (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  url TEXT NOT NULL,
  date DATE NOT NULL,
  source TEXT DEFAULT 'dgist.ac.kr',
  is_auto BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 초기 뉴스 (AI 안전 챗봇 보도자료)
INSERT INTO safety_news (title, url, date, source, is_auto) VALUES
('DGIST, 스마트 안전 캠퍼스 구축...AI 안전 챗봇 전면 시행', 'https://www.dgist.ac.kr/kor/index.do', '2026-02-04', 'dgist.ac.kr', false);

-- ============================================
-- 2. safety_issues (연구실 안전이슈 — 수동 입력)
-- ============================================
CREATE TABLE IF NOT EXISTS safety_issues (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  date DATE NOT NULL,
  keyword_ko TEXT NOT NULL,
  keyword_en TEXT DEFAULT '',
  url TEXT DEFAULT '',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 샘플 안전이슈 시딩 (2~3건)
INSERT INTO safety_issues (date, keyword_ko, keyword_en, url, is_active) VALUES
('2026-03-10', '화학물질 누출사고 예방 강화', 'Chemical Spill Prevention Enhancement', 'https://www.labs.go.kr/brdartcl/boardarticleList.do', true),
('2026-02-25', '전기 안전사고 주의보', 'Electrical Safety Alert', 'https://www.labs.go.kr/brdartcl/boardarticleList.do', true),
('2026-01-15', '겨울철 연구실 난방기기 안전관리', 'Winter Lab Heating Safety Management', '', true);

-- ============================================
-- 3. safety_programs (특화 제도 10개)
-- ============================================
CREATE TABLE IF NOT EXISTS safety_programs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title_ko TEXT NOT NULL,
  title_en TEXT DEFAULT '',
  desc_ko TEXT NOT NULL,
  desc_en TEXT DEFAULT '',
  color TEXT DEFAULT '#003876',
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

INSERT INTO safety_programs (title_ko, title_en, desc_ko, desc_en, color, sort_order) VALUES
('위험물 처리 지원', 'Hazardous Waste Disposal Support', '폐시약·폐배터리 등 폐기물 안전 수거·처리 지원', 'Safe collection and disposal of waste chemicals and batteries', '#7B61FF', 1),
('연구실안전관리사 자격 취득 지원', 'Lab Safety Manager Certification Support', '연구실안전 관계자 대상 자격증 취득 비용 지원', 'Financial support for safety certification', '#3B82F6', 2),
('외국인 대상 연구실 안전관리 교육', 'Safety Training for International Researchers', '반기 1회, 전문가 집체교육 (1일 2시간)', 'Biannual group training by experts (2hrs/day)', '#06B6D4', 3),
('사고 실험실 재발방지 특별교육', 'Accident Prevention Special Training', '사고 발생 시 연구실책임자 주관 특별교육 실시', 'Special education led by lab PI after incidents', '#0EA5E9', 4),
('실험복 세탁 서비스', 'Lab Coat Laundry Service', '실험복 정기 수거·세탁 (2차 유해물질 노출 예방)', 'Regular collection and laundering (prevents secondary exposure)', '#A855F7', 5),
('안전보호구 착용 불시점검', 'PPE Spot Inspection', '연구실 보호구 착용 불시점검 및 미착용자 지도·조언', 'Unannounced PPE checks and guidance for non-compliance', '#7B61FF', 6),
('우수연구실 포상', 'Outstanding Lab Award', '안전관리 우수 연구실 선정 및 포상', 'Selection and award for excellent safety management', '#3B82F6', 7),
('안전보호구 및 안전장비 지원', 'PPE & Safety Equipment Support', '필수 보호구·안전장비 구입 및 유지보수 비용 지원', 'Funding for essential PPE and equipment maintenance', '#06B6D4', 8),
('안전 체험학습장', 'Safety Experience Center', '체험학습장 특별교육, 교육 미이수자 재교육', 'Hands-on safety training and re-education', '#0EA5E9', 9),
('안전·보건·보안 강조주간', 'Safety·Health·Security Emphasis Week', '대내외 안전문화 확산 캠페인', 'Internal and external safety culture campaign', '#A855F7', 10);

-- ============================================
-- 4. contacts (연락처)
-- ============================================
CREATE TABLE IF NOT EXISTS contacts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  field_ko TEXT NOT NULL,
  field_en TEXT DEFAULT '',
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

INSERT INTO contacts (field_ko, field_en, phone, email, sort_order) VALUES
('산업안전', 'Industrial Safety', '053-785-1263', 'mark630@dgist.ac.kr', 1),
('연구실안전', 'Laboratory Safety', '053-785-1261, 1268, 1267', 'woogie@dgist.ac.kr', 2),
('방사선안전', 'Radiation Safety', '053-785-1265', 'byj@dgist.ac.kr', 3),
('중대재해', 'Serious Disaster', '053-785-1266', 'domingo@dgist.ac.kr', 4),
('재난관리', 'Disaster Management', '053-785-1266', 'wkjin@dgist.ac.kr', 5),
('산업보건 (건강관리실)', 'Industrial Health (Health Center)', '053-785-0911', 'yrave@dgist.ac.kr', 6),
('보안관리', 'Security Management', '053-785-1264', 'yjc@dgist.ac.kr', 7);

-- ============================================
-- 5. emphasis_week (강조주간)
-- ============================================
CREATE TABLE IF NOT EXISTS emphasis_week (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title_ko TEXT NOT NULL,
  title_en TEXT DEFAULT '',
  youtube_url TEXT NOT NULL,
  blog_url TEXT DEFAULT '',
  year INT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

INSERT INTO emphasis_week (title_ko, title_en, youtube_url, blog_url, year) VALUES
('2024 안전보건보안 강조주간', '2024 Safety Health Security Emphasis Week', 'https://www.youtube.com/watch?v=VMgSbDtpKg4', 'https://dgistdna.com/749', 2024),
('2023 DGIST 안전·보건·보안 강조주간', '2023 DGIST Safety Health Security Emphasis Week', 'https://www.youtube.com/watch?v=7dAVuQUn31E', '', 2023);

-- ============================================
-- RLS (Row Level Security) 정책
-- ============================================
-- 공개 읽기 허용 (랜딩페이지에서 anon key로 조회)
ALTER TABLE safety_news ENABLE ROW LEVEL SECURITY;
ALTER TABLE safety_issues ENABLE ROW LEVEL SECURITY;
ALTER TABLE safety_programs ENABLE ROW LEVEL SECURITY;
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE emphasis_week ENABLE ROW LEVEL SECURITY;

-- 읽기: 누구나
CREATE POLICY "Public read" ON safety_news FOR SELECT USING (true);
CREATE POLICY "Public read" ON safety_issues FOR SELECT USING (true);
CREATE POLICY "Public read" ON safety_programs FOR SELECT USING (true);
CREATE POLICY "Public read" ON contacts FOR SELECT USING (true);
CREATE POLICY "Public read" ON emphasis_week FOR SELECT USING (true);

-- 쓰기: service_role만 (관리자 API Route에서 사용)
CREATE POLICY "Service write" ON safety_news FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service write" ON safety_issues FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service write" ON safety_programs FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service write" ON contacts FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service write" ON emphasis_week FOR ALL USING (true) WITH CHECK (true);
