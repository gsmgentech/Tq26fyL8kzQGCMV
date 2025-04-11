function generateVerification() {
    const numbers = '0123456789';
    const letters = 'ABCDEFGHJKMNOPQRSTUVWXYZabcdefghjkmnopqrstuvwxyz';
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

document.getElementById('verificationForm')?.addEventListener('submit', function (event) {
    event.preventDefault();
    alert("Verification complete!");
});

const refreshed = sessionStorage.getItem("refreshed-once");

if (!refreshed) {
    sessionStorage.setItem("refreshed-once", "yes");
    location.reload();
}

window.addEventListener("beforeunload", () => {
    sessionStorage.removeItem("refreshed-once");
});
