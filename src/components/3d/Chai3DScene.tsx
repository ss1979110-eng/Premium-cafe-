import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import {
  createPizzaMesh,
  createBasilLeafMesh,
  createChilliFlakeMesh,
  createOreganoHerbMesh,
  createSteamTexture,
} from './ThreeHelpers';

export const Chai3DScene: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      36,
      container.clientWidth / container.clientHeight,
      0.1,
      50
    );
    // Position camera with an elevated perspective to view the pizza surface clearly
    camera.position.set(0, 2.2, 5.0);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.3;
    container.appendChild(renderer.domElement);

    // Warm Wood-Fired Oven Lighting Setup
    const ambientLight = new THREE.AmbientLight(0x3a2012, 2.2);
    scene.add(ambientLight);

    // Top warm golden spotlight onto the pizza cheese
    const ovenSpot = new THREE.SpotLight(0xffecd0, 6.0, 20, Math.PI / 3.5, 0.45, 1);
    ovenSpot.position.set(2.5, 6, 4);
    ovenSpot.castShadow = true;
    scene.add(ovenSpot);

    // Amber wood-fired oven glow from side
    const fireGlow = new THREE.PointLight(0xff7722, 5.0, 15);
    fireGlow.position.set(-3.5, 1.5, 1.5);
    scene.add(fireGlow);

    // Forest green accent rim light for culinary elegance
    const rimLight = new THREE.SpotLight(0x0b3024, 7.0, 18, Math.PI / 3, 0.5, 1);
    rimLight.position.set(3, 2, -3);
    rimLight.lookAt(0, 0, 0);
    scene.add(rimLight);

    // 3D Wood-Fired Pizza with High Quality Pizza Photo Texture
    const pizzaPhotoUrl =
      'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1000&q=80';
    const { group: pizzaGroup } = createPizzaMesh(pizzaPhotoUrl);
    pizzaGroup.position.set(0, -0.2, 0);
    // Angle pizza slightly toward the camera for maximum delicious visibility
    pizzaGroup.rotation.x = 0.42;
    pizzaGroup.scale.set(1.08, 1.08, 1.08);
    scene.add(pizzaGroup);

    // Orbiting 3D Basil Leaves, Chilli Flakes & Oregano Herbs
    const seasoningsGroup = new THREE.Group();
    const floatingElements: {
      mesh: THREE.Mesh;
      orbitRadius: number;
      speed: number;
      angle: number;
      baseY: number;
      rotX: number;
      rotY: number;
      rotZ: number;
    }[] = [];

    // Add fresh basil leaves
    for (let i = 0; i < 6; i++) {
      const basil = createBasilLeafMesh();
      const radius = 1.7 + Math.random() * 0.9;
      const angle = (i / 6) * Math.PI * 2;
      const y = -0.3 + Math.random() * 1.5;

      basil.position.set(Math.cos(angle) * radius, y, Math.sin(angle) * radius);
      basil.scale.set(0.7, 0.7, 0.7);
      seasoningsGroup.add(basil);

      floatingElements.push({
        mesh: basil,
        orbitRadius: radius,
        speed: 0.35 + Math.random() * 0.25,
        angle: angle,
        baseY: y,
        rotX: 0.015 + Math.random() * 0.02,
        rotY: 0.02 + Math.random() * 0.02,
        rotZ: 0.01 + Math.random() * 0.015,
      });
    }

    // Add fiery red chilli flakes
    for (let i = 0; i < 8; i++) {
      const flake = createChilliFlakeMesh();
      const radius = 1.5 + Math.random() * 0.8;
      const angle = (i / 8) * Math.PI * 2 + 0.5;
      const y = -0.2 + Math.random() * 1.4;

      flake.position.set(Math.cos(angle) * radius, y, Math.sin(angle) * radius);
      flake.scale.set(0.85, 0.85, 0.85);
      seasoningsGroup.add(flake);

      floatingElements.push({
        mesh: flake,
        orbitRadius: radius,
        speed: 0.45 + Math.random() * 0.3,
        angle: angle,
        baseY: y,
        rotX: 0.03 + Math.random() * 0.02,
        rotY: 0.035 + Math.random() * 0.02,
        rotZ: 0.02 + Math.random() * 0.02,
      });
    }

    // Add oregano herb flecks
    for (let i = 0; i < 8; i++) {
      const oregano = createOreganoHerbMesh();
      const radius = 1.3 + Math.random() * 0.9;
      const angle = (i / 8) * Math.PI * 2 + 0.9;
      const y = -0.1 + Math.random() * 1.3;

      oregano.position.set(Math.cos(angle) * radius, y, Math.sin(angle) * radius);
      oregano.scale.set(1.1, 1.1, 1.1);
      seasoningsGroup.add(oregano);

      floatingElements.push({
        mesh: oregano,
        orbitRadius: radius,
        speed: 0.4 + Math.random() * 0.3,
        angle: angle,
        baseY: y,
        rotX: 0.02 + Math.random() * 0.02,
        rotY: 0.025 + Math.random() * 0.02,
        rotZ: 0.02 + Math.random() * 0.02,
      });
    }

    scene.add(seasoningsGroup);

    // Rising Oven Steam / Hot Melted Cheese Aroma Particles
    const steamTexture = createSteamTexture();
    const steamCount = 36;
    const steamGeom = new THREE.BufferGeometry();
    const positions = new Float32Array(steamCount * 3);
    const steamMeta: { x: number; y: number; z: number; vy: number; vx: number }[] = [];

    for (let i = 0; i < steamCount; i++) {
      const px = (Math.random() - 0.5) * 1.2;
      const py = 0.2 + Math.random() * 1.8;
      const pz = (Math.random() - 0.5) * 1.2;

      positions[i * 3] = px;
      positions[i * 3 + 1] = py;
      positions[i * 3 + 2] = pz;

      steamMeta.push({
        x: px,
        y: py,
        z: pz,
        vy: 0.008 + Math.random() * 0.012,
        vx: (Math.random() - 0.5) * 0.004,
      });
    }
    steamGeom.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const steamMat = new THREE.PointsMaterial({
      size: 1.45,
      map: steamTexture,
      transparent: true,
      opacity: 0.45,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const steamPoints = new THREE.Points(steamGeom, steamMat);
    scene.add(steamPoints);

    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    let animationId: number;
    const clock = new THREE.Clock();

    // Autonomous continuous 360-degree animation loop - ALWAYS ACTIVE
    const animate = () => {
      animationId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      // Continuous auto-rotation & gentle floating of the pizza platter
      pizzaGroup.rotation.y = t * 0.38;
      pizzaGroup.rotation.x = 0.42 + Math.sin(t * 1.1) * 0.05;
      pizzaGroup.position.y = -0.2 + Math.sin(t * 1.4) * 0.05;

      // Orbiting Basil Leaves, Chilli Flakes & Herbs tumbling in air
      floatingElements.forEach((el) => {
        el.angle += 0.01 * el.speed;
        el.mesh.position.x = Math.cos(el.angle) * el.orbitRadius;
        el.mesh.position.z = Math.sin(el.angle) * el.orbitRadius;
        el.mesh.position.y = el.baseY + Math.sin(t * 2.0 + el.angle) * 0.16;
        el.mesh.rotation.y += el.rotY;
        el.mesh.rotation.x += el.rotX;
        el.mesh.rotation.z += el.rotZ;
      });

      // Steam continuous ascent animation
      const pos = steamGeom.attributes.position as THREE.BufferAttribute;
      for (let i = 0; i < steamCount; i++) {
        const s = steamMeta[i];
        s.y += s.vy;
        s.x += s.vx + Math.sin(t * 2.2 + i) * 0.002;

        if (s.y > 2.6) {
          s.y = 0.2;
          s.x = (Math.random() - 0.5) * 1.2;
          s.z = (Math.random() - 0.5) * 1.2;
        }
        pos.setXYZ(i, s.x, s.y, s.z);
      }
      pos.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="w-full h-full min-h-[380px] lg:min-h-[480px] relative pointer-events-auto"
      aria-hidden="true"
    />
  );
};
