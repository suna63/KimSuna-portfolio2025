// GSAP 플러그인 등록
gsap.registerPlugin(ScrollTrigger);

// GSAP lag smoothing 비활성화
gsap.ticker.lagSmoothing(0);

// 전역 변수 선언
let projectTl;
let bgLine;
let scrollPosition = 0;

// Lenis 관련 변수 (주석 처리된 기능이지만 일부 코드에서 참조됨)
// const lenis = new Lenis();
// lenis.on('scroll', ScrollTrigger.update);
// gsap.ticker.add(time => {
//   lenis.raf(time * 1000);
// });

// 윈도우 로드 시 body에 'loaded' 클래스 추가
$(window).on('load', function() {
  setTimeout(function() {
    $('body').addClass('loaded');
  }, 1800);
});

// hover 이벤트로 cursor on/off
$('.header .group-top .logo a .name-wrap').on('mouseover', function() {
  $('.header .group-top .logo a').hover(function() {
    $(this).addClass('on');
  }, function() {
    $(this).removeClass('on');
  });
});

// 메뉴 버튼 클릭 이벤트
$('.header .group-top .btn-menu').click(function() {
  $('.header .group-mobile').toggleClass('on');
  $('body').toggleClass('hidden');
  $('.header .group-top .btn-menu').toggleClass('on');
  
  // Lenis 스크롤 정지/재개 (주석 처리)
  // if ($('body').hasClass('hidden')) {
  //   lenis.stop();
  // } else {
  //   lenis.start();
  // }
});

// About 링크 클릭 이벤트
$('.gnb .gnb-list .gnb-item .link-about').click(function(e) {
  e.preventDefault();
  gsap.to(window, {
    duration: 2,
    scrollTo: {
      y: '#about'
    },
    ease: 'power3.out'
  });
});

// project 링크 클릭 이벤트
$('.gnb .gnb-list .gnb-item .link-project').click(function(e) {
  e.preventDefault();
  gsap.to(window, {
    duration: 2,
    scrollTo: {
      y: '#ui\\/ux'
    },
    ease: 'power3.out'
  });
});

// Contact 링크 클릭 이벤트  
$('.gnb .gnb-list .gnb-item .link-contact').click(function(e) {
  e.preventDefault();
  gsap.to(window, {
    duration: 2,
    scrollTo: {
      y: '#footer'
    },
    ease: 'power3.out'
  });
});

// 모바일 메뉴 About 링크 클릭
$('.header .group-mobile .gnb-list .gnb-item .link-about').off('click').on('click', function(e) {
  e.preventDefault();
  $('.header .group-mobile').removeClass('on');
  $('body').removeClass('hidden');
  $('.header .group-top .btn-menu').removeClass('on');
  document.querySelector('#about').scrollIntoView({ behavior: 'smooth' });
});

// 모바일 메뉴 Project 링크 클릭
$('.header .group-mobile .gnb-list .gnb-item .link-project').off('click').on('click', function(e) {
  e.preventDefault();
  $('.header .group-mobile').removeClass('on');
  $('body').removeClass('hidden');
  $('.header .group-top .btn-menu').removeClass('on');
  // id에 슬래시가 있으므로 getElementById 사용
  var el = document.getElementById('ui/ux') || document.querySelector('#ui\\/ux');
  if (el) el.scrollIntoView({ behavior: 'smooth' });
});

// 모바일 메뉴 Contact 링크 클릭
$('.header .group-mobile .gnb-list .gnb-item .link-contact').off('click').on('click', function(e) {
  e.preventDefault();
  $('.header .group-mobile').removeClass('on');
  $('body').removeClass('hidden');
  $('.header .group-top .btn-menu').removeClass('on');
  document.querySelector('#footer').scrollIntoView({ behavior: 'smooth' });
});

// 프로젝트 커서 따라다니기
$('.sc-project').mousemove(function(e) {
  const $cursor = $('.project-cursor [data-target="cursor"]');
  gsap.to($cursor, {
    x: e.clientX + 'px',
    y: e.clientY + 'px',
    duration: 0.7,
    stagger: {
      each: 0.1
    }
  });
});

// 프로젝트 영역 마우스 enter/leave
$('.sc-project .group-project').mouseenter(function() {
  $('.project-cursor').addClass('on');
});

$('.sc-project .group-project').mouseleave(function() {
  $('.project-cursor').removeClass('on');
});

// about 섹션 단어 초기 설정
gsap.set('.sc-about .group-title .title-area .line .word', {
  opacity: 0
});

// 윈도우 리사이즈 이벤트
$(window).resize(function() {
  sizeChk();
});

// 초기 사이즈 체크
sizeChk();

