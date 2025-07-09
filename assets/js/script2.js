$(document).ready(function () {
  const scrollTopBtn = $(".scrollTop_btn");

// (1) Scroll Header (Top 버튼 활성화)
  $(window).on("scroll", function () {
    let scroll = $(this).scrollTop();
    if (scroll > 60) {
      scrollTopBtn.addClass("On");
    } else {
      scrollTopBtn.removeClass("On");
    }
  });

    // (2) Top Button Scroll
  scrollTopBtn.on("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
});



/* 모달 위치 별도 수정 버전 */
// 스크롤 위치 저장 변수
let scrollPosition = 0;

// 모달 열기
function openModal(viewId) {
  const modal = document.getElementById("modal-" + viewId);
  if (modal) {
    // 현재 스크롤 위치 저장
    scrollPosition = window.pageYOffset || document.documentElement.scrollTop;

    // 모달 표시
    modal.style.display = "block";

    // 배경 스크롤 방지
    document.body.classList.add("modal-open");
    document.body.style.top = `-${scrollPosition}px`;
    document.body.style.position = "fixed";
    document.body.style.width = "100%";
  }
}

// 모달 닫기
function closeModal(viewId) {
  const modal = document.getElementById("modal-" + viewId);
  if (modal) {
    // 모달 숨기기
    modal.style.display = "none";

    // 배경 스크롤 복원
    document.body.classList.remove("modal-open");
    document.body.style.position = "";
    document.body.style.top = "";
    document.body.style.width = "";

    // 원래 스크롤 위치로 복원
    window.scrollTo(0, scrollPosition);
  }
}

// 모달 백그라운드 클릭시 닫기
document.addEventListener("click", function (e) {
  if (e.target.classList.contains("modal-wrap")) {
    // 열려있는 모달 찾기
    const openModal = e.target;
    const modalId = openModal.id.replace("modal-", "");
    closeModal(modalId);
  }
});

// ESC 키로 모달 닫기
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    const openModals = document.querySelectorAll(".modal-wrap");
    openModals.forEach((modal) => {
      if (modal.style.display === "block") {
        const modalId = modal.id.replace("modal-", "");
        closeModal(modalId);
      }
    });
  }
});

// 모달 내부 스크롤 방지 (터치 이벤트)
document.addEventListener(
  "touchmove",
  function (e) {
    if (document.body.classList.contains("modal-open")) {
      // 모달 내부 컨텐츠인지 확인
      const modalContent = e.target.closest(".modal-content");
      if (!modalContent) {
        e.preventDefault();
      }
    }
  },
  { passive: false }
);

// 모달 내부 스크롤 방지 (휠 이벤트)
document.addEventListener(
  "wheel",
  function (e) {
    if (document.body.classList.contains("modal-open")) {
      // 모달 내부 컨텐츠인지 확인
      const modalContent = e.target.closest(".modal-content");
      if (!modalContent) {
        e.preventDefault();
      }
    }
  },
  { passive: false }
);





// 스와이프
const postSwiper = new Swiper('.post-swiper', {
  slidesPerView: 3,
  spaceBetween: 24,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev'
  },
  pagination: {
    el: '.swiper-pagination',
    clickable: true
  },
  loop: true,
  breakpoints: {
    1024: { slidesPerView: 3 },
    768: { slidesPerView: 2 },
    0: { slidesPerView: 1 }
  }
});