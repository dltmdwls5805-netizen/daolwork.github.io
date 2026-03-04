const $ = (s) => document.querySelector(s);

$("#year").textContent = new Date().getFullYear();

// Mobile nav
const nav = $("#nav");
$("#hamburger")?.addEventListener("click", () => {
  nav.classList.toggle("is-open");
});

// Tabs
document.querySelectorAll(".tab").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".tab").forEach(b => b.classList.remove("is-active"));
    btn.classList.add("is-active");

    const tab = btn.dataset.tab;
    document.querySelectorAll(".tabPanel").forEach(p => p.classList.remove("is-active"));
    $("#tab-" + tab).classList.add("is-active");
  });
});

// Live ticker (실시간 견적현황 느낌)
const tickerTrack = $("#tickerTrack");
const samples = [
  "울산 남구(입주청소) / 김**",
  "부산 해운대(사무실 청소) / 박**",
  "서울 강서(필터 교체) / ○○초",
  "경기 수원(이사청소) / 이**",
  "인천 연수(공기순환기 점검) / 정**",
  "대구 수성(거주청소) / 최**",
  "광주 북구(정기청소) / 한**",
];

function fillTicker() {
  if (!tickerTrack) return;
  // 두 번 이어붙여서 ‘흐르는’ 느낌
  const text = [...samples, ...samples]
    .map(s => `<span class="ticker__item">• ${s}</span>`)
    .join("");
  tickerTrack.innerHTML = text;

  // 간단 마퀴 효과
  let x = 0;
  const speed = 0.4;
  const step = () => {
    x -= speed;
    tickerTrack.style.transform = `translateX(${x}px)`;
    // 대충 루프
    if (Math.abs(x) > tickerTrack.scrollWidth / 2) x = 0;
    requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}
fillTicker();

// Mailto helper (서버 없이 전송)
function toMailto(fd) {
  const service = fd.get("service") || "";
  const area = fd.get("area") || "";
  const size = fd.get("size") || "";
  const org = fd.get("org") || "";
  const phone = fd.get("phone") || "";
  const message = fd.get("message") || "";

  const subject = `[홈페이지 견적] ${service} / ${area}`.trim();
  const body = [
    `서비스: ${service}`,
    `지역: ${area}`,
    size ? `규모: ${size}` : null,
    org ? `이름/기관명: ${org}` : null,
    `연락처: ${phone}`,
    "",
    message ? `상세내용:\n${message}` : ""
  ].filter(Boolean).join("\n");

  const to = "contact@daolworks.co.kr"; // ← 너 이메일로 바꿔줘
  return `mailto:${encodeURIComponent(to)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

// Quick form submit
$("#quickForm")?.addEventListener("submit", (e) => {
  e.preventDefault();
  const fd = new FormData(e.target);
  // quickForm은 message가 없으니 기본값
  fd.set("message", "빠른 견적 신청(메인 폼)에서 접수되었습니다. 세부 상담 요청드립니다.");
  window.location.href = toMailto(fd);
});

// Estimate form submit
$("#estimateForm")?.addEventListener("submit", (e) => {
  e.preventDefault();
  const fd = new FormData(e.target);
  window.location.href = toMailto(fd);
});
