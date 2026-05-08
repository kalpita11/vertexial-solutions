document.addEventListener('DOMContentLoaded', function () {

  /* ── Navbar scroll ── */
  const nav = document.getElementById('mainNav');
  const onScroll = () => nav && nav.classList.toggle('scrolled', window.scrollY > 40);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ── MEGA MENU ── */
  const trigger = document.getElementById('servicesTrigger');
  const megaMenu = document.getElementById('megaMenu');
  const backdrop = document.getElementById('megaBackdrop');
  const chevron = document.getElementById('servChevron');
  let closeTimer = null;

  function openMega() {
    if (!megaMenu || !backdrop) return;
    clearTimeout(closeTimer);
    megaMenu.classList.add('show');
    backdrop.classList.add('show');

    if (trigger) {
      trigger.classList.add('mega-open');
      if (chevron) chevron.style.transform = 'rotate(180deg)';
    }

    window.addEventListener('scroll', closeMega, { once: true, passive: true });
  }

  function closeMega() {
    closeTimer = setTimeout(() => {
      if (!megaMenu || !backdrop) return;

      megaMenu.classList.remove('show');
      backdrop.classList.remove('show');

      if (trigger) {
        trigger.classList.remove('mega-open');
        if (chevron) chevron.style.transform = '';
      }
    }, 80);
  }

  if (trigger) {
    trigger.addEventListener('mouseenter', openMega);
    trigger.addEventListener('mouseleave', closeMega);
  }

  if (megaMenu) {
    megaMenu.addEventListener('mouseenter', () => clearTimeout(closeTimer));
    megaMenu.addEventListener('mouseleave', closeMega);
  }

  if (backdrop) {
    backdrop.addEventListener('click', () => {
      clearTimeout(closeTimer);
      closeMega();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      clearTimeout(closeTimer);
      closeMega();
    }
  });

  /* ── Tabs ── */
  document.querySelectorAll('.mega-tab').forEach(tab => {
    tab.addEventListener('mouseenter', () => {
      document.querySelectorAll('.mega-tab').forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.mega-panel').forEach(p => p.classList.remove('active'));

      tab.classList.add('active');
      const panel = document.getElementById('panel-' + tab.dataset.panel);
      if (panel) panel.classList.add('active');
    });
  });

  /* ── Mobile toggle ── */
  const mobToggle = document.getElementById('mobServicesToggle');
  const mobPanel = document.getElementById('mobServicesPanel');

  if (mobToggle && mobPanel) {
    mobToggle.addEventListener('click', (e) => {
      e.preventDefault();
      const open = mobPanel.classList.toggle('open');
      mobToggle.classList.toggle('open', open);
    });
  }

  /* ── Scroll reveal ── */
  const revEls = document.querySelectorAll('.rv, .rv-l, .rv-r');
  const ro = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('in');
        ro.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });

  revEls.forEach(el => ro.observe(el));

  /* ── Swiper ── */
  if (typeof Swiper !== 'undefined') {

    /* OUT SWIPER */
    const outSw = new Swiper('.outSwiper', {
      slidesPerView: 1,
      spaceBetween: 20,
      loop: true,

      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true
      },

      speed: 800,

      pagination: { el: '.cstm-pag', clickable: true },

      breakpoints: {
        576: { slidesPerView: 2 },
        992: { slidesPerView: 3 }
      }
    });

    document.getElementById('outPrev')?.addEventListener('click', () => outSw.slidePrev());
    document.getElementById('outNext')?.addEventListener('click', () => outSw.slideNext());

    /* TESTIMONIAL SWIPER */
    const testSw = new Swiper('.testiSwiper', {
      slidesPerView: 1,
      spaceBetween: 20,
      loop: true,

      autoplay: {
        delay: 4000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true
      },

      speed: 800,

      breakpoints: {
        640: { slidesPerView: 2 },
        1024: { slidesPerView: 3 }
      }
    });

    document.getElementById('testPrev')?.addEventListener('click', () => testSw.slidePrev());
    document.getElementById('testNext')?.addEventListener('click', () => testSw.slideNext());
  }

  /* ── Active nav ── */
  const secs = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.navbar-v .nav-link');

  window.addEventListener('scroll', () => {
    let cur = '';
    secs.forEach(s => {
      if (window.scrollY >= s.offsetTop - 90) cur = s.id;
    });

    navLinks.forEach(a => {
      a.classList.remove('active');
      if (a.getAttribute('href') === '#' + cur) {
        a.classList.add('active');
      }
    });
  }, { passive: true });

});


/* ── Ticker slider ── */
document.addEventListener("DOMContentLoaded", function () {
  const track = document.getElementById("tickerTrack");
  if (!track) return;

  const items = track.innerHTML;
  track.innerHTML += items;
});


// =================================================================================
document.addEventListener("DOMContentLoaded", function () {

  const section = document.querySelector(".fx-problem-section");
  const image = document.querySelector(".fx-problem-image");
  const leftCol = document.querySelector(".fx-problem-left");

  if (!section || !image || !leftCol) return;

  const OFFSET = 100; // distance from viewport top — match CSS top: 100px

  function update() {
    // Skip on mobile
    if (window.innerWidth < 992) {
      image.classList.remove("is-fixed", "is-bottom");
      image.style.left = "";
      image.style.width = "";
      return;
    }

    const sectionRect = section.getBoundingClientRect();
    const colRect = leftCol.getBoundingClientRect();
    const imageHeight = image.offsetHeight;

    const sectionTopReached = sectionRect.top <= OFFSET;
    const sectionBottomPassed = sectionRect.bottom <= imageHeight + OFFSET;

    if (sectionBottomPassed) {
      // Pin to bottom of left column
      image.classList.remove("is-fixed");
      image.classList.add("is-bottom");
      image.style.left = "";
      image.style.width = "";

    } else if (sectionTopReached) {
      // Stick to viewport
      image.classList.add("is-fixed");
      image.classList.remove("is-bottom");
      image.style.left = colRect.left + "px";
      image.style.width = colRect.width + "px";

    } else {
      // Normal flow — above fold
      image.classList.remove("is-fixed", "is-bottom");
      image.style.left = "";
      image.style.width = "";
    }
  }

  window.addEventListener("scroll", update, { passive: true });
  window.addEventListener("resize", update);  // recalculate on resize
  update(); // run once on load
});



document.addEventListener("DOMContentLoaded", function () {

    const outSw = new Swiper('.digital-marketing-works-swiper', {

        slidesPerView: 1,
        spaceBetween: 20,
        loop: true,

        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true
        },

        speed: 800,

        pagination: {
            el: '.dmw-custom-pag',
            clickable: true
        },

        breakpoints: {

            576: {
                slidesPerView: 1
            },

            768: {
                slidesPerView: 1
            },

            1200: {
                slidesPerView: 1
            }
        }
    });

});