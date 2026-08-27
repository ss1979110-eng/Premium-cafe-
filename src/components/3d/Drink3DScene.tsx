import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { createIceCubeMesh, createTeaLeafMesh } from './ThreeHelpers';

export const Drink3DScene: React.FC = () => {
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
    camera.position.set(0, 0.4, 5.0);

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

    // Lighting (Warm ambient + Deep Forest Green rim & Emerald highlights)
    const ambientLight = new THREE.AmbientLight(0x241510, 1.8);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xe8d8c3, 3);
    keyLight.position.set(3, 4, 3);
    scene.add(keyLight);

    const greenRim = new THREE.SpotLight(0x123f2e, 8, 16, Math.PI / 3, 0.5, 1);
    greenRim.position.set(-3, 3, -2);
    greenRim.lookAt(0, 0, 0);
    scene.add(greenRim);

    const drinkGroup = new THREE.Group();
    scene.add(drinkGroup);

    // 1. Tall Highball Glass
    const glassPoints: THREE.Vector2[] = [];
    glassPoints.push(new THREE.Vector2(0, 0));
    glassPoints.push(new THREE.Vector2(0.9, 0));
    glassPoints.push(new THREE.Vector2(1.0, 0.2));
    glassPoints.push(new THREE.Vector2(1.15, 2.5));
    glassPoints.push(new THREE.Vector2(1.18, 2.6));
    glassPoints.push(new THREE.Vector2(1.12, 2.6));
    glassPoints.push(new THREE.Vector2(1.08, 2.5));
    glassPoints.push(new THREE.Vector2(0.95, 0.25));
    glassPoints.push(new THREE.Vector2(0, 0.2));

    const glassGeom = new THREE.LatheGeometry(glassPoints, 32);
    const glassMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transmission: 0.92,
      opacity: 1,
      transparent: true,
      roughness: 0.1,
      ior: 1.5,
      thickness: 0.5,
    });
    const glassMesh = new THREE.Mesh(glassGeom, glassMat);
    glassMesh.position.y = -1.2;
    drinkGroup.add(glassMesh);

    // 2. Liquid inside Glass (Cool Emerald / Mint Mojito hue)
    const liquidGeom = new THREE.CylinderGeometry(1.05, 0.92, 2.1, 32);
    const liquidMat = new THREE.MeshStandardMaterial({
      color: 0x0e4733, // Deep vibrant emerald liquid
      roughness: 0.2,
      metalness: 0.2,
      transparent: true,
      opacity: 0.85,
    });
    const liquidMesh = new THREE.Mesh(liquidGeom, liquidMat);
    liquidMesh.position.y = -0.1;
    drinkGroup.add(liquidMesh);

    // 3. Floating Ice Cubes inside & around
    const iceCubes: { mesh: THREE.Mesh; initY: number; speed: number; rotSpeed: THREE.Vector3 }[] = [];
    for (let i = 0; i < 4; i++) {
      const cube = createIceCubeMesh();
      cube.position.set((Math.random() - 0.5) * 0.9, -0.4 + i * 0.45, (Math.random() - 0.5) * 0.9);
      cube.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);
      cube.scale.set(0.65, 0.65, 0.65);
      drinkGroup.add(cube);
      iceCubes.push({
        mesh: cube,
        initY: cube.position.y,
        speed: 0.5 + Math.random() * 0.5,
        rotSpeed: new THREE.Vector3(0.005, 0.008, 0.004)
      });
    }

    // 4. Floating Mint Leaves
    const mintLeaves: { mesh: THREE.Mesh; angle: number; radius: number; y: number }[] = [];
    for (let i = 0; i < 5; i++) {
      const mint = createTeaLeafMesh();
      const radius = 1.3 + Math.random() * 0.6;
      const angle = (i / 5) * Math.PI * 2;
      const y = -0.5 + Math.random() * 1.5;

      mint.position.set(Math.cos(angle) * radius, y, Math.sin(angle) * radius);
      mint.scale.set(0.6, 0.6, 0.6);
      drinkGroup.add(mint);

      mintLeaves.push({
        mesh: mint,
        angle: angle,
        radius: radius,
        y: y
      });
    }

    // 5. Lime Slice Wheel
    const limeGeom = new THREE.CylinderGeometry(0.55, 0.55, 0.06, 24);
    const limeMat = new THREE.MeshStandardMaterial({
      color: 0x85bb2f,
      roughness: 0.4,
    });
    const limeMesh = new THREE.Mesh(limeGeom, limeMat);
    limeMesh.position.set(0.9, 1.35, 0);
    limeMesh.rotation.z = Math.PI / 3;
    drinkGroup.add(limeMesh);

    // 6. Sparkling Bubbles
    const bubbleCount = 24;
    const bubbleGeom = new THREE.BufferGeometry();
    const bubblePositions = new Float32Array(bubbleCount * 3);
    const bubbleMeta: { x: number; y: number; z: number; vy: number }[] = [];

    for (let i = 0; i < bubbleCount; i++) {
      const px = (Math.random() - 0.5) * 0.8;
      const py = -1.0 + Math.random() * 2.0;
      const pz = (Math.random() - 0.5) * 0.8;

      bubblePositions[i * 3] = px;
      bubblePositions[i * 3 + 1] = py;
      bubblePositions[i * 3 + 2] = pz;

      bubbleMeta.push({
        x: px,
        y: py,
        z: pz,
        vy: 0.006 + Math.random() * 0.008
      });
    }
    bubbleGeom.setAttribute('position', new THREE.BufferAttribute(bubblePositions, 3));
    const bubbleMat = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.09,
      transparent: true,
      opacity: 0.75,
    });
    const bubblePoints = new THREE.Points(bubbleGeom, bubbleMat);
    drinkGroup.add(bubblePoints);

    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    let animId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      // Drink group continuous smooth 360 rotation and float
      drinkGroup.rotation.y = t * 0.35;
      drinkGroup.rotation.x = Math.sin(t * 1.1) * 0.05;
      drinkGroup.rotation.z = Math.cos(t * 0.8) * 0.03;
      drinkGroup.position.y = Math.sin(t * 1.4) * 0.07;

      // Ice bobbing
      iceCubes.forEach((cube) => {
        cube.mesh.position.y = cube.initY + Math.sin(t * cube.speed) * 0.06;
        cube.mesh.rotation.x += cube.rotSpeed.x;
        cube.mesh.rotation.y += cube.rotSpeed.y;
      });

      // Floating mint leaves
      mintLeaves.forEach((mint) => {
        mint.angle += 0.012;
        mint.mesh.position.x = Math.cos(mint.angle) * mint.radius;
        mint.mesh.position.z = Math.sin(mint.angle) * mint.radius;
        mint.mesh.position.y = mint.y + Math.sin(t * 1.8 + mint.angle) * 0.14;
        mint.mesh.rotation.y += 0.02;
        mint.mesh.rotation.x += 0.01;
      });

      // Bubbles rising
      const pos = bubbleGeom.attributes.position as THREE.BufferAttribute;
      for (let i = 0; i < bubbleCount; i++) {
        const b = bubbleMeta[i];
        b.y += b.vy;
        if (b.y > 0.95) {
          b.y = -1.0;
          b.x = (Math.random() - 0.5) * 0.8;
          b.z = (Math.random() - 0.5) * 0.8;
        }
        pos.setXYZ(i, b.x, b.y, b.z);
      }
      pos.needsUpdate = true;

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
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
      className="w-full h-full min-h-[380px] lg:min-h-[460px] relative pointer-events-auto"
      aria-hidden="true"
    />
  );
};
