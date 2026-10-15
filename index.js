// Modal
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contact-form");
  const submitBtn = document.getElementById("submit-btn");

  if (!form) return;

  form.addEventListener("submit", async function (event) {
    event.preventDefault(); // Prevents page reload & Formspree redirect

    const data = new FormData(event.target);

    submitBtn.disabled = true;
    submitBtn.innerHTML = "Sending...";

    try {
      const response = await fetch(event.target.action, {
        method: form.method,
        body: data,
        headers: {
          Accept: "application/json",
        },
      });
      console.log(response);

      if (response.ok) {
        form.reset();

        const successModal = new bootstrap.Modal(
          document.getElementById("successModal"),
        );
        successModal.show();
      } else {
        alert("There was a problem submitting your form. Please try again.");
      }
    } catch (error) {
      console.log(error);
      alert(
        "Network error. Please check your connection or email me directly.",
      );
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerHTML = "Send Message";
    }
  });
});

// Scroll Animation
document.addEventListener("DOMContentLoaded", function () {
  // Select all elements to animate
  const animatedElements = document.querySelectorAll(
    ".reveal-section, .reveal-left, .reveal-right",
  );

  // Configure the observer
  const observerOptions = {
    root: null, // Relative to viewport
    threshold: 0.15, // Triggers when 15% of the element is visible
    rootMargin: "0px 0px -50px 0px", // Slight bottom offset
  };

  const scrollObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // Active class to trigger CSS transition
        entry.target.classList.add("active");

        // Stop observing once revealed so it stays visible
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Attach observer to each element
  animatedElements.forEach((el) => scrollObserver.observe(el));
});

// Typing Animation
const typingText = document.getElementById("typing-text");

const titles = ["Full Stack Developer", "Educator"];

let titleIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
  const currentTitle = titles[titleIndex];

  if (isDeleting) {
    charIndex--;
  } else {
    charIndex++;
  }

  typingText.textContent = currentTitle.substring(0, charIndex);

  let speed = isDeleting ? 50 : 100;

  // Pause after finishing a word
  if (!isDeleting && charIndex === currentTitle.length) {
    speed = 1500;
    isDeleting = true;
  }

  // Move to the next title after deleting
  if (isDeleting && charIndex === 0) {
    isDeleting = false;
    titleIndex = (titleIndex + 1) % titles.length;
    speed = 400;
  }

  setTimeout(typeEffect, speed);
}

typeEffect();
