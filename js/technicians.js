document.addEventListener('DOMContentLoaded', () => {
  const admins = [
    {
      name: "Genrev Samonte",
      role: "Admin/Technician",
      location: "PHILIPPINES | VALENZUELA",
      phone: "+639923965626",
      image: "img/admin.png",
      verified: true,
      shareLink: "gentechserver.com/technician/genrevsamonte",
      contacts: [
        { icon: "https://upload.wikimedia.org/wikipedia/commons/b/be/Facebook_Messenger_logo_2020.svg", link: "https://m.me/GTServerAdmin", label: "Gen" },
        { icon: "https://cdn-icons-png.flaticon.com/512/733/733547.png", link: "https://facebook.com/GTServerAdmin", label: "GTServerAdmin" },
        { icon: "https://cdn-icons-png.flaticon.com/512/733/733585.png", link: "https://wa.me/639669239714", label: "+639669239714" },
        { icon: "https://cdn-icons-png.flaticon.com/512/2111/2111646.png", link: "https://t.me/gentechadmin", label: "@gentechadmin" },
        { icon: "https://cdn-icons-png.flaticon.com/512/732/732200.png", link: "mailto:genrevsamonte@gmail.com", label: "genrevsamonte@gmail.com" },
      ]
    },
    {
      name: "John Mark Ibana",
      role: "Technician",
      location: "PHILIPPINES | MANILA",
      phone: "+639923965667",
      image: "img/admin2.jpg",
      verified: true,
      shareLink: "gentechserver.com/technician/johnmarkibana",
      contacts: [
        { icon: "https://upload.wikimedia.org/wikipedia/commons/b/be/Facebook_Messenger_logo_2020.svg", link: "https://m.me/ibanajohnmark", label: "John Mark" },
        { icon: "https://cdn-icons-png.flaticon.com/512/733/733547.png", link: "https://www.facebook.com/ibanajohnmark", label: "John Mark" },
        { icon: "https://cdn-icons-png.flaticon.com/512/733/733585.png", link: "https://wa.me/639923965667", label: "+639923965667" },
      ]
    },
  ];

  const adminContainer = document.getElementById("admin-container");
  adminContainer.innerHTML = "";

  admins.forEach(admin => {
    const verifiedIcon = admin.verified
      ? `<img src="img/verified.png" class="verified" />`
      : "";

    const contactsHTML = admin.contacts.map(contact => `
      <div class="contact-box">
        <img class="icon" src="${contact.icon}">
        <a href="${contact.link}" target="_blank">${contact.label}</a>
      </div>
    `).join("");

    const shareIconHTML = `
      <img src="img/share.png"
           class="share-icon"
           alt="Share"
           onclick="copyLink('${admin.shareLink}')">
    `;

    const cardHTML = `
      <div class="card">
        ${shareIconHTML}
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
    `;

    adminContainer.innerHTML += cardHTML;
  });

  const form = document.getElementById("apply-form");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    alert("Application submitted! We’ll review your details soon.");
    form.reset();
  });
});

function copyLink(link) {
  navigator.clipboard.writeText(link).then(() => {
    const alertBox = document.getElementById("copy-alert");
    if (alertBox) {
      alertBox.style.display = "block";
      alertBox.textContent = "Link copied!";
      setTimeout(() => {
        alertBox.style.display = "none";
      }, 2000);
    }
  }).catch(err => {
    alert("Failed to copy link: " + err);
  });
}

document.addEventListener('contextmenu', function (e) {
  e.preventDefault();
});

document.addEventListener('keydown', function (e) {
  if (
    e.key === 'F12' ||
    (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J')) ||
    (e.ctrlKey && (e.key === 'U' || e.key === 'S')) ||
    (e.metaKey && e.altKey && (e.key === 'I' || e.key === 'J'))
  ) {
    e.preventDefault();
    e.stopPropagation();
  }
});
