// Navigation functionality
document.addEventListener("DOMContentLoaded", () => {
  const navbar = document.getElementById("navbar");
  const hamburger = document.getElementById("hamburger");
  const navMenu = document.getElementById("nav-menu");
  const navLinks = document.querySelectorAll(".nav-link");

  // Navbar scroll effect
  window.addEventListener("scroll", () => {
    const aboutSection = document.getElementById("about");
    if (aboutSection) {
      const aboutTop = aboutSection.offsetTop;
      if (window.scrollY >= aboutTop) {
        navbar.classList.add("scrolled");
      } else {
        navbar.classList.remove("scrolled");
      }
    }
  });

  // Mobile menu toggle
  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
  });

  // Close mobile menu when clicking on a link
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("active");
      navMenu.classList.remove("active");
    });
  });

  // Active navigation link highlighting
  function updateActiveNavLink() {
    const sections = document.querySelectorAll("section[id]");
    const scrollPos = window.scrollY + 100;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute("id");
      const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        navLinks.forEach((link) => link.classList.remove("active"));
        if (navLink) {
          navLink.classList.add("active");
        }
      }
    });
  }

  window.addEventListener("scroll", updateActiveNavLink);

  // Smooth scrolling for navigation links
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href").substring(1);
      const targetSection = document.getElementById(targetId);

      if (targetSection) {
        const offsetTop = targetSection.offsetTop - 80;
        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        });
      }
    });
  });

  // Contact form handling
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Get form data
      const formData = new FormData(this);
      const formObject = {};
      formData.forEach((value, key) => {
        formObject[key] = value;
      });

      // Simulate form submission
      showNotification(
        "Mensagem enviada com sucesso! Retornaremos em breve.",
        "success"
      );

      // Reset form
      this.reset();
    });
  }

  // Notification system
  function showNotification(message, type = "info") {
    const notification = document.createElement("div");
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
            <div class="notification-content">
                <span>${message}</span>
                <button class="notification-close">&times;</button>
            </div>
        `;

    // Add notification styles if not already present
    if (!document.querySelector("#notification-styles")) {
      const styles = document.createElement("style");
      styles.id = "notification-styles";
      styles.textContent = `
          .notification {
              position: fixed;
              top: 100px;
              right: 20px;
              background: white;
              border-radius: 8px;
              box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
              z-index: 10000;
              transform: translateX(400px);
              transition: transform 0.3s ease;
              max-width: 400px;
          }
          .notification.show {
              transform: translateX(0);
          }
          .notification-success {
              border-left: 4px solid #10b981;
          }
          .notification-error {
              border-left: 4px solid #ef4444;
          }
          .notification-content {
              padding: 1rem 1.5rem;
              display: flex;
              justify-content: space-between;
              align-items: center;
          }
          .notification-close {
              background: none;
              border: none;
              font-size: 1.5rem;
              cursor: pointer;
              color: #6b7280;
              margin-left: 1rem;
          }
          .notification-close:hover {
              color: #374151;
        }
      `;
      document.head.appendChild(styles);
    }

    document.body.appendChild(notification);

    // Show notification
    setTimeout(() => {
      notification.classList.add("show");
    }, 100);

    // Auto remove after 5 seconds
    setTimeout(() => {
      removeNotification(notification);
    }, 5000);

    // Close button functionality
    const closeBtn = notification.querySelector(".notification-close");
    closeBtn.addEventListener("click", () => {
      removeNotification(notification);
    });
  }

  function removeNotification(notification) {
    notification.classList.remove("show");
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 300);
  }

  // Intersection Observer for animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-in-up");
      }
    });
  }, observerOptions);

  // Observe elements for animation
  const animateElements = document.querySelectorAll(
    ".service-card, .testimonial-card, .expertise-item, .pillar"
  );
  animateElements.forEach((el) => {
    observer.observe(el);
  });

  // Typing effect for hero title
  function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = "";

    function type() {
      if (i < text.length) {
        element.innerHTML += text.charAt(i);
        i++;
        setTimeout(type, speed);
      }
    }

    type();
  }

  // Initialize typing effect for hero title
  const heroTitle = document.querySelector(".hero-title");
  if (heroTitle) {
    const originalText = heroTitle.innerHTML;
    // Uncomment the line below to enable typing effect
    // typeWriter(heroTitle, originalText, 50);
  }

  // Parallax effect for hero section
  window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector(".hero");
    if (hero) {
      const rate = scrolled * -0.5;
      hero.style.transform = `translateY(${rate}px)`;
    }
  });

  // Form validation
  function validateForm(form) {
    const requiredFields = form.querySelectorAll("[required]");
    let isValid = true;

    requiredFields.forEach((field) => {
      if (!field.value.trim()) {
        field.classList.add("error");
        isValid = false;
      } else {
        field.classList.remove("error");
      }
    });

    // Email validation
    const emailField = form.querySelector('input[type="email"]');
    if (emailField && emailField.value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(emailField.value)) {
        emailField.classList.add("error");
        isValid = false;
      }
    }

    return isValid;
  }

  // Add error styles for form validation
  const formStyles = document.createElement("style");
  formStyles.textContent = `
        .form-group input.error,
        .form-group select.error,
        .form-group textarea.error {
            border-color: #ef4444;
            box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
        }
    `;
  document.head.appendChild(formStyles);

  // Initialize page
  updateActiveNavLink();

  // Add loading animation
  window.addEventListener("load", () => {
    document.body.classList.add("loaded");
  });
});

// Utility functions
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Performance optimization
const debouncedScroll = debounce(() => {
  // Scroll-based animations can be added here
}, 10);

window.addEventListener("scroll", debouncedScroll);

// Set current year in footer
document.getElementById("currentYear").textContent = new Date().getFullYear();
