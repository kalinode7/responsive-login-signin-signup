// تابع تولید ID منحصربه‌فرد
function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
}

// صفحه ساخت چالش (index.html)
if (document.getElementById('challengeForm')) {
    document.getElementById('challengeForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('challengeName').value;
        const password = document.getElementById('challengePassword').value;
        const challengeId = generateId();

        // ذخیره چالش در localStorage
        const challenge = {
            id: challengeId,
            name: name,
            password: password,
            messages: []
        };
        localStorage.setItem(`challenge_${challengeId}`, JSON.stringify(challenge));

        // نمایش لینک
        const link = `${window.location.origin}/send.html?id=${challengeId}`;
        document.getElementById('shareLink').value = link;
        document.getElementById('challengeLink').style.display = 'block';
    });
}

// تابع کپی لینک
function copyLink() {
    const linkInput = document.getElementById('shareLink');
    linkInput.select();
    document.execCommand('copy');
    alert('لینک کپی شد!');
}

// صفحه ارسال پیام (send.html)
if (document.getElementById('messageForm')) {
    const urlParams = new URLSearchParams(window.location.search);
    const challengeId = urlParams.get('id');

    if (!challengeId || !localStorage.getItem(`challenge_${challengeId}`)) {
        document.body.innerHTML = '<h1 style="text-align: center; color: #624583;">چالش یافت نشد!</h1>';
        return;
    }

    document.getElementById('messageForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const senderName = document.getElementById('senderName').value || 'ناشناس';
        const messageText = document.getElementById('messageText').value;

        // گرفتن اطلاعات چالش
        const challengeData = JSON.parse(localStorage.getItem(`challenge_${challengeId}`));
        challengeData.messages.push({
            sender: senderName,
            text: messageText,
            date: new Date().toLocaleString('fa-IR')
        });

        // به‌روزرسانی localStorage
        localStorage.setItem(`challenge_${challengeId}`, JSON.stringify(challengeData));

        // نمایش پیام موفقیت
        document.getElementById('successMessage').style.display = 'block';
        document.getElementById('messageForm').reset();
        setTimeout(() => {
            document.getElementById('successMessage').style.display = 'none';
        }, 3000);
    });
}

// صفحه داشبورد (dashboard.html)
if (document.getElementById('loginForm')) {
    const urlParams = new URLSearchParams(window.location.search);
    const challengeId = urlParams.get('id');

    if (!challengeId) {
        document.body.innerHTML = '<h1 style="text-align: center; color: #624583;">لطفاً از لینک چالش وارد شوید!</h1>';
        return;
    }

    document.getElementById('loginForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const password = document.getElementById('adminPassword').value;
        const challengeData = JSON.parse(localStorage.getItem(`challenge_${challengeId}`));

        if (!challengeData || challengeData.password !== password) {
            alert('رمز عبور اشتباه است!');
            return;
        }

        // نمایش پیام‌ها
        document.getElementById('loginForm').style.display = 'none';
        const messagesDiv = document.getElementById('messages');
        messagesDiv.style.display = 'block';
        const messageList = document.getElementById('messageList');

        if (challengeData.messages.length === 0) {
            messageList.innerHTML = '<p style="text-align: center; color: #999;">هنوز پیامی دریافت نشده!</p>';
        } else {
            challengeData.messages.forEach(msg => {
                messageList.innerHTML += `
                    <div class="message">
                        <div class="message-sender">${msg.sender}</div>
                        <div class="message-text">${msg.text}</div>
                        <div class="message-date">${msg.date}</div>
                    </div>
                `;
            });
        }
    });
}
