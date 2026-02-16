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

// Карусель хитов продаж — бесконечная вправо + стрелки
const slider = document.getElementById('hitsSlider');
if (!slider) return;

const cards = Array.from(slider.children);
if (cards.length < 2) return;

let cardWidth = 0;
let gap = 0;
let autoScroll = null;
let currentIndex = 0;
let isAnimating = false;           // защита от спама кликов
let visibleCount = 4;               // начальное значение

function updateDimensions() {
  if (cards.length === 0) return;
  
  gap = parseFloat(getComputedStyle(slider).gap) || 0;
  cardWidth = cards[0].offsetWidth + gap;
  
  const containerWidth = slider.parentElement.offsetWidth;
  visibleCount = Math.max(1, Math.floor(containerWidth / cardWidth));
  
  // Пересчитываем позицию, чтобы не было скачков после ресайза
  slider.style.transition = 'none';
  slider.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
  
  // Даём браузеру время применить стиль
  requestAnimationFrame(() => {
    slider.style.transition = 'transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
  });
}

updateDimensions();
window.addEventListener('resize', updateDimensions);

function moveSlider(direction = 1) { // 1 = вправо, -1 = влево
  if (isAnimating) return;
  isAnimating = true;

  currentIndex += direction;

  // ─── Бесконечность вправо ───
  if (currentIndex > cards.length - visibleCount) {
    // Сначала доходим до конца с анимацией
    slider.style.transform = `translateX(-${(cards.length - visibleCount) * cardWidth}px)`;
    
    setTimeout(() => {
      slider.style.transition = 'none';
      currentIndex = 0;
      slider.style.transform = `translateX(0px)`;
      
      requestAnimationFrame(() => {
        slider.style.transition = 'transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        isAnimating = false;
      });
    }, 600); // должно совпадать с длительностью transition
    
    return;
  }

  // ─── Бесконечность влево ───
  if (currentIndex < 0) {
    // Сначала прыгаем в самый конец с анимацией
    slider.style.transform = `translateX(-${(cards.length - visibleCount) * cardWidth}px)`;
    
    setTimeout(() => {
      slider.style.transition = 'none';
      currentIndex = cards.length - visibleCount;
      slider.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
      
      requestAnimationFrame(() => {
        slider.style.transition = 'transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        isAnimating = false;
      });
    }, 600);
    
    return;
  }

  // Обычное перемещение
  slider.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
  
  setTimeout(() => {
    isAnimating = false;
  }, 650);
}

// Автоскролл
function startAutoScroll() {
  if (autoScroll) clearInterval(autoScroll);
  autoScroll = setInterval(() => moveSlider(1), 4000);
}

startAutoScroll();

// Пауза при наведении
slider.addEventListener('mouseenter', () => {
  if (autoScroll) clearInterval(autoScroll);
});

slider.addEventListener('mouseleave', () => {
  startAutoScroll();
});

// Стрелки
document.querySelector('.slider-prev')?.addEventListener('click', () => {
  clearInterval(autoScroll);
  moveSlider(-1);
  setTimeout(startAutoScroll, 8000);
});

document.querySelector('.slider-next')?.addEventListener('click', () => {
  clearInterval(autoScroll);
  moveSlider(1);
  setTimeout(startAutoScroll, 8000);
});





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



