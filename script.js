/* =======================================================
   1. MOUSE TRACKING & SPRING CURSOR
======================================================= */
const dotCursor = document.getElementById('dot-cursor');
let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;
let curX = mouseX;
let curY = mouseY;

window.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

function updateCursor() {
  curX += (mouseX - curX) * 0.2;
  curY += (mouseY - curY) * 0.2;
  dotCursor.style.left = `${curX}px`;
  dotCursor.style.top = `${curY}px`;
  requestAnimationFrame(updateCursor);
}
updateCursor();

/* =======================================================
   2. THREE.JS DETAILED REALISTIC LAPTOP HARDWARE ASSEMBLY
======================================================= */
const introContainer = document.getElementById('intro-canvas-container');
const introOverlay = document.getElementById('intro-overlay');
const progressFill = document.getElementById('progressFill');
const progressStatus = document.getElementById('progressStatus');
const progressStage = document.getElementById('progressStage');

const introScene = new THREE.Scene();
introScene.background = new THREE.Color(0xffffff);

const introCamera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.1, 1000);
introCamera.position.set(0, 0.4, 7.8);

const introRenderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
introRenderer.setSize(window.innerWidth, window.innerHeight);
introRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
introRenderer.shadowMap.enabled = true;
introContainer.appendChild(introRenderer.domElement);

// Clean Studio Lighting with Realistic Metallic Falloff
const ambientLight = new THREE.AmbientLight(0xffffff, 1.1);
introScene.add(ambientLight);

const mainLight = new THREE.DirectionalLight(0xffffff, 1.2);
mainLight.position.set(6, 14, 10);
introScene.add(mainLight);

const rimLight = new THREE.DirectionalLight(0xd9e2ec, 0.6);
rimLight.position.set(-8, -4, 4);
introScene.add(rimLight);

// Master Hierarchy
const laptopRig = new THREE.Group();
laptopRig.position.set(0, -0.2, 0);
introScene.add(laptopRig);

// Laptop Base Group
const baseGroup = new THREE.Group();
laptopRig.add(baseGroup);

// Laptop Lid Pivot Group (Rotates along rear hinge)
const lidPivot = new THREE.Group();
lidPivot.position.set(0, 0.05, -1.05); // Pivot pinned to back edge of base
laptopRig.add(lidPivot);

// Material Palette
const chassisMat = new THREE.MeshStandardMaterial({
  color: 0x121417,
  roughness: 0.25,
  metalness: 0.85
});

const deckMat = new THREE.MeshStandardMaterial({
  color: 0x090a0d,
  roughness: 0.4,
  metalness: 0.5
});

const keyMat = new THREE.MeshStandardMaterial({
  color: 0x1c1f24,
  roughness: 0.5
});

const pcbMat = new THREE.MeshStandardMaterial({
  color: 0x0d3822,
  roughness: 0.5
});

const ramPcbMat = new THREE.MeshStandardMaterial({
  color: 0x124a2c,
  roughness: 0.4,
  metalness: 0.3
});

const chipMat = new THREE.MeshStandardMaterial({
  color: 0x050505,
  roughness: 0.2,
  metalness: 0.6
});

const goldMat = new THREE.MeshStandardMaterial({
  color: 0xd4af37,
  roughness: 0.3,
  metalness: 0.9
});

/* =======================================================
   2D TEXTURE CANVAS (TYPEWRITER ON SCREEN)
======================================================= */
const sCanvas = document.createElement('canvas');
sCanvas.width = 1024;
sCanvas.height = 640;
const sCtx = sCanvas.getContext('2d');

const sTexture = new THREE.CanvasTexture(sCanvas);
sTexture.minFilter = THREE.LinearFilter;

const screenDisplayMat = new THREE.MeshBasicMaterial({
  map: sTexture,
  side: THREE.FrontSide
});

let screenState = 'off';
const fullText = "Hi Welcome,\nThis is Harshil's Portfolio.\nClick Enter";
let typedCount = 0;

function updateScreenTexture() {
  // Pure white panel
  sCtx.fillStyle = '#ffffff';
  sCtx.fillRect(0, 0, sCanvas.width, sCanvas.height);

  // Clean hairline bezel
  sCtx.strokeStyle = '#e2e8f0';
  sCtx.lineWidth = 14;
  sCtx.strokeRect(0, 0, sCanvas.width, sCanvas.height);

  if (screenState === 'off') {
    sTexture.needsUpdate = true;
    return;
  }

  if (screenState === 'name') {
    sCtx.textAlign = 'center';
    sCtx.fillStyle = '#0f1115';
    sCtx.font = '82px Plus Jakarta Sans, sans-serif';
    sCtx.fillText('HARSHIL DYAVATHI', 512, 340);
    sTexture.needsUpdate = true;
    return;
  }

  // Typewriter lines
  const current = fullText.slice(0, typedCount);
  const lines = current.split('\n');

  sCtx.textAlign = 'center';
  sCtx.fillStyle = '#0f1115';

  if (lines[0]) {
    sCtx.font = '72px Plus Jakarta Sans, sans-serif';
    sCtx.fillText(lines[0], 512, 220);
  }
  if (lines[1]) {
    sCtx.font = '40px Instrument Serif, serif';
    sCtx.fillStyle = '#374151';
    sCtx.fillText(lines[1], 512, 320);
  }
  if (lines[2]) {
    sCtx.font = '26px JetBrains Mono, monospace';
    sCtx.fillStyle = '#0f1115';
    sCtx.fillText(lines[2], 512, 440);
  }

  sTexture.needsUpdate = true;
}
updateScreenTexture();

