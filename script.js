document.addEventListener("DOMContentLoaded", function () {
  // --- Hero Section Carousel Logic  ---
  const slides = document.querySelectorAll(".slide");
  let currentSlide = 0;

  function showNextSlide() {
    slides[currentSlide].classList.remove("active-slide");
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.add("active-slide");
  }

  slides[currentSlide].classList.add("active-slide");
  setInterval(showNextSlide, 5000);

  // --- Dropdown Menu Logic (FIXED: Mobile Click persistence) ---
  const dropdowns = document.querySelectorAll(".dropdown");
  const navLinks = document.getElementById("nav-links");
  const menuToggle = document.getElementById("menu-toggle");

  const MOBILE_BREAKPOINT = 1024;

  dropdowns.forEach((dropdown) => {
    const dropdownLink = dropdown.querySelector("a");

    dropdown.addEventListener("mouseenter", function (event) {
      if (window.innerWidth > MOBILE_BREAKPOINT) {
        this.classList.add("show-dropdown");
        // Close other dropdown wen one of the dropdown is clicked
        dropdowns.forEach((otherDropdown) => {
          if (otherDropdown !== this) {
            otherDropdown.classList.remove("show-dropdown");
          }
        });
      }
    });

    dropdown.addEventListener("mouseleave", function (event) {
      if (window.innerWidth > MOBILE_BREAKPOINT) {
        this.classList.remove("show-dropdown");
      }
    });

    dropdownLink.addEventListener("click", function (event) {
      if (window.innerWidth <= MOBILE_BREAKPOINT) {
        const subMenu = dropdown.querySelector(".dropdown-menu");

        if (subMenu && subMenu.children.length > 0) {
          event.preventDefault();
        }

        dropdown.classList.toggle("show-dropdown");

        dropdowns.forEach((otherDropdown) => {
          if (otherDropdown !== dropdown) {
            otherDropdown.classList.remove("show-dropdown");
          }
        });
      }
    });
  });

  window.addEventListener("click", function (event) {
    if (
      window.innerWidth > MOBILE_BREAKPOINT &&
      !event.target.closest(".dropdown")
    ) {
      dropdowns.forEach((dropdown) => {
        dropdown.classList.remove("show-dropdown");
      });
    }
  });

  // --- Mobile Menu Toggle (Hamburger/Cross Icon) ---
  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
    menuToggle.classList.toggle("active");
  });

  // --- Close Mobile Menu on Sub-Link Click (After navigating) ---
  const navLinksList = document.querySelectorAll("#nav-links a");
  navLinksList.forEach((link) => {
    link.addEventListener("click", () => {
      // Check if the menu is open AND it's a mobile size
      if (
        window.innerWidth <= MOBILE_BREAKPOINT &&
        navLinks.classList.contains("active")
      ) {
        if (link.closest(".dropdown-menu")) {
          setTimeout(() => {
            navLinks.classList.remove("active");
            menuToggle.classList.remove("active");

            dropdowns.forEach((dropdown) => {
              dropdown.classList.remove("show-dropdown");
            });
          }, 50);
        }
      }
    });
  });

  // --- Hero text animationnnnnn
  window.addEventListener("load", () => {
    document.querySelector(".hero h1").style.opacity = "1";
    document.querySelector(".hero h1").style.transform = "translateY(0)";

    document.querySelector(".hero-sectors").style.opacity = "1";
    document.querySelector(".hero-sectors").style.transform = "translateY(0)";
  });
});

// About us section
document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".image-card");
  cards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`;
  });
});

// Core values
document.addEventListener("DOMContentLoaded", () => {
  const valuesGrid = document.querySelector(".values-grid");
  const prevButton = document.querySelector(".nav-button.prev");
  const nextButton = document.querySelector(".nav-button.next");
  const valueCards = document.querySelectorAll(".value-card");

  // Function to scroll to the next or previous card group
  const scrollCards = (direction) => {
    if (!valuesGrid || valueCards.length === 0) return;

    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    let scrollAmount;

    if (isMobile) {
      // Scroll one card at a time on mobile
      scrollAmount = valueCards[0].offsetWidth + 15; // 15px is the gap
    } else {
      // Scroll four cards at a time on desktop
      scrollAmount = (valueCards[0].offsetWidth + 20) * 4; // 20px is the gap
    }

    const currentScroll = valuesGrid.scrollLeft;

    if (direction === "next") {
      valuesGrid.scroll({
        left: currentScroll + scrollAmount,
        behavior: "smooth",
      });
    } else if (direction === "prev") {
      valuesGrid.scroll({
        left: currentScroll - scrollAmount,
        behavior: "smooth",
      });
    }
  };

  // Event listeners for navigation buttons
  if (prevButton && nextButton) {
    prevButton.addEventListener("click", () => scrollCards("prev"));
    nextButton.addEventListener("click", () => scrollCards("next"));
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const valuesGrid = document.querySelector(".values-grid");
  const prevButton = document.querySelector(".nav-button.prev");
  const nextButton = document.querySelector(".nav-button.next");
  const scrollAmount = 250;

  if (valuesGrid && prevButton && nextButton) {
    nextButton.addEventListener("click", () => {
      valuesGrid.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    });

    prevButton.addEventListener("click", () => {
      valuesGrid.scrollBy({
        left: -scrollAmount,
        behavior: "smooth",
      });
    });
  }
});

// Buiikding sustainable section

// Add simple interactivity
const exploreBtn = document.getElementById("exploreBtn");

if (exploreBtn) {
  exploreBtn.addEventListener("click", () => {
    alert("Redirecting to our Goal & SDG page...");
    // window.location.href = "goals.html";
  });
}

// Animation effecr when section enter
const section = document.querySelector(".sustainable-section");

if (section) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        section.classList.add("visible");
      }
    });
  });

  observer.observe(section);
}

// footer

document.addEventListener("DOMContentLoaded", () => {
  // Consultation Modal
  const openConsultationBtn = document.getElementById("openConsultation");
  const consultationModal = document.getElementById("consultationModal");
  const closeModal = document.getElementById("closeModal");

  if (openConsultationBtn && consultationModal && closeModal) {
    // Open modal when button is clicked
    openConsultationBtn.addEventListener("click", () => {
      consultationModal.style.display = "block";
    });

    // Close modal when X is clicked
    closeModal.addEventListener("click", () => {
      consultationModal.style.display = "none";
    });

    // Close modal when clicking outside of modal content
    window.addEventListener("click", (event) => {
      if (event.target === consultationModal) {
        consultationModal.style.display = "none";
      }
    });

    // Close modal with Escape key
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && consultationModal.style.display === "block") {
        consultationModal.style.display = "none";
      }
    });
  }
  
  const form = document.querySelector(".signup-form");

  if (form) {
    form.addEventListener("submit", (event) => {
      event.preventDefault(); // Prevents the page from reloading on form submission

      const firstName = form.querySelector('input[type="text"]').value;
      const email = form.querySelector('input[type="email"]').value;

      console.log("Form Submission Details:");
      console.log(`First Name: ${firstName}`);
      console.log(`Email: ${email}`);

      alert("Thank you for subscribing!!!!!");
    });
  }
});
