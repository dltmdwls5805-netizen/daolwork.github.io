const SITE_DATA = {
  heroImage: "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=1400&q=80",
  stats: [
    { value: "4.9/5.0", label: "고객 만족도" },
    { value: "6,000+", label: "누적 시공 건수" },
    { value: "48h", label: "평균 상담 응답" },
  ],
  about: {
    text: "다올웍스는 청소 결과의 품질과 운영의 투명성을 가장 중요하게 생각합니다. 작업 전 상담부터 완료 후 공유까지 표준화된 프로세스로 운영합니다.",
    bullets: [
      "직영팀 기반의 일관된 시공 퀄리티",
      "공기순환기 · 종합청소 · 에어컨청소 원스톱 제공",
      "현장 사진 기반 결과 공유 및 사후 케어",
    ],
  },
  services: {
    air: [
      { title: "필터 규격 진단", desc: "모델/환경에 맞는 규격 확인 및 교체 주기 설계" },
      { title: "필터 교체 작업", desc: "안전 기준에 맞춘 신속한 필터 교체" },
      { title: "점검 리포트", desc: "교체 내역과 상태를 문서로 정리" },
    ],
    cleaning: [
      { title: "입주청소", desc: "준공 먼지·오염 제거 중심의 입주 전 작업" },
      { title: "이사청소", desc: "생활 오염 제거 및 쾌적한 공간 복원" },
      { title: "방역/특수청소", desc: "방역, 쓰레기집, 공장청소까지 맞춤 대응" },
    ],
    aircon: [
      { title: "분해 세척", desc: "열교환기/팬 오염 제거로 냄새 개선" },
      { title: "곰팡이 케어", desc: "위생 중심 약제 적용 및 살균 관리" },
      { title: "가동 점검", desc: "청소 후 작동 상태 확인 및 안내" },
    ],
  },
  portfolio: {
    air: [
      { image: "https://images.unsplash.com/photo-1581092787765-e3feb951d987?auto=format&fit=crop&w=1200&q=80", title: "학교 공기순환기 필터 교체", desc: "교실 24대 필터 교체 및 점검 완료" },
      { image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1200&q=80", title: "사무실 공조 라인 점검", desc: "필터 규격 재설정 및 주기 관리 시작" },
      { image: "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1200&q=80", title: "공공시설 환기장치 관리", desc: "분기별 유지보수 계약 현장" },
    ],
    cleaning: [
      { image: "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=1200&q=80", title: "신축 아파트 입주청소", desc: "34평 입주 전 오염 제거 및 마감" },
      { image: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80", title: "상가 오픈 전 청소", desc: "유리/바닥/집기 오염 제거" },
      { image: "https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=1200&q=80", title: "특수 공간 정리 청소", desc: "폐기 분류 + 살균 + 악취 개선" },
    ],
    aircon: [
      { image: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=1200&q=80", title: "시스템 에어컨 분해세척", desc: "사업장 천장형 에어컨 클리닝" },
      { image: "https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&w=1200&q=80", title: "가정용 벽걸이 에어컨", desc: "곰팡이 냄새 개선 시공" },
      { image: "https://images.unsplash.com/photo-1565538810643-b5bdb714032a?auto=format&fit=crop&w=1200&q=80", title: "학원 다중 에어컨 관리", desc: "여름 시즌 사전 점검 및 세척" },
    ],
  },
};

const $ = (s) => document.querySelector(s);
const $$ = (s) => document.querySelectorAll(s);

function renderStats() {
  const el = $("#heroStats");
  if (!el) return;
  el.innerHTML = SITE_DATA.stats
    .map((s) => `<div class="statCard"><strong>${s.value}</strong><span>${s.label}</span></div>`)
    .join("");
}

function renderAbout() {
  const textEl = $("#aboutText");
  const listEl = $("#aboutBullets");
  if (!textEl || !listEl) return;

  textEl.textContent = SITE_DATA.about.text;
  listEl.innerHTML = SITE_DATA.about.bullets.map((b) => `<li>${b}</li>`).join("");
}

function renderServiceGrid(targetId, items) {
  const el = $(targetId);
  if (!el) return;
  el.innerHTML = items
    .map((item) => `<article class="serviceCard"><h3>${item.title}</h3><p>${item.desc}</p></article>`)
    .join("");
}

function renderPortfolio(targetId, items) {
  const el = $(targetId);
  if (!el) return;
  el.innerHTML = items
    .map(
      (item) => `
      <article class="portfolioCard">
        <img src="${item.image}" alt="${item.title}" />
        <div class="portfolioCard__body">
          <h3>${item.title}</h3>
          <p>${item.desc}</p>
        </div>
      </article>
    `,
    )
    .join("");
}

function setupTabs() {
  $$(".tab").forEach((tab) => {
    tab.addEventListener("click", () => {
      const id = tab.dataset.tab;
      $$(".tab").forEach((t) => t.classList.remove("is-active"));
      tab.classList.add("is-active");
      $$(".boardPanel").forEach((p) => p.classList.remove("is-active"));
      $(`#${id}`)?.classList.add("is-active");
    });
  });
}

function setupMobileNav() {
  const nav = $("#nav");
  $("#hamburger")?.addEventListener("click", () => {
    nav?.classList.toggle("is-open");
  });
}

function init() {
  $("#year").textContent = new Date().getFullYear();
  $("#heroImage").src = SITE_DATA.heroImage;

  renderStats();
  renderAbout();

  renderServiceGrid("#airServices", SITE_DATA.services.air);
  renderServiceGrid("#cleaningServices", SITE_DATA.services.cleaning);
  renderServiceGrid("#airconServices", SITE_DATA.services.aircon);

  renderPortfolio("#airBoardList", SITE_DATA.portfolio.air);
  renderPortfolio("#cleaningBoardList", SITE_DATA.portfolio.cleaning);
  renderPortfolio("#airconBoardList", SITE_DATA.portfolio.aircon);

  setupTabs();
  setupMobileNav();
}

init();
