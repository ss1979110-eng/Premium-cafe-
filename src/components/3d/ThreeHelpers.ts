import * as THREE from 'three';

// Generate a smooth procedural steam texture for particle sprites
export function createSteamTexture(): THREE.Texture {
  const canvas = document.createElement('canvas');
  canvas.width = 128;
  canvas.height = 128;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    const gradient = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
    gradient.addColorStop(0, 'rgba(245, 230, 210, 0.65)');
    gradient.addColorStop(0.3, 'rgba(232, 216, 195, 0.35)');
    gradient.addColorStop(0.7, 'rgba(232, 216, 195, 0.1)');
    gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 128, 128);
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

// Generate glistening chai droplet sprite texture
export function createChaiDropletTexture(): THREE.Texture {
  const canvas = document.createElement('canvas');
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    const gradient = ctx.createRadialGradient(26, 26, 2, 32, 32, 30);
    gradient.addColorStop(0, 'rgba(255, 240, 220, 0.95)');
    gradient.addColorStop(0.35, 'rgba(215, 155, 95, 0.85)');
    gradient.addColorStop(0.75, 'rgba(175, 110, 55, 0.6)');
    gradient.addColorStop(1, 'rgba(100, 55, 20, 0)');

    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(32, 32, 30, 0, Math.PI * 2);
    ctx.fill();
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

// Generate realistic 3D Coffee Bean Mesh
export function createCoffeeBeanMesh(): THREE.Mesh {
  const geometry = new THREE.SphereGeometry(0.35, 18, 18);
  geometry.scale(1.35, 0.9, 0.72);

  // Deform to produce realistic center crease & curved split
  const pos = geometry.attributes.position;
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i);
    const y = pos.getY(i);
    const z = pos.getZ(i);
    if (z > 0.08 && Math.abs(x) < 0.14) {
      pos.setZ(i, z * 0.28);
    }
  }
  geometry.computeVertexNormals();

  const material = new THREE.MeshStandardMaterial({
    color: 0x341d11, // Rich dark roasted coffee bean
    roughness: 0.35,
    metalness: 0.22,
  });

  const mesh = new THREE.Mesh(geometry, material);
  mesh.castShadow = true;
  return mesh;
}

// Generate authentic Indian Chai Cardamom / Spice Seed Mesh
export function createChaiSeedMesh(): THREE.Mesh {
  // Ellipsoid cardamom / spice seed with pointed tips
  const geometry = new THREE.ConeGeometry(0.18, 0.5, 8);
  geometry.scale(1, 1.2, 0.8);
  geometry.center();

  const material = new THREE.MeshStandardMaterial({
    color: 0x5a3e1b, // Spiced herbal brown/amber
    roughness: 0.6,
    metalness: 0.1,
  });

  const mesh = new THREE.Mesh(geometry, material);
  mesh.castShadow = true;
  return mesh;
}

// Generate realistic 3D Tea Leaf Shard Mesh
export function createTeaLeafMesh(): THREE.Mesh {
  const shape = new THREE.Shape();
  shape.moveTo(0, -0.35);
  shape.bezierCurveTo(0.18, -0.15, 0.22, 0.2, 0, 0.45);
  shape.bezierCurveTo(-0.22, 0.2, -0.18, -0.15, 0, -0.35);

  const extrudeSettings = {
    steps: 2,
    depth: 0.025,
    bevelEnabled: true,
    bevelThickness: 0.01,
    bevelSize: 0.015,
    bevelSegments: 2,
  };

  const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
  geometry.scale(0.75, 0.75, 0.75);
  geometry.center();

  const material = new THREE.MeshStandardMaterial({
    color: 0x221a12, // Dark dried fermented tea leaf
    roughness: 0.7,
    metalness: 0.15,
    side: THREE.DoubleSide
  });

  const mesh = new THREE.Mesh(geometry, material);
  mesh.castShadow = true;
  return mesh;
}

