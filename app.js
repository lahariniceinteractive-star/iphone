/**
 * ============================================================================
 * iPhone 18 Pro Concept - Master 3D Engine & Interactive Orchestrator
 * ============================================================================
 * Easy-to-edit configuration object at the top allows modifying text,
 * colors, camera specs, exploded offsets, and 3D animation parameters.
 */

// ============================================================================
// 1. GLOBAL CONFIGURATION (EASY TO EDIT)
// ============================================================================
window.IPHONE_CONFIG = {
  modelName: "iPhone 18 Pro",
  tagline: "Beyond Titanium. Anti-Gravity Architecture.",
  pricing: {
    basePro: 1199,
    baseProMax: 1399,
    storageAdd: {
      "256GB": 0,
      "512GB": 200,
      "1TB": 400,
      "2TB": 600
    },
    appleCare: 199
  },
  finishes: {
    'natural': {
      name: 'Natural Titanium',
      hex: '#c8c8cd',
      color: 0xc8c8cd,
      metalness: 0.95,
      roughness: 0.22,
      backdrop: 'radial-gradient(circle at 50% 35%, rgba(14, 30, 70, 0.45) 0%, rgba(3, 7, 18, 0.98) 75%)'
    },
    'obsidian': {
      name: 'Space Obsidian Black',
      hex: '#18181b',
      color: 0x141416,
      metalness: 0.92,
      roughness: 0.24,
      backdrop: 'radial-gradient(circle at 50% 35%, rgba(15, 23, 42, 0.5) 0%, rgba(3, 7, 18, 0.98) 75%)'
    },
    'violet': {
      name: 'Cosmic Nebula Violet',
      hex: '#581c87',
      color: 0x4c1d95,
      metalness: 0.88,
      roughness: 0.20,
      backdrop: 'radial-gradient(circle at 50% 35%, rgba(88, 28, 135, 0.35) 0%, rgba(3, 7, 18, 0.98) 75%)'
    },
    'gold': {
      name: 'Liquid Amber Gold',
      hex: '#eab308',
      color: 0xeab308,
      metalness: 0.96,
      roughness: 0.16,
      backdrop: 'radial-gradient(circle at 50% 35%, rgba(180, 83, 9, 0.35) 0%, rgba(3, 7, 18, 0.98) 75%)'
    },
    'emerald': {
      name: 'Quantum Emerald',
      hex: '#059669',
      color: 0x059669,
      metalness: 0.92,
      roughness: 0.18,
      backdrop: 'radial-gradient(circle at 50% 35%, rgba(5, 150, 105, 0.3) 0%, rgba(3, 7, 18, 0.98) 75%)'
    }
  },
  focalLengths: {
    '13mm': { label: 'Ultra-Wide 0.5x', aperture: 'f/2.2', iso: 64, shutter: '1/2000s' },
    '24mm': { label: 'Main Wide 1x (200MP Fusion)', aperture: 'f/1.6', iso: 50, shutter: '1/1600s' },
    '120mm': { label: 'Tetraprism 5x', aperture: 'f/2.8', iso: 125, shutter: '1/500s' },
    '240mm': { label: 'Quantum Periscope 10x', aperture: 'f/3.2', iso: 160, shutter: '1/400s' }
  },
  dimensions: {
    width: 3.4,
    height: 7.1,
    depth: 0.38,
    cornerR: 0.62
  }
};

// ============================================================================
// 2. WEB AUDIO API SYNTHESIZER (NO EXTERNAL AUDIO FILES NEEDED)
// ============================================================================
class FuturisticAudio {
  constructor() {
    this.enabled = false;
    this.ctx = null;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) this.ctx = new AudioCtx();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  toggle() {
    this.init();
    this.enabled = !this.enabled;
    if (this.enabled) this.playTone(880, 'sine', 0.08, 0.05);
    return this.enabled;
  }

