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
      contacts: [
        { icon: "https://upload.wikimedia.org/wikipedia/commons/b/be/Facebook_Messenger_logo_2020.svg", link: "https://m.me/GTServerAdmin", label: "Gen" },
        { icon: "https://cdn-icons-png.flaticon.com/512/733/733547.png", link: "https://facebook.com/GTServerAdmin", label: "GTServerAdmin" },
        { icon: "https://cdn-icons-png.flaticon.com/512/733/733585.png", link: "https://wa.me/639669239714", label: "+639669239714" },
        { icon: "https://cdn-icons-png.flaticon.com/512/2111/2111646.png", link: "https://t.me/gentechadmin", label: "@gentechadmin" },
        { icon: "https://cdn-icons-png.flaticon.com/512/732/732200.png", link: "mailto:genrevsamonte@gmail.com", label: "genrevsamonte@gmail.com" },
      ],
      description: "✅ This technician is officially verified by GentechServer. A trusted software and hardware technician serving Valenzuela and nearby areas. Specializes in diagnostics, repair, system optimization, and network configurations for personal and business devices."
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
      <div class="admin-wrapper">
        <p class="description">${admin.description}</p>
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
