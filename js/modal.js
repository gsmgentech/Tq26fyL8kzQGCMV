const modal = document.createElement("div");
modal.id = "report-modal";
modal.style.cssText = `
  display: none;
  position: fixed;
  top: 0; left: 0;
  width: 100%; height: 100%;
  background: rgba(0, 0, 0, 0.6);
  z-index: 9999;
  justify-content: center;
  align-items: center;
  font-family: 'Segoe UI', sans-serif;
`;

modal.innerHTML = `
  <div style="
    background: #1e1e1e;
    padding: 25px;
    border-radius: 15px;
    width: 80%;
    max-width: 350px;
    color: white;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.8);
    position: relative;
  ">
    <h2 style="margin-top: 0; margin-bottom: 10px; text-align: center;">🚩 Report</h2>
    <p id="report-target" style="font-weight: bold; text-align: center; color: #00ffe5;"></p>

    <label style="display: block; margin-top: 15px;">📧 Email (required):</label>
    <input type="email" id="report-email" placeholder="Your email address"
      style="width: 95%; padding: 10px; border-radius: 8px; border: none; margin-top: 5px; background: #2e2e2e; color: white;" />

    <label style="display: block; margin-top: 15px;">📱 Contact Number (optional):</label>
    <input type="text" id="report-contact" placeholder="e.g. 09XXXXXXXXX"
      style="width: 95%; padding: 10px; border-radius: 8px; border: none; margin-top: 5px; background: #2e2e2e; color: white;" />

    <label style="display: block; margin-top: 15px;">📌 Reason:</label>
    <select id="report-reason" size="5"
      style="width: 100%; padding: 10px; border-radius: 8px; border: none; margin-top: 5px; background: #2e2e2e; color: white;">
      <option value="" disabled selected>Please select your reason</option>
      <option>Scamming / Fake Payment</option>
      <option>Did Not Finish the Service</option>
      <option>No Response After Payment</option>
      <option>Device Damaged After Remote</option>
      <option>Unprofessional Behavior</option>
      <option>Offensive Language</option>
      <option>Privacy Violation</option>
      <option>Harassment or Threats</option>
      <option>Spamming / Flooding</option>
      <option>Misleading Identity / Fake Info</option>
      <option>Promised Refund but Ignored</option>
      <option>Unauthorized Access</option>
      <option>Other (Please specify in details)</option>
    </select>

    <label style="display: block; margin-top: 15px;">📝 Details (required):</label>
    <textarea id="report-details" rows="4" placeholder="Describe the issue clearly..."
      style="width: 95%; padding: 10px; border-radius: 8px; border: none; background: #2e2e2e; color: white; margin-top: 5px;"></textarea>

    <p id="form-error" style="color: #ff7070; font-weight: bold; margin-top: 10px; display: none; text-align: center;"></p>

    <div style="display: flex; justify-content: space-between; margin-top: 20px;">
      <button onclick="submitReport()" style="
        background: linear-gradient(to right, #00c6ff, #0072ff);
        color: white;
        padding: 10px 20px;
        border: none;
        border-radius: 8px;
        cursor: pointer;
        flex: 1;
        margin-right: 10px;
        font-weight: bold;
        transition: 0.3s;
      " onmouseover="this.style.opacity='0.85'" onmouseout="this.style.opacity='1'">Submit</button>

      <button onclick="hideReportModal()" style="
        background: #ff5e5e;
        color: white;
        padding: 10px 20px;
        border: none;
        border-radius: 8px;
        cursor: pointer;
        flex: 1;
        font-weight: bold;
        transition: 0.3s;
      " onmouseover="this.style.opacity='0.85'" onmouseout="this.style.opacity='1'">Cancel</button>
    </div>
  </div>
`;
document.body.appendChild(modal);

window.showReportModal = function (adminName) {
  document.getElementById("report-target").innerText = `Reporting: ${adminName}`;
  document.getElementById("form-error").style.display = "none";
  modal.style.display = "flex";
};

window.hideReportModal = function () {
  modal.style.display = "none";
};

window.submitReport = function () {
  const email = document.getElementById("report-email").value.trim();
  const contact = document.getElementById("report-contact").value.trim();
  const reason = document.getElementById("report-reason").value;
  const details = document.getElementById("report-details").value.trim();
  const errorMsg = document.getElementById("form-error");

  if (!email || !reason || !details) {
    errorMsg.textContent = "❗ Please fill in all required fields.";
    errorMsg.style.display = "block";
    return;
  }

  errorMsg.style.display = "none";

  alert(`✅ Report submitted!\n\nEmail: ${email}\nContact: ${contact || 'N/A'}\nReason: ${reason}\nDetails: ${details}`);
  hideReportModal();

  document.getElementById("report-email").value = "";
  document.getElementById("report-contact").value = "";
  document.getElementById("report-reason").selectedIndex = 0;
  document.getElementById("report-details").value = "";
};
