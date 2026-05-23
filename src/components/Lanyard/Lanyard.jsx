'use client';

import { useEffect, useRef, useState } from 'react';
import { Canvas, extend, useFrame } from '@react-three/fiber';
import { useGLTF, useTexture, Environment, Lightformer } from '@react-three/drei';
import { BallCollider, CuboidCollider, Physics, RigidBody, useRopeJoint, useSphericalJoint } from '@react-three/rapier';
import { MeshLineGeometry, MeshLineMaterial } from 'meshline';
import * as THREE from 'three';

// 🧩 Ganti import glb menjadi path dari public/
const cardGLB = `${import.meta.env.BASE_URL || '/'}models/card.glb`;
// 🧩 Tetap bisa pakai png dari src
import lanyard from '../../assets/Lanyard/lanyard.png';
import pfpImage from '../../assets/images/Pfp.png';

extend({ MeshLineGeometry, MeshLineMaterial });

export default function Lanyard({ position = [0, 0, 30], gravity = [0, -40, 0], fov = 20, transparent = true }) {
  return (
    <div className="relative z-0 w-full h-screen flex justify-center items-center transform scale-100 origin-center">
      <Canvas
        camera={{ position: position, fov: fov }}
        gl={{ alpha: transparent }}
        onCreated={({ gl }) => gl.setClearColor(new THREE.Color(0x000000), transparent ? 0 : 1)}
      >
        <ambientLight intensity={Math.PI} />
        <Physics gravity={gravity} timeStep={1 / 60}>
          <Band />
        </Physics>
        <Environment blur={0.75}>
          <Lightformer intensity={2} color="white" position={[0, -1, 5]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
          <Lightformer intensity={3} color="white" position={[-1, -1, 1]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
          <Lightformer intensity={3} color="white" position={[1, 1, 1]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
          <Lightformer intensity={10} color="white" position={[-10, 0, 14]} rotation={[0, Math.PI / 2, Math.PI / 3]} scale={[100, 10, 1]} />
        </Environment>
      </Canvas>
    </div>
  );
}

function Band({ maxSpeed = 50, minSpeed = 0 }) {
  const band = useRef(), fixed = useRef(), j1 = useRef(), j2 = useRef(), j3 = useRef(), card = useRef();
  const vec = new THREE.Vector3(), ang = new THREE.Vector3(), rot = new THREE.Vector3(), dir = new THREE.Vector3();
  const segmentProps = { type: 'dynamic', canSleep: true, colliders: false, angularDamping: 4, linearDamping: 4 };

  const { nodes, materials } = useGLTF(cardGLB);
  
  // Safe geometry and materials from card.glb
  const cardGeometry = nodes?.card?.geometry || new THREE.BoxGeometry(0.8, 1.125, 0.01);
  const cardMaterial = materials?.base || new THREE.MeshPhysicalMaterial({ color: '#888' });
  const clipGeometry = nodes?.clip?.geometry || new THREE.BoxGeometry(0.1, 0.1, 0.1);
  const clipMaterial = materials?.metal || new THREE.MeshPhysicalMaterial({ color: '#555' });
  const clampGeometry = nodes?.clamp?.geometry || new THREE.BoxGeometry(0.1, 0.1, 0.1);
  const clampMaterial = materials?.metal || new THREE.MeshPhysicalMaterial({ color: '#555' });

  const [customCardTexture, setCustomCardTexture] = useState(null);

  useEffect(() => {
    const img = new Image();
    img.src = pfpImage;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 512;
      canvas.height = 768;
      const ctx = canvas.getContext('2d');
      
      // Draw background: sleek carbon dark black
      ctx.fillStyle = '#050508';
      ctx.fillRect(0, 0, 512, 768);
      
      // Subtle background grid
      ctx.strokeStyle = 'rgba(0, 255, 220, 0.08)';
      ctx.lineWidth = 1;
      for (let i = 0; i < 512; i += 32) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, 768);
        ctx.stroke();
      }
      for (let j = 0; j < 768; j += 32) {
        ctx.beginPath();
        ctx.moveTo(0, j);
        ctx.lineTo(512, j);
        ctx.stroke();
      }
      
      // Outer border with neon glowing cyber gradient
      const grad = ctx.createLinearGradient(0, 0, 512, 768);
      grad.addColorStop(0, '#00ffdc');
      grad.addColorStop(0.5, '#4079ff');
      grad.addColorStop(1, '#00ffaac4');
      ctx.strokeStyle = grad;
      ctx.lineWidth = 14;
      ctx.strokeRect(7, 7, 498, 754);
      
      // Draw huge rotated vertical "UJJWAL" text on the right side
      ctx.save();
      ctx.translate(435, 384);
      ctx.rotate(Math.PI / 2);
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 78px "Moderniz", sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('UJJWAL', 0, 0);
      ctx.restore();

      // Top logo bar
      ctx.fillStyle = '#00ffdc';
      ctx.font = 'bold 22px "Cascadia Code", monospace';
      ctx.fillText('⚡ DEVOPS INFRA', 36, 60);

      // Draw rounded profile photo frame
      ctx.save();
      const pfpSize = 250;
      const pfpX = 50;
      const pfpY = 120;
      
      // Draw circular clip path
      ctx.beginPath();
      ctx.arc(pfpX + pfpSize / 2, pfpY + pfpSize / 2, pfpSize / 2, 0, Math.PI * 2);
      ctx.closePath();
      ctx.clip();
      
      // Draw profile image
      ctx.drawImage(img, pfpX, pfpY, pfpSize, pfpSize);
      ctx.restore();
      
      // Circular glowing border around photo
      ctx.strokeStyle = '#00ffdc';
      ctx.lineWidth = 6;
      ctx.beginPath();
      ctx.arc(pfpX + pfpSize / 2, pfpY + pfpSize / 2, pfpSize / 2, 0, Math.PI * 2);
      ctx.stroke();

      // Bottom pill name badge
      const pillX = 40;
      const pillY = 470;
      const pillW = 280;
      const pillH = 150;
      
      ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
      ctx.beginPath();
      if (typeof ctx.roundRect === 'function') {
        ctx.roundRect(pillX, pillY, pillW, pillH, 20);
      } else {
        ctx.rect(pillX, pillY, pillW, pillH);
      }
      ctx.fill();
      
      // Display "UJJWAL" inside name badge
      ctx.fillStyle = '#000000';
      ctx.font = 'bold 38px "Cascadia Code", monospace';
      ctx.textAlign = 'center';
      ctx.fillText('UJJWAL', pillX + pillW / 2, pillY + 55);
      
      // Sub role pill inside badge
      ctx.fillStyle = '#000000';
      ctx.beginPath();
      if (typeof ctx.roundRect === 'function') {
        ctx.roundRect(pillX + 15, pillY + 80, pillW - 30, 48, 12);
      } else {
        ctx.rect(pillX + 15, pillY + 80, pillW - 30, 48);
      }
      ctx.fill();
      
      ctx.fillStyle = '#00ffdc';
      ctx.font = 'bold 18px "Cascadia Code", monospace';
      ctx.fillText('DEVOPS ENGINEER', pillX + pillW / 2, pillY + 110);
      
      const tex = new THREE.CanvasTexture(canvas);
      tex.wrapS = THREE.RepeatWrapping;
      tex.wrapT = THREE.RepeatWrapping;
      tex.center.set(0.5, 0.5);
      tex.rotation = Math.PI; // Rotate 180 degrees to make it upright
      tex.repeat.set(-1, 1); // Flip horizontally to correct mirroring
      setCustomCardTexture(tex);
    };
  }, []);

  const texture = useTexture(lanyard);
  const [curve] = useState(() => new THREE.CatmullRomCurve3([new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3()]));
  const [dragged, drag] = useState(false);
  const [hovered, hover] = useState(false);
  const [isSmall, setIsSmall] = useState(() => typeof window !== 'undefined' && window.innerWidth < 1024);

  useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 1]);
  useSphericalJoint(j3, card, [[0, 0, 0], [0, 1.50, 0]]);

  useEffect(() => {
    if (hovered) {
      document.body.style.cursor = dragged ? 'grabbing' : 'grab';
      return () => void (document.body.style.cursor = 'auto');
    }
  }, [hovered, dragged]);

  useEffect(() => {
    const handleResize = () => {
      setIsSmall(window.innerWidth < 1024);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useFrame((state, delta) => {
    if (dragged && card.current) {
      vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera);
      dir.copy(vec).sub(state.camera.position).normalize();
      vec.add(dir.multiplyScalar(state.camera.position.length()));
      [card, j1, j2, j3, fixed].forEach((ref) => ref.current?.wakeUp());
      
      if (typeof card.current.setNextKinematicTranslation === 'function') {
        card.current.setNextKinematicTranslation({ x: vec.x - dragged.x, y: vec.y - dragged.y, z: vec.z - dragged.z });
      }
    }
    
    if (fixed.current && j1.current && j2.current && j3.current && card.current) {
      [j1, j2].forEach((ref) => {
        if (!ref.current) return;
        const translation = typeof ref.current.translation === 'function' ? ref.current.translation() : { x: 0, y: 0, z: 0 };
        if (!ref.current.lerped) ref.current.lerped = new THREE.Vector3(translation.x, translation.y, translation.z);
        const currentPos = new THREE.Vector3(translation.x, translation.y, translation.z);
        const clampedDistance = Math.max(0.1, Math.min(1, ref.current.lerped.distanceTo(currentPos)));
        ref.current.lerped.lerp(currentPos, delta * (minSpeed + clampedDistance * (maxSpeed - minSpeed)));
      });

      const j3Pos = typeof j3.current.translation === 'function' ? j3.current.translation() : { x: 0, y: 0, z: 0 };
      const j2Lerped = j2.current.lerped || new THREE.Vector3();
      const j1Lerped = j1.current.lerped || new THREE.Vector3();
      const fixedPos = typeof fixed.current.translation === 'function' ? fixed.current.translation() : { x: 0, y: 0, z: 0 };

      curve.points[0].copy(new THREE.Vector3(j3Pos.x, j3Pos.y, j3Pos.z));
      curve.points[1].copy(j2Lerped);
      curve.points[2].copy(j1Lerped);
      curve.points[3].copy(new THREE.Vector3(fixedPos.x, fixedPos.y, fixedPos.z));

      if (band.current && band.current.geometry) {
        band.current.geometry.setPoints(curve.getPoints(32));
      }

      if (typeof card.current.angvel === 'function' && typeof card.current.rotation === 'function') {
        const cardAng = card.current.angvel();
        const cardRot = card.current.rotation();
        ang.copy(new THREE.Vector3(cardAng.x, cardAng.y, cardAng.z));
        rot.copy(new THREE.Vector3(cardRot.x, cardRot.y, cardRot.z));
        card.current.setAngvel({ x: ang.x, y: ang.y - rot.y * 0.25, z: ang.z });
      }
    }
  });

  curve.curveType = 'chordal';
  if (texture) {
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  }

  return (
    <>
      <group position={[0, 4, 0]}>
        <RigidBody ref={fixed} {...segmentProps} type="fixed" />
        <RigidBody position={[0.5, 0, 0]} ref={j1} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1, 0, 0]} ref={j2} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1.5, 0, 0]} ref={j3} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[2, 0, 0]} ref={card} {...segmentProps} type={dragged ? 'kinematicPosition' : 'dynamic'}>
          <CuboidCollider args={[0.8, 1.125, 0.01]} />
          <group
            scale={2.25}
            position={[0, -1.2, -0.05]}
            onPointerOver={() => hover(true)}
            onPointerOut={() => hover(false)}
            onPointerUp={(e) => {
              if (typeof e.target.releasePointerCapture === 'function') {
                e.target.releasePointerCapture(e.pointerId);
              }
              drag(false);
            }}
            onPointerDown={(e) => {
              if (typeof e.target.setPointerCapture === 'function') {
                e.target.setPointerCapture(e.pointerId);
              }
              if (card.current && typeof card.current.translation === 'function') {
                drag(new THREE.Vector3().copy(e.point).sub(vec.copy(card.current.translation())));
              }
            }}>
            <mesh geometry={cardGeometry}>
              <meshPhysicalMaterial map={customCardTexture || cardMaterial.map} map-anisotropy={16} clearcoat={1} clearcoatRoughness={0.15} roughness={0.9} metalness={0.8} />
            </mesh>
            <mesh geometry={clipGeometry} material={clipMaterial} material-roughness={0.3} />
            <mesh geometry={clampGeometry} material={clampMaterial} />
          </group>
        </RigidBody>
      </group>
      <mesh ref={band}>
        <meshLineGeometry />
        <meshLineMaterial
          color="white"
          depthTest={false}
          resolution={isSmall ? [1000, 2000] : [1000, 1000]}
          useMap
          map={texture}
          repeat={[-4, 1]}
          lineWidth={1}
        />
      </mesh>
    </>
  );
}
