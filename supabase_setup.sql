-- Supabase SQL Editor에 이 내용을 복사해서 실행하세요

CREATE TABLE submissions (
  id          BIGSERIAL PRIMARY KEY,
  apt         TEXT NOT NULL,
  dong        TEXT NOT NULL,
  ho          TEXT NOT NULL,
  name        TEXT NOT NULL,
  phone       TEXT NOT NULL,
  time_slot   TEXT NOT NULL,
  note        TEXT,
  status      TEXT NOT NULL DEFAULT '대기중',
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 누구나 데이터를 INSERT 할 수 있도록 (신청 폼)
CREATE POLICY "allow_insert" ON submissions FOR INSERT WITH CHECK (true);

-- 누구나 데이터를 읽을 수 있도록 (관리자 페이지)
CREATE POLICY "allow_select" ON submissions FOR SELECT USING (true);

-- 상태 변경 허용
CREATE POLICY "allow_update" ON submissions FOR UPDATE USING (true);

-- 삭제 허용
CREATE POLICY "allow_delete" ON submissions FOR DELETE USING (true);

-- Row Level Security 활성화
ALTER TABLE submissions ENABLE ROW LEVEL SECURITY;