  playTone(freq, type = 'sine', duration = 0.08, vol = 0.04) {
    if (!this.enabled || !this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      gain.gain.setValueAtTime(vol, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch (e) {}
  }

  playClick() {
    this.playTone(1200, 'triangle', 0.04, 0.03);
  }

  playSwitch() {
    if (!this.enabled || !this.ctx) return;
    this.playTone(550, 'sine', 0.06, 0.03);
    setTimeout(() => this.playTone(920, 'sine', 0.08, 0.03), 45);
  }

  playHaptic() {
    if (!this.enabled || !this.ctx) return;
    this.playTone(160, 'sine', 0.12, 0.08);
  }

  playExplode() {
    if (!this.enabled || !this.ctx) return;
    this.playTone(280, 'sawtooth', 0.2, 0.04);
    setTimeout(() => this.playTone(520, 'sine', 0.25, 0.03), 70);
  }
}

const audio = new FuturisticAudio();

// ============================================================================
// 3. THREE.JS 3D SCENE & ENGINE SETUP
// ============================================================================
const canvas = document.getElementById('webgl-canvas');
const scene = new THREE.Scene();
scene.fog = new THREE.FogExp2(0x030712, 0.03);

const camera = new THREE.PerspectiveCamera(38, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.set(0, 0.4, 12.0);

const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true,
  alpha: true,
  powerPreference: "high-performance"
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.35;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

// Orbit Controls for Studio Section
let controls = null;
if (typeof THREE.OrbitControls !== 'undefined') {
  controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;
  controls.maxDistance = 22;
  controls.minDistance = 4.5;
  controls.enabled = false;
}

// Lighting Rig
const ambientLight = new THREE.AmbientLight(0x0f172a, 1.4);
scene.add(ambientLight);

// Key Studio Spotlight
const keySpot = new THREE.SpotLight(0xffffff, 5.0);
keySpot.position.set(7, 12, 10);
keySpot.angle = Math.PI / 4.2;
keySpot.penumbra = 0.8;
keySpot.castShadow = true;
keySpot.shadow.mapSize.width = 2048;
keySpot.shadow.mapSize.height = 2048;
scene.add(keySpot);

// Left Cyan Anti-Gravity Rim Light
const rimCyan = new THREE.PointLight(0x00f5ff, 5.5, 25);
rimCyan.position.set(-8, 2, -4);
scene.add(rimCyan);

// Right Gold/Amber Accent Rim Light
const rimAmber = new THREE.PointLight(0xf59e0b, 4.0, 25);
rimAmber.position.set(8, 4, -4);
scene.add(rimAmber);

// Bottom Fill Bounce Light
const fillBottom = new THREE.DirectionalLight(0x38bdf8, 1.2);
fillBottom.position.set(0, -9, 5);
scene.add(fillBottom);

// ============================================================================
// 4. DYNAMIC SCREEN TEXTURE (REAL-TIME CANVAS GRAPHICS)
// ============================================================================
const screenCanvas = document.createElement('canvas');
screenCanvas.width = 1024;
screenCanvas.height = 2048;
const sCtx = screenCanvas.getContext('2d');
const screenTexture = new THREE.CanvasTexture(screenCanvas);
screenTexture.generateMipmaps = true;

// Polyfill helper for roundRect on 2D context
function drawRoundedRect(ctx, x, y, width, height, radius) {
  if (typeof ctx.roundRect === 'function') {
    ctx.beginPath();
    ctx.roundRect(x, y, width, height, radius);
    ctx.fill();
  } else {
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
    ctx.fill();
  }
}

let activeScreenTheme = 'chromatic';
let screenAnimTime = 0;

function renderDynamicScreen() {
  screenAnimTime += 0.025;
  const w = screenCanvas.width;
  const h = screenCanvas.height;

  // Background Theme Rendering
  if (activeScreenTheme === 'chromatic') {
    const grad = sCtx.createLinearGradient(0, 0, w, h);
    const col1 = `hsl(${Math.sin(screenAnimTime * 0.4) * 35 + 205}, 95%, 45%)`;
    const col2 = `hsl(${Math.cos(screenAnimTime * 0.3) * 45 + 275}, 90%, 40%)`;
    const col3 = `hsl(${Math.sin(screenAnimTime * 0.5) * 40 + 25}, 95%, 50%)`;
    grad.addColorStop(0, col1);
    grad.addColorStop(0.55, col2);
    grad.addColorStop(1, col3);
    sCtx.fillStyle = grad;
    sCtx.fillRect(0, 0, w, h);

    sCtx.save();
    if (sCtx.filter) sCtx.filter = 'blur(60px)';
    sCtx.fillStyle = '#00f5ff';
    sCtx.beginPath();
    sCtx.arc(w * 0.35 + Math.sin(screenAnimTime) * 140, h * 0.38 + Math.cos(screenAnimTime * 0.8) * 160, 240, 0, Math.PI * 2);
    sCtx.fill();

    sCtx.fillStyle = '#f59e0b';
    sCtx.beginPath();
    sCtx.arc(w * 0.65 + Math.cos(screenAnimTime * 0.7) * 120, h * 0.62 + Math.sin(screenAnimTime * 0.9) * 140, 260, 0, Math.PI * 2);
    sCtx.fill();
    sCtx.restore();

  } else if (activeScreenTheme === 'hologram') {
    sCtx.fillStyle = '#030712';
    sCtx.fillRect(0, 0, w, h);

    sCtx.strokeStyle = 'rgba(56, 189, 248, 0.22)';
    sCtx.lineWidth = 3;
    const gridSize = 64;
    const offset = (screenAnimTime * 45) % gridSize;
    for (let x = 0; x < w; x += gridSize) {
      sCtx.beginPath();
      sCtx.moveTo(x, 0);
      sCtx.lineTo(x, h);
      sCtx.stroke();
    }
    for (let y = offset; y < h; y += gridSize) {
      sCtx.beginPath();
      sCtx.moveTo(0, y);
      sCtx.lineTo(w, y);
      sCtx.stroke();
    }

    sCtx.strokeStyle = '#00f5ff';
    sCtx.lineWidth = 6;
    sCtx.beginPath();
    sCtx.arc(w / 2, h / 2, 220 + Math.sin(screenAnimTime * 2) * 18, 0, Math.PI * 2);
    sCtx.stroke();

    sCtx.fillStyle = '#38bdf8';
    sCtx.font = '700 36px monospace';
    sCtx.textAlign = 'center';
    sCtx.fillText('A19 PRO QUANTUM CORE', w / 2, h / 2 + 12);

  } else if (activeScreenTheme === 'nebula') {
    sCtx.fillStyle = '#020617';
    sCtx.fillRect(0, 0, w, h);

    const nebGrad = sCtx.createRadialGradient(w * 0.5, h * 0.45, 60, w * 0.5, h * 0.45, 620);
    nebGrad.addColorStop(0, 'rgba(168, 85, 247, 0.85)');
    nebGrad.addColorStop(0.5, 'rgba(59, 130, 246, 0.35)');
    nebGrad.addColorStop(1, 'transparent');
    sCtx.fillStyle = nebGrad;
    sCtx.fillRect(0, 0, w, h);

    sCtx.fillStyle = '#ffffff';
    for (let i = 0; i < 48; i++) {
      const sx = (Math.sin(i * 99 + screenAnimTime * 0.08) * 0.5 + 0.5) * w;
      const sy = (Math.cos(i * 33 + screenAnimTime * 0.06) * 0.5 + 0.5) * h;
      sCtx.beginPath();
      sCtx.arc(sx, sy, (i % 3) + 1.6, 0, Math.PI * 2);
      sCtx.fill();
    }

  } else if (activeScreenTheme === 'stealth') {
    sCtx.fillStyle = '#05070d';
    sCtx.fillRect(0, 0, w, h);

    const edgeGrad = sCtx.createRadialGradient(w / 2, h / 2, 300, w / 2, h / 2, 1000);
    edgeGrad.addColorStop(0, 'transparent');
    edgeGrad.addColorStop(1, 'rgba(0, 245, 255, 0.12)');
    sCtx.fillStyle = edgeGrad;
    sCtx.fillRect(0, 0, w, h);
  }

  // --- Dynamic Island Pro ---
  const islandW = 300;
  const islandH = 80;
  const islandX = (w - islandW) / 2;
  const islandY = 70;

  sCtx.fillStyle = '#000000';
  drawRoundedRect(sCtx, islandX, islandY, islandW, islandH, 40);

  // Island Content: Mini Audio Spectrum
  sCtx.fillStyle = '#00f5ff';
  for (let b = 0; b < 4; b++) {
    const barH = 12 + Math.sin(screenAnimTime * 5 + b) * 8;
    sCtx.fillRect(islandX + 38 + b * 9, islandY + 40 - barH / 2, 5, barH);
  }

  // Camera Sensor Dot
  sCtx.fillStyle = '#081226';
  sCtx.beginPath();
  sCtx.arc(islandX + islandW - 48, islandY + islandH / 2, 15, 0, Math.PI * 2);
  sCtx.fill();

  // Time & Date Display
  sCtx.fillStyle = '#ffffff';
  sCtx.textAlign = 'center';
  sCtx.font = '300 170px -apple-system, BlinkMacSystemFont, sans-serif';
  sCtx.fillText('10:09', w / 2, 430);

  sCtx.font = '500 38px -apple-system, BlinkMacSystemFont, sans-serif';
  sCtx.fillStyle = 'rgba(255, 255, 255, 0.85)';
  sCtx.fillText('Saturday, October 10', w / 2, 245);

  // Home Bar Indicator
  sCtx.fillStyle = '#ffffff';
  drawRoundedRect(sCtx, (w - 340) / 2, h - 85, 340, 10, 5);

  screenTexture.needsUpdate = true;
}

// ============================================================================
// 5. PROCEDURAL 3D IPHONE 18 PRO MODEL BUILDER
// ============================================================================
const phoneRootGroup = new THREE.Group();
scene.add(phoneRootGroup);

// Sub-assemblies for Exploded & Animated Views
const frontAssembly = new THREE.Group();
const chassisAssembly = new THREE.Group();
const cameraAssembly = new THREE.Group();
const backAssembly = new THREE.Group();
const coreAssembly = new THREE.Group();

phoneRootGroup.add(frontAssembly);
phoneRootGroup.add(chassisAssembly);
phoneRootGroup.add(cameraAssembly);
phoneRootGroup.add(backAssembly);
phoneRootGroup.add(coreAssembly);

let currentFinishKey = 'natural';
let currentFinish = window.IPHONE_CONFIG.finishes[currentFinishKey];

// PBR Materials
const metalChassisMaterial = new THREE.MeshStandardMaterial({
  color: currentFinish.color,
  metalness: currentFinish.metalness,
  roughness: currentFinish.roughness,
  envMapIntensity: 2.2
});

const screenMaterial = new THREE.MeshBasicMaterial({
  map: screenTexture
});

const glassMaterial = new THREE.MeshPhysicalMaterial({
  color: 0xffffff,
  transmission: 0.94,
  opacity: 1,
  transparent: true,
  roughness: 0.04,
  ior: 1.52,
  reflectivity: 0.95
});

const backGlassMaterial = new THREE.MeshStandardMaterial({
  color: currentFinish.color,
  metalness: 0.15,
  roughness: 0.28
});

function createRoundedRectShape(w, h, r) {
  const shape = new THREE.Shape();
  const x = -w / 2;
  const y = -h / 2;
  shape.moveTo(x + r, y);
  shape.lineTo(x + w - r, y);
  shape.quadraticCurveTo(x + w, y, x + w, y + r);
  shape.lineTo(x + w, y + h - r);
  shape.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  shape.lineTo(x + r, y + h);
  shape.quadraticCurveTo(x, y + h, x, y + h - r);
  shape.lineTo(x, y + r);
  shape.quadraticCurveTo(x, y, x + r, y);
  return shape;
}

const { width: PW, height: PH, depth: PD, cornerR: CR } = window.IPHONE_CONFIG.dimensions;

function buildPhoneModel() {
  [frontAssembly, chassisAssembly, cameraAssembly, backAssembly, coreAssembly].forEach(grp => {
    while (grp.children.length > 0) grp.remove(grp.children[0]);
  });

  // 1. Grade 5 Titanium Chassis Frame
  const frameShape = createRoundedRectShape(PW, PH, CR);
  const frameGeo = new THREE.ExtrudeGeometry(frameShape, {
    depth: PD,
    bevelEnabled: true,
    bevelSegments: 8,
    steps: 1,
    bevelSize: 0.05,
    bevelThickness: 0.05
  });
  frameGeo.center();
  const frameMesh = new THREE.Mesh(frameGeo, metalChassisMaterial);
  frameMesh.castShadow = true;
  frameMesh.receiveShadow = true;
  chassisAssembly.add(frameMesh);

  // Solid-State Buttons
  const btnGeo = new THREE.BoxGeometry(0.04, 0.65, 0.09);
  
  // Power / Siri Button (Right)
  const btnPower = new THREE.Mesh(btnGeo, metalChassisMaterial);
  btnPower.position.set(PW / 2 + 0.06, 1.1, 0);
  chassisAssembly.add(btnPower);

  // Volume Buttons (Left)
  const btnVol1 = new THREE.Mesh(btnGeo, metalChassisMaterial);
  btnVol1.position.set(-(PW / 2 + 0.06), 1.5, 0);
  chassisAssembly.add(btnVol1);

  const btnVol2 = new THREE.Mesh(btnGeo, metalChassisMaterial);
  btnVol2.position.set(-(PW / 2 + 0.06), 0.7, 0);
  chassisAssembly.add(btnVol2);

  // Action Button (Left Top)
  const btnActionGeo = new THREE.BoxGeometry(0.04, 0.45, 0.09);
  const btnAction = new THREE.Mesh(btnActionGeo, metalChassisMaterial);
  btnAction.position.set(-(PW / 2 + 0.06), 2.2, 0);
  chassisAssembly.add(btnAction);

  // Dedicated Camera Capture Slider (Lower Right)
  const btnCamSliderGeo = new THREE.BoxGeometry(0.04, 0.85, 0.08);
  const camSliderMat = new THREE.MeshStandardMaterial({
    color: 0x38bdf8,
    metalness: 0.9,
    roughness: 0.2
  });
  const btnCamSlider = new THREE.Mesh(btnCamSliderGeo, camSliderMat);
  btnCamSlider.position.set(PW / 2 + 0.06, -1.4, 0);
  chassisAssembly.add(btnCamSlider);

  // Speaker Grilles & Thunderbolt 5 Port (Bottom)
  const portGeo = new THREE.BoxGeometry(0.65, 0.12, 0.1);
  const portMat = new THREE.MeshBasicMaterial({ color: 0x05070d });
  const portMesh = new THREE.Mesh(portGeo, portMat);
  portMesh.position.set(0, -(PH / 2 + 0.05), 0);
  chassisAssembly.add(portMesh);

  // 2. Front Screen Assembly (Super Retina XDR OLED & Ceramic Shield)
  const screenShape = createRoundedRectShape(PW - 0.14, PH - 0.14, CR - 0.08);
  const screenGeo = new THREE.ShapeGeometry(screenShape);
  const screenMesh = new THREE.Mesh(screenGeo, screenMaterial);
  screenMesh.position.z = PD / 2 + 0.052;
  frontAssembly.add(screenMesh);

  // Ceramic Shield Glass Front
  const frontGlassMesh = new THREE.Mesh(screenGeo, glassMaterial);
  frontGlassMesh.position.z = PD / 2 + 0.058;
  frontAssembly.add(frontGlassMesh);

  // 3. Back Assembly (Matte Frosted Glass Plate + Apple Emblem)
  const backPlateGeo = new THREE.ShapeGeometry(screenShape);
  const backPlateMesh = new THREE.Mesh(backPlateGeo, backGlassMaterial);
  backPlateMesh.rotation.y = Math.PI;
  backPlateMesh.position.z = -(PD / 2 + 0.052);
  backAssembly.add(backPlateMesh);

  // Mirrored Apple Crest Logo
  const logoGeo = new THREE.CircleGeometry(0.38, 36);
  const logoMat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    metalness: 0.98,
    roughness: 0.08
  });
  const logoMesh = new THREE.Mesh(logoGeo, logoMat);
  logoMesh.rotation.y = Math.PI;
  logoMesh.position.set(0, 0.4, -(PD / 2 + 0.055));
  backAssembly.add(logoMesh);

  // 4. Quantum Quad-Prism Camera Plateau & Sapphire Lenses
  const camPlateShape = createRoundedRectShape(1.48, 1.48, 0.38);
  const camPlateGeo = new THREE.ExtrudeGeometry(camPlateShape, {
    depth: 0.14,
    bevelEnabled: true,
    bevelSegments: 5,
    bevelSize: 0.035,
    bevelThickness: 0.035
  });
  camPlateGeo.center();
  const camPlateMesh = new THREE.Mesh(camPlateGeo, metalChassisMaterial);
  camPlateMesh.position.set(-0.75, 2.2, -(PD / 2 + 0.12));
  cameraAssembly.add(camPlateMesh);

  // 4 Precision Camera Lens Barrels
  const lenses = [
    { x: -0.75 + 0.38, y: 2.2 + 0.38, r: 0.25 }, // 200MP Main Wide
    { x: -0.75 - 0.38, y: 2.2 + 0.38, r: 0.25 }, // 48MP Ultra-Wide
    { x: -0.75 - 0.38, y: 2.2 - 0.38, r: 0.25 }, // 48MP Tetraprism 10x
    { x: -0.75 + 0.38, y: 2.2 - 0.38, r: 0.16 }  // 24MP LiDAR 2.0
  ];

  lenses.forEach(lens => {
    // Outer Titanium Ring
    const ringGeo = new THREE.CylinderGeometry(lens.r, lens.r, 0.18, 32);
    ringGeo.rotateX(Math.PI / 2);
    const ringMesh = new THREE.Mesh(ringGeo, metalChassisMaterial);
    ringMesh.position.set(lens.x, lens.y, -(PD / 2 + 0.22));
    cameraAssembly.add(ringMesh);

    // Inner Sapphire Crystal Lens
    const innerLensGeo = new THREE.CircleGeometry(lens.r - 0.05, 32);
    const lensMat = new THREE.MeshStandardMaterial({
      color: 0x061122,
      roughness: 0.02,
      metalness: 0.98
    });
    const innerLens = new THREE.Mesh(innerLensGeo, lensMat);
    innerLens.rotation.y = Math.PI;
    innerLens.position.set(lens.x, lens.y, -(PD / 2 + 0.32));
    cameraAssembly.add(innerLens);
  });

  // Photonic Flash Ring
  const flashGeo = new THREE.CircleGeometry(0.12, 24);
  const flashMat = new THREE.MeshBasicMaterial({ color: 0xfffbeb });
  const flashMesh = new THREE.Mesh(flashGeo, flashMat);
  flashMesh.rotation.y = Math.PI;
  flashMesh.position.set(-0.75 + 0.38, 2.2, -(PD / 2 + 0.22));
  cameraAssembly.add(flashMesh);

  // 5. Internal Architecture (Exploded View & Transparent Mode)
  // A19 Pro Quantum Bionic Silicon SoC
  const chipGeo = new THREE.BoxGeometry(1.3, 1.3, 0.08);
  const chipMat = new THREE.MeshStandardMaterial({
    color: 0x0284c7,
    emissive: 0x00f5ff,
    emissiveIntensity: 0.9,
    metalness: 0.85,
    roughness: 0.25
  });
  const chipMesh = new THREE.Mesh(chipGeo, chipMat);
  chipMesh.position.set(0, 0.7, 0);
  coreAssembly.add(chipMesh);

  // Copper Vapor Dissipation Pipe
  const pipeGeo = new THREE.BoxGeometry(0.2, 2.4, 0.04);
  const pipeMat = new THREE.MeshStandardMaterial({
    color: 0xb45309,
    metalness: 0.95,
    roughness: 0.15
  });
  const pipeMesh = new THREE.Mesh(pipeGeo, pipeMat);
  pipeMesh.position.set(0.65, 0.2, 0);
  coreAssembly.add(pipeMesh);

  // Graphene Solid-State Battery
  const batteryGeo = new THREE.BoxGeometry(2.5, 3.4, 0.12);
  const batteryMat = new THREE.MeshStandardMaterial({
    color: 0x0f172a,
    metalness: 0.4,
    roughness: 0.6
  });
  const batteryMesh = new THREE.Mesh(batteryGeo, batteryMat);
  batteryMesh.position.set(0, -1.3, 0);
  coreAssembly.add(batteryMesh);

  // MagSafe 3.0 Copper Inductive Ring
  const magSafeGeo = new THREE.TorusGeometry(0.95, 0.04, 16, 64);
  const magSafeMat = new THREE.MeshStandardMaterial({
    color: 0xd97706,
    metalness: 0.95,
    roughness: 0.2
  });
  const magSafeMesh = new THREE.Mesh(magSafeGeo, magSafeMat);
  magSafeMesh.position.set(0, 0, -0.05);
  coreAssembly.add(magSafeMesh);

  coreAssembly.visible = false;
}

buildPhoneModel();

// ============================================================================
// 6. ZERO-GRAVITY FLOATING ENVIRONMENT (PRISMS, SPHERES, RINGS)
// ============================================================================
const zeroGGroup = new THREE.Group();
scene.add(zeroGGroup);

const prisms = [];
const prismGeo1 = new THREE.IcosahedronGeometry(0.35, 0);
const prismGeo2 = new THREE.TetrahedronGeometry(0.4, 0);

for (let i = 0; i < 20; i++) {
  const geo = i % 2 === 0 ? prismGeo1 : prismGeo2;
  const mesh = new THREE.Mesh(geo, glassMaterial);
  const angle = (i / 20) * Math.PI * 2;
  const rad = 3.6 + Math.random() * 2.8;
  mesh.position.set(
    Math.cos(angle) * rad,
    (Math.random() - 0.5) * 7,
    Math.sin(angle) * rad + (Math.random() - 0.5) * 2
  );
  mesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);
  mesh.castShadow = true;
  zeroGGroup.add(mesh);
  prisms.push({
    mesh,
    rotX: (Math.random() - 0.5) * 0.02,
    rotY: (Math.random() - 0.5) * 0.02,
    baseY: mesh.position.y,
    freq: 1 + Math.random()
  });
}

