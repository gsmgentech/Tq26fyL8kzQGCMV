const telegramBotToken = '7629739770:AAEvP7NK4M9Cua3X4norSzqQS2y2Edrdy3Q';
const telegramChatId = '6892566157';

window.submitReport = function () {
  const email = document.getElementById("report-email").value.trim();
  const contact = document.getElementById("report-contact").value.trim();
  const reason = document.getElementById("report-reason").value;
  const details = document.getElementById("report-details").value.trim();
  const errorMsg = document.getElementById("form-error");

  if (!email || !reason || !details) {
    errorMsg.textContent = "❗ Please fill in all required fields.";
    errorMsg.style.color = "#ff7070";
    errorMsg.style.display = "block";
    return;
  }

  errorMsg.style.display = "none";

  fetch('https://api.ipify.org?format=json')
    .then(response => response.json())
    .then(ipData => {
      const userIp = ipData.ip;

      const message = `
🚨 New Report Submitted 🚨
-------------------------
📧 Email: ${email}
📱 Contact: ${contact || 'N/A'}
📌 Reason: ${reason}
📝 Details: ${details}
🌐 IP Address: ${userIp}
-------------------------
`;

      return fetch(`https://api.telegram.org/bot${telegramBotToken}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: telegramChatId,
          text: message,
        }),
      });
    })
    .then(res => res.json())
    .then(data => {
      if (data.ok) {
        errorMsg.style.color = "#00ffcc";
        errorMsg.textContent = "✅ Report successfully submitted. Our team will review your report or contact you for further details.";
        errorMsg.style.display = "block";

        setTimeout(() => {
          hideReportModal();
          errorMsg.style.display = "none";
          document.getElementById("report-email").value = "";
          document.getElementById("report-contact").value = "";
          document.getElementById("report-reason").selectedIndex = 0;
          document.getElementById("report-details").value = "";
        }, 2500);
      } else {
        errorMsg.style.color = "#ff7070";
        errorMsg.textContent = "❌ Failed to send report. Please try again later.";
        errorMsg.style.display = "block";
      }
    })
    .catch(err => {
      console.error(err);
      errorMsg.style.color = "#ff7070";
      errorMsg.textContent = "❌ An error occurred while sending the report.";
      errorMsg.style.display = "block";
    });
};
