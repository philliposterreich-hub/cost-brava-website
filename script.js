// ==========================================================================
// script.js - SHARED GLOBAL CONTROLLER FOR COSTA BRAVA WEB FRAMEWORK
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
  // --- 1. LANGUAGE SWITCHING CONTROLLER ---
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

    document.querySelectorAll('.lang-dropdown button').forEach(button => {
      button.addEventListener('click', (e) => {
        const selectedLang = e.currentTarget.getAttribute('data-lang');
        setLanguage(selectedLang);
        langDropdown.classList.remove('show');
      });
    });
  }

  function setLanguage(lang) {
    document.documentElement.setAttribute('lang', lang);
    localStorage.setItem('preferred-language', lang);
    const label = document.querySelector('.current-lang');
    if (label) label.textContent = lang.toUpperCase();
  }

  // --- 2. DARK/LIGHT MODE TOGGLER ---
  const themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    const sunIcon = themeToggle.querySelector('.sun-icon');
    const moonIcon = themeToggle.querySelector('.moon-icon');

    function setTheme(theme) {
      document.documentElement.setAttribute('data-theme', theme);
      localStorage.setItem('preferred-theme', theme);

      if (theme === 'dark') {
        if (sunIcon) sunIcon.style.display = 'block';
        if (moonIcon) moonIcon.style.display = 'none';
      } else {
        if (sunIcon) sunIcon.style.display = 'none';
        if (moonIcon) moonIcon.style.display = 'block';
      }
    }

    themeToggle.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      setTheme(newTheme);
    });

    // Sync icons on DOM load matching pre-loaded system theme
    const savedTheme = localStorage.getItem('preferred-theme') || 'light';
    setTheme(savedTheme);
  }

  // --- 3. ACTIVE CLASS ROUTER (AUTOMATIC DETECTION) ---
  const path = window.location.pathname.split("/").pop();
  const navLinks = document.querySelectorAll('.nav-links a');
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    const href = link.getAttribute('href');
    if (path === href || (path === "" && href === "index.html")) {
      link.classList.add('active');
    }
  });

  // --- 4. BACK TO TOP VISIBILITY TRACKING ---
  const backToTopBtn = document.querySelector('.back-to-top');
  if (backToTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) {
        backToTopBtn.classList.add('show');
      } else {
        backToTopBtn.classList.remove('show');
      }
    });

    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // --- 5. CONTACT & APPLICATION FORM ALERT RESPONDERS ---
  const forms = document.querySelectorAll('form');
  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const currentLang = document.documentElement.getAttribute('lang') || 'en';
      
      const messages = {
        en: "Thank you for contacting Costa Brava! We will get back to you shortly.",
        ru: "Спасибо за ваше обращение в Costa Brava! Мы свяжемся с вами в ближайшее время."
      };
      
      alert(messages[currentLang] || messages.en);
      form.reset();
    });
  });
});