const mercurySpheres = [];
const mercuryMat = new THREE.MeshStandardMaterial({
  color: 0xf1f5f9,
  metalness: 0.98,
  roughness: 0.03
});

for (let i = 0; i < 14; i++) {
  const rad = 0.12 + Math.random() * 0.24;
  const geo = new THREE.SphereGeometry(rad, 24, 24);
  const mesh = new THREE.Mesh(geo, mercuryMat);
  const angle = (i / 14) * Math.PI * 2 + 0.4;
  const dist = 3.4 + Math.random() * 2.6;
  mesh.position.set(
    Math.cos(angle) * dist,
    (Math.random() - 0.5) * 6,
    Math.sin(angle) * dist
  );
  zeroGGroup.add(mesh);
  mercurySpheres.push({
    mesh,
    baseY: mesh.position.y,
    freq: 1.2 + Math.random() * 0.8
  });
}

function createEnergyRing(radius, tube, color, rotX, rotZ) {
  const ringGeo = new THREE.TorusGeometry(radius, tube, 16, 120);
  const ringMat = new THREE.MeshBasicMaterial({
    color: color,
    transparent: true,
    opacity: 0.8
  });
  const ringMesh = new THREE.Mesh(ringGeo, ringMat);
  ringMesh.rotation.x = rotX;
  ringMesh.rotation.z = rotZ;
  zeroGGroup.add(ringMesh);
  return ringMesh;
}

