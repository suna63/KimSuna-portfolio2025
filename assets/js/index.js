// // Lenis 스크롤 초기화
// const lenis = new Lenis();

// // Lenis 스크롤 이벤트와 ScrollTrigger 연동
// lenis.on('scroll', ScrollTrigger.update);

// // GSAP ticker로 Lenis 애니메이션 프레임 업데이트
// gsap.ticker.add(time => {
//   lenis.raf(time * 1000);
// });

// GSAP lag smoothing 비활성화



gsap.ticker.lagSmoothing(0);

// 윈도우 로드 시 body에 'loaded' 클래스 추가
$(window).on('load', function() {
  $('body').addClass('loaded');
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
  
  // Lenis 스크롤 정지/재개
  if ($('body').hasClass('hidden')) {
    lenis.stop();
  } else {
    lenis.start();
  }
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
$('.header .group-mobile .gnb-list .gnb-item .link-about').click(function(e) {
  e.preventDefault();
  $('.header .group-mobile').removeClass('on');
  $('body').removeClass('hidden');
  $('.header .group-top .btn-menu').removeClass('on');
  lenis.start();
  
  gsap.to(window, {
    duration: 2,
    scrollTo: {
      y: '#about'
    },
    ease: 'power3.out'
  });
});

// 모바일 메뉴 Contact 링크 클릭
$('.header .group-mobile .gnb-list .gnb-item .link-contact').click(function(e) {
  e.preventDefault();
  $('.header .group-mobile').removeClass('on');
  $('body').removeClass('hidden');
  $('.header .group-top .btn-menu').removeClass('on');
  lenis.start();
  
  gsap.to(window, {
    duration: 2,
    scrollTo: {
      y: '#footer'
    },
    ease: 'power3.out'
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
    lenis.start();
  }
}

// ScrollTrigger batch 애니메이션
ScrollTrigger.batch('[data-batch]', {
  start: '0% 90%',
  onEnter: function(elements) {
    $(elements).addClass('on');
  }
});

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