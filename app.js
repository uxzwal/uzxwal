/* ============================================================
   Ujjwal Kumar — Portfolio JS
   Neural Control Dashboard · Three.js · Pure Vanilla
   ============================================================ */

// ── Custom Cursor ──────────────────────────────────────────
const cursor = document.getElementById('cursor');
if (cursor && window.innerWidth > 768) {
  document.addEventListener('mousemove', e => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
  });
  document.querySelectorAll('a,button,.pipe-stage,.stack-icon,.cert-card,.email-display').forEach(el => {
    el.addEventListener('mouseenter', () => { cursor.style.transform = 'translate(-50%,-50%) scale(2)'; cursor.style.borderColor = 'var(--accent2)'; });
    el.addEventListener('mouseleave', () => { cursor.style.transform = 'translate(-50%,-50%) scale(1)'; cursor.style.borderColor = 'var(--accent)'; });
  });
} else if (cursor) { cursor.style.display = 'none'; }

// ── Theme Toggle ───────────────────────────────────────────
const themeBtn = document.getElementById('themeToggle');
let darkMode = true;
themeBtn.addEventListener('click', () => {
  darkMode = !darkMode;
  document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light');
  themeBtn.textContent = darkMode ? '☀' : '🌙';
});

// ── Mobile Menu ────────────────────────────────────────────
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
hamburger.addEventListener('click', () => mobileMenu.classList.toggle('open'));
mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => mobileMenu.classList.remove('open')));

// ── Typing Animation ──────────────────────────────────────
const phrases = [
  'Automating Infrastructure.',
  'Building Scalable Pipelines.',
  'Shipping Zero-Trust CI/CD.',
  'Deploying to Kubernetes.',
  'Writing IaC with Terraform.',
];
let phraseIdx = 0, charIdx = 0, deleting = false;
const typedEl = document.getElementById('typed-text');
function typeLoop() {
  const phrase = phrases[phraseIdx];
  if (!deleting) {
    typedEl.textContent = phrase.slice(0, charIdx + 1);
    charIdx++;
    if (charIdx === phrase.length) { deleting = true; setTimeout(typeLoop, 2200); return; }
  } else {
    typedEl.textContent = phrase.slice(0, charIdx - 1);
    charIdx--;
    if (charIdx === 0) { deleting = false; phraseIdx = (phraseIdx + 1) % phrases.length; }
  }
  setTimeout(typeLoop, deleting ? 45 : 70);
}
typeLoop();

// ── Background Particle Canvas ────────────────────────────
(function initBgCanvas() {
  const c = document.getElementById('bg-canvas');
  const ctx = c.getContext('2d');
  let W, H, particles = [];
  function resize() { W = c.width = window.innerWidth; H = c.height = window.innerHeight; }
  resize();
  window.addEventListener('resize', resize);
  const N = window.innerWidth < 768 ? 40 : 80;
  for (let i = 0; i < N; i++) {
    particles.push({ x: Math.random() * 1920, y: Math.random() * 1080, vx: (Math.random()-0.5)*0.4, vy: (Math.random()-0.5)*0.4, r: Math.random()*1.5+0.5 });
  }
  let mouseX = W/2, mouseY = H/2;
  document.addEventListener('mousemove', e => { mouseX = e.clientX; mouseY = e.clientY; });
  let raf;
  function draw() {
    ctx.clearRect(0,0,W,H);
    particles.forEach(p => {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
      if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI*2);
      ctx.fillStyle = 'rgba(59,130,246,0.6)';
      ctx.fill();
    });
    for (let i = 0; i < particles.length; i++) {
      for (let j = i+1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx*dx+dy*dy);
        if (dist < 120) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(59,130,246,${0.12*(1-dist/120)})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
    raf = requestAnimationFrame(draw);
  }
  draw();
})();

