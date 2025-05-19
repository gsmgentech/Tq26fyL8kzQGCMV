document.getElementById("submitButton").addEventListener("click", async function (event) {
    event.preventDefault();

    let boxName = document.querySelector(".name").textContent;
    let referenceNumber = document.getElementById("number").value;
    let noteToAdmin = document.getElementById("notetoadmin").value;

    if (!referenceNumber) {
        alert("Kindly enter your GCash reference number.");
        return;
    }

    // Generate the order number based on the current date, hour, minute, and second
    const now = new Date();
    const orderNumber = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}-${String(now.getHours()).padStart(2, '0')}-${String(now.getMinutes()).padStart(2, '0')}-${String(now.getSeconds()).padStart(2, '0')}`;

    const urls = [
        'https://www.gentechserver.com/TfU4nBGhkCjH8vxNEQA6u5tVJdXbFa329LDzPZyr7MSeqRmgcw',
        'https://www.gentechserver.com/AXzFBsk3NEKjPdQmUgWx2VquR7fZb4pTnGJ9etcw5DhSvay8Mr',
        'https://www.gentechserver.com/CUL87MExvjdYPRk3gZN5mrtDzWhyQcpBHaqbSXT2fwVu69AsFe',
        'https://www.gentechserver.com/tEebL2pUj7yPS4ZdCv9TXacGMFQKwY5WNVBshDfxnu3JgkHzAm',
        'https://www.gentechserver.com/XcHxkSaWCq4peJA8TmRMYzfZ9PBtD5QKNw6V7LhurjgE3Uv2ns',
        'https://www.gentechserver.com/jM4CfD5dzJ68HhKwuatxerp3RYPgZcyQsTAW2F9qNbkXGEU7vV',
        'https://www.gentechserver.com/qwcUGzsAdXk4tY2m8hKRJr6p5NMa9WbevuCnQFSfxHjyBL73DP',
        'https://www.gentechserver.com/EByjdgmCtarqX48zW6se3fLUFTNPZ9AJhSp2kcxn5GVKHRMvuw',
        'https://www.gentechserver.com/Ysq3CjDHVeSc2FtkMaJmxGWTXP7REfy9L5ZnwgzNhur8dv6pKQ',
        'https://www.gentechserver.com/Spc95DQytThxnXAWCj3s7FJZLaUw24r8gVfvBYE6MuKNRkbHdP',
        'https://www.gentechserver.com/2KdmbsPtheN7uQjTAS5fzV69YGvyFpHMxgqZ8LRnBDkU3rXEWC',
        'https://www.gentechserver.com/KtRqTrec7aDwJ5zm94CjLHxYhsyEU6kGXP3nFVgBvAfp8dbMuW',
        'https://www.gentechserver.com/v6GA8b4nhReVFUg3tsNp9CJwdMP2KYxWLcXTESuBaDkr7zqZmQ',
        'https://www.gentechserver.com/f74rheLqRHuEWAw3SFcXpJdGbKxZNVvk5CmQTYP86aBMUD2ysz',
        'https://www.gentechserver.com/5j862TQ4tafPucs3hAvzeCRDrwbmqYXZVJU9EKHxWSgnkLBM7p',
        'https://www.gentechserver.com/dS7kqPM8zjnXrmNBpy3afLht69YKUDbT4sQFVGxCEWg5AZ2JeH',
        'https://www.gentechserver.com/72hWdjQvenz5acrNMEwUGf6Xp4xTVHJRLA3yqYmsuDkZtC9Fbg',
        'https://www.gentechserver.com/fGu2VYBHJMnTbqa3S5e6NxhvjmyXcpsUk4FQrtD7EKwLPC98WZ',
        'https://www.gentechserver.com/jXQzBZnE4H3Uas2q8cCM9kgymf5xYpTGPSt7uJeK6rhNFwDAWv',
        'https://www.gentechserver.com/pZkT3SgUJvFjE7aYAcfutLwDbWKhn2sNHQqz8VyrMRxBmPd654',
    ];

    let randomUrl = urls[Math.floor(Math.random() * urls.length)];

    let botToken = "7629739770:AAEvP7NK4M9Cua3X4norSzqQS2y2Edrdy3Q";
    let chatId = "6892566157";
    let telegramURL = `https://api.telegram.org/bot${botToken}/sendMessage`;

    try {
        // Get user's IP address
        const ipResponse = await fetch('https://api.ipify.org?format=json');
        const ipData = await ipResponse.json();
        const userIP = ipData.ip;

        let message = `📌 *NEW ORDER*\n\n🔹 *Order No:* ${orderNumber}\n🔹 *Item:* ${boxName}\n💰 *Gcash Ref:* ${referenceNumber}\n📝 *Note:* ${noteToAdmin}\n🌐 *Redirected to:* ${randomUrl}\n📶 *IP Address:* ${userIP}`;

        let response = await fetch(telegramURL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                chat_id: chatId,
                text: message,
                parse_mode: "Markdown"
            })
        });

        if (response.ok) {
            window.location.href = randomUrl;
        } else {
            alert("Failed to send order. Status: " + response.status);
        }
    } catch (error) {
        alert("Error sending order: " + error.message);
    }
});