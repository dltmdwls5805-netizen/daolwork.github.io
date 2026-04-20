# 다올웍스 – 공기순환기 필터 교체 신청 시스템

## 배포 방법 (처음 1회만 설정, 약 15분 소요)

---

### 1단계. Supabase 데이터베이스 만들기

1. https://supabase.com 접속 → 구글 계정으로 무료 회원가입
2. **New project** 클릭 → 프로젝트 이름 입력 (예: daolworks) → 비밀번호 설정 → **Create new project**
3. 프로젝트 생성 완료 후 왼쪽 메뉴에서 **SQL Editor** 클릭
4. `supabase_setup.sql` 파일 내용을 전체 복사해서 붙여넣기 → **Run** 클릭
5. 왼쪽 메뉴 **Project Settings → API** 클릭
   - `Project URL` 복사해두기 → `.env` 파일의 `NEXT_PUBLIC_SUPABASE_URL`에 넣을 값
   - `anon public` 키 복사해두기 → `.env` 파일의 `NEXT_PUBLIC_SUPABASE_ANON_KEY`에 넣을 값

---

### 2단계. GitHub에 코드 올리기

1. https://github.com 접속 → 무료 회원가입 (이미 있으면 로그인)
2. 오른쪽 상단 **+** → **New repository** → 이름 입력 → **Create repository**
3. 이 폴더(daolworks-filter)를 통째로 GitHub Desktop 또는 git으로 업로드
   - GitHub Desktop이 편리합니다: https://desktop.github.com

---

### 3단계. Vercel에 배포하기

1. https://vercel.com 접속 → GitHub 계정으로 무료 회원가입
2. **Add New → Project** → 방금 만든 GitHub 저장소 선택 → **Import**
3. **Environment Variables** 섹션에서 아래 세 가지 추가:

   | 이름 | 값 |
   |------|-----|
   | `NEXT_PUBLIC_SUPABASE_URL` | Supabase Project URL |
   | `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon public 키 |
   | `NEXT_PUBLIC_ADMIN_PASSWORD` | 원하는 관리자 비밀번호 |

4. **Deploy** 클릭 → 1~2분 후 완료

---

### 완료!

배포가 끝나면 Vercel이 주소를 알려줍니다 (예: `daolworks-filter.vercel.app`)

- **고객 신청 페이지:** `https://your-domain.vercel.app`
- **관리자 페이지:** `https://your-domain.vercel.app/admin`

---

## 관리자 페이지 사용법

- `/admin` 접속 → 비밀번호 입력
- 각 신청 건의 상태를 **대기중 / 방문완료 / 취소** 로 변경 가능
- 아파트명, 동으로 검색 필터 사용 가능

## 커스텀 도메인 연결 (선택)

Vercel 대시보드 → 프로젝트 → **Settings → Domains** 에서 원하는 도메인 연결 가능
