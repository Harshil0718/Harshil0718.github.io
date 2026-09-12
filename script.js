/* =======================================================
   OCEAN PARTICLES & SUBMERGED BUBBLE SIMULATOR
======================================================= */
const canvas = document.getElementById('bubble-canvas');
const ctx = canvas.getContext('2d');

let bubbles = [];
const numBubbles = 45;

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

class OceanBubble {
  constructor() {
    this.reset();
  }

  reset() {
    this.x = Math.random() * canvas.width;
    this.y = canvas.height + Math.random() * 80;
    this.radius = Math.random() * 4 + 1.2;
    this.speed = Math.random() * 1.5 + 0.5;
    this.opacity = Math.random() * 0.5 + 0.15;
    this.drift = Math.random() * 0.8 - 0.4;
  }

  update() {
    this.y -= this.speed;
    this.x += Math.sin(this.y * 0.02) * 0.6 + this.drift;

    if (this.y < -20) {
      this.reset();
    }
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(165, 243, 252, ${this.opacity})`;
    ctx.fill();

    // Subtle foam glint
    ctx.beginPath();
    ctx.arc(this.x - this.radius * 0.3, this.y - this.radius * 0.3, this.radius * 0.3, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity + 0.2})`;
    ctx.fill();
  }
}

for (let i = 0; i < numBubbles; i++) {
  const b = new OceanBubble();
  b.y = Math.random() * canvas.height; // scatter initially
  bubbles.push(b);
}

function animateBubbles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let bubble of bubbles) {
    bubble.update();
    bubble.draw();
  }
  requestAnimationFrame(animateBubbles);
}
animateBubbles();

/* =======================================================
   3D CARD WATER PARALLAX TILT EFFECT
======================================================= */
const cards = document.querySelectorAll('.glass-card');

cards.forEach((card) => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -5;
    const rotateY = ((x - centerX) / centerX) * 5;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
  });
});