// Generate Authentic Faceted Indian Cutting Chai Glass with Delicious Outing Splash!
export function createCuttingChaiGlassWithSplash(): {
  group: THREE.Group;
  splashGroup: THREE.Group;
  splashDroplets: THREE.Mesh[];
  liquidMesh: THREE.Mesh;
} {
  const group = new THREE.Group();
  const splashDroplets: THREE.Mesh[] = [];

  // 1. Faceted Glass Outer Body (Octagonal 10-sided tapered glass)
  const glassPoints: THREE.Vector2[] = [];
  glassPoints.push(new THREE.Vector2(0, 0));
  glassPoints.push(new THREE.Vector2(0.82, 0)); // Weighted bottom base
  glassPoints.push(new THREE.Vector2(0.85, 0.4));
  glassPoints.push(new THREE.Vector2(0.95, 1.2));
  glassPoints.push(new THREE.Vector2(1.15, 2.1));
  glassPoints.push(new THREE.Vector2(1.18, 2.2)); // Rim
  glassPoints.push(new THREE.Vector2(1.1, 2.2));
  glassPoints.push(new THREE.Vector2(1.05, 2.0));
  glassPoints.push(new THREE.Vector2(0.85, 1.1));
  glassPoints.push(new THREE.Vector2(0.72, 0.4));
  glassPoints.push(new THREE.Vector2(0, 0.35)); // Inner hollow bottom

  const glassGeom = new THREE.LatheGeometry(glassPoints, 10); // 10 facets like authentic cutting chai glasses
  glassGeom.computeVertexNormals();

  const glassMat = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    transmission: 0.88,
    opacity: 1,
    transparent: true,
    roughness: 0.12,
    ior: 1.52,
    thickness: 0.9,
    reflectivity: 0.9,
    clearcoat: 1.0,
    clearcoatRoughness: 0.08,
  });

  const glassMesh = new THREE.Mesh(glassGeom, glassMat);
  glassMesh.castShadow = true;
  glassMesh.receiveShadow = true;
  group.add(glassMesh);

  // 2. Creamy Spiced Chai Liquid inside glass
  const innerLiquidPoints: THREE.Vector2[] = [];
  innerLiquidPoints.push(new THREE.Vector2(0, 0.35));
  innerLiquidPoints.push(new THREE.Vector2(0.71, 0.4));
  innerLiquidPoints.push(new THREE.Vector2(0.84, 1.1));
  innerLiquidPoints.push(new THREE.Vector2(1.03, 1.95)); // Liquid level near rim
  innerLiquidPoints.push(new THREE.Vector2(0, 1.95));

  const liquidGeom = new THREE.LatheGeometry(innerLiquidPoints, 24);
  const chaiLiquidMat = new THREE.MeshStandardMaterial({
    color: 0xd99554, // Rich Indian milk tea caramel glow
    roughness: 0.18,
    metalness: 0.2,
    emissive: 0x4a2408,
    emissiveIntensity: 0.25,
  });
  const liquidMesh = new THREE.Mesh(liquidGeom, chaiLiquidMat);
  group.add(liquidMesh);

  // Froth & Bubbles top disk
  const foamGeom = new THREE.CylinderGeometry(1.02, 1.02, 0.04, 24);
  const foamMat = new THREE.MeshStandardMaterial({
    color: 0xf2d6b3, // Frothy tea foam
    roughness: 0.45,
    metalness: 0.1,
  });
  const foamMesh = new THREE.Mesh(foamGeom, foamMat);
  foamMesh.position.y = 1.96;
  group.add(foamMesh);

  // 3. OUTING SPLASH OF DELICIOUS CHAI BURSTING OUT OF THE GLASS
  const splashGroup = new THREE.Group();
  splashGroup.position.set(0, 1.95, 0);

  // Main upward surging fluid arches
  const curve1 = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0.2, 0, 0.2),
    new THREE.Vector3(0.6, 0.7, 0.5),
    new THREE.Vector3(1.1, 1.6, 0.8),
    new THREE.Vector3(1.4, 2.3, 0.6),
    new THREE.Vector3(1.5, 2.8, 0.2),
  ]);
  const tubeGeom1 = new THREE.TubeGeometry(curve1, 24, 0.14, 10, false);
  const splashMat = new THREE.MeshStandardMaterial({
    color: 0xe09b58,
    roughness: 0.15,
    metalness: 0.28,
    emissive: 0x5a2d0b,
    emissiveIntensity: 0.35,
  });
  const splashTube1 = new THREE.Mesh(tubeGeom1, splashMat);
  splashGroup.add(splashTube1);

  // Second curling splash arch leaping to the left
  const curve2 = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-0.2, 0, -0.1),
    new THREE.Vector3(-0.7, 0.8, -0.3),
    new THREE.Vector3(-1.1, 1.5, -0.1),
    new THREE.Vector3(-1.3, 2.1, 0.3),
  ]);
  const tubeGeom2 = new THREE.TubeGeometry(curve2, 20, 0.11, 8, false);
  const splashTube2 = new THREE.Mesh(tubeGeom2, splashMat);
  splashGroup.add(splashTube2);

  // Third dynamic crown wave
  const curve3 = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0.0, 0.1, 0.3),
    new THREE.Vector3(0.2, 0.9, 0.8),
    new THREE.Vector3(0.1, 1.8, 1.2),
  ]);
  const tubeGeom3 = new THREE.TubeGeometry(curve3, 16, 0.08, 8, false);
  const splashTube3 = new THREE.Mesh(tubeGeom3, splashMat);
  splashGroup.add(splashTube3);

  // Flying individual liquid droplets bursting in the air
  const dropletPositions = [
    [1.6, 3.1, 0.1, 0.12],
    [1.3, 2.6, 0.9, 0.09],
    [1.8, 2.4, 0.4, 0.08],
    [-1.4, 2.4, 0.5, 0.1],
    [-1.2, 1.8, -0.5, 0.07],
    [0.15, 2.1, 1.4, 0.08],
    [0.4, 1.5, -0.8, 0.09],
    [-0.5, 2.6, 0.2, 0.06],
  ];

  dropletPositions.forEach(([x, y, z, r]) => {
    const dropGeom = new THREE.SphereGeometry(r, 12, 12);
    dropGeom.scale(1, 1.3, 0.9);
    const dropMesh = new THREE.Mesh(dropGeom, splashMat);
    dropMesh.position.set(x, y, z);
    splashGroup.add(dropMesh);
    splashDroplets.push(dropMesh);
  });

  group.add(splashGroup);

  return { group, splashGroup, splashDroplets, liquidMesh };
}

