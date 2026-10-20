/* 甘肃胜利体育科技 · 站点脚本（顶栏/页脚注入 + 基础交互） */

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
  { href: "products.html", label: "产品" },
  { href: "solutions.html", label: "解决方案" },
  { href: "cases.html", label: "工程案例" },
  { href: "qualifications.html", label: "品质认证" },
  { href: "about.html", label: "关于胜利" },
  { href: "victor.html", label: "维克多" },
  { href: "news.html", label: "动态" },
];

const LOGO = `
  <svg viewBox="0 0 40 40" fill="none" width="40" height="40" aria-hidden="true">
    <rect width="40" height="40" rx="9" fill="#006d33"/>
    <path d="M12 27 L20 13 L28 27" stroke="#fff" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
    <path d="M16 22 H24" stroke="#fff" stroke-width="2.4" stroke-linecap="round"/>
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
          <p>专注体育场地建设与智慧体育整体解决方案，深耕甘肃、辐射西北，累计中标项目 72+ 项、中标金额超 1.35 亿元。</p>
        </div>
        <div class="footer-col">
          <h4>快速导航</h4>
          <ul>
            ${NAV.map(n => `<li><a href="${n.href}">${n.label}</a></li>`).join("")}
          </ul>
        </div>
        <div class="footer-col">
          <h4>业务体系</h4>
          <ul>
            <li><a href="products.html">四大产品线</a></li>
            <li><a href="solutions.html">行业解决方案</a></li>
            <li><a href="cases.html">工程案例</a></li>
            <li><a href="qualifications.html">品质认证</a></li>
            <li><a href="victor.html">维克多 · 体育用品</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>联系</h4>
          <ul class="footer-contact">
            <li><span class="k">地址</span><span>${COMPANY.addr}</span></li>
            <li><span class="k">电话</span><span>${COMPANY.tel}<br>${COMPANY.tel400}</span></li>
            <li><span class="k">邮箱</span><span>${COMPANY.email}</span></li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom">
        <span>© <span id="year"></span> ${COMPANY.name} · 版权所有</span>
        <span>专注体育场地建设与智慧体育整体解决方案</span>
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

  document.getElementById("siteHeader")?.remove();
  document.getElementById("siteFooter")?.remove();
  document.body.insertAdjacentHTML("afterbegin", headerHTML(active));
  document.body.insertAdjacentHTML("beforeend", footerHTML());
  document.getElementById("year").textContent = new Date().getFullYear();

  initHeader();
  initContactForm();
});

function initHeader() {
  const header = document.getElementById("siteHeader");
  const burger = document.getElementById("burger");
  const menu = document.getElementById("mobileMenu");
  if (!header || !burger || !menu) return;
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
