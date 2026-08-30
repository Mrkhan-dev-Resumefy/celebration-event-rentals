// ========== HERO 3D SCENE (bounce house + popcorn cart + balloons) ==========
// Built lazily: see the loader at the bottom of this file. On mobile and under
// reduced-motion the Three.js library is never downloaded — a static poster is
// drawn instead, which is the single biggest mobile load-time win on the page.
window.buildHeroScene = function() {
  const canvas = document.getElementById('three-canvas');
  if (!canvas || !window.THREE) return;

  const container = canvas.parentElement;
  const scene = new THREE.Scene();
  scene.background = null;

  // Camera
  const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
  camera.position.set(6, 4.5, 8);
  camera.lookAt(0, 1, 0);

  // Renderer
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  function resize() {
    const w = container.clientWidth;
    const h = container.clientHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }
  resize();
  window.addEventListener('resize', resize);

  // Lights
  const amb = new THREE.AmbientLight(0xffffff, 0.6);
  scene.add(amb);
  const dir = new THREE.DirectionalLight(0xffffff, 1.1);
  dir.position.set(5, 8, 5);
  dir.castShadow = true;
  dir.shadow.mapSize.set(1024, 1024);
  dir.shadow.camera.left = -8; dir.shadow.camera.right = 8;
  dir.shadow.camera.top = 8; dir.shadow.camera.bottom = -8;
  scene.add(dir);
  const fill = new THREE.DirectionalLight(0xFFD6A5, 0.35);
  fill.position.set(-5, 3, -3);
  scene.add(fill);

  // Colors
  const COL = {
    red: 0xE63946, redD: 0xC52836,
    yellow: 0xFFD60A, yellowD: 0xE6BE00,
    blue: 0x2A6FDB, blueD: 0x1E56B8,
    white: 0xFFFAF0, ink: 0x1a1a2e,
    cream: 0xFFF8E7, grass: 0xB8E0A0,
  };

  // Group holding everything for rotation
  const world = new THREE.Group();
  scene.add(world);

  // ---- Ground disc (grass) ----
  const groundGeo = new THREE.CylinderGeometry(4.5, 4.5, 0.15, 48);
  const groundMat = new THREE.MeshStandardMaterial({ color: COL.grass, roughness: 0.95 });
  const ground = new THREE.Mesh(groundGeo, groundMat);
  ground.position.y = -0.08;
  ground.receiveShadow = true;
  world.add(ground);

  // little rim
  const rimGeo = new THREE.TorusGeometry(4.5, 0.06, 8, 48);
  const rimMat = new THREE.MeshStandardMaterial({ color: COL.ink });
  const rim = new THREE.Mesh(rimGeo, rimMat);
  rim.rotation.x = Math.PI / 2;
  rim.position.y = 0;
  world.add(rim);

  // ---- BOUNCE HOUSE ----
  const bounceHouse = new THREE.Group();
  bounceHouse.position.set(-1.2, 0, 0);
  world.add(bounceHouse);

  // Base platform (blue)
  const baseGeo = new THREE.BoxGeometry(3, 0.4, 3);
  const baseMat = new THREE.MeshStandardMaterial({ color: COL.blue, roughness: 0.7 });
  const base = new THREE.Mesh(baseGeo, baseMat);
  base.position.y = 0.2;
  base.castShadow = true; base.receiveShadow = true;
  bounceHouse.add(base);

  // Bouncy walls (rounded corner columns)
  function pillar(x, z, color) {
    const g = new THREE.CylinderGeometry(0.32, 0.32, 2.2, 20);
    const m = new THREE.MeshStandardMaterial({ color, roughness: 0.55 });
    const mesh = new THREE.Mesh(g, m);
    mesh.position.set(x, 1.5, z);
    mesh.castShadow = true;
    bounceHouse.add(mesh);

    // striped bands
    for (let i = 0; i < 3; i++) {
      const bg = new THREE.TorusGeometry(0.325, 0.05, 8, 20);
      const bm = new THREE.MeshStandardMaterial({ color: COL.white, roughness: 0.6 });
      const b = new THREE.Mesh(bg, bm);
      b.rotation.x = Math.PI / 2;
      b.position.set(x, 0.7 + i * 0.7, z);
      bounceHouse.add(b);
    }
  }
  pillar(-1.3, -1.3, COL.red);
  pillar(1.3, -1.3, COL.yellow);
  pillar(-1.3, 1.3, COL.yellow);
  pillar(1.3, 1.3, COL.red);

  // Back wall (soft)
  const backGeo = new THREE.BoxGeometry(2.6, 1.6, 0.15);
  const backMat = new THREE.MeshStandardMaterial({ color: COL.red, roughness: 0.6 });
  const back = new THREE.Mesh(backGeo, backMat);
  back.position.set(0, 1.4, -1.3);
  back.castShadow = true;
  bounceHouse.add(back);

  // Side walls
  const sideL = new THREE.Mesh(new THREE.BoxGeometry(0.15, 1.6, 2.6), new THREE.MeshStandardMaterial({ color: COL.yellow, roughness: 0.6 }));
  sideL.position.set(-1.3, 1.4, 0);
  sideL.castShadow = true;
  bounceHouse.add(sideL);

  const sideR = sideL.clone();
  sideR.material = new THREE.MeshStandardMaterial({ color: COL.yellow, roughness: 0.6 });
  sideR.position.x = 1.3;
  bounceHouse.add(sideR);

  // Roof (dome)
  const roofGeo = new THREE.SphereGeometry(2.0, 24, 12, 0, Math.PI * 2, 0, Math.PI / 2);
  const roofMat = new THREE.MeshStandardMaterial({ color: COL.red, roughness: 0.5 });
  const roof = new THREE.Mesh(roofGeo, roofMat);
  roof.position.y = 2.2;
  roof.scale.set(1, 0.55, 1);
  roof.castShadow = true;
  bounceHouse.add(roof);

  // roof stripes (yellow segments)
  for (let i = 0; i < 6; i++) {
    const stripeGeo = new THREE.SphereGeometry(2.01, 6, 6, (i * Math.PI * 2) / 6, Math.PI * 2 / 12, 0, Math.PI / 2);
    const stripeMat = new THREE.MeshStandardMaterial({ color: COL.yellow, roughness: 0.5 });
    const stripe = new THREE.Mesh(stripeGeo, stripeMat);
    stripe.position.y = 2.2;
    stripe.scale.set(1, 0.55, 1);
    bounceHouse.add(stripe);
  }

  // Little flags on top
  const flagPoleGeo = new THREE.CylinderGeometry(0.03, 0.03, 0.9, 8);
  const flagPoleMat = new THREE.MeshStandardMaterial({ color: COL.ink });
  const flagPole = new THREE.Mesh(flagPoleGeo, flagPoleMat);
  flagPole.position.set(0, 3.35, 0);
  bounceHouse.add(flagPole);

  const flagShape = new THREE.Shape();
  flagShape.moveTo(0, 0);
  flagShape.lineTo(0.5, -0.1);
  flagShape.lineTo(0.35, -0.2);
  flagShape.lineTo(0.5, -0.3);
  flagShape.lineTo(0, -0.4);
  flagShape.lineTo(0, 0);
  const flag = new THREE.Mesh(
    new THREE.ExtrudeGeometry(flagShape, { depth: 0.01, bevelEnabled: false }),
    new THREE.MeshStandardMaterial({ color: COL.yellow, side: THREE.DoubleSide })
  );
  flag.position.set(0.03, 3.65, 0);
  bounceHouse.add(flag);

  // Entrance arch
  const archGeo = new THREE.TorusGeometry(0.7, 0.15, 12, 24, Math.PI);
  const archMat = new THREE.MeshStandardMaterial({ color: COL.red, roughness: 0.5 });
  const arch = new THREE.Mesh(archGeo, archMat);
  arch.position.set(0, 1.4, 1.35);
  arch.rotation.z = 0;
  bounceHouse.add(arch);

  // Entrance floor mat
  const matGeo = new THREE.BoxGeometry(1.2, 0.05, 0.6);
  const matMat = new THREE.MeshStandardMaterial({ color: COL.yellow });
  const doorMat = new THREE.Mesh(matGeo, matMat);
  doorMat.position.set(0, 0.42, 1.65);
  bounceHouse.add(doorMat);

  // ---- POPCORN CART ----
  const cart = new THREE.Group();
  cart.position.set(2.5, 0, 1);
  cart.rotation.y = -0.4;
  world.add(cart);

  // Cart base
  const cartBaseGeo = new THREE.BoxGeometry(1.4, 0.9, 1);
  const cartBaseMat = new THREE.MeshStandardMaterial({ color: COL.red, roughness: 0.6 });
  const cartBase = new THREE.Mesh(cartBaseGeo, cartBaseMat);
  cartBase.position.y = 0.7;
  cartBase.castShadow = true;
  cart.add(cartBase);

  // white stripes on cart
  for (let i = 0; i < 5; i++) {
    const st = new THREE.Mesh(
      new THREE.BoxGeometry(0.12, 0.9, 1.005),
      new THREE.MeshStandardMaterial({ color: COL.white })
    );
    st.position.set(-0.6 + i * 0.28, 0.7, 0);
    cart.add(st);
  }

  // Glass box (top)
  const glassGeo = new THREE.BoxGeometry(1.3, 0.8, 0.9);
  const glassMat = new THREE.MeshPhysicalMaterial({
    color: 0xffffff, transparent: true, opacity: 0.25,
    roughness: 0.05, transmission: 0.9, thickness: 0.5
  });
  const glass = new THREE.Mesh(glassGeo, glassMat);
  glass.position.y = 1.55;
  cart.add(glass);

  // Glass frame
  const frameGeo = new THREE.BoxGeometry(1.34, 0.05, 0.94);
  const frameMat = new THREE.MeshStandardMaterial({ color: COL.ink });
  const frameB = new THREE.Mesh(frameGeo, frameMat);
  frameB.position.y = 1.15;
  cart.add(frameB);
  const frameT = frameB.clone();
  frameT.position.y = 1.96;
  cart.add(frameT);

  // Popcorn (many little spheres)
  const popcornGroup = new THREE.Group();
  const popcornGeo = new THREE.SphereGeometry(0.09, 8, 6);
  const popcornMat = new THREE.MeshStandardMaterial({ color: 0xFFF3B0, roughness: 0.8 });
  for (let i = 0; i < 40; i++) {
    const p = new THREE.Mesh(popcornGeo, popcornMat);
    p.position.set(
      (Math.random() - 0.5) * 1.1,
      1.3 + Math.random() * 0.4,
      (Math.random() - 0.5) * 0.7
    );
    p.scale.setScalar(0.8 + Math.random() * 0.4);
    p.userData.baseY = p.position.y;
    p.userData.phase = Math.random() * Math.PI * 2;
    popcornGroup.add(p);
  }
  cart.add(popcornGroup);

  // Roof (yellow with red trim)
  const cartRoofGeo = new THREE.ConeGeometry(1.05, 0.5, 4);
  const cartRoofMat = new THREE.MeshStandardMaterial({ color: COL.yellow, roughness: 0.6 });
  const cartRoof = new THREE.Mesh(cartRoofGeo, cartRoofMat);
  cartRoof.position.y = 2.25;
  cartRoof.rotation.y = Math.PI / 4;
  cartRoof.castShadow = true;
  cart.add(cartRoof);

  // Little flag on cart
  const cflagPole = new THREE.Mesh(
    new THREE.CylinderGeometry(0.02, 0.02, 0.6, 8),
    new THREE.MeshStandardMaterial({ color: COL.ink })
  );
  cflagPole.position.set(0, 2.7, 0);
  cart.add(cflagPole);
  const cflag = new THREE.Mesh(
    new THREE.PlaneGeometry(0.3, 0.2),
    new THREE.MeshStandardMaterial({ color: COL.red, side: THREE.DoubleSide })
  );
  cflag.position.set(0.17, 2.9, 0);
  cart.add(cflag);

  // Wheels
  function wheel(x) {
    const g = new THREE.TorusGeometry(0.25, 0.08, 8, 16);
    const m = new THREE.MeshStandardMaterial({ color: COL.ink });
    const w = new THREE.Mesh(g, m);
    w.rotation.y = Math.PI / 2;
    w.position.set(x, 0.25, 0.5);
    w.castShadow = true;
    cart.add(w);
    // hub
    const h = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 0.05, 12), new THREE.MeshStandardMaterial({ color: COL.yellow }));
    h.rotation.z = Math.PI / 2;
    h.position.set(x, 0.25, 0.5);
    cart.add(h);
  }
  wheel(-0.5);
  wheel(0.5);
  const wheelB = new THREE.Mesh(
    new THREE.TorusGeometry(0.25, 0.08, 8, 16),
    new THREE.MeshStandardMaterial({ color: COL.ink })
  );
  wheelB.rotation.y = Math.PI / 2;
  wheelB.position.set(0.5, 0.25, -0.5);
  cart.add(wheelB);
  const wheelB2 = wheelB.clone();
  wheelB2.position.x = -0.5;
  cart.add(wheelB2);

  // "POPCORN" sign
  const signGeo = new THREE.BoxGeometry(1.35, 0.3, 0.02);
  const signCanvas = document.createElement('canvas');
  signCanvas.width = 512; signCanvas.height = 120;
  const ctx = signCanvas.getContext('2d');
  ctx.fillStyle = '#FFD60A';
  ctx.fillRect(0, 0, 512, 120);
  ctx.fillStyle = '#1a1a2e';
  ctx.font = '800 80px "Bricolage Grotesque", sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('POPCORN', 256, 60);
  const signTex = new THREE.CanvasTexture(signCanvas);
  const signMat = new THREE.MeshStandardMaterial({ map: signTex });
  const sign = new THREE.Mesh(signGeo, signMat);
  sign.position.set(0, 0.85, 0.51);
  cart.add(sign);

  // ---- BALLOONS ----
  const balloons = [];
  function makeBalloon(x, z, color, height) {
    const b = new THREE.Group();
    const bodyGeo = new THREE.SphereGeometry(0.28, 16, 16);
    const bodyMat = new THREE.MeshStandardMaterial({ color, roughness: 0.35, metalness: 0.05 });
    const body = new THREE.Mesh(bodyGeo, bodyMat);
    body.scale.set(1, 1.25, 1);
    b.add(body);

    // knot
    const knot = new THREE.Mesh(
      new THREE.ConeGeometry(0.06, 0.15, 6),
      bodyMat
    );
    knot.position.y = -0.42;
    knot.rotation.z = Math.PI;
    b.add(knot);

    // string (curved line)
    const stringMat = new THREE.LineBasicMaterial({ color: COL.ink });
    const pts = [];
    for (let i = 0; i <= 20; i++) {
      const t = i / 20;
      pts.push(new THREE.Vector3(Math.sin(t * 6) * 0.04, -0.48 - t * 1.0, 0));
    }
    const stringGeo = new THREE.BufferGeometry().setFromPoints(pts);
    const stringLine = new THREE.Line(stringGeo, stringMat);
    b.add(stringLine);

    b.position.set(x, height, z);
    b.userData.baseY = height;
    b.userData.phase = Math.random() * Math.PI * 2;
    b.userData.speed = 0.5 + Math.random() * 0.5;
    world.add(b);
    balloons.push(b);
  }
  makeBalloon(2.0, -2.5, COL.red, 4.0);
  makeBalloon(-2.8, -1.5, COL.blue, 3.6);
  makeBalloon(-3.2, 1.8, COL.yellow, 4.2);
  makeBalloon(3.2, -0.5, COL.yellow, 3.4);
  makeBalloon(1.5, 2.8, COL.red, 3.8);
  makeBalloon(-1.5, 3.2, COL.blue, 4.4);

  // ---- CONFETTI ----
  const confettiGroup = new THREE.Group();
  const confettiColors = [COL.red, COL.yellow, COL.blue, COL.white];
  for (let i = 0; i < 60; i++) {
    const geo = new THREE.PlaneGeometry(0.1, 0.15);
    const mat = new THREE.MeshBasicMaterial({
      color: confettiColors[i % 4],
      side: THREE.DoubleSide
    });
    const c = new THREE.Mesh(geo, mat);
    c.position.set(
      (Math.random() - 0.5) * 8,
      2 + Math.random() * 5,
      (Math.random() - 0.5) * 8
    );
    c.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);
    c.userData.rotSpeed = (Math.random() - 0.5) * 0.05;
    c.userData.fallSpeed = 0.008 + Math.random() * 0.012;
    c.userData.driftX = (Math.random() - 0.5) * 0.005;
    confettiGroup.add(c);
  }
  scene.add(confettiGroup);

  // ---- Drag rotate ----
  let isDragging = false;
  let lastX = 0;
  let targetRotY = 0;
  let currentRotY = 0;
  let autoRotate = true;

  // Bug fix: prevent page scroll hijack while dragging on touch devices
  canvas.style.touchAction = 'none';
  canvas.addEventListener('pointerdown', (e) => {
    isDragging = true; lastX = e.clientX; autoRotate = false;
    if (canvas.setPointerCapture) { try { canvas.setPointerCapture(e.pointerId); } catch (_) {} }
  });
  window.addEventListener('pointermove', (e) => {
    if (!isDragging) return;
    const dx = e.clientX - lastX;
    targetRotY += dx * 0.008;
    lastX = e.clientX;
  });
  window.addEventListener('pointerup', () => {
    isDragging = false;
    // resume auto after 3s
    clearTimeout(window._autoT);
    window._autoT = setTimeout(() => { autoRotate = true; }, 3000);
  });

  // ---- Animate ----
  // Perf fix: pause the render loop while the hero is off-screen
  let heroVisible = true;
  if ('IntersectionObserver' in window) {
    new IntersectionObserver((entries) => {
      heroVisible = entries[0].isIntersecting;
    }, { threshold: 0 }).observe(container);
  }

  const clock = new THREE.Clock();
  function tick() {
    if (!heroVisible) { requestAnimationFrame(tick); return; }
    const t = clock.getElapsedTime();

    if (autoRotate) targetRotY += 0.003;
    currentRotY += (targetRotY - currentRotY) * 0.08;
    world.rotation.y = currentRotY;

    // Bounce house gentle breathing
    const bounce = Math.sin(t * 2.5) * 0.03;
    bounceHouse.position.y = bounce;
    roof.scale.y = 0.55 + Math.sin(t * 2.5) * 0.02;

    // Popcorn pop
    popcornGroup.children.forEach((p) => {
      p.position.y = p.userData.baseY + Math.sin(t * 3 + p.userData.phase) * 0.05;
      p.rotation.x = t + p.userData.phase;
    });

    // Balloons float
    balloons.forEach((b) => {
      b.position.y = b.userData.baseY + Math.sin(t * b.userData.speed + b.userData.phase) * 0.15;
      b.rotation.z = Math.sin(t * 0.7 + b.userData.phase) * 0.1;
    });

    // Confetti fall
    confettiGroup.children.forEach((c) => {
      c.position.y -= c.userData.fallSpeed;
      c.position.x += c.userData.driftX;
      c.rotation.x += c.userData.rotSpeed;
      c.rotation.z += c.userData.rotSpeed * 0.7;
      if (c.position.y < -1) {
        c.position.y = 6 + Math.random() * 2;
        c.position.x = (Math.random() - 0.5) * 8;
      }
    });

    // Flag wave
    flag.rotation.y = Math.sin(t * 3) * 0.3;
    cflag.rotation.y = Math.sin(t * 3.5) * 0.3;

    renderer.render(scene, camera);
    requestAnimationFrame(tick);
  }
  tick();
};