// Generate Realistic Cold Coffee Frappe Cup with Domed Lid, Chocolate Drizzle, and Straw
export function createFrappeCoffeeCup(): THREE.Group {
  const group = new THREE.Group();

  // 1. Clear Plastic Ribbed Cup
  const cupPoints: THREE.Vector2[] = [];
  cupPoints.push(new THREE.Vector2(0, 0));
  cupPoints.push(new THREE.Vector2(0.88, 0));
  cupPoints.push(new THREE.Vector2(0.92, 0.3));
  cupPoints.push(new THREE.Vector2(1.15, 1.8));
  cupPoints.push(new THREE.Vector2(1.35, 2.8));
  cupPoints.push(new THREE.Vector2(1.4, 3.0)); // Top cup flange
  cupPoints.push(new THREE.Vector2(1.32, 3.0));
  cupPoints.push(new THREE.Vector2(1.1, 1.8));
  cupPoints.push(new THREE.Vector2(0.85, 0.3));
  cupPoints.push(new THREE.Vector2(0, 0.1));

  const cupGeom = new THREE.LatheGeometry(cupPoints, 32);
  const plasticMat = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    transmission: 0.9,
    opacity: 0.95,
    transparent: true,
    roughness: 0.1,
    ior: 1.48,
    thickness: 0.6,
    clearcoat: 0.9,
  });
  const cupMesh = new THREE.Mesh(cupGeom, plasticMat);
  cupMesh.castShadow = true;
  group.add(cupMesh);

  // 2. Cold Blended Coffee Frappe Liquid Body
  const frappePoints: THREE.Vector2[] = [];
  frappePoints.push(new THREE.Vector2(0, 0.1));
  frappePoints.push(new THREE.Vector2(0.84, 0.3));
  frappePoints.push(new THREE.Vector2(1.08, 1.8));
  frappePoints.push(new THREE.Vector2(1.3, 2.9));
  frappePoints.push(new THREE.Vector2(0, 2.9));

  const frappeGeom = new THREE.LatheGeometry(frappePoints, 32);
  const frappeMat = new THREE.MeshStandardMaterial({
    color: 0xa8784d, // Creamy iced mocha frappe
    roughness: 0.3,
    metalness: 0.15,
  });
  const frappeMesh = new THREE.Mesh(frappeGeom, frappeMat);
  group.add(frappeMesh);

  // 3. Dark Chocolate Drizzle Ribs on cup walls (Authentic visual from reference)
  const chocolateMat = new THREE.MeshStandardMaterial({
    color: 0x1f0e06, // Rich dark fudge chocolate syrup
    roughness: 0.2,
    metalness: 0.3,
  });

  const drizzleCurves = [
    [
      new THREE.Vector3(1.02, 2.8, 0.4),
      new THREE.Vector3(0.95, 2.2, 0.5),
      new THREE.Vector3(0.9, 1.4, 0.3),
      new THREE.Vector3(0.82, 0.7, 0.35),
    ],
    [
      new THREE.Vector3(-0.8, 2.8, 0.6),
      new THREE.Vector3(-0.9, 2.1, 0.4),
      new THREE.Vector3(-0.75, 1.2, 0.4),
      new THREE.Vector3(-0.7, 0.6, 0.3),
    ],
    [
      new THREE.Vector3(0.2, 2.8, -1.0),
      new THREE.Vector3(0.3, 1.9, -0.9),
      new THREE.Vector3(0.1, 1.0, -0.75),
    ],
  ];

  drizzleCurves.forEach((pts) => {
    const curve = new THREE.CatmullRomCurve3(pts);
    const tube = new THREE.TubeGeometry(curve, 16, 0.05, 8, false);
    const drizzleMesh = new THREE.Mesh(tube, chocolateMat);
    group.add(drizzleMesh);
  });

  // 4. Domed Clear Lid
  const domePoints: THREE.Vector2[] = [];
  for (let i = 0; i <= 14; i++) {
    const theta = (i / 14) * (Math.PI / 2);
    const r = 1.38 * Math.cos(theta);
    const y = 3.0 + 0.9 * Math.sin(theta);
    // Leave center hole for straw
    if (r > 0.25) {
      domePoints.push(new THREE.Vector2(r, y));
    }
  }
  const domeGeom = new THREE.LatheGeometry(domePoints, 32);
  const domeMesh = new THREE.Mesh(domeGeom, plasticMat);
  group.add(domeMesh);

  // 5. Long Black Straw angled upwards
  const strawGeom = new THREE.CylinderGeometry(0.08, 0.08, 2.4, 16);
  const strawMat = new THREE.MeshStandardMaterial({
    color: 0x0a0a0a, // Sleek black straw
    roughness: 0.3,
    metalness: 0.4,
  });
  const strawMesh = new THREE.Mesh(strawGeom, strawMat);
  strawMesh.position.set(0.1, 3.8, -0.05);
  strawMesh.rotation.z = -0.15;
  strawMesh.rotation.x = 0.1;
  strawMesh.castShadow = true;
  group.add(strawMesh);

  return group;
}

