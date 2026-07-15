// ============ COSTA BRAVA — shared behaviors ============

/* Theme Initialization */
(function initTheme(){
  const saved = localStorage.getItem('cb-theme');
  const theme = saved || 'light';
  document.documentElement.setAttribute('data-theme', theme);
})();

document.addEventListener('DOMContentLoaded', () => {

  /* ---- Theme toggle ---- */
  const themeBtn = document.querySelector('.theme-toggle');
  if(themeBtn){
    themeBtn.addEventListener('click', () => {
      const cur = document.documentElement.getAttribute('data-theme');
      const next = cur === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('cb-theme', next);
    });
  }

  /* ---- Header solid on scroll ---- */
  const header = document.querySelector('.site-header');
  const onScrollHeader = () => {
    if(!header) return;
    if(window.scrollY > 60) header.classList.add('solid');
    else header.classList.remove('solid');
  };
  onScrollHeader();
  window.addEventListener('scroll', onScrollHeader, { passive:true });

  /* ---- Mobile nav ---- */
  const burger = document.querySelector('.burger');
  const mobileNav = document.querySelector('.mobile-nav');
  if(burger && mobileNav){
    burger.addEventListener('click', () => {
      burger.classList.toggle('open');
      mobileNav.classList.toggle('open');
      document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : '';
    });
    mobileNav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      burger.classList.remove('open');
      mobileNav.classList.remove('open');
      document.body.style.overflow = '';
    }));
  }

  /* ---- Scroll reveal ---- */
  const revealEls = document.querySelectorAll('.reveal');
  if('IntersectionObserver' in window){
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if(entry.isIntersecting){
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('in'));
  }

  /* ---- Animated counters ---- */
  const counters = document.querySelectorAll('.stat .num');
  const animateCounter = (el) => {
    const target = parseFloat(el.dataset.count);
    if(isNaN(target)) return;
    const suffixEl = el.querySelector('.suffix');
    const suffix = suffixEl ? suffixEl.outerHTML : '';
    const duration = 1600;
    const start = performance.now();
    const step = (now) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      const val = Math.round(target * eased);
      el.innerHTML = val + suffix;
      if(p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  if('IntersectionObserver' in window && counters.length){
    const cIo = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if(entry.isIntersecting){
          animateCounter(entry.target);
          cIo.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });
    counters.forEach(el => cIo.observe(el));
  }

  /* ---- Back to top ---- */
  const toTop = document.querySelector('.to-top');
  if(toTop){
    window.addEventListener('scroll', () => {
      if(window.scrollY > 700) toTop.classList.add('show');
      else toTop.classList.remove('show');
    }, { passive:true });
    toTop.addEventListener('click', () => window.scrollTo({ top:0, behavior:'smooth' }));
  }

  /* ---- Forms: client-side validation + success state ---- */
  document.querySelectorAll('form[data-cb-form]').forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if(!form.checkValidity()){
        form.reportValidity();
        return;
      }
      const success = form.parentElement.querySelector('.form-success') || document.getElementById('form-success');
      form.reset();
      if(success){
        success.classList.add('show');
        success.scrollIntoView({ behavior:'smooth', block:'center' });
      }
    });
  });

});

// =====================================================================
// MULTILINGUAL TRANSLATION ENGINE (ADDED)
// =====================================================================
const translations = {
  en: {
    nav_home: "Home",
    nav_about: "About",
    nav_services: "Services",
    nav_clients: "Clients",
    nav_careers: "Careers",
    nav_contact: "Contact",
    btn_quote: "Get Quote",
    hero_title: "Complete Construction & MEP Solutions",
    hero_subtitle: "Costa Brava delivers comprehensive construction, engineering and maintenance solutions for industrial, commercial and residential projects across Uzbekistan.",
    hero_btn1: "Get a Commercial Offer",
    hero_btn2: "Our Projects",
    careers_title: "Build the Future with Us",
    careers_sub: "We are growing a team of engineers and builders setting quality standards in Uzbekistan.",
    service_construction: "Construction",
    service_civil: "Civil Construction",
    service_renovation: "Building Renovation & Fit-Out",
    service_roofing: "Roofing & Waterproofing",
    service_flooring: "Epoxy & Industrial Flooring",
    service_mep: "MEP Engineering",
    service_hvac: "HVAC Systems",
    service_electrical: "Electrical Works",
    service_plumbing: "Plumbing & Drainage",
    service_fire: "Fire Fighting & Fire Alarm Systems",
    service_low_current: "Low Current Systems",
    service_maintenance: "Facility Maintenance"
  },
  ru: {
    nav_home: "Главная",
    nav_about: "О компании",
    nav_services: "Услуги",
    nav_clients: "Клиенты",
    nav_careers: "Карьера",
    nav_contact: "Контакты",
    btn_quote: "КП",
    hero_title: "Комплексные строительные и инженерные решения",
    hero_subtitle: "Costa Brava предлагает комплексные решения в сфере строительства, инженерии и технического обслуживания по всему Узбекистану.",
    hero_btn1: "Получить коммерческое предложение",
    hero_btn2: "Наши проекты",
    careers_title: "Стройте будущее вместе с нами",
    careers_sub: "Мы растим команду инженеров и строителей, которые задают стандарты качества в Узбекистане.",
    service_construction: "Строительство",
    service_civil: "Гражданское строительство",
    service_renovation: "Реконструкция и отделка",
    service_roofing: "Кровельные и гидроизоляционные работы",
    service_flooring: "Эпоксидные и промышленные полы",
    service_mep: "Инженерные системы (MEP)",
    service_hvac: "Системы ОВК",
    service_electrical: "Электромонтажные работы",
    service_plumbing: "Водоснабжение и канализация",
    service_fire: "Системы пожаротушения",
    service_low_current: "Слаботочные системы",
    service_maintenance: "Техническое обслуживание"
  }
};

document.addEventListener("DOMContentLoaded", () => {
  let currentLang = localStorage.getItem("cb-lang") || "en";
  
  function updateLanguage(lang) {
    document.querySelectorAll("[data-i18n]").forEach(el => {
      const key = el.getAttribute("data-i18n");
      if (translations[lang] && translations[lang][key]) {
        el.textContent = translations[lang][key];
      }
    });
    
    const langDisplay = document.getElementById("current-lang-display");
    if (langDisplay) {
      langDisplay.textContent = lang === "en" ? "EN" : "RU";
    }
  }

  updateLanguage(currentLang);

  const langToggleBtn = document.querySelector('.lang-toggle-btn');
  const langDropdown = document.querySelector('.lang-dropdown');
  
  if (langToggleBtn && langDropdown) {
    langToggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      langDropdown.classList.toggle('show');
    });

    document.addEventListener('click', () => {
      langDropdown.classList.remove('show');
    });
  }

  document.querySelectorAll("[data-lang-switch]").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const selectedLang = e.target.getAttribute("data-lang-switch");
      localStorage.setItem("cb-lang", selectedLang);
      updateLanguage(selectedLang);
    });
  });
});
