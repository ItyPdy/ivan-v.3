const avatar = document.querySelector('.avatar-wrapper');
let isAnimating = false;

let clickCount = 0;
let record = parseInt(localStorage.getItem('clickRecord')) || 0;
let clickHistory = [];
let cps = 0;
let lastClickTime = 0;

const counterNumber = document.getElementById('counter-number');
const recordNumber = document.getElementById('record-number');
const cpsNumber = document.getElementById('cps-number');

recordNumber.textContent = record;

function updateCounter() {
    counterNumber.textContent = clickCount;

    counterNumber.classList.remove('pop');
    void counterNumber.offsetWidth;
    counterNumber.classList.add('pop');

    updateCPS();

}

function showClickPopup(x, y) {
    const popup = document.createElement('div');
    popup.className = 'click-popup';
    popup.textContent = '+1';

    const colors = ['#ff6b6b', '#ffd93d', '#6bcb77', '#4d96ff', '#ff6bcb', '#ff9f43'];
    popup.style.color = colors[Math.floor(Math.random() * colors.length)];

    const tx = (Math.random() - 0.5) * 200;
    const ty = -100 - Math.random() * 200;
    popup.style.setProperty('--tx', tx + 'px');
    popup.style.setProperty('--ty', ty + 'px');

    popup.style.left = x + 'px';
    popup.style.top = y + 'px';

    document.body.appendChild(popup);
    setTimeout(() => popup.remove(), 1000);
}

function showRecordNotification() {
    const notif = document.createElement('div');
    notif.className = 'record-notification';
    notif.textContent = '🏆 НОВЫЙ РЕКОРД! 🏆';
    document.body.appendChild(notif);

    setTimeout(() => {
        notif.classList.add('hide');
        setTimeout(() => notif.remove(), 500);
    }, 1500);
}

function updateCPS() {
    const now = Date.now();
    clickHistory.push(now);
    clickHistory = clickHistory.filter(time => now - time < 1000);
    cps = clickHistory.length;
    cpsNumber.textContent = cps;
}

avatar.addEventListener('click', function(e) {

    clickCount++;
    updateCounter();

    const rect = this.getBoundingClientRect();
    const x = e.clientX || rect.left + rect.width/2;
    const y = e.clientY || rect.top;
    showClickPopup(x, y);

    if (isAnimating) return;
    isAnimating = true;
    startEpicEffect();
});

document.getElementById('reset-counter-btn').addEventListener('click', function(e) {
    e.stopPropagation();
    if (confirm('Точно сбросить счётчик? 🥺')) {
        clickCount = 0;
        clickHistory = [];
        cps = 0;
        cpsNumber.textContent = '0';
        counterNumber.textContent = '0';
    }
});

function startEpicEffect() {
    const avatar = document.querySelector('.avatar-wrapper');
    const rect = avatar.getBoundingClientRect();

    const centerX = window.innerWidth / 2 - rect.width / 2;
    const centerY = window.innerHeight / 2 - rect.height / 2;

    avatar.style.position = 'fixed';
    avatar.style.left = rect.left + 'px';
    avatar.style.top = rect.top + 'px';
    avatar.style.transition = 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)';
    avatar.style.transform = 'scale(1.5)';

    requestAnimationFrame(() => {
        avatar.style.left = centerX + 'px';
        avatar.style.top = centerY + 'px';
    });

    setTimeout(() => {
        flashScreen();
        createCracks();
        shakeScreenHard();

        setTimeout(() => {
            avatar.style.transition = 'all 1.2s cubic-bezier(0.68, -0.55, 0.27, 1.55)';
            avatar.style.top = window.innerHeight + 200 + 'px';
            avatar.style.transform = 'scale(0.8) rotate(720deg)';
            avatar.style.opacity = '0';
        }, 300);
    }, 700);

    setTimeout(() => {
        resetEverything();
    }, 3500);
}

function flashScreen() {
    const flash = document.getElementById('flash');
    flash.classList.add('active');

    setTimeout(() => {
        flash.classList.remove('active');
    }, 200);
}

function createCracks() {
    const container = document.getElementById('cracks');
    const numCracks = 30;

    for (let i = 0; i < numCracks; i++) {
        const crack = document.createElement('div');
        crack.className = 'crack';

        const width = 50 + Math.random() * 150;
        const height = 50 + Math.random() * 150;
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight;

        const tx = (Math.random() - 0.5) * 300;
        const ty = 100 + Math.random() * 300;
        const rot = (Math.random() - 0.5) * 360;

        crack.style.width = width + 'px';
        crack.style.height = height + 'px';
        crack.style.left = x + 'px';
        crack.style.top = y + 'px';
        crack.style.setProperty('--tx', tx + 'px');
        crack.style.setProperty('--ty', ty + 'px');
        crack.style.setProperty('--rot', rot + 'deg');

        const brightness = 10 + Math.random() * 25;
        crack.style.background = `rgb(${brightness}, ${brightness}, ${brightness + 20})`;

        crack.style.animationDelay = (Math.random() * 0.3) + 's';

        container.appendChild(crack);
    }
}

function resetEverything() {
    const avatar = document.querySelector('.avatar-wrapper');
    const container = document.getElementById('cracks');

    container.innerHTML = '';

    avatar.style.position = '';
    avatar.style.left = '';
    avatar.style.top = '';
    avatar.style.transform = '';
    avatar.style.opacity = '1';
    avatar.style.transition = 'all 0.3s ease';

    document.body.classList.remove('shaking-hard');

    isAnimating = false;
}

function shakeScreenHard() {
    document.body.classList.add('shaking-hard');

    setTimeout(() => {
        document.body.classList.remove('shaking-hard');
    }, 1000);
}

document.getElementById('cracks').style.pointerEvents = 'none';