// Generate Ice Cube Mesh
export function createIceCubeMesh(): THREE.Mesh {
  const geom = new THREE.BoxGeometry(0.5, 0.5, 0.5);
  const mat = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    transmission: 0.88,
    opacity: 1,
    transparent: true,
    roughness: 0.15,
    ior: 1.33,
    thickness: 0.8,
  });
  const mesh = new THREE.Mesh(geom, mat);
  return mesh;
}

// Generate Chai Cup / Traditional Kulhad Cup Mesh
export function createChaiCup(): THREE.Group {
  const group = new THREE.Group();

  const points: THREE.Vector2[] = [];
  points.push(new THREE.Vector2(0, 0));
  points.push(new THREE.Vector2(0.8, 0));
  points.push(new THREE.Vector2(0.85, 0.1));
  points.push(new THREE.Vector2(0.95, 0.5));
  points.push(new THREE.Vector2(1.15, 1.4));
  points.push(new THREE.Vector2(1.22, 1.8));
  points.push(new THREE.Vector2(1.2, 1.85));
  points.push(new THREE.Vector2(1.1, 1.8));
  points.push(new THREE.Vector2(0.9, 0.5));
  points.push(new THREE.Vector2(0.7, 0.2));
  points.push(new THREE.Vector2(0, 0.2));

  const cupGeom = new THREE.LatheGeometry(points, 32);
  const cupMat = new THREE.MeshStandardMaterial({
    color: 0x3d2216,
    roughness: 0.75,
    metalness: 0.08,
  });
  const cupMesh = new THREE.Mesh(cupGeom, cupMat);
  cupMesh.castShadow = true;
  cupMesh.receiveShadow = true;
  group.add(cupMesh);

  // Rich warm Indian Spiced Chai liquid surface
  const liquidGeom = new THREE.CylinderGeometry(1.08, 1.08, 0.05, 32);
  const liquidMat = new THREE.MeshStandardMaterial({
    color: 0xc89255,
    roughness: 0.15,
    metalness: 0.25,
  });
  const liquidMesh = new THREE.Mesh(liquidGeom, liquidMat);
  liquidMesh.position.y = 1.68;
  group.add(liquidMesh);

  // Saucer plate
  const saucerPoints: THREE.Vector2[] = [];
  saucerPoints.push(new THREE.Vector2(0, 0));
  saucerPoints.push(new THREE.Vector2(1.4, 0));
  saucerPoints.push(new THREE.Vector2(1.6, 0.2));
  saucerPoints.push(new THREE.Vector2(1.5, 0.25));
  saucerPoints.push(new THREE.Vector2(1.3, 0.1));
  saucerPoints.push(new THREE.Vector2(0, 0.08));

  const saucerGeom = new THREE.LatheGeometry(saucerPoints, 32);
  const saucerMesh = new THREE.Mesh(saucerGeom, cupMat);
  saucerMesh.position.y = -0.05;
  group.add(saucerMesh);

  return group;
}

