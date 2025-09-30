export function loadLayout() {
  return {
    header: `
      <nav class="navbar">
        <div class="logo">GENTECHSERVER</div>
        <ul class="nav-links">
          <li><a href="https://www.gentechserver.com/Home">Home</a></li>
          <li><a href="https://www.gentechserver.com/#services">Services</a></li>
          <li><a href="https://www.gentechserver.com/frp">APK & FRP</a></li>
          <li><a href="https://www.gentechserver.com/imei-service">IMEI Service</a></li>
          <li><a href="https://www.gentechserver.com/tool-rental">Tool Rentals</a></li>
          <li><a href="https://www.gentechserver.com/remote-service">Remote Service</a></li>
          <li><a href="https://www.gentechserver.com/samsungqr">Samsung QR Code</a></li>
          <li><a href="https://www.gentechserver.com/#contact">Contact</a></li>
        </ul>
        <div class="hamburger"><span></span><span></span><span></span></div>
      </nav>
      <div class="nav-overlay"></div>
      <div id="loadingSpinner" class="spinner" style="display:none"></div>
    `,
    footer: `
      <p>© 2025 GENTECHSERVER. All Rights Reserved.</p>
    `
  };
}

export function initHeaderFunctions() {
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");
  const navOverlay = document.querySelector(".nav-overlay");
  const navItems = document.querySelectorAll(".nav-links a");
  const logo = document.querySelector(".logo");

  function closeMenu() {
    navLinks.classList.remove("active");
    hamburger.classList.remove("active");
    navOverlay.classList.remove("active");
  }

  hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("active");
    hamburger.classList.toggle("active");
    navOverlay.classList.toggle("active");
  });

  navOverlay.addEventListener("click", closeMenu);
  navItems.forEach(item => item.addEventListener("click", closeMenu));

  // secret admin redirect
  let clickCount = 0;
  let clickTimer;
  const clickWindowMs = 3000;
  const requiredClicks = 5;
  const redirectUrl = "login";

  function registerLogoClick() {
    clickCount++;
    clearTimeout(clickTimer);
    clickTimer = setTimeout(() => { clickCount = 0; }, clickWindowMs);
    if (clickCount >= requiredClicks) {
      clickCount = 0;
      window.location.href = redirectUrl;
    }
  }

  if (logo) {
    logo.addEventListener("click", registerLogoClick);
    logo.addEventListener("touchstart", registerLogoClick);
  }
}

export function injectLayout() {
  const { header, footer } = loadLayout();
  const headerTag = document.querySelector("header");
  const footerTag = document.querySelector("footer");

  if (headerTag) {
    headerTag.innerHTML = header;
    initHeaderFunctions();
  }
  if (footerTag) {
    footerTag.innerHTML = footer;
  }
}

// Auto inject on DOMContentLoaded
document.addEventListener("DOMContentLoaded", injectLayout);
