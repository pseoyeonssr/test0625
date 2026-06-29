gsap.registerPlugin(ScrollTrigger);

/* ---------------------------
   WORK DATA
---------------------------- */

const works = {
  "2025": [
    ["러시아혁명 인포그래픽", "Editorial Design", "img/work1.jpg"],
    ["아마드티 북렛", "Editorial Design", "img/work2.jpg"],
    ["초콜릿 패키지", "Package Design", "img/work3.jpg"],
    ["알바몬 CI", "Branding Design", "img/work4.jpg"],
    ["서울국제도서전 포스터", "Graphic Design", "img/work5.jpg"],
    ["스컬판다 웹사이트", "Web Design", "img/work6.jpg"]
  ],
  "2026": [
    ["러시아혁명 인포그래픽", "Editorial Design", "img/work1.jpg"],
    ["브랜드 아이덴티티 가이드", "Branding Design", "img/work2.jpg"],
    ["패키지 디자인 시리즈", "Package Design", "img/work3.jpg"],
    ["편집 디자인 아카이브", "Editorial Design", "img/work4.jpg"],
    ["웹 포트폴리오", "Web Design", "img/work5.jpg"],
    ["전시 그래픽 시스템", "Graphic Design", "img/work6.jpg"]
  ]
};

const workList = document.getElementById("workList");

function setYear(year) {
  if (!works[year]) return;

  workList.innerHTML = "";

  document.querySelectorAll("[data-year]").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.year === year);
  });

  document.querySelectorAll("[data-year-link]").forEach((link) => {
    link.classList.toggle("active", link.dataset.yearLink === year);
  });

  works[year].forEach((item, index) => {
    const article = document.createElement("article");
    article.className = "work-item";

    article.innerHTML = `
      <div class="work-thumb">
        <img src="${item[2]}" alt="${item[0]} 이미지">
      </div>
      <div class="work-num">${String(index + 1).padStart(2, "0")}</div>
      <h3 class="work-title">${item[0]}</h3>
      <p class="work-type">${item[1]}</p>
      <div class="work-arrow">→</div>
    `;

    workList.appendChild(article);
  });

  gsap.from(".work-item", {
    y: 24,
    opacity: 0,
    duration: 0.45,
    stagger: 0.055,
    ease: "power2.out"
  });
}

document.querySelectorAll("[data-year]").forEach((btn) => {
  btn.addEventListener("click", () => {
    if (!btn.disabled) setYear(btn.dataset.year);
  });
});

document.querySelectorAll("[data-year-link]").forEach((link) => {
  link.addEventListener("click", () => {
    setYear(link.dataset.yearLink);
  });
});

window.addEventListener("DOMContentLoaded", () => {
  setYear("2026");
});

/* ---------------------------
   HERO RED DISSOLVE
---------------------------- */

const heroPieces = document.getElementById("heroPieces");

const cols = 24;
const rows = 14;
const pieceW = 100 / cols;
const pieceH = 100 / rows;

for (let row = 0; row < rows; row++) {
  for (let col = 0; col < cols; col++) {
    const piece = document.createElement("span");
    piece.className = "hero-piece";

    piece.style.left = `${col * pieceW}%`;
    piece.style.top = `${row * pieceH}%`;
    piece.style.width = `${pieceW + 0.08}%`;
    piece.style.height = `${pieceH + 0.08}%`;

    piece.dataset.row = row;
    piece.dataset.col = col;

    heroPieces.appendChild(piece);
  }
}

const pieces = gsap.utils.toArray(".hero-piece");

gsap.to(pieces, {
  y: (i, el) => {
    const row = Number(el.dataset.row);
    return 160 + row * 30 + gsap.utils.random(0, 260);
  },
  x: () => gsap.utils.random(-70, 70),
  rotation: () => gsap.utils.random(-12, 12),
  opacity: 0,
  ease: "none",
  stagger: {
    amount: 0.9,
    from: "end"
  },
  scrollTrigger: {
    trigger: ".hero",
    start: "top top",
    end: "+=120%",
    scrub: 0.7,
    pin: true
  }
});

gsap.to(".hero-content", {
  y: -80,
  opacity: 0,
  ease: "none",
  scrollTrigger: {
    trigger: ".hero",
    start: "top top",
    end: "+=80%",
    scrub: 0.7
  }
});

/* ---------------------------
   FIXED UI
---------------------------- */

const contactBar = document.getElementById("contactBar");
const sectionLabel = document.getElementById("sectionLabel");

function checkFixedUI() {
  const showPoint = window.innerHeight * 0.4;

  if (window.scrollY > showPoint) {
    contactBar.classList.add("show");
    sectionLabel.classList.add("show");
  } else {
    contactBar.classList.remove("show");
    sectionLabel.classList.remove("show");
  }
}

window.addEventListener("scroll", checkFixedUI);
checkFixedUI();

/* ---------------------------
   SECTION LABEL
---------------------------- */

const watchedSections = document.querySelectorAll(".section-watch");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        sectionLabel.textContent = entry.target.dataset.label;
      }
    });
  },
  {
    threshold: 0.45
  }
);

watchedSections.forEach((section) => observer.observe(section));

/* ---------------------------
   SECTION REVEAL MOTION
---------------------------- */

gsap.utils.toArray(".section").forEach((section) => {
  gsap.from(
    section.querySelectorAll(
      "h2, .section-kicker, .intro-text, .info-line, .skill-block"
    ),
    {
      y: 36,
      opacity: 0,
      duration: 0.65,
      stagger: 0.08,
      ease: "power2.out",
      scrollTrigger: {
        trigger: section,
        start: "top 78%",
        once: true
      }
    }
  );
});