// Generate Modern Luxury Coffee Cup Mesh
export function createCoffeeCup(): THREE.Group {
  const group = new THREE.Group();

  const points: THREE.Vector2[] = [];
  points.push(new THREE.Vector2(0, 0));
  points.push(new THREE.Vector2(0.9, 0));
  points.push(new THREE.Vector2(1.1, 0.4));
  points.push(new THREE.Vector2(1.3, 1.4));
  points.push(new THREE.Vector2(1.32, 1.5));
  points.push(new THREE.Vector2(1.24, 1.5));
  points.push(new THREE.Vector2(1.18, 1.35));
  points.push(new THREE.Vector2(0.95, 0.3));
  points.push(new THREE.Vector2(0, 0.2));

  const cupGeom = new THREE.LatheGeometry(points, 32);
  const cupMat = new THREE.MeshStandardMaterial({
    color: 0x181716,
    roughness: 0.25,
    metalness: 0.4,
  });
  const cupMesh = new THREE.Mesh(cupGeom, cupMat);
  cupMesh.castShadow = true;
  group.add(cupMesh);

  // Handle
  const handleGeom = new THREE.TorusGeometry(0.5, 0.09, 16, 24, Math.PI * 1.15);
  const handleMesh = new THREE.Mesh(handleGeom, cupMat);
  handleMesh.position.set(1.15, 0.8, 0);
  handleMesh.rotation.z = -Math.PI / 2;
  group.add(handleMesh);

  // Liquid
  const liquidGeom = new THREE.CylinderGeometry(1.2, 1.2, 0.05, 32);
  const liquidMat = new THREE.MeshStandardMaterial({
    color: 0x3a2113,
    roughness: 0.18,
    metalness: 0.3,
  });
  const liquidMesh = new THREE.Mesh(liquidGeom, liquidMat);
  liquidMesh.position.y = 1.38;
  group.add(liquidMesh);

  // Saucer
  const saucerGeom = new THREE.CylinderGeometry(1.8, 1.5, 0.15, 32);
  const saucerMesh = new THREE.Mesh(saucerGeom, cupMat);
  saucerMesh.position.y = -0.08;
  group.add(saucerMesh);

  return group;
}

