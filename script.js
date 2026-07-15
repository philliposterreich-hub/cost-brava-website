document.addEventListener("DOMContentLoaded", () => {
  // --- 1. THEME TOGGLE (LIGHT / DARK) ---
  const themeToggleBtn = document.querySelector(".theme-toggle");
  const currentTheme = localStorage.getItem("theme") || "light";

  // Set initial theme
  document.documentElement.setAttribute("data-theme", currentTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", () => {
      const activeTheme = document.documentElement.getAttribute("data-theme");
      const newTheme = activeTheme === "light" ? "dark" : "light";
      
      document.documentElement.setAttribute("data-theme", newTheme);
      localStorage.setItem("theme", newTheme);
    });
  }

  // --- 2. LANGUAGE SWITCHER LOGIC ---
  const langBtn = document.querySelector(".lang-btn");
  const langDropdown = document.querySelector(".lang-dropdown");
  const currentLang = localStorage.getItem("lang") || "en";

  // Set initial language on load
  setLanguage(currentLang);

  // Toggle Language Dropdown menu
  if (langBtn && langDropdown) {
    langBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      langDropdown.classList.toggle("show");
    });

    // Close dropdown when clicking outside
    document.addEventListener("click", () => {
      langDropdown.classList.remove("show");
    });
  }

  // Handle language selection
  const langOptions = document.querySelectorAll(".lang-dropdown button");
  langOptions.forEach(btn => {
    btn.addEventListener("click", () => {
      const selectedLang = btn.getAttribute("data-lang");
      setLanguage(selectedLang);
      localStorage.setItem("lang", selectedLang);
      if (langDropdown) langDropdown.classList.remove("show");
    });
  });

  // Global Language Setter Function
  function setLanguage(lang) {
    // A. Update html tag lang attribute (toggles .en-text / .ru-text via CSS)[cite: 2, 6]
    document.documentElement.setAttribute("lang", lang);
    
    // B. Update visible label on the switcher button[cite: 6]
    const langDisplay = document.querySelector(".current-lang");
    if (langDisplay) {
      langDisplay.textContent = lang === "en" ? "EN" : "RU";
    }

    // C. Dynamic Placeholder Updates (For textareas and inputs)[cite: 4]
    document.querySelectorAll('[data-placeholder-en]').forEach(el => {
      const enPlaceholder = el.getAttribute('data-placeholder-en');
      const ruPlaceholder = el.getAttribute('data-placeholder-ru');
      el.placeholder = lang === 'en' ? enPlaceholder : ruPlaceholder;
    });
  }

  // --- 3. MOBILE BURGER MENU ---
  const burgerBtn = document.querySelector(".burger");
  const mobileNav = document.querySelector(".mobile-nav");

  if (burgerBtn && mobileNav) {
    burgerBtn.addEventListener("click", () => {
      burgerBtn.classList.toggle("active");
      mobileNav.classList.toggle("active");
      document.body.classList.toggle("no-scroll");
    });

    // Close mobile menu when clicking on a link
    const mobileLinks = mobileNav.querySelectorAll("a");
    mobileLinks.forEach(link => {
      link.addEventListener("click", () => {
        burgerBtn.classList.remove("active");
        mobileNav.classList.remove("active");
        document.body.classList.remove("no-scroll");
      });
    });
  }

  // --- 4. FORM SUBMISSION HANDLING ---
  const form = document.querySelector("[data-cb-form]");
  const formSuccess = document.querySelector(".form-success");

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      
      // Basic validation check
      if (form.checkValidity()) {
        // Hide form and show success state
        form.style.display = "none";
        if (formSuccess) {
          formSuccess.style.display = "block";
        }
      } else {
        form.classList.add("was-validated");
      }
    });
  }

  // --- 5. SCROLL REVEAL ANIMATIONS ---
  const revealElements = document.querySelectorAll(".reveal");

  const revealOnScroll = () => {
    const triggerBottom = (window.innerHeight / 5) * 4;

    revealElements.forEach(el => {
      const elTop = el.getBoundingClientRect().top;

      if (elTop < triggerBottom) {
        el.classList.add("active");
      }
    });
  };

  window.addEventListener("scroll", revealOnScroll);
  revealOnScroll(); // Trigger initial check on load
});
