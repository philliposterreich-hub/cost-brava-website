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
// =====================================================================
// MULTILINGUAL TOGGLE ENGINE (FIXED)
// =====================================================================
document.addEventListener("DOMContentLoaded", () => {
  // 1. Get saved language or default to English
  let currentLang = localStorage.getItem("cb-lang") || "en";
  
  // 2. Function to update the page language
  function setLanguage(lang) {
    // Update the html tag attribute so the CSS can hide/show the right spans
    document.documentElement.setAttribute("lang", lang);
    
    // Update the display text on the main language button
    const langDisplay = document.querySelector(".current-lang");
    if (langDisplay) {
      langDisplay.textContent = lang === "en" ? "EN" : "RU";
    }
  }

  // Apply the language on initial load
  setLanguage(currentLang);

  // 3. Handle the dropdown visibility
  const langBtn = document.querySelector('.lang-btn');
  const langDropdown = document.querySelector('.lang-dropdown');
  
  if (langBtn && langDropdown) {
    langBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      langDropdown.classList.toggle('show');
    });

    document.addEventListener('click', () => {
      langDropdown.classList.remove('show');
    });
  }

  // 4. Handle language switching when a dropdown button is clicked
  document.querySelectorAll("[data-lang]").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const selectedLang = e.target.getAttribute("data-lang");
      
      // Save preference and update page
      localStorage.setItem("cb-lang", selectedLang);
      setLanguage(selectedLang);
      
      // Close the dropdown
      if (langDropdown) langDropdown.classList.remove('show');
    });
  });
});
