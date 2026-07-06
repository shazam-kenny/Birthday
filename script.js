// ==========================================
// 1. INITIALIZE ANIMATIONS (AOS)
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
  if (typeof AOS !== "undefined") {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 100,
    });
  }

  // Load guestbook entries from LocalStorage on page load
  loadGuestbook();
  // Start the countdown!
  startCountdown();
});

// ==========================================
// 2. BACKGROUND MUSIC TOGGLE
// ==========================================
function toggleMusic() {
  const music = document.getElementById("bg-music");
  const status = document.getElementById("music-status");
  const btn = document.getElementById("music-toggle");

  if (music.paused) {
    music.play().then(() => {
      status.innerText = "Music Playing 🎵";
      btn.innerText = "⏸️";
    }).catch(() => {
      alert("Please add your audio file as 'music/piano.mp3' in your project folder!");
    });
  } else {
    music.pause();
    status.innerText = "Music Paused";
    btn.innerText = "🎵";
  }
}

// ==========================================
// 3. PHOTO GALLERY TABS FILTERING
// ==========================================
function filterGallery(category) {
  // Update button active classes
  const buttons = document.querySelectorAll(".tab-btn");
  buttons.forEach((btn) => btn.classList.remove("active"));
  event.target.classList.add("active");

  // Show/Hide photo cards
  const cards = document.querySelectorAll(".photo-card");
  cards.forEach((card) => {
    if (category === "all" || card.getAttribute("data-category") === category) {
      card.style.display = "block";
      card.style.animation = "fadeIn 0.5s ease";
    } else {
      card.style.display = "none";
    }
  });
}

// ==========================================
// 4. STORYBOOK MODAL (POP-UP READERS)
// ==========================================
function openModal(title, text) {
  document.getElementById("modal-title").innerText = title;
  document.getElementById("modal-text").innerText = text;
  document.getElementById("modal").classList.add("active");

  // Trigger subtle gold confetti when opening special letters!
  if (typeof confetti === "function") {
    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.7 },
      colors: ["#d4af37", "#e8b4b8", "#ffffff"],
    });
  }
}

function closeModal() {
  document.getElementById("modal").classList.remove("active");
}

// Close modal on Escape key press
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeModal();
});

// ==========================================
// 5. JULY 7TH BIRTHDAY COUNTDOWN ENGINE
// ==========================================
function startCountdown() {
  // Target: July 7, 2026 at midnight
  const targetDate = new Date("July 7, 2026 00:00:00").getTime();

  const timerInterval = setInterval(() => {
    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance < 0) {
      clearInterval(timerInterval);
      document.getElementById("timer").style.display = "none";
      document.getElementById("birthday-message").style.display = "block";
      
      // Massive birthday confetti celebration!
      if (typeof confetti === "function") {
        confetti({ particleCount: 150, spread: 100, origin: { y: 0.4 } });
      }
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("days").innerText = days < 10 ? "0" + days : days;
    document.getElementById("hours").innerText = hours < 10 ? "0" + hours : hours;
    document.getElementById("minutes").innerText = minutes < 10 ? "0" + minutes : minutes;
    document.getElementById("seconds").innerText = seconds < 10 ? "0" + seconds : seconds;
  }, 1000);
}

// ==========================================
// 6. GUESTBOOK (SAVED IN BROWSER LOCALSTORAGE)
// ==========================================
function addGuestbookEntry(event) {
  event.preventDefault();
  const nameInput = document.getElementById("guest-name");
  const msgInput = document.getElementById("guest-msg");

  if (!nameInput.value || !msgInput.value) return;

  const newEntry = {
    name: nameInput.value,
    msg: msgInput.value,
    date: new Date().toLocaleDateString(),
  };

  // Pull existing entries or start clean array
  let entries = JSON.parse(localStorage.getItem("njoki_guestbook")) || [];
  entries.unshift(newEntry); // Add newest to top
  localStorage.setItem("njoki_guestbook", JSON.stringify(entries));

  // Reset form and render updated list
  nameInput.value = "";
  msgInput.value = "";
  loadGuestbook();

  alert("💌 Your birthday message was added to Njoki's guestbook!");
}

function loadGuestbook() {
  const container = document.getElementById("entries-container");
  if (!container) return;

  const entries = JSON.parse(localStorage.getItem("njoki_guestbook")) || [
    {
      name: "Your Best Friend ❤️",
      msg: "Happy Birthday Njoki! I built this whole page just to remind you how deeply loved and appreciated you are.",
      date: "July 7, 2026",
    }
  ];

  container.innerHTML = "";
  entries.forEach((entry) => {
    const card = document.createElement("div");
    card.className = "entry-card";
    card.innerHTML = `<strong>${entry.name}</strong> <span style="font-size:0.8rem; color:#888;">(${entry.date})</span><p style="margin-top:0.5rem; font-style:italic;">"${entry.msg}"</p>`;
    container.appendChild(card);
  });
}
// ==========================================
// 1. INTERACTIVE ALBUM COVER OPENER
// ==========================================
window.openAlbumBook = function () {
  const cover = document.getElementById("album-cover");
  const content = document.getElementById("album-content");

  if (cover && content) {
    cover.classList.add("opened");
    content.classList.add("visible");

    // Launch Festive Pink & Rose Gold Confetti Burst!
    if (typeof confetti === "function") {
      const girlishColors = ["#ff758f", "#ff4d6d", "#ffe5ec", "#ffffff", "#ffd700"];
      confetti({ particleCount: 100, spread: 80, origin: { y: 0.6 }, colors: girlishColors });
      
      setTimeout(() => {
        confetti({ particleCount: 60, angle: 60, spread: 55, origin: { x: 0 }, colors: girlishColors });
        confetti({ particleCount: 60, angle: 120, spread: 55, origin: { x: 1 }, colors: girlishColors });
      }, 250);
    }
  }
};

// ==========================================
// 2. PHOTO GALLERY TABS FILTERING
// ==========================================
window.filterGallery = function (category) {
  // Update active button class
  const buttons = document.querySelectorAll(".tab-btn");
  buttons.forEach((btn) => btn.classList.remove("active"));
  if (event && event.target) {
    event.target.classList.add("active");
  }

  // Show or hide photo cards based on category
  const cards = document.querySelectorAll(".photo-card");
  cards.forEach((card) => {
    const cardCat = card.getAttribute("data-category");
    if (category === "all" || cardCat === category) {
      card.style.display = "block";
      card.style.animation = "fadeIn 0.5s ease forwards";
    } else {
      card.style.display = "none";
    }
  });
};

// ==========================================
// 3. STORYBOOK MODAL (POP-UP READERS)
// ==========================================
window.openModal = function (title, text) {
  const modalTitle = document.getElementById("modal-title");
  const modalText = document.getElementById("modal-text");
  const modal = document.getElementById("modal");

  if (modalTitle && modalText && modal) {
    modalTitle.innerText = title;
    modalText.innerText = text;
    modal.classList.add("active");

    // Soft pink confetti shower when reading a memory!
    if (typeof confetti === "function") {
      confetti({
        particleCount: 35,
        spread: 60,
        origin: { y: 0.7 },
        colors: ["#ff758f", "#ff85a1", "#ffffff"],
      });
    }
  }
};

window.closeModal = function () {
  const modal = document.getElementById("modal");
  if (modal) modal.classList.remove("active");
};

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") window.closeModal();
});