document.addEventListener('DOMContentLoaded', () => {
  const admins = [
    {
      name: "Genrev Samonte",
      role: "Admin/Technician",
      location: "PHILIPPINES | VALENZUELA",
      phone: "+639923965626",
      image: "img/admin.png",
      verified: true,
      shareLink: "gentechserver.com/technicians/genrevsamonte",
      specialties: [
        "Software Technician",
        "Hardware Technician",
        "Device Support: Laptop, Android, iPhone, Tablet"
      ],
      contacts: [
        {
          icon: "https://upload.wikimedia.org/wikipedia/commons/b/be/Facebook_Messenger_logo_2020.svg",
          link: "https://m.me/GTServerAdmin",
          label: "Gen"
        },
        {
          icon: "https://cdn-icons-png.flaticon.com/512/733/733547.png",
          link: "https://facebook.com/GTServerAdmin",
          label: "GTServerAdmin"
        },
        {
          icon: "https://cdn-icons-png.flaticon.com/512/733/733585.png",
          link: "https://wa.me/639669239714",
          label: "+639669239714"
        },
        {
          icon: "https://cdn-icons-png.flaticon.com/512/2111/2111646.png",
          link: "https://t.me/gentechadmin",
          label: "@gentechadmin"
        },
        {
          icon: "https://cdn-icons-png.flaticon.com/512/732/732200.png",
          link: "mailto:genrevsamonte@gmail.com",
          label: "genrevsamonte@gmail.com"
        },
        {
          icon: "https://cdn-icons-png.flaticon.com/512/3046/3046121.png",
          link: "https://www.tiktok.com/@gentechserver",
          label: "TikTok"
        },
        {
          icon: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
          link: "https://www.google.com/maps?q=14.686386837250003,120.96592898251723",
          label: "Shop Location"
        },
        {
          icon: "https://cdn-icons-png.flaticon.com/512/1828/1828843.png",
          link: "https://gentechserver.com/report-technician?name=Genrev%20Samonte",
          label: "Report this technician"
        }
      ]
    },
    {
      name: "John Mark Ibana",
      role: "Technician",
      location: "PHILIPPINES | MANILA",
      phone: "+639923965667",
      image: "img/admin2.jpg",
      verified: true,
      shareLink: "gentechserver.com/technicians/johnmarkibana",
      specialties: [
        "Software Technician",
        "Remote Bypass",
        "Device Support: Laptop, Android, iPhone, Tablet",
      ],
      contacts: [
        {
          icon: "https://upload.wikimedia.org/wikipedia/commons/b/be/Facebook_Messenger_logo_2020.svg",
          link: "https://m.me/ibanajohnmark",
          label: "John Mark"
        },
        {
          icon: "https://cdn-icons-png.flaticon.com/512/733/733547.png",
          link: "https://www.facebook.com/ibanajohnmark",
          label: "John Mark"
        },
        {
          icon: "https://cdn-icons-png.flaticon.com/512/733/733585.png",
          link: "https://wa.me/639923965667",
          label: "+639923965667"
        },
        {
          icon: "https://cdn-icons-png.flaticon.com/512/1828/1828843.png",
          link: "https://gentechserver.com/report-technician?name=John%20Mark%20Ibana",
          label: "Report this technician"
        }
      ]
    }
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

  const form = document.getElementById("apply-form");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      alert("Application submitted! We’ll review your details soon.");
      form.reset();
    });
  }

  document.addEventListener('contextmenu', function (e) {
    e.preventDefault();
  });

  document.addEventListener('keydown', function (e) {
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
      alert('Screenshot is disabled.');
    }
  });

  setInterval(() => {
    navigator.clipboard.writeText('');
  }, 1000);

  document.body.style.userSelect = "none";
  document.body.style.webkitUserSelect = "none";
  document.body.style.msUserSelect = "none";
  document.body.style.mozUserSelect = "none";
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

function toggleDetails(icon) {
  const card = icon.closest(".card");
  card.classList.toggle("flipped");
}
