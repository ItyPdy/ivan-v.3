const avatar = document.querySelector('.avatar-wrapper');
let isAnimating = false;

avatar.addEventListener('click', function(e) {
    if (isAnimating) return;
    isAnimating = true;
    startEpicEffect();
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