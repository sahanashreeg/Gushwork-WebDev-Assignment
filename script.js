document.addEventListener('DOMContentLoaded', () => {
  
  // 1. Sticky Action Navigation Controller
  const stickyHeader = document.getElementById('sticky-header');
  let lastScrollY = window.scrollY;

  window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    if (currentScrollY > 500) {
      if (currentScrollY > lastScrollY) {
        stickyHeader.classList.add('active');
      } else {
        stickyHeader.classList.remove('active');
      }
    } else {
      stickyHeader.classList.remove('active');
    }
    lastScrollY = currentScrollY;
  }, { passive: true });

  // 2. Image Gallery Switcher
  const thumbnails = document.querySelectorAll('.thumb');
  const mainDisplayImg = document.getElementById('main-display-img');

  thumbnails.forEach(thumb => {
    thumb.addEventListener('click', function() {
      thumbnails.forEach(item => item.classList.remove('active'));
      this.classList.add('active');
      
      const targetImageSrc = this.getAttribute('data-src');
      if (mainDisplayImg && targetImageSrc) {
        mainDisplayImg.setAttribute('src', targetImageSrc);
      }
    });
  });

  // 3. Magnification Zoom Engine
  const zoomContainer = document.getElementById('zoom-container');

  if (zoomContainer && mainDisplayImg) {
    zoomContainer.addEventListener('mousemove', (e) => {
      const bounds = zoomContainer.getBoundingClientRect();
      const percentX = ((e.clientX - bounds.left) / bounds.width) * 100;
      const percentY = ((e.clientY - bounds.top) / bounds.height) * 100;
      
      mainDisplayImg.style.transformOrigin = `${percentX}% ${percentY}%`;
      mainDisplayImg.style.transform = 'scale(2.2)';
    });

    zoomContainer.addEventListener('mouseleave', () => {
      mainDisplayImg.style.transformOrigin = 'center center';
      mainDisplayImg.style.transform = 'scale(1)';
    });
  }

  // 4. Accordion Toggle
  const faqAccordionHeaders = document.querySelectorAll('.faq-header');
  faqAccordionHeaders.forEach(headerBlock => {
    headerBlock.addEventListener('click', function() {
      const parentRow = this.parentElement;
      const isOpen = parentRow.classList.contains('active');
      document.querySelectorAll('.faq-item').forEach(row => row.classList.remove('active'));
      if (!isOpen) parentRow.classList.add('active');
    });
  });

  // 5. Horizontal Carousel Scroll Tracks
  const initializeCarouselScroller = (scrollTrackSelector, triggerLeftArrow, triggerRightArrow) => {
    const horizontalScrollTrack = document.querySelector(scrollTrackSelector);
    const stepLeftTrigger = document.querySelector(triggerLeftArrow);
    const stepRightTrigger = document.querySelector(triggerRightArrow);

    if (!horizontalScrollTrack || !stepLeftTrigger || !stepRightTrigger) return;

    const singleStepScrollOffset = 340;

    stepRightTrigger.addEventListener('click', () => {
      horizontalScrollTrack.scrollBy({ left: singleStepScrollOffset, behavior: 'smooth' });
    });

    stepLeftTrigger.addEventListener('click', () => {
      horizontalScrollTrack.scrollBy({ left: -singleStepScrollOffset, behavior: 'smooth' });
    });
  };

  initializeCarouselScroller('.apps-scroll-row', '.arrow-left-apps', '.arrow-right-apps');
});
