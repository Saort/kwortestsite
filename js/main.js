document.addEventListener('DOMContentLoaded', () => {
  // Меню (бургер, поиск, аккордеон)
  const burger = document.querySelector('.js-burger');
  const menu = document.querySelector('.main-nav__list');
  const searchOpen = document.querySelector('.js-search-open');
  const searchPanel = document.querySelector('.js-search-panel');

  // Бургер
  if (burger && menu) {
    burger.addEventListener('click', () => {
      const isOpen = burger.getAttribute('aria-expanded') === 'true';
      burger.setAttribute('aria-expanded', !isOpen ? 'true' : 'false');
      menu.classList.toggle('active');
    });
  }

  // Закрытие меню по крестику (если есть крестик ✕)
  if (menu) {
    menu.addEventListener('click', (e) => {
      if (e.target.textContent === '✕') {
        burger?.setAttribute('aria-expanded', 'false');
        menu.classList.remove('active');
      }
    });
  }

  // Поиск
  if (searchOpen && searchPanel) {
    searchOpen.addEventListener('click', () => {
      searchPanel.classList.toggle('active');
    });

    document.addEventListener('click', (e) => {
      if (!searchOpen.contains(e.target) && !searchPanel.contains(e.target)) {
        searchPanel.classList.remove('active');
      }
    });
  }

  // Аккордеон на мобильных
  document.querySelectorAll('.main-nav__item--mega > a, .main-nav__item--has-dropdown > a').forEach(link => {
    link.addEventListener('click', (e) => {
      if (window.innerWidth <= 1024) {
        e.preventDefault();
        link.parentElement.classList.toggle('active');
      }
    });
  });

  // Карусель хитов продаж
// === Бесконечная карусель вправо + стрелки ===
  const slider = document.getElementById('hitsSlider');
  if (!slider) return;

  const cards = slider.children;
  if (cards.length < 2) return;

  let cardWidth;
  let gap;
  let autoScroll;
  let currentIndex = 0;

  // Обновление размеров
  function updateDimensions() {
    gap = parseInt(getComputedStyle(slider).gap) || 40;
    cardWidth = cards[0].offsetWidth + gap;
  }

  updateDimensions();
  window.addEventListener('resize', updateDimensions);

  // Перемещение карусели
  function moveSlider(direction = 1) { // 1 = вправо, -1 = влево
    currentIndex += direction;

    const visibleCount = Math.floor(slider.parentElement.offsetWidth / cardWidth) || 4;

    // Бесконечность вправо
    if (currentIndex >= cards.length - visibleCount + 1) {
      currentIndex = 0;
      slider.style.transition = 'none';
      slider.style.transform = `translateX(0px)`;
      requestAnimationFrame(() => {
        slider.style.transition = 'transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
      });
    }
    // Бесконечность влево
    else if (currentIndex < 0) {
      currentIndex = cards.length - visibleCount;
      slider.style.transition = 'none';
      slider.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
      requestAnimationFrame(() => {
        slider.style.transition = 'transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
      });
    }
    else {
      slider.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
    }
  }

  // Автоскролл вправо
  autoScroll = setInterval(() => moveSlider(1), 4000);

  // Пауза при наведении
  slider.addEventListener('mouseenter', () => clearInterval(autoScroll));
  slider.addEventListener('mouseleave', () => {
    autoScroll = setInterval(() => moveSlider(1), 4000);
  });

  // Стрелки
  const prevBtn = document.querySelector('.slider-prev');
  const nextBtn = document.querySelector('.slider-next');

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      clearInterval(autoScroll);
      moveSlider(-1);
      // Возобновляем автоскролл через 8 сек после ручного клика
      setTimeout(() => {
        autoScroll = setInterval(() => moveSlider(1), 4000);
      }, 8000);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      clearInterval(autoScroll);
      moveSlider(1);
      setTimeout(() => {
        autoScroll = setInterval(() => moveSlider(1), 4000);
      }, 8000);
    });
  }






const btn = document.querySelector('.back-to-top');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
      btn.classList.add('show');
    } else {
      btn.classList.remove('show');
    }
  });

  btn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
});





document.querySelectorAll('.js-toggle').forEach(btn => {
  btn.addEventListener('click', () => {
    const expanded = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', !expanded);
    
    const content = document.getElementById(btn.getAttribute('aria-controls'));
    content.style.maxHeight = expanded ? '0' : `${content.scrollHeight}px`;
    content.setAttribute('aria-hidden', expanded);
  });
});



