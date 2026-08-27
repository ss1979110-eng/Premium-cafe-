import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { createCoffeeCup, createCoffeeBeanMesh, createSteamTexture } from './ThreeHelpers';

export const Coffee3DScene: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      38,
      container.clientWidth / container.clientHeight,
      0.1,
      50
    );
    camera.position.set(0, 0.9, 5.2);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    container.appendChild(renderer.domElement);

    // Warm Coffee Roast lighting & Deep Forest Green rim light
    const ambientLight = new THREE.AmbientLight(0x3a2215, 2.0);
    scene.add(ambientLight);

    const warmLight = new THREE.SpotLight(0xffe2b8, 5, 18, Math.PI / 4, 0.4, 1);
    warmLight.position.set(-3, 6, 5);
    scene.add(warmLight);

    const greenRim = new THREE.SpotLight(0x123f2e, 8, 20, Math.PI / 3, 0.4, 1);
    greenRim.position.set(3.5, 3.5, -3);
    greenRim.lookAt(0, 0, 0);
    scene.add(greenRim);

    const chocolateGlow = new THREE.PointLight(0xd49b6a, 4, 12);
    chocolateGlow.position.set(0, -1, 2.5);
    scene.add(chocolateGlow);

    // Coffee Cup Group
    const coffeeCup = createCoffeeCup();
    coffeeCup.position.set(0, -0.7, 0);
    coffeeCup.scale.set(1.18, 1.18, 1.18);
    scene.add(coffeeCup);

    // Orbiting 3D Coffee Beans
    const beansGroup = new THREE.Group();
    const beans: {
      mesh: THREE.Mesh;
      orbitRadius: number;
      speed: number;
      angle: number;
      baseY: number;
      rotX: number;
      rotY: number;
      rotZ: number;
    }[] = [];

    for (let i = 0; i < 11; i++) {
      const bean = createCoffeeBeanMesh();
      const radius = 1.4 + Math.random() * 1.2;
      const angle = (i / 11) * Math.PI * 2;
      const y = -0.6 + Math.random() * 1.9;

      bean.position.set(Math.cos(angle) * radius, y, Math.sin(angle) * radius);
      const s = 0.65 + Math.random() * 0.45;
      bean.scale.set(s, s, s);
      beansGroup.add(bean);

      beans.push({
        mesh: bean,
        orbitRadius: radius,
        speed: 0.35 + Math.random() * 0.35,
        angle: angle,
        baseY: y,
        rotX: 0.02 + Math.random() * 0.025,
        rotY: 0.025 + Math.random() * 0.025,
        rotZ: 0.015 + Math.random() * 0.02,
      });
    }
    scene.add(beansGroup);

    // Rising Coffee Steam Particles
    const steamTexture = createSteamTexture();
    const steamCount = 32;
    const steamGeom = new THREE.BufferGeometry();
    const positions = new Float32Array(steamCount * 3);
    const steamMeta: { x: number; y: number; z: number; vy: number; vx: number }[] = [];

    for (let i = 0; i < steamCount; i++) {
      const px = (Math.random() - 0.5) * 0.35;
      const py = 0.9 + Math.random() * 1.6;
      const pz = (Math.random() - 0.5) * 0.35;

      positions[i * 3] = px;
      positions[i * 3 + 1] = py;
      positions[i * 3 + 2] = pz;

      steamMeta.push({
        x: px,
        y: py,
        z: pz,
        vy: 0.008 + Math.random() * 0.012,
        vx: (Math.random() - 0.5) * 0.003,
      });
    }
    steamGeom.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const steamMat = new THREE.PointsMaterial({
      size: 1.25,
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

    // Autonomous continuous 360-degree animation loop - ALWAYS ACTIVE without requiring cursor
    const animate = () => {
      animationId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      // Continuous auto-rotation & gentle natural floating
      coffeeCup.rotation.y = -t * 0.4;
      coffeeCup.rotation.x = Math.sin(t * 1.1) * 0.05;
      coffeeCup.rotation.z = Math.cos(t * 0.8) * 0.03;
      coffeeCup.position.y = -0.7 + Math.sin(t * 1.4) * 0.05;

      // Orbiting Coffee Beans continuously floating and tumbling
      beans.forEach((b) => {
        b.angle -= 0.011 * b.speed;
        b.mesh.position.x = Math.cos(b.angle) * b.orbitRadius;
        b.mesh.position.z = Math.sin(b.angle) * b.orbitRadius;
        b.mesh.position.y = b.baseY + Math.sin(t * 2.0 + b.angle) * 0.16;
        b.mesh.rotation.y += b.rotY;
        b.mesh.rotation.x += b.rotX;
        b.mesh.rotation.z += b.rotZ;
      });

      // Steam animation
      const pos = steamGeom.attributes.position as THREE.BufferAttribute;
      for (let i = 0; i < steamCount; i++) {
        const s = steamMeta[i];
        s.y += s.vy;
        s.x += s.vx + Math.sin(t * 2.2 + i) * 0.002;

        if (s.y > 3.0) {
          s.y = 0.9;
          s.x = (Math.random() - 0.5) * 0.35;
          s.z = (Math.random() - 0.5) * 0.35;
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