// ── Hero 3D Cloud Node Cluster (Canvas 2D fallback) ───────
(function initHero3D() {
  const container = document.getElementById('hero3d');
  if (!container) return;
  const c = document.createElement('canvas');
  c.style.cssText = 'width:100%;height:100%;display:block;';
  c.setAttribute('aria-label','Interactive Cloud Node Cluster visualization');
  container.appendChild(c);
  const ctx = c.getContext('2d');
  let W, H;
  function resize() {
    W = c.width = container.offsetWidth * (window.devicePixelRatio||1);
    H = c.height = container.offsetHeight * (window.devicePixelRatio||1);
    ctx.scale(window.devicePixelRatio||1, window.devicePixelRatio||1);
  }
  window.addEventListener('resize', resize);
  setTimeout(resize, 100);

  const nodes = [];
  const labels = ['API','CI/CD','K8s','AWS','Docker','Terraform','Jenkins','Monitor','Git','DB','CDN','LB'];
  const nodeCount = 12;
  for (let i = 0; i < nodeCount; i++) {
    const angle = (i / nodeCount) * Math.PI * 2;
    const r = 130 + Math.sin(i * 1.7) * 40;
    nodes.push({
      x: 0, y: 0,
      baseX: Math.cos(angle) * r, baseY: Math.sin(angle) * r * 0.55,
      vx: 0, vy: 0,
      radius: 18 + Math.random() * 10,
      label: labels[i],
      phase: Math.random() * Math.PI * 2,
      speed: 0.4 + Math.random() * 0.4,
      color: Math.random() > 0.5 ? '#3b82f6' : '#a855f7',
      glow: Math.random() > 0.6,
    });
  }

  const edges = [];
  for (let i = 0; i < nodeCount; i++) {
    for (let j = i+1; j < nodeCount; j++) {
      if (Math.random() < 0.35) edges.push([i,j]);
    }
  }

  let mx = 0, my = 0;
  container.addEventListener('mousemove', e => {
    const r = container.getBoundingClientRect();
    mx = (e.clientX - r.left - r.width/2) / r.width;
    my = (e.clientY - r.top - r.height/2) / r.height;
  });

  let t = 0;
  function draw() {
    const cw = container.offsetWidth, ch = container.offsetHeight;
    c.width = cw * (devicePixelRatio||1);
    c.height = ch * (devicePixelRatio||1);
    ctx.setTransform(devicePixelRatio||1,0,0,devicePixelRatio||1,0,0);
    ctx.clearRect(0, 0, cw, ch);
    const cx = cw/2 + mx * 30, cy = ch/2 + my * 20;
    t += 0.008;

    // Update node positions
    nodes.forEach((n, i) => {
      n.x = cx + n.baseX + Math.sin(t * n.speed + n.phase) * 12 + mx * 18;
      n.y = cy + n.baseY + Math.cos(t * n.speed * 0.7 + n.phase) * 8 + my * 12;
    });

    // Draw edges
    edges.forEach(([a,b]) => {
      const na = nodes[a], nb = nodes[b];
      const grad = ctx.createLinearGradient(na.x, na.y, nb.x, nb.y);
      grad.addColorStop(0, 'rgba(59,130,246,0.25)');
      grad.addColorStop(1, 'rgba(168,85,247,0.25)');
      ctx.beginPath();
      const mx2 = (na.x+nb.x)/2, my2 = (na.y+nb.y)/2 - 20;
      ctx.moveTo(na.x, na.y);
      ctx.quadraticCurveTo(mx2, my2, nb.x, nb.y);
      ctx.strokeStyle = grad;
      ctx.lineWidth = 1;
      ctx.stroke();

      // Animated packet
      const pct = (t * 0.5 + a * 0.3) % 1;
      const px = na.x + (nb.x - na.x) * pct;
      const py = na.y + (nb.y - na.y) * pct;
      ctx.beginPath();
      ctx.arc(px, py, 2.5, 0, Math.PI*2);
      ctx.fillStyle = na.color;
      ctx.shadowBlur = 8; ctx.shadowColor = na.color;
      ctx.fill();
      ctx.shadowBlur = 0;
    });

    // Draw nodes
    nodes.forEach(n => {
      const pulse = 1 + Math.sin(t * 2 + n.phase) * 0.08;
      const r = n.radius * pulse;

      // Glow
      ctx.beginPath();
      ctx.arc(n.x, n.y, r + 8, 0, Math.PI*2);
      ctx.fillStyle = n.color + '22';
      ctx.fill();

      // Node circle
      const grad = ctx.createRadialGradient(n.x-r*0.3, n.y-r*0.3, 0, n.x, n.y, r);
      grad.addColorStop(0, n.color + 'cc');
      grad.addColorStop(1, n.color + '44');
      ctx.beginPath();
      ctx.arc(n.x, n.y, r, 0, Math.PI*2);
      ctx.fillStyle = grad;
      ctx.strokeStyle = n.color;
      ctx.lineWidth = 1;
      ctx.shadowBlur = 15; ctx.shadowColor = n.color;
      ctx.fill(); ctx.stroke();
      ctx.shadowBlur = 0;

      // Label
      ctx.font = 'bold 9px JetBrains Mono, monospace';
      ctx.fillStyle = '#fff';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(n.label, n.x, n.y);
    });

    requestAnimationFrame(draw);
  }
  draw();
})();

