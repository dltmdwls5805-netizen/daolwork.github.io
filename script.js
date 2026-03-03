const $ = (s) => document.querySelector(s);

const nav = $("#nav");
const hamburger = $("#hamburger");
const year = $("#year");

year.textContent = new Date().getFullYear();

hamburger?.addEventListener("click", () => {
  nav.classList.toggle("is-open");
});

function toMailto(formData) {
  const org = formData.get("org") || "";
  const name = formData.get("name") || "";
  const phone = formData.get("phone") || "";
  const email = formData.get("email") || "";
  const message = formData.get("message") || "";
  const type = formData.get("type") || "";

  // 체크박스 서비스
  const svc = [];
  formData.getAll("svc").forEach(v => svc.push(v));

  const subject = `[홈페이지 문의] ${org}`.trim();
  const bodyLines = [
    `기관/사업장명: ${org}`,
    name ? `담당자: ${name}` : null,
    `연락처: ${phone}`,
    email ? `이메일: ${email}` : null,
    type ? `요청 내용: ${type}` : null,
    svc.length ? `요청 서비스: ${svc.join(", ")}` : null,
    "",
    "문의 내용:",
    message
  ].filter(Boolean);

  const body = bodyLines.join("\n");
  const to = "contact@daolworks.co.kr"; // 여기 이메일 바꾸세요

  return `mailto:${encodeURIComponent(to)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

// Hero quick form
$("#quickForm")?.addEventListener("submit", (e) => {
  e.preventDefault();
  const fd = new FormData(e.target);
  // quickForm에는 message가 없으니 기본값
  if (!fd.get("message")) fd.set("message", "빠른 문의 폼에서 접수되었습니다. 세부 내용 확인 요청드립니다.");
  window.location.href = toMailto(fd);
});

// Contact form
$("#contactForm")?.addEventListener("submit", (e) => {
  e.preventDefault();
  const fd = new FormData(e.target);
  window.location.href = toMailto(fd);
});
