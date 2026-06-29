gsap.registerPlugin(ScrollTrigger);

/* ---------------------------
   WORK DATA
---------------------------- */

const works = {
  "2025": [
  
  ],
  "2026": [
    ["알바몬 리브랜딩","Brand Identity Design","img/work1.jpg", "기존 알바몬의 친근한 이미지를 유지하면서도 더욱 현대적이고 직관적인 브랜드 아이덴티티를 제안한 리브랜딩 프로젝트입니다. 심벌과 로고, 컬러 시스템, 응용 그래픽을 재설계하고 브랜드 가이드라인과 다양한 어플리케이션을 함께 제작했습니다."],
    ["커피 패키지", "Package Design", "img/work2.jpg","커피 원산지의 문화와 개성을 그래픽으로 표현한 패키지 디자인 프로젝트입니다. 에티오피아, 케냐, 콜롬비아를 주제로 각각의 특징을 흑백 라인 일러스트와 컬러 시스템으로 구성하여 통일감 있는 시리즈 패키지를 제작했습니다."],
    ["서울국제도서전 포스터 및 굿즈", "Graphic Design / Goods Design", "img/work3.jpg","'길'과 '지식의 빛'이라는 키워드를 중심으로 서울국제도서전의 메인 포스터와 굿즈를 디자인했습니다. 타이포그래피와 추상적인 그래픽 요소를 활용하여 독서와 지식으로 향하는 여정을 시각적으로 표현했습니다."],
    ["브레히트 시선집", "Editorial Design", "img/work4.jpg","브레히트의 시 「분서」를 중심으로 검열과 저항이라는 메시지를 시각적으로 해석한 북디자인 프로젝트입니다. 절제된 타이포그래피와 검은 마커, 스탬프 그래픽을 활용하여 시대적 분위기와 작품의 긴장감을 담아냈습니다."],
    ["스컬판다 프로모션 웹", "Web Design", "img/work5.jpg","팝마트의 캐릭터 브랜드 스컬판다를 위한 프로모션 웹사이트입니다. 캐릭터의 세계관과 분위기를 반영한 인터랙션과 모션을 적용하여 브랜드 경험을 강화하고, 제품과 시리즈를 효과적으로 소개할 수 있는 웹 인터페이스를 설계했습니다."],
    ["러시아혁명 110주년 기념 리플렛", "Editorial / Infographic Design", "img/work6.jpg","러시아혁명 110주년을 기념하여 제작한 인포그래픽 리플렛입니다. 복잡한 역사적 사건을 정보 구조화와 시각화 기법으로 정리하였으며, 러시아 구성주의 그래픽과 편집 디자인을 현대적으로 재해석하여 하나의 아카이브 형태로 구성했습니다."]
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
article.querySelector(".work-thumb").addEventListener("click", () => {
  openModal(item);
});

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

const cols = 60;
const rows = 60;
const pieceW = 100 / cols;
const pieceH = 100 / rows;

for (let row = 0; row < rows; row++) {
  for (let col = 0; col < cols; col++) {
    const piece = document.createElement("span");
    piece.className = "hero-piece";

    piece.style.left = `${col * pieceW}%`;
    piece.style.top = `${row * pieceH}%`;
    piece.style.width = `${pieceW + 0.05}%`;
    piece.style.height = `${pieceH + 0.05}%`;

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

const modal = document.getElementById("workModal");
const modalImg = document.getElementById("modalImg");
const modalTitle = document.getElementById("modalTitle");
const modalType = document.getElementById("modalType");
const modalDesc = document.getElementById("modalDesc");
const modalClose = document.getElementById("modalClose");
const modalBg = document.getElementById("modalBg");

function openModal(item) {
  modalImg.src = item[2];
  modalTitle.textContent = item[0];
  modalType.textContent = item[1];
  modalDesc.textContent = item[3];

  modal.classList.add("show");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  modal.classList.remove("show");
  document.body.style.overflow = "";
}

modalClose.addEventListener("click", closeModal);
modalBg.addEventListener("click", closeModal);

window.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeModal();
});

/* CUSTOM CURSOR */

const customCursor = document.getElementById("customCursor");

window.addEventListener("mousemove", (e) => {
  customCursor.style.left = `${e.clientX}px`;
  customCursor.style.top = `${e.clientY}px`;
});

document.querySelectorAll("a, button, .work-thumb").forEach((el) => {
  el.addEventListener("mouseenter", () => {
    customCursor.classList.add("hover");
  });

  el.addEventListener("mouseleave", () => {
    customCursor.classList.remove("hover");
  });
});