// ── Contribution Graph ────────────────────────────────────
(function initContribGraph() {
  const canvas = document.getElementById('contrib-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const weeks = 52, days = 7;
  // Simulate realistic commit data — calibrated to exactly 1,969 contributions
  const TARGET = 1969;
  const data = [];
  let total = 0;
  for (let w = 0; w < weeks; w++) {
    data[w] = [];
    for (let d = 0; d < days; d++) {
      let v = 0;
      if (Math.random() > 0.18) {                         // higher active-day rate
        v = Math.floor(Math.pow(Math.random(), 0.6) * 14); // base commits
        if (w > 30) v = Math.floor(v * 1.8);              // heavy recent activity
        if (Math.random() < 0.1) v = Math.floor(Math.random() * 20 + 8); // spike days
      }
      total += v;
      data[w].push(v);
    }
  }
  // Normalise so every cell scales proportionally to hit exactly TARGET
  const scale = TARGET / (total || 1);
  total = 0;
  for (let w = 0; w < weeks; w++) {
    for (let d = 0; d < days; d++) {
      data[w][d] = Math.round(data[w][d] * scale);
      total += data[w][d];
    }
  }
  // Distribute rounding remainder across highest-value cells
  let diff = TARGET - total;
  outer: for (let pass = 0; pass < Math.abs(diff); pass++) {
    for (let w = 0; w < weeks; w++) {
      for (let d = 0; d < days; d++) {
        if (data[w][d] > 0) { data[w][d] += diff > 0 ? 1 : -1; break outer; }
      }
    }
  }

  function draw() {
    const W = canvas.offsetWidth || 800;
    const H = 120;
    canvas.width = W; canvas.height = H;
    const cellW = (W - 40) / weeks;
    const cellH = (H - 20) / days;
    const gap = 2;

    for (let w = 0; w < weeks; w++) {
      for (let d = 0; d < days; d++) {
        const v = data[w][d];
        const x = 30 + w * cellW;
        const y = 10 + d * cellH;
        const intensity = v === 0 ? 0 : Math.min(v / 15, 1);
        let color;
        if (v === 0) color = 'rgba(255,255,255,0.05)';
        else if (intensity < 0.3) color = 'rgba(59,130,246,0.35)';
        else if (intensity < 0.6) color = 'rgba(59,130,246,0.65)';
        else if (intensity < 0.85) color = 'rgba(59,130,246,0.9)';
        else color = 'rgba(168,85,247,1)';

        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.roundRect(x+gap/2, y+gap/2, cellW-gap, cellH-gap, 2);
        ctx.fill();
      }
    }

    // Day labels
    const dayLabels = ['S','M','T','W','T','F','S'];
    ctx.font = '9px JetBrains Mono, monospace';
    ctx.fillStyle = 'rgba(148,163,184,0.7)';
    ctx.textAlign = 'right';
    for (let d = 0; d < 7; d++) {
      ctx.fillText(dayLabels[d], 24, 10 + d * cellH + cellH/2 + 3);
    }
  }
  draw();
  window.addEventListener('resize', draw);
})();

// ── Counter Animation ─────────────────────────────────────
function animateCounter(el, target, duration) {
  let start = 0, startTime = null;
  function step(ts) {
    if (!startTime) startTime = ts;
    const p = Math.min((ts - startTime) / duration, 1);
    el.textContent = Math.floor(p * target).toLocaleString();
    if (p < 1) requestAnimationFrame(step);
    else el.textContent = target.toLocaleString();
  }
  requestAnimationFrame(step);
}

// ── Intersection Observer ─────────────────────────────────
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      // Trigger bar animations
      entry.target.querySelectorAll('.dash-fill').forEach(b => b.classList.add('animated'));
      // Trigger counter
      const counter = entry.target.querySelector('#contrib-counter');
      if (counter && !counter.dataset.animated) {
        counter.dataset.animated = '1';
        animateCounter(counter, 1969, 1800);
      }
      // Animate pipeline
      if (entry.target.id === 'pipeline') {
        animatePipeline();
      }
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('section, .dash-card, .project-card, .cert-card').forEach(el => {
  el.classList.add('reveal');
  observer.observe(el);
});

// ── Pipeline Tooltip ──────────────────────────────────────
const tooltip = document.getElementById('pipeTooltip');
document.querySelectorAll('.pipe-stage').forEach(stage => {
  stage.addEventListener('mouseenter', e => {
    if (tooltip) {
      tooltip.textContent = stage.dataset.tip;
      tooltip.classList.add('show');
    }
  });
  stage.addEventListener('mouseleave', () => {
    if (tooltip) tooltip.classList.remove('show');
  });
});

function animatePipeline() {
  const stages = document.querySelectorAll('.pipe-stage');
  stages.forEach((s, i) => {
    s.style.opacity = '0';
    s.style.transform = 'translateY(20px)';
    setTimeout(() => {
      s.style.transition = 'all 0.5s ease';
      s.style.opacity = '1';
      s.style.transform = 'translateY(0)';
    }, i * 120);
  });
}

// ── Card Tilt Effect ──────────────────────────────────────
document.querySelectorAll('.tilt-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `perspective(600px) rotateY(${x*10}deg) rotateX(${-y*10}deg) translateY(-6px)`;
    card.style.boxShadow = `${-x*20}px ${-y*20}px 40px rgba(59,130,246,0.15)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
    card.style.boxShadow = '';
  });
});

// ── Copy Email ────────────────────────────────────────────
function copyEmail() {
  navigator.clipboard.writeText('iamkashyup@gmail.com').then(() => {
    const msg = document.getElementById('copyMsg');
    msg.classList.add('show');
    setTimeout(() => msg.classList.remove('show'), 2000);
  });
}
window.copyEmail = copyEmail;

// ── Navbar Scroll Effect ──────────────────────────────────
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.style.background = window.scrollY > 20
    ? 'rgba(5,5,5,0.97)'
    : 'rgba(5,5,5,0.8)';
});

// ── Smooth Scroll ─────────────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(a.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  });
});

console.log('%c Ujjwal Kumar — DevOps Portfolio ', 'background:#3b82f6;color:#fff;font-size:16px;padding:8px 16px;border-radius:4px;font-family:monospace;');
console.log('%c 1,969 GitHub contributions. 6 months. Shipping like a senior. ', 'color:#a855f7;font-family:monospace;');
