# iPhone 18 Pro Concept Website — Beyond Titanium

A high-performance, dark futuristic concept website for the **iPhone 18 Pro**, featuring a real-time **Three.js 3D floating and rotating experience**, cinematic lighting, zero-gravity levitation atmosphere, dynamic live-rendered canvas screen, and a 3D deconstructed exploded view.

---

## 🌟 Key Features

1. **Floating 3D Hero Banner**:
   - Real-time Three.js WebGL rendering with physically based materials (PBR).
   - Grade 5 Micro-arc Titanium unibody frame, Ceramic Shield front glass, and frosted matte backplate.
   - Zero-gravity levitation atmosphere with floating geometric crystal prisms, orbiting liquid mercury chrome drops, glowing orbital energy rings, and star dust.

2. **Smooth Scroll-Synchronized 3D Choreography**:
   - The iPhone floats, tilts, pitches, and glides seamlessly as you scroll down:
     - **Overview / Hero**: 3/4 dynamic floating hero view.
     - **Titanium Chassis**: Sharp side edge bevel close-up highlighting tensile strength and comfort chamfer.
     - **Quantum Camera**: Swings around to reveal the Quad-Prism camera array and sapphire lenses.
     - **ProMotion XDR 2.0 Display**: Turns square to the front with live interactive screen reflections.
     - **Solid-State Controls**: Pans to the capacitive flush buttons and new Camera Capture Slider.
     - **3D Exploded Architecture**: Deconstructs and separates all internal components along the Z-axis in real-time 3D!
     - **3D Studio Lab**: Transitions into free orbit mode where you can drag to rotate 360°, inspect, and customize.

3. **Live Dynamic Screen Canvas Texture**:
   - Dynamic Island Pro with live animated audio spectrum and sensor indicators.
   - Live digital clock (10:09) and date.
   - 4 selectable real-time screen modes: *Chromatic Flow*, *Quantum Hologram*, *Cosmic Nebula*, and *Obsidian Stealth*.

4. **3D Exploded View & Internal Components**:
   - Sapphire Ceramic Shield front glass (+2.6 Z)
   - 240Hz Super Retina XDR OLED Display (+1.8 Z)
   - A19 Pro Quantum Bionic 2nm SoC & Copper Vapor Dissipation Chamber (+0.8 Z)
   - Grade 5 Micro-Arc Titanium Uni-Chassis (0.0 Z)
   - High-Density Graphene Solid-State Battery (-0.6 Z)
   - Quad-Prism Camera Engine & Taptic Actuators (-1.6 Z)
   - MagSafe 3.0 Inductive Fast Coil & Frosted Back Glass (-2.4 Z)
   - Interactive 0–100% depth slider and clickable layer selector.

5. **Interactive 3D Studio & Finish Customizer**:
   - 360° drag-to-orbit controls (OrbitControls).
   - 5 Titanium finishes with real-time PBR material changes and matching atmospheric backdrops:
     - **Natural Titanium** (`#c8c8cd`)
     - **Space Obsidian Black** (`#18181b`)
     - **Cosmic Nebula Violet** (`#581c87`)
     - **Liquid Amber Gold** (`#eab308`)
     - **Quantum Emerald** (`#059669`)
   - 4 rendering modes: *Assembled*, *Exploded View*, *Sapphire X-Ray (transparent unibody)*, and *Wireframe*.

6. **Web Audio API Sci-Fi Sound Synthesizer**:
   - Synthesizes futuristic UI clicks, mode-switching whooshes, haptic taps, and explosion sounds using the native Web Audio API (zero external sound files needed).
   - Easy toggle button in the navigation header bar.

7. **Pre-Order Configurator & Reservation Receipt**:
   - Interactive screen size selection (6.3" Pro vs 6.9" Pro Max).
   - Storage selector (256GB, 512GB, 1TB, 2TB).
   - AppleCare+ protection toggle.
   - Live total price calculation and monthly installment breakdown.
   - Interactive reservation modal with unique encrypted reservation token.

---

## 🚀 How to Run the Website

### Option 1: Direct File Open
Simply double-click [`index.html`](file:///d:/AI%20Sites/Dress%20Desgin/index.html) in your file explorer to open it in Chrome, Edge, Safari, or Firefox.

### Option 2: Local PowerShell Server
Run the included PowerShell HTTP server:
```powershell
powershell -ExecutionPolicy Bypass -File server.ps1 -port 8080
```
Then navigate to `http://localhost:8080` in your browser.

---

## 🛠️ How to Customize & Edit

Everything is organized modularly for effortless editing:

### 1. Editing 3D Animation, Prices, Specs & Colors
Open [`app.js`](file:///d:/AI%20Sites/Dress%20Desgin/app.js). At the very top (lines 10–70), you will find the `window.IPHONE_CONFIG` object:
```javascript
window.IPHONE_CONFIG = {
  modelName: "iPhone 18 Pro",
  tagline: "Beyond Titanium. Anti-Gravity Architecture.",
  pricing: {
    basePro: 1199,
    baseProMax: 1399,
    storageAdd: { "256GB": 0, "512GB": 200, "1TB": 400, "2TB": 600 },
    appleCare: 199
  },
  finishes: {
    'natural': { name: 'Natural Titanium', hex: '#c8c8cd', color: 0xc8c8cd, ... },
    // Add or modify colors here
  },
  // Adjust 3D dimensions, camera focal lengths, and waypoints
};
```

### 2. Editing Text, Headlines & Copy
Open [`index.html`](file:///d:/AI%20Sites/Dress%20Desgin/index.html). All sections have semantic IDs (`#overview`, `#titanium`, `#camera`, `#display`, `#controls`, `#gallery`, `#architecture`, `#studio`, `#specs`, `#reserve`).

### 3. Editing Design & Theme Styling
Open [`styles.css`](file:///d:/AI%20Sites/Dress%20Desgin/styles.css). Adjust CSS variables in `:root` for colors, glows, blur intensities, and fonts.
