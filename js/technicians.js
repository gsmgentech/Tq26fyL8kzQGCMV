document.addEventListener('DOMContentLoaded', () => {
  const admins = window.admins || [];
  const adminContainer = document.getElementById("admin-container");
  adminContainer.innerHTML = "";

  admins.forEach(admin => {
    const verifiedIcon = admin.verified
      ? `<img src="img/verified.png" class="verified" />`
      : "";

    const contactsHTML = admin.contacts.map(contact => {
      if (contact.label === "Report this technician") {
        return `
          <div class="contact-box">
            <img class="icon" src="${contact.icon}" alt="">
            <a href="#" onclick="showReportModal('${admin.name}')">${contact.label}</a>
          </div>
        `;
      } else {
        return `
          <div class="contact-box">
            <img class="icon" src="${contact.icon}" alt="">
            <a href="${contact.link}" target="_blank">${contact.label}</a>
          </div>
        `;
      }
    }).join("");

    const specialtiesHTML = admin.specialties.map(spec => `<li>${spec}</li>`).join("");

    const shareIconHTML = `
      <img src="img/share.png"
           class="share-icon"
           alt="Share"
           onclick="copyLink('${admin.shareLink}')">
    `;

    const flipIconHTML = `
      <img src="img/flip.png"
           class="flip-icon"
           alt="Flip"
           onclick="toggleDetails(this)">
    `;

    const cardHTML = `
      <div class="card">
        <div class="card-inner">
          <div class="card-front">
            <div class="card-header">
              <div class="left-icon">${flipIconHTML}</div>
              <div class="right-icon">${shareIconHTML}</div>
            </div>
            <img src="${admin.image}" alt="${admin.name}" class="profile">
            <h2>${admin.name} ${verifiedIcon}</h2>
            <p><strong>${admin.role}</strong></p>
            <p>${admin.location}</p>
            <div class="buttons">
              <button class="call" onclick="window.location.href='tel:${admin.phone}'">Call</button>
            </div>
            <div class="contact-info">
              ${contactsHTML}
            </div>
          </div>
          <div class="card-back">
            <h3>Specialties:</h3>
            <ul>
              ${specialtiesHTML}
            </ul>
            <button class="call" onclick="toggleDetails(this)">Back</button>
          </div>
        </div>
      </div>
    `;

    adminContainer.innerHTML += cardHTML;
  });

  document.addEventListener('contextmenu', e => e.preventDefault());
  document.addEventListener('keydown', e => {
    if (
      e.key === 'F12' ||
      (e.ctrlKey && e.shiftKey && ['I', 'J', 'C'].includes(e.key)) ||
      (e.ctrlKey && ['U', 'S', 'C', 'A'].includes(e.key.toUpperCase())) ||
      (e.metaKey && e.altKey && ['I', 'J'].includes(e.key))
    ) {
      e.preventDefault();
      e.stopPropagation();
    }

    if (e.key === 'PrintScreen') {
      navigator.clipboard.writeText('');
    }
  });

  document.body.style.userSelect = "none";
  document.body.style.webkitUserSelect = "none";
  document.body.style.msUserSelect = "none";
  document.body.style.mozUserSelect = "none";
});

function copyLink(link) {
  navigator.clipboard.writeText(link).then(() => {
    const alertBox = document.createElement("div");
    alertBox.className = "copy-alert";
    alertBox.textContent = "Link copied!";
    document.body.appendChild(alertBox);
    alertBox.style.display = "block";

    setTimeout(() => {
      alertBox.remove();
    }, 2000);
  }).catch(err => {
    console.warn("Copy failed: " + err);
  });
}

function toggleDetails(icon) {
  const card = icon.closest(".card");
  card.classList.toggle("flipped");
}
