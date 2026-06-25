/* 작품 데이터 */
const works = {
  "2025": [
    ["러시아혁명 인포그래픽", "Editorial Design", "img/work1.jpg"],
    ["아마드티 북렛", "Editorial Design", "img/work2.jpg"],
    ["초콜릿 패키지", "Package Design", "img/work3.jpg"],
    ["알바몬 CI", "Branding Design", "img/work4.jpg"],
    ["도서전 포스터", "Graphic Design", "img/work5.jpg"],
    ["스컬판다 웹사이트", "Web Design", "img/work6.jpg"]
  ],

  "2026": [
    ["러시아혁명 인포그래픽", "Editorial Design", "img/work1.jpg"],
    ["아마드티 북렛", "Editorial Design", "img/work2.jpg"],
    ["초콜릿 패키지", "Package Design", "img/work3.jpg"],
    ["알바몬 CI", "Branding Design", "img/work4.jpg"],
    ["도서전 포스터", "Graphic Design", "img/work5.jpg"],
    ["스컬판다 웹사이트", "Web Design", "img/work6.jpg"]
  ]
};

/* 연도별 작품 표시 */
function setYear(year) {
  const grid = document.getElementById("workGrid");

  grid.innerHTML = "";

  document.querySelectorAll(".year-tabs button").forEach(function (button) {
    button.classList.remove("active");
  });

  const activeTab = document.getElementById("tab-" + year);

  if (activeTab) {
    activeTab.classList.add("active");
  }

  works[year].forEach(function (item, index) {
    const card = document.createElement("div");
    card.className = "work-card";

    card.innerHTML = `
      <h3>${String(index + 1).padStart(2, "0")}<br>${item[0]}</h3>
      <small>${item[1]}</small>

      <div class="thumb">
        <img src="${item[2]}" alt="${item[0]}">
      </div>

      <div class="arrow">→</div>
    `;

    grid.appendChild(card);
  });
}

/* 사각형 블록 생성 */
const pixelTransition = document.getElementById("pixelTransition");

for (let i = 0; i < 150; i++) {
  const block = document.createElement("span");

  block.style.left = Math.random() * 100 + "%";
  block.style.top = Math.random() * 100 + "%";
  block.style.width = Math.random() * 90 + 20 + "px";
  block.style.height = Math.random() * 55 + 18 + "px";
  block.style.transitionDelay = Math.random() * 0.55 + "s";

  pixelTransition.appendChild(block);
}

/* contact, side label 제어 */
const contactBar = document.getElementById("contactBar");
const sideLabel = document.getElementById("sideLabel");

window.addEventListener("scroll", function () {
  const scrollAmount = window.scrollY;
  const heroHeight = window.innerHeight;

  /* 메인 화면에서는 contact 숨김 */
  if (scrollAmount > heroHeight * 0.75) {
    contactBar.classList.add("show");
    sideLabel.classList.add("show");
  } else {
    contactBar.classList.remove("show");
    sideLabel.classList.remove("show");
  }

  /* 메인에서 내려갈 때 사각형 전환 */
  if (scrollAmount > heroHeight * 0.12 && scrollAmount < heroHeight * 0.95) {
    pixelTransition.classList.add("active");
  } else {
    pixelTransition.classList.remove("active");
  }
});

/* 현재 섹션 이름 변경 */
const sections = document.querySelectorAll(".section-observe");

const observer = new IntersectionObserver(
  function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        sideLabel.textContent = entry.target.dataset.label;
      }
    });
  },
  {
    threshold: 0.45
  }
);

sections.forEach(function (section) {
  observer.observe(section);
});

/* 처음에는 2026 작품 표시 */
setYear("2026");