/* =======================================================
   BUILD REALISTIC HARDWARE PIECES WITH 3D EXPLODED TARGETS
======================================================= */
const animatedParts = [];

function addAssemblyPart(mesh, parent, targetPos, targetRot, scatterPos, scatterRot, startThreshold, endThreshold) {
  mesh.position.copy(scatterPos);
  mesh.rotation.set(scatterRot.x, scatterRot.y, scatterRot.z);
  parent.add(mesh);

  animatedParts.push({
    mesh,
    targetPos,
    targetRot,
    scatterPos,
    scatterRot,
    startThreshold,
    endThreshold
  });
}

// 1. Bottom Aluminum Chassis Tub
const bottomTub = new THREE.Mesh(new THREE.BoxGeometry(3.3, 0.08, 2.2), chassisMat);
addAssemblyPart(
  bottomTub,
  baseGroup,
  new THREE.Vector3(0, -0.04, 0),
  new THREE.Vector3(0, 0, 0),
  new THREE.Vector3(0, -5, 0),
  new THREE.Vector3(0.3, 0, 0),
  0.0, 0.25
);

// 2. Motherboard with processor chip
const moboGroup = new THREE.Group();
const moboPlane = new THREE.Mesh(new THREE.BoxGeometry(2.9, 0.02, 1.8), pcbMat);
const cpuChip = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.03, 0.5), chipMat);
cpuChip.position.set(0.3, 0.015, -0.2);
moboGroup.add(moboPlane, cpuChip);

addAssemblyPart(
  moboGroup,
  baseGroup,
  new THREE.Vector3(0, -0.01, 0),
  new THREE.Vector3(0, 0, 0),
  new THREE.Vector3(-4.5, -4, -3),
  new THREE.Vector3(0.5, -0.5, 0.4),
  0.15, 0.35
);

// 3. Dual RAM Sticks (DDR5)
for (let i = 0; i < 2; i++) {
  const ramGroup = new THREE.Group();
  const ramPcb = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.03, 0.22), ramPcbMat);
  const ramGold = new THREE.Mesh(new THREE.BoxGeometry(0.68, 0.032, 0.04), goldMat);
  ramGold.position.set(0, 0, -0.1);
  ramGroup.add(ramPcb, ramGold);

  addAssemblyPart(
    ramGroup,
    baseGroup,
    new THREE.Vector3(-0.6, 0.015, -0.25 + i * 0.32),
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(-5 + i * 2, 4, 3),
    new THREE.Vector3(-1.2, 1.2, 0.5),
    0.22 + i * 0.05, 0.45 + i * 0.05
  );
}

// 4. M.2 NVMe SSD Storage with Gold Pin Connector
const ssdGroup = new THREE.Group();
const ssdBody = new THREE.Mesh(new THREE.BoxGeometry(0.85, 0.03, 0.28), chipMat);
const ssdGold = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.035, 0.24), goldMat);
ssdGold.position.set(-0.43, 0, 0);
ssdGroup.add(ssdBody, ssdGold);

addAssemblyPart(
  ssdGroup,
  baseGroup,
  new THREE.Vector3(0.65, 0.015, -0.2),
  new THREE.Vector3(0, 0, 0),
  new THREE.Vector3(5, 3.5, 3),
  new THREE.Vector3(0.8, -1.2, 0.4),
  0.28, 0.48
);

// 5. Unibody Top Deck (With Recessed Keyboard Tray & Touchpad Well)
const topDeck = new THREE.Mesh(new THREE.BoxGeometry(3.3, 0.04, 2.2), chassisMat);
addAssemblyPart(
  topDeck,
  baseGroup,
  new THREE.Vector3(0, 0.02, 0),
  new THREE.Vector3(0, 0, 0),
  new THREE.Vector3(0, 4.5, 0),
  new THREE.Vector3(-0.4, 0, 0),
  0.35, 0.60
);