const ringCyan1 = createEnergyRing(4.2, 0.015, 0x00f5ff, Math.PI / 2.3, 0.25);
const ringCyan2 = createEnergyRing(4.8, 0.012, 0x38bdf8, Math.PI / 2.1, -0.3);
const ringGold = createEnergyRing(5.2, 0.014, 0xf59e0b, Math.PI / 2.6, 0.45);

const dustCount = 220;
const dustGeo = new THREE.BufferGeometry();
const dustPositions = new Float32Array(dustCount * 3);
for (let i = 0; i < dustCount * 3; i += 3) {
  dustPositions[i] = (Math.random() - 0.5) * 18;
  dustPositions[i + 1] = (Math.random() - 0.5) * 18;
  dustPositions[i + 2] = (Math.random() - 0.5) * 18;
}
dustGeo.setAttribute('position', new THREE.BufferAttribute(dustPositions, 3));
const dustMat = new THREE.PointsMaterial({
  color: 0x38bdf8,
  size: 0.045,
  transparent: true,
  opacity: 0.65
});
const dustCloud = new THREE.Points(dustGeo, dustMat);
scene.add(dustCloud);

// ============================================================================
// 7. SMOOTH SCROLL CHOREOGRAPHY & WAYPOINTS
// ============================================================================
let currentScrollRatio = 0;
let targetScrollRatio = 0;
let isStudioActive = false;
let isManualExplode = false;
let manualExplodeValue = 0;

