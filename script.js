document.addEventListener("DOMContentLoaded", () => {
  
  // ==========================================
  // 1. THEME TOGGLE (LIGHT / DARK)
  // ==========================================
  const themeToggleBtn = document.querySelector(".theme-toggle");
  const savedTheme = localStorage.getItem("theme") || "light";

  document.documentElement.setAttribute("data-theme", savedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", () => {
      const activeTheme = document.documentElement.getAttribute("data-theme");
      const newTheme = activeTheme === "light" ? "dark" : "light";
      
      document.documentElement.setAttribute("data-theme", newTheme);
      localStorage.setItem("theme", newTheme);
    });
  }

  // ==========================================
  // 2. LANGUAGE SWITCHER (FIXED & DYNAMIC)
  // ==========================================
  const langBtn = document.querySelector(".lang-btn");
  const langDropdown = document.querySelector(".lang-dropdown");
  const savedLang = localStorage.getItem("lang") || "en";

  setLanguage(savedLang);

  if (langBtn && langDropdown) {
    langBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      langDropdown.classList.toggle("show");
    });

    document.addEventListener("click", () => {
      langDropdown.classList.remove("show");
    });
  }

  const langOptions = document.querySelectorAll(".lang-dropdown button, [data-lang]");
  langOptions.forEach(btn => {
    btn.addEventListener("click", () => {
      const selectedLang = btn.getAttribute("data-lang");
      if (selectedLang) {
        setLanguage(selectedLang);
        localStorage.setItem("lang", selectedLang);
        if (langDropdown) langDropdown.classList.remove("show");
      }
    });
  });

  function setLanguage(lang) {
    // Switch language classes via CSS toggle[cite: 2, 6]
    document.documentElement.setAttribute("lang", lang);
    
    // Fix current lang display badge[cite: 6]
    const langDisplay = document.querySelector(".current-lang");
    if (langDisplay) {
      langDisplay.textContent = lang === "en" ? "EN" : "RU";
    }

    // Dynamic placeholder replacement loop[cite: 4]
    document.querySelectorAll('[data-placeholder-en]').forEach(el => {
      const enPlaceholder = el.getAttribute('data-placeholder-en');
      const ruPlaceholder = el.getAttribute('data-placeholder-ru');
      el.placeholder = lang === 'en' ? enPlaceholder : ruPlaceholder;
    });
  }

  // ==========================================
  // 3. MOBILE BURGER NAVIGATION MENU
  // ==========================================
  const burgerBtn = document.querySelector(".burger");
  const mobileNav = document.querySelector(".mobile-nav");

  if (burgerBtn && mobileNav) {
    burgerBtn.addEventListener("click", () => {
      burgerBtn.classList.toggle("active");
      mobileNav.classList.toggle("active");
      document.body.classList.toggle("no-scroll");
    });

    const mobileLinks = mobileNav.querySelectorAll("a");
    mobileLinks.forEach(link => {
      link.addEventListener("click", () => {
        burgerBtn.classList.remove("active");
        mobileNav.classList.remove("active");
        document.body.classList.remove("no-scroll");
      });
    });
  }

  // ==========================================
  // 4. ACTIVE NAVIGATION LINK HIGH-LIGHTER
  // ==========================================
  const currentPath = window.location.pathname.split("/").pop() || "index.html";
  const navLinks = document.querySelectorAll(".nav-links a, .mobile-nav a");
  
  navLinks.forEach(link => {
    const linkPath = link.getAttribute("href");
    if (linkPath === currentPath) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });

  // ==========================================
  // 5. TELEGRAM API FORM SUBMISSION & VALIDATION
  // ==========================================
  const forms = document.querySelectorAll("[data-cb-form], form");

  forms.forEach(form => {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      
      const successContainer = form.nextElementSibling && form.nextElementSibling.classList.contains("form-success") 
        ? form.nextElementSibling 
        : document.querySelector(".form-success");

      if (!form.checkValidity()) {
        form.classList.add("was-validated");
        return;
      }

      // Collect form payload data safely
      const formData = new FormData(form);
      let messageText = `📬 *New Form Submission (Costa Brava Website)*\n\n`;
      
      formData.forEach((value, key) => {
        if(value.trim() !== "") {
          messageText += `🔹 *${key.charAt(0).toUpperCase() + key.slice(1)}:* ${value}\n`;
        }
      });

      // Insert your Telegram credentials here
      const BOT_TOKEN = "YOUR_TELEGRAM_BOT_TOKEN";
      const CHAT_ID = "YOUR_TELEGRAM_CHAT_ID";
      const TELEGRAM_URL = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;

      try {
        const response = await fetch(TELEGRAM_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: CHAT_ID,
            text: messageText,
            parse_mode: "Markdown"
          })
        });

        if (response.ok) {
          form.reset();
          form.classList.remove("was-validated");
          form.style.display = "none";
          if (successContainer) {
            successContainer.style.display = "block";
          }
        } else {
          alert("Submission error. Please try again.");
        }
      } catch (error) {
        console.error("Error submitting form:", error);
        alert("Network error. Please try again later.");
      }
    });
  });

  // ==========================================
  // 6. INPUT TELEPHONE MASK
  // ==========================================
  const phoneInputs = document.querySelectorAll('input[type="tel"]');
  phoneInputs.forEach(input => {
    input.addEventListener("input", (e) => {
      let x = e.target.value.replace(/\D/g, '').match(/(\d{0,3})(\d{0,2})(\d{0,3})(\d{0,2})(\d{0,2})/);
      if (!x[2]) {
        e.target.value = x[1] ? `+${x[1]}` : '';
      } else {
        e.target.value = `+${x[1]} (${x[2]}) ` + (x[3] ? `${x[3]}` : '') + (x[4] ? `-${x[4]}` : '') + (x[5] ? `-${x[5]}` : '');
      }
    });
  });

  // ==========================================
  // 7. ANIMATED STATS NUMERICAL COUNTERS
  // ==========================================
  const counters = document.querySelectorAll(".counter-num, .stat-number");
  
  const startCounter = (counter) => {
    const target = +counter.getAttribute("data-target") || 100;
    const speed = 200;
    const increment = target / speed;

    const updateCount = () => {
      const count = +counter.innerText.replace('+', '');
      if (count < target) {
        counter.innerText = Math.ceil(count + increment) + "+";
        setTimeout(updateCount, 1);
      } else {
        counter.innerText = target + "+";
      }
    };
    updateCount();
  };

  // ==========================================
  // 8. SCROLL REVEAL ANIMATIONS & OBSERVER
  // ==========================================
  const revealElements = document.querySelectorAll(".reveal, .reveal-stagger");

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
        
        // If this section has counters inside, trigger them
        const elementCounters = entry.target.querySelectorAll(".counter-num, .stat-number");
        elementCounters.forEach(counter => startCounter(counter));
        
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  revealElements.forEach(el => revealObserver.observe(el));

  // ==========================================
  // 9. MODAL WINDOW POPUPS (IF ANY)
  // ==========================================
  const modalTriggers = document.querySelectorAll("[data-modal-open]");
  const modalCloses = document.querySelectorAll("[data-modal-close]");

  modalTriggers.forEach(trigger => {
    trigger.addEventListener("click", () => {
      const modalId = trigger.getAttribute("data-modal-open");
      const targetModal = document.getElementById(modalId);
      if (targetModal) {
        targetModal.classList.add("modal-active");
        document.body.classList.add("no-scroll");
      }
    });
  });

  modalCloses.forEach(close => {
    close.addEventListener("click", () => {
      const openModal = document.querySelector(".modal-active");
      if (openModal) {
        openModal.classList.remove("modal-active");
        document.body.classList.remove("no-scroll");
      }
    });
  });

  // ==========================================
  // 10. SMOOTH SCROLL ANCHORS
  // ==========================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");
      if (targetId === "#") return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({
          behavior: "smooth"
        });
      }
    });
  });

});
