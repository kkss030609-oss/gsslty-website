/* 甘肃胜利体育科技 · 站点脚本（顶栏/页脚注入 + 交互） */

const COMPANY = {
  name: "甘肃胜利体育科技有限公司",
  addr: "甘肃省兰州市安宁区通达街666号鼎泰中汇广场14楼1410室",
  tel: "0931-8479806",
  tel400: "400-666-0678",
  manager: "张经理 13679465686",
  email: "gsslty@163.com",
};

const NAV = [
  { href: "index.html", label: "首页" },
  { href: "about.html", label: "关于我们" },
  { href: "products.html", label: "产品中心" },
  { href: "cases.html", label: "业绩展示" },
  { href: "news.html", label: "新闻中心" },
  { href: "contact.html", label: "联系我们" },
];

const LOGO = `
  <svg viewBox="0 0 40 40" fill="none" width="40" height="40" aria-hidden="true">
    <rect width="40" height="40" rx="11" fill="url(#lg1)"/>
    <path d="M12 27 L20 13 L28 27" stroke="#fff" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
    <path d="M16 22 H24" stroke="#fff" stroke-width="2.4" stroke-linecap="round"/>
    <defs><linearGradient id="lg1" x1="0" y1="0" x2="40" y2="40"><stop stop-color="#22d3ee"/><stop offset=".5" stop-color="#4f7cff"/><stop offset="1" stop-color="#8b5cf6"/></linearGradient></defs>
  </svg>`;

function headerHTML(active) {
  const links = NAV.map(n =>
    `<a href="${n.href}" class="${n.href === active ? 'active' : ''}">${n.label}</a>`
  ).join("");
  return `
  <header class="site-header" id="siteHeader">
    <div class="container nav-wrap">
      <a class="brand" href="index.html">
        <span class="brand-mark">${LOGO}</span>
        <span class="brand-name">${COMPANY.name}<small>SHENGLI SPORTS TECH</small></span>
      </a>
      <nav class="nav-links">${links}</nav>
      <div class="nav-cta">
        <span class="nav-tel">${COMPANY.tel400}</span>
        <a class="btn btn-primary btn-sm" href="contact.html">联系我们</a>
      </div>
      <button class="burger" id="burger" aria-label="菜单" aria-expanded="false">
        <span></span><span></span><span></span>
      </button>
    </div>
  </header>
  <div class="mobile-menu" id="mobileMenu">
    ${NAV.map(n => `<a href="${n.href}" class="${n.href === active ? 'active' : ''}">${n.label}</a>`).join("")}
    <p class="m-tel">${COMPANY.tel400} · ${COMPANY.tel}</p>
  </div>`;
}

function footerHTML() {
  return `
  <footer class="site-footer">
    <div class="container">
      <div class="footer-grid">
        <div class="footer-brand">
          <a class="brand" href="index.html">
            <span class="brand-mark">${LOGO}</span>
            <span class="brand-name">${COMPANY.name}<small>SHENGLI SPORTS TECH</small></span>
          </a>
          <p>甘肃体育场地建设龙头、西北智慧体育先行者。专注体育场地建设与智慧体育整体解决方案，让运动更科学、更智慧。</p>
        </div>
        <div class="footer-col">
          <h4>快速导航</h4>
          <ul>
            ${NAV.slice(0, 4).map(n => `<li><a href="${n.href}">${n.label}</a></li>`).join("")}
          </ul>
        </div>
        <div class="footer-col">
          <h4>产品中心</h4>
          <ul>
            <li><a href="products.html">智慧体育公园</a></li>
            <li><a href="products.html">智慧健身步道</a></li>
            <li><a href="products.html">智慧体考体测</a></li>
            <li><a href="products.html">室外全民健身器材</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>联系我们</h4>
          <ul class="footer-contact">
            <li><span class="k">地址</span><span>${COMPANY.addr}</span></li>
            <li><span class="k">电话</span><span>${COMPANY.tel}<br>${COMPANY.tel400}</span></li>
            <li><span class="k">邮箱</span><span>${COMPANY.email}</span></li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom">
        <span>© <span id="year"></span> ${COMPANY.name} · 版权所有</span>
        <span>甘肃体育场地建设龙头 · 西北智慧体育先行者</span>
      </div>
    </div>
  </footer>`;
}

function currentPage() {
  const p = location.pathname.split("/").pop() || "index.html";
  return p === "" ? "index.html" : p;
}

/* ---- 初始化 ---- */
document.addEventListener("DOMContentLoaded", () => {
  const active = currentPage();

  // 背景 + 顶栏 + 页脚
  const bg = document.createElement("div");
  bg.className = "site-bg";
  document.body.prepend(bg);
  const grain = document.createElement("div");
  grain.className = "grain";
  document.body.prepend(grain);

  document.getElementById("siteHeader")?.remove();
  document.getElementById("siteFooter")?.remove();
  document.body.insertAdjacentHTML("afterbegin", headerHTML(active));
  document.body.insertAdjacentHTML("beforeend", footerHTML());
  document.getElementById("year").textContent = new Date().getFullYear();

  initHeader();
  initReveal();
  initCounters();
  initContactForm();
});

function initHeader() {
  const header = document.getElementById("siteHeader");
  const burger = document.getElementById("burger");
  const menu = document.getElementById("mobileMenu");
  const onScroll = () => header.classList.toggle("scrolled", window.scrollY > 20);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  const closeMenu = () => {
    burger.classList.remove("open");
    menu.classList.remove("open");
    burger.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  };
  burger.addEventListener("click", () => {
    const open = menu.classList.toggle("open");
    burger.classList.toggle("open", open);
    burger.setAttribute("aria-expanded", String(open));
    document.body.style.overflow = open ? "hidden" : "";
  });
  menu.querySelectorAll("a").forEach(a => a.addEventListener("click", closeMenu));
}

function initReveal() {
  const els = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window)) {
    els.forEach(el => el.classList.add("in"));
    return;
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add("in");
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
  els.forEach(el => io.observe(el));
}

function initCounters() {
  const els = document.querySelectorAll("[data-count]");
  if (!els.length) return;
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      animateCount(e.target);
      io.unobserve(e.target);
    });
  }, { threshold: 0.4 });
  els.forEach(el => io.observe(el));
}

function animateCount(el) {
  const target = parseFloat(el.dataset.count);
  const decimals = parseInt(el.dataset.decimals || "0", 10);
  const suffix = el.dataset.suffix || "";
  const prefix = el.dataset.prefix || "";
  const dur = 1800;
  const start = performance.now();
  function tick(now) {
    const p = Math.min((now - start) / dur, 1);
    const eased = 1 - Math.pow(1 - p, 3);
    el.textContent = prefix + (target * eased).toFixed(decimals) + suffix;
    if (p < 1) requestAnimationFrame(tick);
    else el.textContent = prefix + target.toFixed(decimals) + suffix;
  }
  requestAnimationFrame(tick);
}

function initContactForm() {
  const form = document.getElementById("contactForm");
  if (!form) return;
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = form.querySelector("#cf-name")?.value || "";
    const phone = form.querySelector("#cf-phone")?.value || "";
    const msg = form.querySelector("#cf-msg")?.value || "";
    const subject = encodeURIComponent(`官网留言 - ${name}`);
    const body = encodeURIComponent(`姓名：${name}\n电话：${phone}\n留言：${msg}`);
    window.location.href = `mailto:${COMPANY.email}?subject=${subject}&body=${body}`;
    const note = form.querySelector(".form-note");
    if (note) note.textContent = "正在打开邮件客户端提交…（或直接致电 400-666-0678）";
  });
}