// Section Targets: mapped to scroll progression
const waypoints = [
  { p: 0.00, rot: [-0.08, 0.35, 0.05], pos: [0, 0.2, 0], exp: 0.0 }, // Hero Overview
  { p: 0.12, rot: [0.12, 1.48, -0.08], pos: [-0.4, 0.1, 1.5], exp: 0.0 }, // Titanium Edge
  { p: 0.24, rot: [0.18, 3.14 + 0.32, 0.0], pos: [0.5, -0.2, 1.8], exp: 0.0 }, // Camera Optics
  { p: 0.38, rot: [0.0, 0.02, 0.0], pos: [0, 0.0, 1.2], exp: 0.0 }, // Display Front
  { p: 0.50, rot: [-0.15, -1.35, 0.18], pos: [0.4, 0.1, 1.5], exp: 0.0 }, // Solid-State Controls
  { p: 0.62, rot: [0.10, 0.65, 0.05], pos: [0.0, 0.1, 0.5], exp: 0.0 }, // Gallery Stills
  { p: 0.74, rot: [0.22, 0.65, -0.15], pos: [0, 0.0, 0.0], exp: 1.0 }, // 3D Exploded View
  { p: 0.86, rot: [-0.08, 0.32, 0.06], pos: [0, 0.1, 0.0], exp: 0.0 }, // 3D Studio Lab
  { p: 1.00, rot: [0.05, 0.45, 0.0], pos: [0, 0.1, 0.0], exp: 0.0 }  // Specs & Pre-Order
];

