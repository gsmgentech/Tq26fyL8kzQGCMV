const form = document.getElementById('loginForm');
const message = document.getElementById('loginMessage');
const loginBtn = document.getElementById('loginBtn');
const loginBox = document.getElementById('loginBox');
const loginTitle = document.getElementById('loginTitle');

const pwCodes = [83,97,109,111,110,116,101];

function decode(arr) {
  return arr.map(c => String.fromCharCode(c)).join('');
}

function getLockData() {
  return JSON.parse(localStorage.getItem("loginLock")) || { attempts: 0, lockUntil: 0 };
}

function setLockData(data) {
  localStorage.setItem("loginLock", JSON.stringify(data));
}

function checkLock() {
  const { attempts, lockUntil } = getLockData();
  const now = Date.now();
  if (now < lockUntil) {
    const secondsLeft = Math.ceil((lockUntil - now) / 1000);
    disableLogin(secondsLeft);
    return true;
  }
  return false;
}

function disableLogin(seconds) {
  loginBtn.disabled = true;
  message.textContent = `Try again in ${seconds}s`;
  message.style.color = "#f85149";
  message.classList.add("show");

  const countdown = setInterval(() => {
    const { lockUntil } = getLockData();
    const now = Date.now();
    if (now >= lockUntil) {
      clearInterval(countdown);
      loginBtn.disabled = false;
      message.textContent = "";
    } else {
      const secLeft = Math.ceil((lockUntil - now) / 1000);
      message.textContent = `Try again in ${secLeft}s`;
    }
  }, 1000);
}

form.addEventListener('submit', function(e) {
  e.preventDefault();

  if (checkLock()) return;

  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value.trim();

  message.textContent = "Checking credentials...";
  message.style.color = "#ffd33d";
  message.classList.add('show');

  setTimeout(() => {
    if (username === "" && password === decode(pwCodes)) {
      message.textContent = "Login Successful!";
      message.style.color = "#2ea043";
      localStorage.removeItem("loginLock");

      try {
        sessionStorage.setItem("loggedIn", "true");
      } catch (err) {}

      setTimeout(() => {
        window.location.href = "dashboard.html";
      }, 1000);
    } else {
      loginBox.classList.add("shake");
      setTimeout(() => loginBox.classList.remove("shake"), 500);

      let { attempts } = getLockData();
      attempts++;
      let lockMinutes = attempts < 5 ? attempts : 10;
      const lockUntil = Date.now() + lockMinutes * 60 * 1000;

      setLockData({ attempts, lockUntil });

      message.textContent = "Login Failed!";
      message.style.color = "#f85149";

      setTimeout(() => checkLock(), 500);
    }
  }, 1500);
});

checkLock();

let clickCount = 0;
loginTitle.addEventListener("click", () => {
  clickCount++;
  if (clickCount >= 20) {
    localStorage.removeItem("loginLock");
    message.textContent = "Login lock has been reset!";
    message.style.color = "#2ea043";
    message.classList.add("show");
    loginBtn.disabled = false;
    clickCount = 0;
  }
});
