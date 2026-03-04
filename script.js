const $ = (selector) => document.querySelector(selector);

$("#year").textContent = new Date().getFullYear();

const nav = $("#nav");
$("#hamburger")?.addEventListener("click", () => {
  nav?.classList.toggle("is-open");
});

function toMailto(fd) {
  const service = fd.get("service") || "";
  const area = fd.get("area") || "";
  const org = fd.get("org") || "";
  const phone = fd.get("phone") || "";
  const message = fd.get("message") || "";

  const subject = `[홈페이지 문의] ${service} / ${area}`.trim();
  const body = [
    `이름/기관명: ${org || "미입력"}`,
    `서비스: ${service}`,
    `지역: ${area}`,
    `연락처: ${phone}`,
    "",
    `상세내용:\n${message || "상세 내용 없음"}`,
  ].join("\n");

  const to = "contact@daolworks.co.kr";
  return `mailto:${encodeURIComponent(to)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

$("#quickForm")?.addEventListener("submit", (e) => {
  e.preventDefault();
  const fd = new FormData(e.target);
  fd.set("org", "빠른문의");
  fd.set("message", "빠른 무료 견적 폼으로 접수되었습니다.");
  window.location.href = toMailto(fd);
});

$("#estimateForm")?.addEventListener("submit", (e) => {
  e.preventDefault();
  const fd = new FormData(e.target);
  window.location.href = toMailto(fd);
});