// 6. Trackpad Glass Plate
const trackpadMesh = new THREE.Mesh(new THREE.BoxGeometry(1.05, 0.02, 0.7), deckMat);
addAssemblyPart(
  trackpadMesh,
  baseGroup,
  new THREE.Vector3(0, 0.041, 0.62),
  new THREE.Vector3(0, 0, 0),
  new THREE.Vector3(0, -3.5, 4.5),
  new THREE.Vector3(0.3, 0.5, -0.4),
  0.45, 0.68
);

// 7. Keyboard Grid Assembly (Realistic Keys Tray)
const kbGroup = new THREE.Group();
const kbBase = new THREE.Mesh(new THREE.BoxGeometry(2.7, 0.02, 1.25), deckMat);
kbGroup.add(kbBase);

// Individual Key Rows
for (let row = 0; row < 5; row++) {
  for (let col = 0; col < 13; col++) {
    const key = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.025, 0.18), keyMat);
    key.position.set(-1.15 + col * 0.19, 0.015, -0.42 + row * 0.21);
    kbGroup.add(key);
  }
}

addAssemblyPart(
  kbGroup,
  baseGroup,
  new THREE.Vector3(0, 0.041, -0.25),
  new THREE.Vector3(0, 0, 0),
  new THREE.Vector3(0, 5, 2.5),
  new THREE.Vector3(-0.8, 0.4, 0.4),
  0.50, 0.72
);

// 8. Steel Barrel Hinge (At Pivot Point)
const hingeMesh = new THREE.Mesh(new THREE.CylinderGeometry(0.065, 0.065, 2.9, 16), chassisMat);
hingeMesh.rotation.z = Math.PI / 2;
lidPivot.add(hingeMesh);

// 9. Display Housing: Lid Back Casing & Front Bezel
const lidGroup = new THREE.Group();
// Shift local origin to the hinge pivot edge
const lidShell = new THREE.Mesh(new THREE.BoxGeometry(3.3, 2.15, 0.06), chassisMat);
lidShell.position.set(0, 1.075, -0.03); // Extended up from hinge

// Pure White Display Screen Panel
const displayPanel = new THREE.Mesh(new THREE.PlaneGeometry(2.95, 1.85), screenDisplayMat);
displayPanel.position.set(0, 1.075, 0.002); // Positioned on front face

lidGroup.add(lidShell, displayPanel);

addAssemblyPart(
  lidGroup,
  lidPivot,
  new THREE.Vector3(0, 0, 0),
  new THREE.Vector3(0, 0, 0), // Base target angle
  new THREE.Vector3(4, 5, -5),
  new THREE.Vector3(-1.2, 0.8, -0.5),
  0.60, 0.88
);

// Assembly Progression State
let assemblyProgress = 0;
const assemblySpeed = 0.0028;
let assemblyDone = false;
let canProceed = false;

function stepAssembly() {
  if (assemblyProgress < 1) {
    assemblyProgress += assemblySpeed;
    const pct = Math.min(100, Math.floor(assemblyProgress * 100));
    progressFill.style.width = `${pct}%`;

    // Dynamic Phase Indicator
    if (assemblyProgress < 0.25) {
      progressStage.innerText = 'PHASE 1 / 5';
      progressStatus.innerText = 'INSERTING MOTHERBOARD BUS...';
    } else if (assemblyProgress < 0.50) {
      progressStage.innerText = 'PHASE 2 / 5';
      progressStatus.innerText = 'SLOTTING DUAL DDR5 RAM & NVME M.2 SSD...';
    } else if (assemblyProgress < 0.70) {
      progressStage.innerText = 'PHASE 3 / 5';
      progressStatus.innerText = 'SECURING ALUMINUM CHASSIS & TRACKPAD...';
    } else if (assemblyProgress < 0.88) {
      progressStage.innerText = 'PHASE 4 / 5';
      progressStatus.innerText = 'ATTACHING KEYBOARD MATRIX & HINGES...';
    } else {
      progressStage.innerText = 'PHASE 5 / 5';
      progressStatus.innerText = 'LATCHING DISPLAY HOUSING & TILTING OPEN...';
    }

    // Interpolate Hardware Mesh Positions
    animatedParts.forEach(p => {
      if (assemblyProgress >= p.startThreshold) {
        const localP = Math.min(1, (assemblyProgress - p.startThreshold) / (p.endThreshold - p.startThreshold));
        const ease = 1 - Math.pow(1 - localP, 3);

        p.mesh.position.lerpVectors(p.scatterPos, p.targetPos, ease);
        p.mesh.rotation.x = THREE.MathUtils.lerp(p.scatterRot.x, p.targetRot.x, ease);
        p.mesh.rotation.y = THREE.MathUtils.lerp(p.scatterRot.y, p.targetRot.y, ease);
        p.mesh.rotation.z = THREE.MathUtils.lerp(p.scatterRot.z, p.targetRot.z, ease);
      }
    });

    // Lid smoothly tilts open between 75% and 100%
    if (assemblyProgress > 0.75) {
      const openP = (assemblyProgress - 0.75) / 0.25;
      lidPivot.rotation.x = THREE.MathUtils.lerp(0, -Math.PI / 1.7, 1 - Math.pow(1 - openP, 3));
    }
  } else if (!assemblyDone) {
    assemblyDone = true;
    progressStage.innerText = 'ASSEMBLED';
    progressStatus.innerText = 'DISPLAY ACTIVE. TYPEWRITER RUNNING...';

    // Start Letter-by-Letter Typewriter on Screen
    screenState = 'typing';
    const typeInterval = setInterval(() => {
      typedCount++;
      updateScreenTexture();
      if (typedCount >= fullText.length) {
        clearInterval(typeInterval);
        canProceed = true;
        progressStage.innerText = 'READY';
        progressStatus.innerText = 'CLICK SCREEN OR PRESS ENTER TO CONTINUE';
      }
    }, 45);
  }
}

