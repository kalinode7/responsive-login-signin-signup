// تابع تولید ID منحصربه‌فرد
function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
}

// تابع کپی لینک
function copyLink() {
    const linkInput = document.getElementById('shareLink');
    linkInput.select();
    document.execCommand('copy');
    alert('لینک کپی شد!');
}

// مدیریت فرم ساخت چالش
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('challengeForm');
    if (form) {
        form.addEventListener('submit', (e) => {
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
            const shareLinkInput = document.getElementById('shareLink');
            shareLinkInput.value = link;
            document.getElementById('challengeLink').style.display = 'block';

            // برای دیباگ: نمایش در کنسول
            console.log('چالش ساخته شد:', challenge);
            console.log('لینک:', link);
        });
    } else {
        console.error('فرم چالش پیدا نشد!');
    }
});

// کدهای مربوط به send.html و dashboard.html رو اینجا نمی‌ذارم چون مشکلی که گفتید توی index.html هست