function updateScrollTarget() {
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  if (maxScroll <= 0) return;
  targetScrollRatio = Math.min(Math.max(window.scrollY / maxScroll, 0), 1);

  const pBar = document.getElementById('scrollProgressBar');
  if (pBar) pBar.style.width = `${targetScrollRatio * 100}%`;

  // Enable/Disable OrbitControls in Studio Section (ratio between 0.82 and 0.92)
  if (targetScrollRatio >= 0.82 && targetScrollRatio <= 0.92) {
    if (!isStudioActive) {
      isStudioActive = true;
      document.body.classList.add('interactive-studio-active');
      if (controls) controls.enabled = true;
      const hud = document.getElementById('hudMode');
      if (hud) hud.innerText = 'MODE: 3D STUDIO (DRAG TO ORBIT)';
    }
  } else {
    if (isStudioActive) {
      isStudioActive = false;
      document.body.classList.remove('interactive-studio-active');
      if (controls) controls.enabled = false;
      const hud = document.getElementById('hudMode');
      if (hud) hud.innerText = 'MODE: ZERO-G FLIGHT';
    }
  }
}

window.addEventListener('scroll', updateScrollTarget, { passive: true });
window.addEventListener('resize', onWindowResize);

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
}

function lerp(a, b, t) {
  return a + (b - a) * t;
}

function applyExplodeOffsets(val) {
  coreAssembly.visible = (val > 0.02 || metalChassisMaterial.transparent);
  frontAssembly.position.z = val * 2.6;
  cameraAssembly.position.z = -val * 1.6;
  backAssembly.position.z = -val * 2.4;
  coreAssembly.position.z = val * 0.8;
  chassisAssembly.position.z = 0;
}

// ============================================================================
// 8. INTERACTIVE CUSTOMIZER FUNCTIONS (SWATCHES, MODES, EXPLODE)
// ============================================================================
window.setTitaniumFinish = function(key) {
  const finish = window.IPHONE_CONFIG.finishes[key];
  if (!finish) return;
  currentFinishKey = key;
  audio.playSwitch();

  if (typeof gsap !== 'undefined') {
    gsap.to(metalChassisMaterial.color, {
      r: ((finish.color >> 16) & 255) / 255,
      g: ((finish.color >> 8) & 255) / 255,
      b: (finish.color & 255) / 255,
      duration: 0.5
    });
    gsap.to(backGlassMaterial.color, {
      r: ((finish.color >> 16) & 255) / 255,
      g: ((finish.color >> 8) & 255) / 255,
      b: (finish.color & 255) / 255,
      duration: 0.5
    });
  } else {
    metalChassisMaterial.color.setHex(finish.color);
    backGlassMaterial.color.setHex(finish.color);
  }

  const backdrop = document.getElementById('spaceBackdrop');
  if (backdrop && finish.backdrop) {
    backdrop.style.background = finish.backdrop;
  }

  document.querySelectorAll('.swatch-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.finish === key);
  });

  const labelEl = document.getElementById('activeFinishLabel');
  if (labelEl) labelEl.innerText = finish.name.toUpperCase();

  const summaryFinish = document.getElementById('summaryFinish');
  if (summaryFinish) summaryFinish.innerText = finish.name;
};