// 3D Render Loop with Interactive Cursor Parallax
function renderIntro() {
  requestAnimationFrame(renderIntro);
  stepAssembly();

  if (assemblyDone) {
    // Laptop tilts and reacts to cursor movements smoothly
    const targetRotY = (mouseX / window.innerWidth - 0.5) * 0.42;
    const targetRotX = 0.08 + (mouseY / window.innerHeight - 0.5) * 0.22;

    laptopRig.rotation.y += (targetRotY - laptopRig.rotation.y) * 0.05;
    laptopRig.rotation.x += (targetRotX - laptopRig.rotation.x) * 0.05;
  } else {
    laptopRig.rotation.y += 0.0018;
  }

  introRenderer.render(introScene, introCamera);
}
renderIntro();

// Camera Zoom-In Transition
function triggerEnterTransition() {
  if (!canProceed) return;
  canProceed = false;

  // Screen flashes Harshil's Name
  screenState = 'name';
  updateScreenTexture();

  let zoom = 0;
  const zoomInterval = setInterval(() => {
    zoom += 0.04;
    introCamera.position.z -= 0.35;
    introCamera.position.y += 0.02;
    if (zoom >= 1) {
      clearInterval(zoomInterval);
      introOverlay.classList.add('hidden');
    }
  }, 16);
}

introContainer.addEventListener('click', triggerEnterTransition);
window.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') triggerEnterTransition();
});

/* =======================================================
   3. INTERACTIVE WAVY TERRAIN WIREFRAME (PURE WHITE THEME)
======================================================= */
const waveCanvas = document.getElementById('wavy-canvas');
const wCtx = waveCanvas.getContext('2d');

let wWidth, wHeight;
function resizeWaveCanvas() {
  wWidth = waveCanvas.width = window.innerWidth;
  wHeight = waveCanvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeWaveCanvas);
resizeWaveCanvas();

let waveOffset = 0;
function drawWaveGrid() {
  wCtx.clearRect(0, 0, wWidth, wHeight);

  const cols = 36;
  const rows = 26;
  const colSpacing = wWidth / cols;
  const rowSpacing = wHeight / rows;

  waveOffset += 0.018;

  // Horizontal Wavy Lines
  for (let r = 0; r <= rows; r++) {
    wCtx.beginPath();
    for (let c = 0; c <= cols; c++) {
      const x = c * colSpacing;
      const dist = Math.hypot(x - mouseX, r * rowSpacing - mouseY);
      const ripple = Math.sin(dist * 0.02 - waveOffset * 2) * 8;
      const y = r * rowSpacing + Math.sin(c * 0.3 + waveOffset + r * 0.2) * 12 + ripple;

      if (c === 0) wCtx.moveTo(x, y);
      else wCtx.lineTo(x, y);
    }
    wCtx.strokeStyle = 'rgba(15, 17, 21, 0.07)';
    wCtx.lineWidth = 1;
    wCtx.stroke();
  }

  // Vertical Connecting Lines
  for (let c = 0; c <= cols; c += 2) {
    wCtx.beginPath();
    for (let r = 0; r <= rows; r++) {
      const x = c * colSpacing;
      const dist = Math.hypot(x - mouseX, r * rowSpacing - mouseY);
      const ripple = Math.sin(dist * 0.02 - waveOffset * 2) * 8;
      const y = r * rowSpacing + Math.sin(c * 0.3 + waveOffset + r * 0.2) * 12 + ripple;

      if (r === 0) wCtx.moveTo(x, y);
      else wCtx.lineTo(x, y);
    }
    wCtx.strokeStyle = 'rgba(15, 17, 21, 0.035)';
    wCtx.lineWidth = 1;
    wCtx.stroke();
  }

  requestAnimationFrame(drawWaveGrid);
}
drawWaveGrid();
