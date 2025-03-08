const compliments = [
    "Your smile lights up my world!",
    "You are the most beautiful and amazing!",
    "You make every day special!",
    "You are my muse and inspiration!",
    "Your beauty outshines spring flowers!",
    "You are my favorite mystery!",
    "The world becomes brighter with you!",
    "Your laughter is the best melody!",
    "You are the most valuable in my life!",
    "You are beautiful in every sense!",
    "Your soul is pure as the spring sky!",
    "You decorate everything around with your presence!",
    "You make the impossible possible!",
    "You are my favorite story!",
    "You are delightful in everything!",
    "Your tenderness conquers my heart!",
    "You are my favorite reason for a smile!",
    "You are like spring - you bring warmth and joy!"
];

function createStars() {
    const starsContainer = document.querySelector('.stars');
    for (let i = 0; i < 200; i++) {
        const star = document.createElement('div');
        star.classList.add('star');
        star.style.top = `${Math.random() * 100}vh`;
        star.style.left = `${Math.random() * 100}vw`;
        star.style.animationDelay = `${Math.random() * 2}s`;
        starsContainer.appendChild(star);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    createStars();
    const openBtn = document.getElementById('openBtn');

    openBtn.addEventListener('click', function() {
        document.querySelector('.intro-screen').style.opacity = '0';
        setTimeout(() => {
            document.querySelector('.intro-screen').style.display = 'none';
            document.querySelector('.congrats-screen').classList.add('visible');
        }, 1000);

        setInterval(createPetal, 300);
    });

    document.addEventListener('mousemove', (e) => {
        const stars = document.querySelector('.stars');
        const x = e.clientX / window.innerWidth * 10;
        const y = e.clientY / window.innerHeight * 10;
        stars.style.transform = `translate(${x}px, ${y}px)`;
    });


    document.getElementById('bouquet-btn').addEventListener('click', function(e) {
        createParticles(e.clientX, e.clientY);
        for (let i = 0; i < 10; i++) setTimeout(createPetal, i * 100);
        showRandomCompliment();
    });

    setInterval(createPetal, 1000);
});

function createParticles(x, y) {
    const container = document.body;
    const count = 30;

    for (let i = 0; i < count; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');

        const size = Math.random() * 8 + 4;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;

        const hue = Math.floor(Math.random() * 40) + 340;
        const saturation = Math.floor(Math.random() * 30) + 70;
        const lightness = Math.floor(Math.random() * 20) + 60;
        particle.style.backgroundColor = `hsl(${hue}, ${saturation}%, ${lightness}%)`;

        particle.style.left = `${x}px`;
        particle.style.top = `${y}px`;

        const tx = (Math.random() - 0.5) * 200;
        const ty = (Math.random() - 0.5) * 200;
        particle.style.setProperty('--tx', `${tx}px`);
        particle.style.setProperty('--ty', `${ty}px`);

        container.appendChild(particle);

        particle.addEventListener('animationend', () => {
            particle.remove();
        });
    }
}

function createPetal() {
    const petal = document.createElement('img');
    petal.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30"><path d="M15 0 C20 10 25 15 15 30 C5 15 10 10 15 0" fill="%23ff6f61" opacity="0.7"/></svg>';
    petal.classList.add('petal');

    const size = Math.floor(Math.random() * 30) + 20;
    petal.style.width = `${size}px`;

    const x = Math.random() * window.innerWidth;
    petal.style.left = `${x}px`;

    petal.style.top = `-50px`;

    const rotationDirection = Math.random() > 0.5 ? 1 : -1;
    const rotationSpeed = Math.random() * 360;

    const horizontalDrift = (Math.random() - 0.5) * 200;

    const petalsContainer = document.getElementById('petals-container');
    if (petalsContainer) {
        petalsContainer.appendChild(petal);
    }

    const animationDuration = Math.random() * 3 + 2;
    petal.style.animation = `fall ${animationDuration}s linear forwards`;

    petal.style.setProperty('--drift', `${horizontalDrift}px`);

    petal.addEventListener('animationend', () => {
        petal.remove();
    });

    let rotation = 0;
    const rotatePetal = () => {
        rotation += rotationSpeed * rotationDirection * 0.01;
        petal.style.transform = `rotate(${rotation}deg)`;
        requestAnimationFrame(rotatePetal);
    };
    requestAnimationFrame(rotatePetal);
}

function showRandomCompliment() {
    const complimentElement = document.getElementById('compliment');
    if (!complimentElement) return;

    complimentElement.classList.remove('show');

    setTimeout(() => {
        const randomIndex = Math.floor(Math.random() * compliments.length);
        complimentElement.textContent = compliments[randomIndex];

        complimentElement.classList.add('show');
    }, 100);
}


