// GSAP 플러그인 등록
gsap.registerPlugin(ScrollTrigger);

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
var swiper = new Swiper(".main-slide", {
  loop:true,
  autoplay: {
    delay: 4000,
    duration: 1,
    disableOnInteraction: false,
  },
  effect: "fade",
});

// 메인 슬라이드 배경 애니메이션
bgLine = gsap.timeline({ })
bgLine
.set('.main-visual .bg',{bottom:0,top:'auto'})
.to('.main-visual .bg',0.7,{ delay:2,height:'100%', stagger:{ from:"random", amount:0.2 } }) 
.to('.main-visual .bg',0.3,{ delay:1, height:'0', bottom:'auto', top:0, stagger:{ from:"random", amount:0.2 }, })
bgLine.repeat(-1);