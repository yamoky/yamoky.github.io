const canvas = document.getElementById('particle-canvas');
const ctx = canvas.getContext('2d');
let particles = [];
const numParticles = 100;
const particleSize = 2;
const particleSpeed = 0.5;
const connectionDistance = 100;

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * particleSize;
        this.speedX = (Math.random() - 0.5) * particleSpeed;
        this.speedY = (Math.random() - 0.5) * particleSpeed;
        this.color = 'rgba(0, 170, 255, 0.5)';
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > canvas.width || this.x < 0) this.speedX = -this.speedX;
        if (this.y > canvas.height || this.y < 0) this.speedY = -this.speedY;
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function init() {
    particles = [];
    for (let i = 0; i < numParticles; i++) {
        particles.push(new Particle());
    }
}

function connect() {
    let opacityValue = 1;
    for (let a = 0; a < particles.length; a++) {
        for (let b = a; b < particles.length; b++) {
            let distance = Math.sqrt(
                Math.pow(particles[a].x - particles[b].x, 2) +
                Math.pow(particles[a].y - particles[b].y, 2)
            );
            
            if (distance < connectionDistance) {
                opacityValue = 1 - (distance / connectionDistance);
                ctx.strokeStyle = `rgba(0, 170, 255, ${opacityValue})`;
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(particles[a].x, particles[a].y);
                ctx.lineTo(particles[b].x, particles[b].y);
                ctx.stroke();
            }
        }
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
    }
    connect();
    requestAnimationFrame(animate);
}

window.addEventListener('load', () => {
    resizeCanvas();
    init();
    animate();
});

window.addEventListener('resize', () => {
    resizeCanvas();
    init();
});