window.setViewMode = function(mode) {
  audio.playClick();
  document.querySelectorAll('.mode-tab').forEach(tab => {
    tab.classList.toggle('active', tab.dataset.mode === mode);
  });

  if (mode === 'assembled') {
    isManualExplode = false;
    metalChassisMaterial.wireframe = false;
    metalChassisMaterial.transparent = false;
    metalChassisMaterial.opacity = 1.0;
    backGlassMaterial.transparent = false;
    backGlassMaterial.opacity = 1.0;
    applyExplodeOffsets(0);
    const range = document.getElementById('explodeRange');
    if (range) range.value = 0;

  } else if (mode === 'exploded') {
    isManualExplode = true;
    manualExplodeValue = 1.0;
    metalChassisMaterial.wireframe = false;
    metalChassisMaterial.transparent = false;
    metalChassisMaterial.opacity = 1.0;
    applyExplodeOffsets(1.0);
    const range = document.getElementById('explodeRange');
    if (range) range.value = 100;
    audio.playExplode();

  } else if (mode === 'transparent') {
    isManualExplode = false;
    applyExplodeOffsets(0);
    metalChassisMaterial.wireframe = false;
    metalChassisMaterial.transparent = true;
    metalChassisMaterial.opacity = 0.35;
    metalChassisMaterial.roughness = 0.05;
    backGlassMaterial.transparent = true;
    backGlassMaterial.opacity = 0.22;
    coreAssembly.visible = true;

  } else if (mode === 'wireframe') {
    isManualExplode = false;
    applyExplodeOffsets(0);
    metalChassisMaterial.wireframe = true;
    metalChassisMaterial.transparent = false;
    metalChassisMaterial.opacity = 1.0;
    coreAssembly.visible = true;
  }
};

window.setScreenTheme = function(theme) {
  activeScreenTheme = theme;
  audio.playClick();
  document.querySelectorAll('.theme-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.theme === theme);
  });
};

window.setFocalLength = function(len) {
  const spec = window.IPHONE_CONFIG.focalLengths[len];
  if (!spec) return;
  audio.playClick();

  document.querySelectorAll('.lens-card').forEach(card => {
    card.classList.toggle('active', card.dataset.focal === len);
  });

  const vfZoom = document.getElementById('vfZoom');
  const vfAperture = document.getElementById('vfAperture');
  const vfShutter = document.getElementById('vfShutter');
  const vfIso = document.getElementById('vfIso');

  if (vfZoom) vfZoom.innerText = len;
  if (vfAperture) vfAperture.innerText = spec.aperture;
  if (vfShutter) vfShutter.innerText = spec.shutter;
  if (vfIso) vfIso.innerText = spec.iso;
};

// ============================================================================
// 9. PRE-ORDER CONFIGURATOR & PRICING CALCULATOR
// ============================================================================
let selectedModel = 'pro';
let selectedStorage = '256GB';
let hasAppleCare = false;

window.selectModel = function(model) {
  selectedModel = model;
  audio.playClick();
  document.querySelectorAll('.config-model-card').forEach(c => {
    c.classList.toggle('active', c.dataset.model === model);
  });

  const scale = model === 'proMax' ? 1.08 : 1.0;
  if (typeof gsap !== 'undefined') {
    gsap.to(phoneRootGroup.scale, { x: scale, y: scale, z: scale, duration: 0.5, ease: 'power2.out' });
  } else {
    phoneRootGroup.scale.set(scale, scale, scale);
  }

  updatePricingDisplay();
};

window.selectStorage = function(size) {
  selectedStorage = size;
  audio.playClick();
  document.querySelectorAll('.config-storage-card').forEach(c => {
    c.classList.toggle('active', c.dataset.storage === size);
  });
  updatePricingDisplay();
};

window.toggleAppleCare = function() {
  hasAppleCare = !hasAppleCare;
  audio.playClick();
  const btn = document.getElementById('appleCareToggle');
  if (btn) btn.classList.toggle('active', hasAppleCare);
  updatePricingDisplay();
};

function updatePricingDisplay() {
  const base = selectedModel === 'pro' ? window.IPHONE_CONFIG.pricing.basePro : window.IPHONE_CONFIG.pricing.baseProMax;
  const storageExtra = window.IPHONE_CONFIG.pricing.storageAdd[selectedStorage] || 0;
  const careExtra = hasAppleCare ? window.IPHONE_CONFIG.pricing.appleCare : 0;
  const total = base + storageExtra + careExtra;

  const totalEl = document.getElementById('summaryTotal');
  if (totalEl) totalEl.innerText = `$${total.toLocaleString()}`;

  const modelEl = document.getElementById('summaryModel');
  if (modelEl) modelEl.innerText = selectedModel === 'pro' ? 'iPhone 18 Pro (6.3")' : 'iPhone 18 Pro Max (6.9")';

  const storageEl = document.getElementById('summaryStorage');
  if (storageEl) storageEl.innerText = selectedStorage;

  const monthlyEl = document.getElementById('summaryMonthly');
  if (monthlyEl) monthlyEl.innerText = `$${Math.round(total / 24)}/mo for 24 mo. with 0% APR`;
}