/* ===========================================================================
   LAZY LOADER — mobile performance
   ---------------------------------------------------------------------------
   Previously Three.js (~600 KB) and GSAP (~70 KB) were blocking <script> tags
   in the <head> path on every device. Now:
     • mobile / reduced-motion  → nothing is downloaded, a lightweight CSS+SVG
       poster fills the hero instead
     • desktop                  → both libs load AFTER first paint, and only
       once the hero is actually near the viewport
=========================================================================== */
(function () {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isMobile = window.matchMedia('(max-width: 860px)').matches;
  const host = document.getElementById('hero3d');
  if (!host) return;

  function loadScript(src) {
    return new Promise((resolve, reject) => {
      const s = document.createElement('script');
      s.src = src; s.async = true;
      s.onload = resolve; s.onerror = reject;
      document.head.appendChild(s);
    });
  }

  // --- Static poster for mobile / reduced motion / failed loads ---
  function poster() {
    host.classList.add('hero-poster');
    host.innerHTML = `
      <svg viewBox="0 0 400 400" role="img" aria-label="Illustration of a bounce house, popcorn cart and balloons">
        <ellipse cx="200" cy="330" rx="150" ry="26" fill="#B8E0A0"/>
        <circle cx="96"  cy="96"  r="20" fill="#E63946"/><path d="M96 116v52"  stroke="#1a1a2e" stroke-width="2"/>
        <circle cx="300" cy="72"  r="17" fill="#2A6FDB"/><path d="M300 89v56"  stroke="#1a1a2e" stroke-width="2"/>
        <circle cx="338" cy="140" r="14" fill="#FFD60A"/><path d="M338 154v44" stroke="#1a1a2e" stroke-width="2"/>
        <polygon points="120,168 200,110 280,168" fill="#E63946" stroke="#1a1a2e" stroke-width="5"/>
        <rect x="118" y="168" width="164" height="132" rx="22" fill="#FFD60A" stroke="#1a1a2e" stroke-width="5"/>
        <rect x="168" y="222" width="64" height="78" rx="10" fill="#FFFAF0" stroke="#1a1a2e" stroke-width="4"/>
        <circle cx="152" cy="212" r="12" fill="#FFFAF0" stroke="#1a1a2e" stroke-width="4"/>
        <circle cx="250" cy="212" r="12" fill="#FFFAF0" stroke="#1a1a2e" stroke-width="4"/>
        <rect x="292" y="236" width="62" height="64" rx="8" fill="#E63946" stroke="#1a1a2e" stroke-width="4"/>
        <rect x="300" y="248" width="46" height="30" rx="4" fill="#FFF8E7" stroke="#1a1a2e" stroke-width="3"/>
        <circle cx="303" cy="308" r="10" fill="#1a1a2e"/><circle cx="343" cy="308" r="10" fill="#1a1a2e"/>
        <circle cx="312" cy="242" r="5" fill="#FFFAF0"/><circle cx="326" cy="236" r="6" fill="#FFFAF0"/><circle cx="338" cy="243" r="5" fill="#FFFAF0"/>
      </svg>`;
  }

  if (isMobile || reduced || !('IntersectionObserver' in window)) {
    poster();
    return;
  }

  // --- Desktop: load libs after first paint, when hero is near view ---
  let started = false;
  function start() {
    if (started) return;
    started = true;
    Promise.all([
      loadScript('https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.min.js'),
      loadScript('https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js')
        .then(() => loadScript('https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/ScrollTrigger.min.js'))
        .catch(() => {}) // animations are optional; never block the 3D scene
    ]).then(() => {
      try { window.buildHeroScene && window.buildHeroScene(); } catch (err) { console.warn('3D scene skipped:', err); poster(); }
      try { window.initGsapAnimations && window.initGsapAnimations(); } catch (_) {}
    }).catch(() => poster());
  }

  const heroIO = new IntersectionObserver((entries) => {
    if (entries.some(e => e.isIntersecting)) { heroIO.disconnect(); start(); }
  }, { rootMargin: '200px' });
  heroIO.observe(host);

  // Safety: if the observer never fires (e.g. hero hidden), still load on idle
  const idle = window.requestIdleCallback || ((fn) => setTimeout(fn, 2000));
  idle(() => start());
})();
