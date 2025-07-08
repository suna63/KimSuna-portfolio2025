// Lenis 스크롤 초기화
const lenis = new Lenis();

// Lenis 스크롤 이벤트와 ScrollTrigger 연동
lenis.on('scroll', ScrollTrigger.update);

// GSAP ticker로 Lenis 애니메이션 프레임 업데이트
gsap.ticker.add(time => {
  lenis.raf(time * 1000);
});

// GSAP lag smoothing 비활성화
gsap.ticker.lagSmoothing(0);

// 윈도우 로드 시 body에 'loaded' 클래스 추가
$(window).on('load', function() {
  $('body').addClass('loaded');
});

// 로고 hover 효과
$('.header .group-top .logo a .name-wrap .name2').on('mouseover', function() {
  $('.header .group-top .logo a').hover(function() {
    $(this).addClass('on');
  }, function() {
    $(this).removeClass('on');
  });
});

// 메뉴 버튼 클릭 이벤트
$('.header .group-top .btn-menu').click(function() {
  $('.header .group-mobile').toggleClass('on');
  $('.header .group-mobile').toggleClass('on');
  $('body').toggleClass('hidden');
  $('.header .group-top .btn-menu').toggleClass('on');
  
  // body에 hidden 클래스가 있으면 Lenis 정지, 없으면 시작
  if ($('body').hasClass('hidden')) {
    lenis.stop();
  } else {
    lenis.start();
  }
});

// 윈도우 리사이즈 이벤트
$(window).resize(function() {
  sizeChk2();
});

// 초기 사이즈 체크
sizeChk2();

// 사이즈 체크 함수 2
function sizeChk2() {
  if ($(window).width() > 768) {
    $('.header .group-mobile').removeClass('on');
    $('.header .group-top .btn-menu').removeClass('on');
    $('body').removeClass('hidden');
    lenis.start();
  }
}

// 페이지네이션 슬라이드 (세로 방향)
const paginationSlide = new Swiper('.pagination-slide', {
  direction: 'vertical',
  mousewheel: true,
  loop: true,
  loopedSlides: 7,
  slidesPerView: 5,
  spaceBetween: 12,
  centeredSlides: true
});

// 프로젝트 슬라이드 (세로 방향)
const projectSlide = new Swiper('.project-slide', {
  direction: 'vertical',
  spaceBetween: 24,
  centeredSlides: true,
  mousewheel: {
    releaseOnEdges: 'true',
    eventsTarget: '.sc-project2'
  },
  loop: true,
  loopedSlides: 7,
  slidesPerView: 'auto',
  freeMode: {
    enabled: true,
    sticky: true
  }
});

// 슬라이드 변경 시 타이틀 업데이트
projectSlide.on('slideChange', function() {
  const currentIndex = this.realIndex;
  const titleElement = document.querySelector('.title');
  
  // hidden 클래스 추가하여 페이드 아웃
  titleElement.classList.add('hidden');
  
  // 320ms 후 텍스트 변경 및 페이드 인
  setTimeout(() => {
    titleElement.innerText = getProjectTitle(currentIndex);
    titleElement.classList.remove('hidden');
  }, 320);
});

// 프로젝트 타이틀 배열
function getProjectTitle(index) {
  const titles = [
    'EQL',
    'Enterprise Blockchain', 
    '40 Wonders',
    'Xexymix',
    'Andar',
    'Seoul City Hall',
    'Naver'
  ];
  return titles[index];
}

// 페이지네이션과 프로젝트 슬라이드 연동
projectSlide.controller.control = paginationSlide;

// 프로젝트 커서 따라다니기
$('.sc-project2 .project-slide .swiper-slide').mousemove(function(e) {
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

// GSAP 초기 설정
gsap.set('.sc-project2 .project-slide .swiper-slide .desc-wrap', {
  opacity: 0
});

gsap.set('.sc-project2 .project-slide .swiper-slide .desc-wrap .desc-box .desc', {
  opacity: 0
});

gsap.set('.sc-project2 .project-slide .swiper-slide .desc-wrap .desc-box .desc .line', {
  width: 0
});

// 윈도우 리사이즈 이벤트
$(window).resize(function() {
  sizeChk();
});

// 초기 사이즈 체크
sizeChk();

// 메인 사이즈 체크 함수
function sizeChk() {
  // 헤더 높이 계산
  const headerHeight = $('.header.style2 .group-top').innerHeight();
  $('.header .group-mobile').css('--top', headerHeight + 'px');
  
  // 모바일이 아닐 때만 hover 이벤트 적용
  if ($(window).width() >= 768) {
    // 기존 이벤트 제거
    $('.sc-project2 .project-slide .swiper-slide .content').off('mouseover mouseleave');
    
    // 마우스 오버 이벤트
    $('.sc-project2 .project-slide .swiper-slide .content').hover(function() {
      // 비디오 자동 재생
      if ($(this).find('video').length > 0) {
        const video = $(this).find('video').get(0).play();
        if (video !== undefined) {
          video.then(response => {
            video.play();
          }).catch(error => {
            // 자동 재생 실패 시 에러 무시
          });
        }
      }
      
      // 커서 및 이미지 효과
      $('.sc-project2 .project-cursor').addClass('on');
      $(this).find('.img').addClass('on');
      
      // 설명 애니메이션
      descTl = gsap.timeline();
      descTl
        .to($(this).find('.desc-wrap'), {
          opacity: 1,
          duration: 1
        }, 'a')
        .to($(this).find('.desc'), {
          opacity: 1,
          duration: 1,
          stagger: {
            each: 0.2
          }
        }, 'a+=.5')
        .to($(this).find('.desc-box').find('.line'), {
          width: '100%',
          duration: 1,
          stagger: {
            each: 0.7
          },
          ease: 'power1.out'
        }, 'a+=1');
    }, 
    // 마우스 리브 이벤트
    function() {
      // 커서 및 이미지 효과 제거
      $('.sc-project2 .project-cursor').removeClass('on');
      $(this).find('.img').removeClass('on');
      
      // 설명 숨기기
      gsap.to($(this).find('.desc-wrap'), {
        opacity: 0,
        duration: 1
      });
      
      // 비디오 정지 및 초기화
      if ($(this).find('video').length > 0) {
        $(this).find('video').get(0).pause();
        $(this).find('video').get(0).currentTime = 0;
      }
    });
  } else {
    // 모바일에서는 hover 이벤트 제거
    $('.sc-project2 .project-slide .swiper-slide .content').off('mouseover mouseleave');
  }
}