// Generate Realistic 3D Pizza with Wood Serving Board & Pizza Photo Texture
export function createPizzaMesh(photoUrl?: string): { group: THREE.Group; pizzaDisk: THREE.Mesh } {
  const group = new THREE.Group();

  // 1. Rustic Wood Pizza Peel / Serving Board
  const boardGeom = new THREE.CylinderGeometry(1.9, 1.9, 0.12, 36);
  const boardMat = new THREE.MeshStandardMaterial({
    color: 0x3d2516, // Rich dark walnut wood
    roughness: 0.75,
    metalness: 0.05,
  });
  const boardMesh = new THREE.Mesh(boardGeom, boardMat);
  boardMesh.position.y = -0.06;
  boardMesh.receiveShadow = true;
  group.add(boardMesh);

  // Board handle
  const handleGeom = new THREE.BoxGeometry(0.5, 0.11, 1.2);
  const handleMesh = new THREE.Mesh(handleGeom, boardMat);
  handleMesh.position.set(0, -0.06, 2.3);
  group.add(handleMesh);

  // Handle hole
  const holeGeom = new THREE.CylinderGeometry(0.12, 0.12, 0.15, 16);
  const holeMat = new THREE.MeshBasicMaterial({ color: 0x140e0b });
  const holeMesh = new THREE.Mesh(holeGeom, holeMat);
  holeMesh.position.set(0, -0.06, 2.7);
  group.add(holeMesh);

  // 2. Woodfired Pizza Outer Crust Rim (Fluffy golden baked crust ring)
  const crustGeom = new THREE.TorusGeometry(1.5, 0.22, 16, 40);
  crustGeom.scale(1, 1, 0.65);
  const crustMat = new THREE.MeshStandardMaterial({
    color: 0xc8823b, // Golden toasted pizza crust
    roughness: 0.8,
    metalness: 0.1,
  });
  const crustMesh = new THREE.Mesh(crustGeom, crustMat);
  crustMesh.rotation.x = Math.PI / 2;
  crustMesh.position.y = 0.08;
  crustMesh.castShadow = true;
  group.add(crustMesh);

  // 3. Central Pizza Surface with High-Quality Photo Texture
  const pizzaGeom = new THREE.CircleGeometry(1.54, 48);
  pizzaGeom.rotateX(-Math.PI / 2);

  // Default procedural fallback texture in case of offline / loading
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    // Rich baked cheese & marinara gradient
    const grad = ctx.createRadialGradient(256, 256, 20, 256, 256, 250);
    grad.addColorStop(0, '#e59d3e');
    grad.addColorStop(0.35, '#c94a29');
    grad.addColorStop(0.7, '#d68b35');
    grad.addColorStop(0.9, '#a64a1d');
    grad.addColorStop(1, '#853a15');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(256, 256, 250, 0, Math.PI * 2);
    ctx.fill();

    // Melted cheese patches
    ctx.fillStyle = 'rgba(255, 235, 175, 0.65)';
    for (let i = 0; i < 18; i++) {
      const x = 120 + Math.random() * 270;
      const y = 120 + Math.random() * 270;
      const r = 25 + Math.random() * 35;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
    }
  }
  const fallbackTexture = new THREE.CanvasTexture(canvas);

  const pizzaMat = new THREE.MeshStandardMaterial({
    map: fallbackTexture,
    roughness: 0.35,
    metalness: 0.15,
    emissive: 0x3d1708,
    emissiveIntensity: 0.15,
    side: THREE.DoubleSide,
  });

  const targetUrl = photoUrl || 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1000&q=80';
  const loader = new THREE.TextureLoader();
  loader.setCrossOrigin('anonymous');
  loader.load(
    targetUrl,
    (loadedTex) => {
      loadedTex.wrapS = THREE.ClampToEdgeWrapping;
      loadedTex.wrapT = THREE.ClampToEdgeWrapping;
      loadedTex.colorSpace = THREE.SRGBColorSpace;
      pizzaMat.map = loadedTex;
      pizzaMat.needsUpdate = true;
    },
    undefined,
    () => {
      // Fallback stays in place
    }
  );

  const pizzaDisk = new THREE.Mesh(pizzaGeom, pizzaMat);
  pizzaDisk.position.y = 0.12;
  pizzaDisk.castShadow = true;
  pizzaDisk.receiveShadow = true;
  group.add(pizzaDisk);

  // 4. 3D Basil Leaves on Top of Pizza
  for (let i = 0; i < 4; i++) {
    const basil = createBasilLeafMesh();
    const angle = (i / 4) * Math.PI * 2 + 0.3;
    const r = 0.6 + Math.random() * 0.45;
    basil.position.set(Math.cos(angle) * r, 0.16, Math.sin(angle) * r);
    basil.rotation.set(-Math.PI / 2 + 0.2, (Math.random() - 0.5) * 0.4, Math.random() * Math.PI * 2);
    basil.scale.set(0.65, 0.65, 0.65);
    group.add(basil);
  }

  // 5. 3D Sliced Tomato / Olive details
  const oliveMat = new THREE.MeshStandardMaterial({
    color: 0x111111,
    roughness: 0.2,
    metalness: 0.5,
  });
  for (let i = 0; i < 6; i++) {
    const oliveGeom = new THREE.TorusGeometry(0.12, 0.045, 8, 16);
    const oliveMesh = new THREE.Mesh(oliveGeom, oliveMat);
    const angle = (i / 6) * Math.PI * 2 + 0.5;
    const r = 0.4 + Math.random() * 0.7;
    oliveMesh.rotation.x = Math.PI / 2;
    oliveMesh.position.set(Math.cos(angle) * r, 0.14, Math.sin(angle) * r);
    group.add(oliveMesh);
  }

  return { group, pizzaDisk };
}

