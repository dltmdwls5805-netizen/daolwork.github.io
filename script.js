 (cd "$(git rev-parse --show-toplevel)" && git apply --3way <<'EOF' 
diff --git a/script.js b/script.js
index b2634ab8fc46f5ebab7a97985af52541297fce8d..b190e84cfb2fd05f0295c0d2bada122b0703464a 100644
--- a/script.js
+++ b/script.js
@@ -1,95 +1,84 @@
-const $ = (s) => document.querySelector(s);
+const SITE_CONFIG = {
+  kakaoLink: "https://open.kakao.com/o/your-link", // 원하는 카카오톡 링크로 교체
+  phoneNumber: "010-0000-0000", // 원하는 번호로 교체
+};
 
-$("#year").textContent = new Date().getFullYear();
+const SITE_DATA = {
+  heroImage: "./images/hero.svg",
+  aboutText:
+    "다올웍스는 공기순환기 관리, 종합청소, 에어컨청소를 전문으로 하는 현장 중심 팀입니다. 상단 메뉴에서 원하는 시공사례를 바로 확인할 수 있도록 구성했습니다.",
+  portfolio: {
+    air: [
+      { image: "./images/air1.svg", title: "학교 공기순환기 필터 교체", desc: "교실 24대 필터 교체 및 점검 완료" },
+      { image: "./images/air2.svg", title: "사무실 공조 라인 점검", desc: "필터 규격 재설정 및 주기 관리 시작" },
+      { image: "./images/air3.svg", title: "공공시설 환기장치 관리", desc: "분기별 유지보수 계약 현장" },
+    ],
+    cleaning: [
+      { image: "./images/cleaning1.svg", title: "신축 아파트 입주청소", desc: "34평 입주 전 오염 제거 및 마감" },
+      { image: "./images/cleaning2.svg", title: "상가 오픈 전 청소", desc: "유리/바닥/집기 오염 제거" },
+      { image: "./images/cleaning3.svg", title: "특수 공간 정리 청소", desc: "폐기 분류 + 살균 + 악취 개선" },
+    ],
+    aircon: [
+      { image: "./images/aircon1.svg", title: "시스템 에어컨 분해세척", desc: "사업장 천장형 에어컨 클리닝" },
+      { image: "./images/aircon2.svg", title: "가정용 벽걸이 에어컨", desc: "곰팡이 냄새 개선 시공" },
+      { image: "./images/aircon3.svg", title: "학원 다중 에어컨 관리", desc: "여름 시즌 사전 점검 및 세척" },
+    ],
+  },
+};
 
-// Mobile nav
-const nav = $("#nav");
-$("#hamburger")?.addEventListener("click", () => {
-  nav.classList.toggle("is-open");
-});
+const $ = (s) => document.querySelector(s);
 
-// Tabs
-document.querySelectorAll(".tab").forEach(btn => {
-  btn.addEventListener("click", () => {
-    document.querySelectorAll(".tab").forEach(b => b.classList.remove("is-active"));
-    btn.classList.add("is-active");
+function renderPortfolio(targetId, items) {
+  const el = $(targetId);
+  if (!el) return;
+  el.innerHTML = items
+    .map(
+      (item) => `
+      <article class="portfolioCard">
+        <img src="${item.image}" alt="${item.title}" />
+        <div class="portfolioCard__body">
+          <h3>${item.title}</h3>
+          <p>${item.desc}</p>
+        </div>
+      </article>
+    `,
+    )
+    .join("");
+}
 
-    const tab = btn.dataset.tab;
-    document.querySelectorAll(".tabPanel").forEach(p => p.classList.remove("is-active"));
-    $("#tab-" + tab).classList.add("is-active");
+function setupMobileNav() {
+  const nav = $("#nav");
+  $("#hamburger")?.addEventListener("click", () => {
+    nav?.classList.toggle("is-open");
   });
-});
+}
 
-// Live ticker (실시간 견적현황 느낌)
-const tickerTrack = $("#tickerTrack");
-const samples = [
-  "울산 남구(입주청소) / 김**",
-  "부산 해운대(사무실 청소) / 박**",
-  "서울 강서(필터 교체) / ○○초",
-  "경기 수원(이사청소) / 이**",
-  "인천 연수(공기순환기 점검) / 정**",
-  "대구 수성(거주청소) / 최**",
-  "광주 북구(정기청소) / 한**",
-];
+function setupContactButtons() {
+  const kakaoBtn = $("#kakaoBtn");
+  const callBtn = $("#callBtn");
 
-function fillTicker() {
-  if (!tickerTrack) return;
-  // 두 번 이어붙여서 ‘흐르는’ 느낌
-  const text = [...samples, ...samples]
-    .map(s => `<span class="ticker__item">• ${s}</span>`)
-    .join("");
-  tickerTrack.innerHTML = text;
+  if (kakaoBtn) {
+    kakaoBtn.href = SITE_CONFIG.kakaoLink;
+  }
 
-  // 간단 마퀴 효과
-  let x = 0;
-  const speed = 0.4;
-  const step = () => {
-    x -= speed;
-    tickerTrack.style.transform = `translateX(${x}px)`;
-    // 대충 루프
-    if (Math.abs(x) > tickerTrack.scrollWidth / 2) x = 0;
-    requestAnimationFrame(step);
-  };
-  requestAnimationFrame(step);
+  if (callBtn) {
+    const tel = SITE_CONFIG.phoneNumber.replace(/[^\d+]/g, "");
+    callBtn.href = `tel:${tel}`;
+    callBtn.textContent = `문의하기 (${SITE_CONFIG.phoneNumber})`;
+  }
 }
-fillTicker();
 
-// Mailto helper (서버 없이 전송)
-function toMailto(fd) {
-  const service = fd.get("service") || "";
-  const area = fd.get("area") || "";
-  const size = fd.get("size") || "";
-  const org = fd.get("org") || "";
-  const phone = fd.get("phone") || "";
-  const message = fd.get("message") || "";
+function init() {
+  $("#year").textContent = new Date().getFullYear();
+  $("#heroImage").src = SITE_DATA.heroImage;
+  $("#aboutText").textContent = SITE_DATA.aboutText;
 
-  const subject = `[홈페이지 견적] ${service} / ${area}`.trim();
-  const body = [
-    `서비스: ${service}`,
-    `지역: ${area}`,
-    size ? `규모: ${size}` : null,
-    org ? `이름/기관명: ${org}` : null,
-    `연락처: ${phone}`,
-    "",
-    message ? `상세내용:\n${message}` : ""
-  ].filter(Boolean).join("\n");
+  renderPortfolio("#airBoardList", SITE_DATA.portfolio.air);
+  renderPortfolio("#cleaningBoardList", SITE_DATA.portfolio.cleaning);
+  renderPortfolio("#airconBoardList", SITE_DATA.portfolio.aircon);
 
-  const to = "contact@daolworks.co.kr"; // ← 너 이메일로 바꿔줘
-  return `mailto:${encodeURIComponent(to)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
+  setupContactButtons();
+  setupMobileNav();
 }
 
-// Quick form submit
-$("#quickForm")?.addEventListener("submit", (e) => {
-  e.preventDefault();
-  const fd = new FormData(e.target);
-  // quickForm은 message가 없으니 기본값
-  fd.set("message", "빠른 견적 신청(메인 폼)에서 접수되었습니다. 세부 상담 요청드립니다.");
-  window.location.href = toMailto(fd);
-});
-
-// Estimate form submit
-$("#estimateForm")?.addEventListener("submit", (e) => {
-  e.preventDefault();
-  const fd = new FormData(e.target);
-  window.location.href = toMailto(fd);
-});
+init();
 
EOF
)