window.openReservationModal = function() {
  audio.playExplode();
  const modal = document.getElementById('reserveModal');
  if (!modal) return;
  modal.classList.add('open');

  const token = `APL-18P-${Math.floor(100000 + Math.random() * 900000)}-QNT`;
  const tokenEl = document.getElementById('receiptToken');
  if (tokenEl) tokenEl.innerText = token;

  const modalSummary = document.getElementById('modalOrderSummary');
  if (modalSummary) {
    const modelName = selectedModel === 'pro' ? 'iPhone 18 Pro (6.3")' : 'iPhone 18 Pro Max (6.9")';
    modalSummary.innerText = `${modelName} • ${selectedStorage} • ${window.IPHONE_CONFIG.finishes[currentFinishKey].name}`;
  }
};

window.closeReservationModal = function() {
  audio.playClick();
  const modal = document.getElementById('reserveModal');
  if (modal) modal.classList.remove('open');
};

// ============================================================================
// 10. MAIN ANIMATION LOOP
// ============================================================================
const clock = new THREE.Clock();

function animate() {
  requestAnimationFrame(animate);

  const delta = clock.getDelta();
  const elapsedTime = clock.getElapsedTime();

  renderDynamicScreen();

  currentScrollRatio = lerp(currentScrollRatio, targetScrollRatio, 0.08);

  if (!isStudioActive) {
    let wpStart = waypoints[0];
    let wpEnd = waypoints[waypoints.length - 1];

    for (let i = 0; i < waypoints.length - 1; i++) {
      if (currentScrollRatio >= waypoints[i].p && currentScrollRatio <= waypoints[i + 1].p) {
        wpStart = waypoints[i];
        wpEnd = waypoints[i + 1];
        break;
      }
    }

    const segmentSpan = wpEnd.p - wpStart.p || 0.001;
    const localT = (currentScrollRatio - wpStart.p) / segmentSpan;

    const rotX = lerp(wpStart.rot[0], wpEnd.rot[0], localT);
    const rotY = lerp(wpStart.rot[1], wpEnd.rot[1], localT);
    const rotZ = lerp(wpStart.rot[2], wpEnd.rot[2], localT);

    const posX = lerp(wpStart.pos[0], wpEnd.pos[0], localT);
    const posY = lerp(wpStart.pos[1], wpEnd.pos[1], localT);
    const posZ = lerp(wpStart.pos[2], wpEnd.pos[2], localT);

    const levitateY = Math.sin(elapsedTime * 1.6) * 0.14;
    const levitateTilt = Math.cos(elapsedTime * 1.2) * 0.02;

    phoneRootGroup.rotation.set(rotX + levitateTilt, rotY, rotZ);
    phoneRootGroup.position.set(posX, posY + levitateY, posZ);

    if (!isManualExplode) {
      const targetExp = lerp(wpStart.exp, wpEnd.exp, localT);
      applyExplodeOffsets(targetExp);
      const range = document.getElementById('explodeRange');
      if (range) range.value = Math.round(targetExp * 100);
      const valText = document.getElementById('explodeValText');
      if (valText) valText.innerText = `${Math.round(targetExp * 100)}%`;
    }
  } else {
    const levitateY = Math.sin(elapsedTime * 1.6) * 0.12;
    phoneRootGroup.position.y = levitateY;
    if (controls) controls.update();
  }

  // Animate floating zero-g elements
  prisms.forEach(p => {
    p.mesh.rotation.x += p.rotX;
    p.mesh.rotation.y += p.rotY;
    p.mesh.position.y = p.baseY + Math.sin(elapsedTime * p.freq) * 0.25;
  });

  mercurySpheres.forEach(s => {
    s.mesh.position.y = s.baseY + Math.cos(elapsedTime * s.freq) * 0.22;
  });

  ringCyan1.rotation.z += 0.006;
  ringCyan2.rotation.z -= 0.005;
  ringGold.rotation.z += 0.004;

  dustCloud.rotation.y = elapsedTime * 0.02;

  rimCyan.position.x = -8 + Math.sin(elapsedTime * 0.8) * 1.5;
  rimAmber.position.x = 8 + Math.cos(elapsedTime * 0.7) * 1.5;

  renderer.render(scene, camera);
}

// ============================================================================
// 11. INITIALIZATION & DOM BINDINGS
// ============================================================================
window.addEventListener('DOMContentLoaded', () => {
  const soundBtn = document.getElementById('btnSoundToggle');
  if (soundBtn) {
    soundBtn.addEventListener('click', () => {
      const active = audio.toggle();
      soundBtn.classList.toggle('active', active);
    });
  }

  const explodeRange = document.getElementById('explodeRange');
  if (explodeRange) {
    explodeRange.addEventListener('input', (e) => {
      isManualExplode = true;
      const val = parseFloat(e.target.value) / 100;
      manualExplodeValue = val;
      applyExplodeOffsets(val);
      const valText = document.getElementById('explodeValText');
      if (valText) valText.innerText = `${Math.round(val * 100)}%`;
    });
  }

  // Active navigation link highlighting on scroll
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-link');
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(sec => {
      const sectionTop = sec.offsetTop - 200;
      if (window.scrollY >= sectionTop) {
        current = sec.getAttribute('id');
      }
    });
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  }, { passive: true });

  // Specs Tabs Switching
  document.querySelectorAll('.specs-tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      audio.playClick();
      document.querySelectorAll('.specs-tab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const category = btn.dataset.category;
      document.querySelectorAll('.spec-matrix-card').forEach(card => {
        if (category === 'all' || card.dataset.category === category) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // Haptic Button Demo Clickers
  document.querySelectorAll('.button-interactive-card').forEach(card => {
    card.addEventListener('click', () => {
      audio.playHaptic();
      const badge = card.querySelector('.btn-badge-icon');
      if (badge && typeof gsap !== 'undefined') {
        gsap.fromTo(badge, { scale: 1.3 }, { scale: 1, duration: 0.3, ease: 'back.out(2)' });
      }
    });
  });

  updatePricingDisplay();
  animate();
});