// Generate 3D Basil Leaf Mesh
export function createBasilLeafMesh(): THREE.Mesh {
  const shape = new THREE.Shape();
  shape.moveTo(0, -0.3);
  shape.bezierCurveTo(0.22, -0.15, 0.25, 0.2, 0, 0.4);
  shape.bezierCurveTo(-0.25, 0.2, -0.22, -0.15, 0, -0.3);

  const extrudeSettings = {
    steps: 1,
    depth: 0.02,
    bevelEnabled: true,
    bevelThickness: 0.01,
    bevelSize: 0.015,
    bevelSegments: 2,
  };

  const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
  geometry.scale(0.8, 0.8, 0.8);
  geometry.center();

  const material = new THREE.MeshStandardMaterial({
    color: 0x228b22, // Fresh vibrant basil leaf green
    roughness: 0.35,
    metalness: 0.1,
    side: THREE.DoubleSide,
  });

  const mesh = new THREE.Mesh(geometry, material);
  mesh.castShadow = true;
  return mesh;
}

// Generate 3D Crushed Red Chilli Flake Mesh
export function createChilliFlakeMesh(): THREE.Mesh {
  const geometry = new THREE.ConeGeometry(0.09, 0.2, 5);
  geometry.scale(1.2, 0.3, 0.9);
  geometry.center();

  const material = new THREE.MeshStandardMaterial({
    color: 0xc41e1e, // Fiery red chilli flake
    roughness: 0.4,
    metalness: 0.2,
  });

  const mesh = new THREE.Mesh(geometry, material);
  mesh.castShadow = true;
  return mesh;
}

// Generate 3D Oregano Herb Fleck Mesh
export function createOreganoHerbMesh(): THREE.Mesh {
  const geometry = new THREE.DodecahedronGeometry(0.06, 0);
  const material = new THREE.MeshStandardMaterial({
    color: 0x3b5323, // Herb dried green
    roughness: 0.7,
    metalness: 0.05,
  });
  return new THREE.Mesh(geometry, material);
}