// 사이즈 체크 함수
function sizeChk() {
  // name2 요소 너비 계산 및 CSS 변수 설정
  $('.sc-learn .group-bottom .learn-list .learn-item .name2').each(function() {
    setTimeout(() => {
      const width = $(this).width() + 40;
      const nameOffset = $(this).siblings('.name-box').offset().left;
      const nameBoxOffset = $(this).parent('.name-wrap').offset().left;
      const offset = nameBoxOffset - nameOffset;
      const minusWidth = width * -1;
      
      $(this).parent('.name-wrap').css('--name2-width', width + 'px');
      $(this).parent('.name-wrap').css('--name-offset', offset + 'px');
      $(this).parent('.name-wrap').css('--minus-width', minusWidth + 'px');
    }, 100);
  });

  // 헤더 높이 계산
  const headerHeight = $('.header .group-top').innerHeight();
  $('.header .group-mobile').css('--top', headerHeight + 'px');

  // About 섹션 ScrollTrigger
  ScrollTrigger.create({
    trigger: '.sc-about',
    start: '0% 50%',
    onEnter: function() {
      // 단어 애니메이션
      gsap.to('.sc-about .group-title .title-area .line .word', {
        opacity: 1,
        duration: 1,
        ease: 'power1.inOut',
        stagger: {
          each: 0.3
        }
      });
      
      // orbit 애니메이션
      setTimeout(() => {
        gsap.to('.sphere', {
          duration: 7,
          ease: 'none',
          repeat: -1,
          motionPath: {
            path: '#orbitPath',
            align: '#orbitPath',
            alignOrigin: [0.5, 0.5]
          }
        });
      }, 100);
    }
  });

  // 모바일 대응
  if ($(window).innerHeight() < 768) {
    ScrollTrigger.batch('.header .group-mobile', {
      start: '0% 70%',
      end: '100% 70%',
      onEnter: function(elements) {
        $(elements).addClass('on');
      },
      onLeaveBack: function(elements) {
        $(elements).removeClass('on');
      }
    });
  } else {
    $('.header .group-mobile').removeClass('on');
    $('.header .group-mobile').removeClass('on');
    $('.header .group-top .btn-menu').removeClass('on');
    $('body').removeClass('hidden');
    // lenis.start(); // 주석 처리
  }
}

// ScrollTrigger batch 애니메이션
ScrollTrigger.batch('[data-batch]', {
  start: '0% 90%',
  onEnter: function(elements) {
    $(elements).addClass('on');
  }
});

// 모달 관련 함수들
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

// jQuery Document Ready
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

// 프로젝트 타임라인 애니메이션
projectTl = gsap.timeline({
  scrollTrigger: {
    trigger: '.group-project',
    start: '0% 0%',
    end: '100% 100%',
    scrub: 0
  },
  ease: 'none'
});

// 프로젝트 섹션 애니메이션 시퀀스 (p8은 화면에 남음)
projectTl
  .to('.sc-project .group-intro .sticky-intro', {
    bottom: '100%'
  })
  .to('.sc-project .group-project .sticky-project .p1', {
    bottom: '100%'
  })
  .to('.sc-project .group-project .sticky-project .p2', {
    bottom: '100%'
  })
  .to('.sc-project .group-project .sticky-project .p3', {
    bottom: '100%'
  })
  .to('.sc-project .group-project .sticky-project .p4', {
    bottom: '100%'
  })
  .to('.sc-project .group-project .sticky-project .p5', {
    bottom: '100%'
  })
  .to('.sc-project .group-project .sticky-project .p6', {
    bottom: '100%'
  })
  .to('.sc-project .group-project .sticky-project .p7', {
    bottom: '100%'
  });

// 메인 오버레이 어둡게
gsap.to('.overlay', {
  scrollTrigger: {
    trigger: ".main-visual",
    start: "0% 0%",
    end:"100% 0%",
    scrub: 1,
  },
  opacity:1,
});

// 메인 텍스트 좌우 퍼짐
const textList = document.querySelectorAll('.main-visual .row p');
textList.forEach(element => {
  xVal = element.dataset.x;
  gsap.to(element, {
      scrollTrigger: {
        trigger: ".main-visual",
        start: "0% 0%",
        end:"100% 0%",
        scrub: 1,
      },
      xPercent: xVal
    });
});

// 메인 슬라이드 스와이퍼
var mainSwiper = new Swiper(".main-slide", {
  loop:true,
  autoplay: {
    delay: 4000,
    duration: 1,
    disableOnInteraction: false,
  },
  effect: "fade",
});

// 포스트 스와이퍼
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

// 메인 슬라이드 배경 애니메이션
bgLine = gsap.timeline({ });
bgLine
.set('.main-visual .bg',{bottom:0,top:'auto'})
.to('.main-visual .bg',0.7,{ delay:2,height:'100%', stagger:{ from:"random", amount:0.2 } }) 
.to('.main-visual .bg',0.3,{ delay:1, height:'0', bottom:'auto', top:0, stagger:{ from:"random", amount:0.2 }, });
bgLine.repeat(-1);