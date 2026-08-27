import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import {
  createCuttingChaiGlassWithSplash,
  createFrappeCoffeeCup,
  createCoffeeBeanMesh,
  createChaiSeedMesh,
  createTeaLeafMesh,
  createSteamTexture,
  createChaiDropletTexture
} from './ThreeHelpers';

interface Hero3DCanvasProps {
  brightnessPreset?: 'vibrant' | 'balanced' | 'moody';
  onBrightnessChange?: (preset: 'vibrant' | 'balanced' | 'moody') => void;
}

export const Hero3DCanvas: React.FC<Hero3DCanvasProps> = ({
  brightnessPreset = 'balanced',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [webglSupported, setWebglSupported] = useState(true);
  const [activeBrightness, setActiveBrightness] = useState<'vibrant' | 'balanced' | 'moody'>(brightnessPreset);

  // Store lighting refs to update dynamically when user shifts brightness
  const lightsRef = useRef<{
    renderer?: THREE.WebGLRenderer;
    ambientLight?: THREE.AmbientLight;
    warmKeyLight?: THREE.DirectionalLight;
    goldRimLight?: THREE.PointLight;
    splashMatGroup?: THREE.Mesh[];
  }>({});

  useEffect(() => {
    setActiveBrightness(brightnessPreset);
  }, [brightnessPreset]);

  // Handle dynamic brightness shift
  useEffect(() => {
    const { renderer, ambientLight, warmKeyLight, goldRimLight } = lightsRef.current;
    if (!renderer || !ambientLight || !warmKeyLight || !goldRimLight) return;

    if (activeBrightness === 'vibrant') {
      renderer.toneMappingExposure = 1.35;
      ambientLight.intensity = 2.2;
      warmKeyLight.intensity = 3.6;
      goldRimLight.intensity = 5.0;
    } else if (activeBrightness === 'moody') {
      renderer.toneMappingExposure = 0.95;
      ambientLight.intensity = 1.2;
      warmKeyLight.intensity = 2.0;
      goldRimLight.intensity = 2.8;
    } else {
      // Balanced
      renderer.toneMappingExposure = 1.15;
      ambientLight.intensity = 1.7;
      warmKeyLight.intensity = 2.8;
      goldRimLight.intensity = 3.8;
    }
  }, [activeBrightness]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Check WebGL support
    try {
      const canvasTest = document.createElement('canvas');
      const gl = canvasTest.getContext('webgl') || canvasTest.getContext('experimental-webgl');
      if (!gl) {
        setWebglSupported(false);
        return;
      }
    } catch {
      setWebglSupported(false);
      return;
    }

    // Scene setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x050504, 0.038);

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      42,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 1.1, 8.6);

    // Renderer with ACES ToneMapping for rich photographic contrast
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = activeBrightness === 'vibrant' ? 1.35 : activeBrightness === 'moody' ? 0.95 : 1.15;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);
    lightsRef.current.renderer = renderer;

    // Lighting (Warm amber, rich espresso, and glowing golden highlights)
    const ambientLight = new THREE.AmbientLight(0x3a2215, 1.7);
    scene.add(ambientLight);
    lightsRef.current.ambientLight = ambientLight;

    // Warm Sun/Studio Key light from top-front
    const warmKeyLight = new THREE.DirectionalLight(0xffe2b8, 2.8);
    warmKeyLight.position.set(4, 8, 6);
    warmKeyLight.castShadow = true;
    warmKeyLight.shadow.mapSize.width = 1024;
    warmKeyLight.shadow.mapSize.height = 1024;
    scene.add(warmKeyLight);
    lightsRef.current.warmKeyLight = warmKeyLight;

    // Golden Chai Rim Light (Gives delicious backlight glow to splashing milk tea)
    const goldRimLight = new THREE.PointLight(0xffaa44, 3.8, 25);
    goldRimLight.position.set(-3.5, 4.5, -2.5);
    scene.add(goldRimLight);
    lightsRef.current.goldRimLight = goldRimLight;

    // Rich Dark Roast Fill Light from right
    const coffeeFillLight = new THREE.PointLight(0xd49b6a, 2.6, 20);
    coffeeFillLight.position.set(4.5, 2.5, 2.5);
    scene.add(coffeeFillLight);

    // Deep Forest Green Accent (Brand signature)
    const brandGreenLight = new THREE.SpotLight(0x0b3024, 4.5, 25, Math.PI / 4, 0.6, 1);
    brandGreenLight.position.set(0, -4, -3);
    brandGreenLight.lookAt(0, 0, 0);
    scene.add(brandGreenLight);

    // Main 3D Models & Composition Group
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // 1. Faceted Cutting Chai Glass with Outing Splash (Left side, matching reference image)
    const { group: chaiGroup, splashGroup, splashDroplets } = createCuttingChaiGlassWithSplash();
    chaiGroup.position.set(-1.85, -0.4, 0.4);
    chaiGroup.rotation.y = 0.45;
    chaiGroup.rotation.z = -0.12; // tilted dynamic angle like the photo
    chaiGroup.scale.set(1.02, 1.02, 1.02);
    mainGroup.add(chaiGroup);

    // 2. Frappe Coffee Cup with Chocolate Drizzle and Dome Lid (Right side, matching reference image)
    const coffeeGroup = createFrappeCoffeeCup();
    coffeeGroup.position.set(1.85, -0.6, 0.1);
    coffeeGroup.rotation.y = -0.4;
    coffeeGroup.rotation.z = 0.08;
    coffeeGroup.scale.set(0.98, 0.98, 0.98);
    mainGroup.add(coffeeGroup);

    // 3. Dynamic Floating Coffee Beans (Background & Midground)
    const beanGroup = new THREE.Group();
    const beans: {
      mesh: THREE.Mesh;
      speed: number;
      rotSpeed: THREE.Vector3;
      initialPos: THREE.Vector3;
      radius: number;
      phase: number;
    }[] = [];

    const totalBeans = 22;
    for (let i = 0; i < totalBeans; i++) {
      const beanMesh = createCoffeeBeanMesh();
      const radius = 2.2 + Math.random() * 4.5;
      const angle = (i / totalBeans) * Math.PI * 2 + (Math.random() - 0.5) * 0.5;
      const y = -2.2 + Math.random() * 4.8;
      const z = -2.0 + Math.random() * 4.0;
      const x = Math.cos(angle) * radius;

      beanMesh.position.set(x, y, z);
      beanMesh.rotation.set(Math.random() * Math.PI * 2, Math.random() * Math.PI * 2, Math.random() * Math.PI * 2);
      const scale = 0.45 + Math.random() * 0.55;
      beanMesh.scale.set(scale, scale, scale);

      beanGroup.add(beanMesh);
      beans.push({
        mesh: beanMesh,
        speed: 0.25 + Math.random() * 0.45,
        rotSpeed: new THREE.Vector3(
          (Math.random() - 0.5) * 0.03,
          (Math.random() - 0.5) * 0.035,
          (Math.random() - 0.5) * 0.025
        ),
        initialPos: new THREE.Vector3(x, y, z),
        radius,
        phase: Math.random() * Math.PI * 2
      });
    }
    mainGroup.add(beanGroup);

    // 4. Moving Chai Seeds (Cardamom Pods & Spices) & Tea Leaves
    const seedsGroup = new THREE.Group();
    const seeds: {
      mesh: THREE.Mesh;
      speed: number;
      rotSpeed: THREE.Vector3;
      initialPos: THREE.Vector3;
      phase: number;
    }[] = [];

    // Chai seeds
    const totalSeeds = 18;
    for (let i = 0; i < totalSeeds; i++) {
      const seedMesh = createChaiSeedMesh();
      const x = -4.5 + Math.random() * 4.0;
      const y = -1.8 + Math.random() * 4.2;
      const z = -1.0 + Math.random() * 3.5;

      seedMesh.position.set(x, y, z);
      seedMesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);
      const scale = 0.6 + Math.random() * 0.6;
      seedMesh.scale.set(scale, scale, scale);

      seedsGroup.add(seedMesh);
      seeds.push({
        mesh: seedMesh,
        speed: 0.3 + Math.random() * 0.4,
        rotSpeed: new THREE.Vector3(
          (Math.random() - 0.5) * 0.04,
          (Math.random() - 0.5) * 0.04,
          (Math.random() - 0.5) * 0.03
        ),
        initialPos: new THREE.Vector3(x, y, z),
        phase: Math.random() * Math.PI * 2
      });
    }

    // Tea leaf shards
    const totalLeaves = 16;
    for (let i = 0; i < totalLeaves; i++) {
      const leafMesh = createTeaLeafMesh();
      const x = -3.8 + Math.random() * 7.6;
      const y = -2.0 + Math.random() * 4.5;
      const z = -1.5 + Math.random() * 3.0;

      leafMesh.position.set(x, y, z);
      leafMesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);
      const scale = 0.5 + Math.random() * 0.6;
      leafMesh.scale.set(scale, scale, scale);

      seedsGroup.add(leafMesh);
      seeds.push({
        mesh: leafMesh,
        speed: 0.2 + Math.random() * 0.35,
        rotSpeed: new THREE.Vector3(
          (Math.random() - 0.5) * 0.025,
          (Math.random() - 0.5) * 0.025,
          (Math.random() - 0.5) * 0.02
        ),
        initialPos: new THREE.Vector3(x, y, z),
        phase: Math.random() * Math.PI * 2
      });
    }
    mainGroup.add(seedsGroup);

    // 5. Outing Splash Chai Droplets Particles System (Airborne mist & flying drops)
    const chaiDropletTex = createChaiDropletTexture();
    const dropletCount = 28;
    const dropletGeom = new THREE.BufferGeometry();
    const dropletPositions = new Float32Array(dropletCount * 3);
    const dropletData: {
      x: number;
      y: number;
      z: number;
      vx: number;
      vy: number;
      vz: number;
      life: number;
      maxLife: number;
    }[] = [];

    for (let i = 0; i < dropletCount; i++) {
      const angle = (i / dropletCount) * Math.PI * 1.5 - 0.3;
      const speed = 0.015 + Math.random() * 0.025;
      const px = -2.0 + Math.cos(angle) * (0.3 + Math.random() * 0.6);
      const py = 0.9 + Math.random() * 1.6;
      const pz = 0.6 + Math.sin(angle) * (0.3 + Math.random() * 0.5);

      dropletPositions[i * 3] = px;
      dropletPositions[i * 3 + 1] = py;
      dropletPositions[i * 3 + 2] = pz;

      dropletData.push({
        x: px,
        y: py,
        z: pz,
        vx: Math.cos(angle) * speed,
        vy: 0.01 + Math.random() * 0.02,
        vz: Math.sin(angle) * speed * 0.5,
        life: Math.random() * 60,
        maxLife: 60 + Math.random() * 40
      });
    }

    dropletGeom.setAttribute('position', new THREE.BufferAttribute(dropletPositions, 3));
    const dropletMat = new THREE.PointsMaterial({
      size: 0.35,
      map: chaiDropletTex,
      transparent: true,
      opacity: 0.85,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const dropletPoints = new THREE.Points(dropletGeom, dropletMat);
    mainGroup.add(dropletPoints);

    // 6. Rising Aromatic Chai & Coffee Steam
    const steamTexture = createSteamTexture();
    const steamCount = 42;
    const steamGeom = new THREE.BufferGeometry();
    const steamPositions = new Float32Array(steamCount * 3);
    const steamData: {
      x: number;
      y: number;
      z: number;
      vy: number;
      vx: number;
      originX: number;
      originY: number;
      originZ: number;
    }[] = [];

    for (let i = 0; i < steamCount; i++) {
      const isChai = i % 2 === 0;
      const baseX = isChai ? -2.0 : 2.0;
      const baseY = isChai ? 1.0 : 1.3;
      const baseZ = isChai ? 0.6 : -0.1;

      const px = baseX + (Math.random() - 0.5) * 0.5;
      const py = baseY + Math.random() * 2.2;
      const pz = baseZ + (Math.random() - 0.5) * 0.5;

      steamPositions[i * 3] = px;
      steamPositions[i * 3 + 1] = py;
      steamPositions[i * 3 + 2] = pz;

      steamData.push({
        x: px,
        y: py,
        z: pz,
        vy: 0.009 + Math.random() * 0.014,
        vx: (Math.random() - 0.5) * 0.005,
        originX: baseX,
        originY: baseY,
        originZ: baseZ
      });
    }

    steamGeom.setAttribute('position', new THREE.BufferAttribute(steamPositions, 3));
    const steamMat = new THREE.PointsMaterial({
      size: 1.6,
      map: steamTexture,
      transparent: true,
      opacity: 0.5,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const steamPoints = new THREE.Points(steamGeom, steamMat);
    mainGroup.add(steamPoints);

    // 7. Ambient Warm Golden Aroma Embers
    const emberCount = 65;
    const emberGeom = new THREE.BufferGeometry();
    const emberPositions = new Float32Array(emberCount * 3);
    for (let i = 0; i < emberCount; i++) {
      emberPositions[i * 3] = (Math.random() - 0.5) * 16;
      emberPositions[i * 3 + 1] = (Math.random() - 0.5) * 12;
      emberPositions[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    emberGeom.setAttribute('position', new THREE.BufferAttribute(emberPositions, 3));
    const emberMat = new THREE.PointsMaterial({
      size: 0.12,
      color: 0xf5caa0,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
    });
    const emberPoints = new THREE.Points(emberGeom, emberMat);
    scene.add(emberPoints);

    // Mouse Interaction
    let targetMouseX = 0;
    let targetMouseY = 0;
    let currentMouseX = 0;
    let currentMouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      targetMouseX = (x - 0.5) * 2;
      targetMouseY = (y - 0.5) * 2;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Scroll Integration
    let scrollY = 0;
    const handleScroll = () => {
      scrollY = window.scrollY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      if (width < 768) {
        camera.position.z = 11.8;
      } else {
        camera.position.z = 8.6;
      }
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse interpolation
      currentMouseX += (targetMouseX - currentMouseX) * 0.05;
      currentMouseY += (targetMouseY - currentMouseY) * 0.05;

      // Scroll effect: move camera smoothly
      const scrollFactor = Math.min(scrollY / (window.innerHeight || 1), 1.5);
      camera.position.y = 1.1 - scrollFactor * 0.7 + currentMouseY * 0.2;
      camera.position.x = currentMouseX * 0.4;
      camera.lookAt(0, 0, 0);

      // 1. Faceted Cutting Chai Glass Dynamic Float & Splash Reaction (Left side)
      chaiGroup.rotation.y = 0.45 + Math.sin(elapsedTime * 0.9) * 0.12 + currentMouseX * 0.12;
      chaiGroup.rotation.z = -0.12 + Math.cos(elapsedTime * 1.1) * 0.05 - currentMouseY * 0.05;
      chaiGroup.position.y = -0.4 + Math.sin(elapsedTime * 1.3) * 0.08 - scrollFactor * 0.2;

      // Dynamic Chai Outing Splash Ripple & Undulation
      splashGroup.rotation.y = Math.sin(elapsedTime * 1.5) * 0.15;
      splashGroup.scale.set(
        1.0 + Math.sin(elapsedTime * 2.2) * 0.08,
        1.0 + Math.cos(elapsedTime * 2.8) * 0.1,
        1.0 + Math.sin(elapsedTime * 2.5) * 0.08
      );

      // Jiggle flying individual splash droplets
      splashDroplets.forEach((drop, idx) => {
        drop.position.y += Math.sin(elapsedTime * 3.5 + idx) * 0.003;
        drop.rotation.x += 0.02;
        drop.rotation.y += 0.03;
      });

      // 2. Frappe Coffee Cup Movement (Right side)
      coffeeGroup.rotation.y = -0.4 + Math.cos(elapsedTime * 0.8) * 0.1 - currentMouseX * 0.12;
      coffeeGroup.rotation.z = 0.08 + Math.sin(elapsedTime * 1.0) * 0.04;
      coffeeGroup.position.y = -0.6 + Math.cos(elapsedTime * 1.2) * 0.08 - scrollFactor * 0.2;
      coffeeGroup.position.z = 0.1 + currentMouseY * 0.1;

      // 3. Moving Coffee Beans (Tumbling, rotating, floating across depths)
      beans.forEach((b, idx) => {
        b.mesh.rotation.x += b.rotSpeed.x;
        b.mesh.rotation.y += b.rotSpeed.y;
        b.mesh.rotation.z += b.rotSpeed.z;

        // Circular orbit drift + vertical oscillation
        const curAngle = b.phase + elapsedTime * (b.speed * 0.2);
        b.mesh.position.x = Math.cos(curAngle) * b.radius + currentMouseX * 0.2;
        b.mesh.position.y = b.initialPos.y + Math.sin(elapsedTime * b.speed + idx) * 0.35 - currentMouseY * 0.15;
        b.mesh.position.z = Math.sin(curAngle) * (b.radius * 0.4) + b.initialPos.z;
      });

      // 4. Moving Chai Seeds & Tea Leaves (Fluid swirl)
      seeds.forEach((s, idx) => {
        s.mesh.rotation.x += s.rotSpeed.x;
        s.mesh.rotation.y += s.rotSpeed.y;
        s.mesh.rotation.z += s.rotSpeed.z;

        s.mesh.position.y = s.initialPos.y + Math.sin(elapsedTime * s.speed + idx * 1.2) * 0.28;
        s.mesh.position.x = s.initialPos.x + Math.cos(elapsedTime * (s.speed * 0.8) + idx) * 0.2 + currentMouseX * 0.15;
      });

      // 5. Chai Outing Droplets Particle Update
      const dropPosAttr = dropletGeom.attributes.position as THREE.BufferAttribute;
      for (let i = 0; i < dropletCount; i++) {
        const d = dropletData[i];
        d.x += d.vx;
        d.y += d.vy;
        d.z += d.vz;
        d.vy -= 0.0004; // gravity pulling drops into arched trajectories
        d.life += 1;

        if (d.life > d.maxLife || d.y < 0.2) {
          const angle = (i / dropletCount) * Math.PI * 1.5 - 0.3;
          const speed = 0.012 + Math.random() * 0.022;
          d.x = -2.0 + Math.cos(angle) * (0.2 + Math.random() * 0.4);
          d.y = 0.9 + Math.random() * 0.4;
          d.z = 0.6 + Math.sin(angle) * (0.2 + Math.random() * 0.3);
          d.vx = Math.cos(angle) * speed;
          d.vy = 0.012 + Math.random() * 0.018;
          d.vz = Math.sin(angle) * speed * 0.5;
          d.life = 0;
        }

        dropPosAttr.setXYZ(i, d.x, d.y, d.z);
      }
      dropPosAttr.needsUpdate = true;

      // 6. Rising Steam Update
      const steamPosAttr = steamGeom.attributes.position as THREE.BufferAttribute;
      for (let i = 0; i < steamCount; i++) {
        const item = steamData[i];
        item.y += item.vy;
        item.x += item.vx + Math.sin(elapsedTime * 2.2 + i) * 0.003;

        const maxH = 3.2;
        if (item.y > maxH) {
          item.y = item.originY;
          item.x = item.originX + (Math.random() - 0.5) * 0.4;
          item.z = item.originZ + (Math.random() - 0.5) * 0.4;
        }

        steamPosAttr.setXYZ(i, item.x, item.y, item.z);
      }
      steamPosAttr.needsUpdate = true;

      // 7. Ambient Ember Drift
      emberPoints.rotation.y = elapsedTime * 0.025;
      emberPoints.rotation.x = Math.sin(elapsedTime * 0.015) * 0.05;

      // Dynamic golden specular intensity
      goldRimLight.intensity = (activeBrightness === 'vibrant' ? 5.0 : activeBrightness === 'moody' ? 2.8 : 3.8) + Math.sin(elapsedTime * 1.8) * 0.6;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [activeBrightness]);

  if (!webglSupported) {
    return (
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none flex items-center justify-center">
        <div className="w-full h-full bg-vignette opacity-85" />
      </div>
    );
  }

  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      {/* 3D WebGL Canvas Layer */}
      <div
        ref={containerRef}
        className="absolute inset-0 pointer-events-none opacity-95 transition-opacity duration-1000"
        style={{ touchAction: 'pan-y' }}
        aria-hidden="true"
      />

      {/* Atmospheric lighting gradient overlay to ensure perfect readability */}
      <div
        className={`absolute inset-0 pointer-events-none transition-all duration-700 ${
          activeBrightness === 'vibrant'
            ? 'bg-gradient-to-t from-[#050504] via-[#050504]/30 to-[#050504]/60'
            : activeBrightness === 'moody'
            ? 'bg-gradient-to-t from-[#050504] via-[#050504]/70 to-[#050504]/85'
            : 'bg-gradient-to-t from-[#050504] via-[#050504]/50 to-[#050504]/75'
        }`}
      />
    </div>
  );
};

