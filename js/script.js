const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");
const navOverlay = document.querySelector(".nav-overlay");
const navItems = document.querySelectorAll(".nav-links a");
const logo = document.querySelector('.logo');

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("active");
  hamburger.classList.toggle("active");
  navOverlay.classList.toggle("active");
});

navOverlay.addEventListener("click", () => {
  closeMenu();
});

navItems.forEach(item => {
  item.addEventListener("click", () => {
    closeMenu();
  });
});

function closeMenu() {
  navLinks.classList.remove("active");
  hamburger.classList.remove("active");
  navOverlay.classList.remove("active");
}

async function searchRecord(event) {
  event.preventDefault();
  const recordNumber = document.getElementById("recordNumber").value.trim();
  const messageBox = document.getElementById("message");
  messageBox.textContent = "";
  messageBox.classList.remove("show");

  if (recordNumber) {
    const filePath = "service-record/" + encodeURIComponent(recordNumber) + ".html";
    try {
      const response = await fetch(filePath, { method: "HEAD" });
      if (response.ok) {
        window.location.href = filePath;
      } else {
        showMessage("⚠️ No service record found.");
      }
    } catch (error) {
      showMessage("⚠️ No service record found.");
    }
  }
}

function showMessage(text) {
  const messageBox = document.getElementById("message");
  messageBox.textContent = text;
  messageBox.classList.add("show");
  setTimeout(() => {
    messageBox.classList.remove("show");
    setTimeout(() => {
      messageBox.textContent = "";
    }, 800);
  }, 3000);
}

const animatedElements = document.querySelectorAll("[data-animate]");
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("animated");
      if (entry.target.dataset.animate === "fade-up") {
        entry.target.style.animation = "fadeUp 1s forwards";
      } else if (entry.target.dataset.animate === "zoom-in") {
        entry.target.style.animation = "zoomIn 1s forwards";
      }
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

animatedElements.forEach(el => observer.observe(el));

let clickCount = 0;
let clickTimer;
const clickWindowMs = 3000;
const requiredClicks = 5;
const redirectUrl = 'admin.html';

function registerLogoClick() {
  clickCount += 1;
  clearTimeout(clickTimer);
  clickTimer = setTimeout(() => { clickCount = 0; }, clickWindowMs);
  if (clickCount >= requiredClicks) {
    clickCount = 0;
    window.location.href = redirectUrl;
  }
}

if (logo) {
  logo.addEventListener('click', registerLogoClick);
  logo.addEventListener('touchstart', registerLogoClick);
}

const openScannerBtn = document.getElementById('openScanner');
const closeScannerBtn = document.getElementById('closeScanner');
const scanSection = document.getElementById('scan-qr');
const qrResult = document.getElementById('qr-result');
let html5QrCode;
let scannerRunning = false;

function showScanSection(show) {
  scanSection.setAttribute('aria-hidden', show ? 'false' : 'true');
  scanSection.style.display = show ? 'block' : 'none';
}

function onScanSuccess(decodedText) {
  qrResult.textContent = 'Scanned: ' + decodedText;
  if (decodedText.startsWith('http://') || decodedText.startsWith('https://')) {
    window.location.href = decodedText;
    stopScanner();
    return;
  }
  const maybeFile = 'service-record/' + encodeURIComponent(decodedText) + '.html';
  fetch(maybeFile, { method: 'HEAD' })
    .then(r => {
      if (r.ok) {
        stopScanner();
        window.location.href = maybeFile;
      } else {
        qrResult.textContent = 'No matching service record found for: ' + decodedText;
      }
    })
    .catch(() => {
      qrResult.textContent = 'No matching service record found for: ' + decodedText;
    });
}

function onScanFailure(error) {
}

function startScanner() {
  if (scannerRunning) return;
  if (!window.Html5Qrcode) {
    qrResult.textContent = 'QR library not loaded.';
    return;
  }
  const config = { fps: 10, qrbox: { width: 280, height: 280 } };
  html5QrCode = new Html5Qrcode("reader");
  html5QrCode.start({ facingMode: "environment" }, config, onScanSuccess, onScanFailure)
    .then(() => {
      scannerRunning = true;
      qrResult.textContent = 'Scanning... point camera at QR code.';
    })
    .catch(err => {
      qrResult.textContent = 'Camera error: ' + err;
    });
}

function stopScanner() {
  if (!scannerRunning || !html5QrCode) return;
  html5QrCode.stop().then(() => {
    html5QrCode.clear();
    scannerRunning = false;
    qrResult.textContent = '';
  }).catch(() => {
    scannerRunning = false;
  });
}

openScannerBtn.addEventListener('click', () => {
  showScanSection(true);
  startScanner();
});

closeScannerBtn.addEventListener('click', () => {
  stopScanner();
  showScanSection(false);
});

document.addEventListener('visibilitychange', () => {
  if (document.hidden) stopScanner();
});
