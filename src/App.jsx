import React, { useState, useEffect, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Physics, useBox, usePlane, useSphere } from '@react-three/cannon';
import { Environment, Text, Float, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';

// ---------------- 3D COMPONENTS ----------------

function Floor() {
  const [ref] = usePlane(() => ({ rotation: [-Math.PI / 2, 0, 0], position: [0, -5, 0] }));
  return (
    <mesh ref={ref} receiveShadow>
      <planeGeometry args={[100, 100]} />
      <shadowMaterial transparent opacity={0.2} />
    </mesh>
  );
}

// Center "Avatar" Head (Placeholder using a sphere)
function CenterAvatar() {
  const ref = useRef();
  
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
      ref.current.position.y = Math.sin(state.clock.elapsedTime) * 0.2;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
      <group ref={ref} position={[0, 0, 0]}>
        <mesh castShadow receiveShadow>
          <sphereGeometry args={[1.5, 64, 64]} />
          <meshStandardMaterial color="#0f172a" roughness={0.2} metalness={0.8} />
        </mesh>
        <Text
          position={[0, 0, 1.6]}
          fontSize={0.4}
          color="#3b82f6"
          anchorX="center"
          anchorY="middle"
        >
          DevOps
        </Text>
      </group>
    </Float>
  );
}

// Floating physics objects representing tech stack
function TechObject({ position, type }) {
  const [ref, api] = useBox(() => ({
    mass: 1,
    position,
    args: type === 'yaml' ? [1, 1.5, 0.2] : [1, 1, 1],
    rotation: [Math.random() * Math.PI, Math.random() * Math.PI, 0],
  }));

  // Handle click to bounce
  const handleClick = (e) => {
    e.stopPropagation();
    api.velocity.set((Math.random() - 0.5) * 10, 10, (Math.random() - 0.5) * 10);
    api.angularVelocity.set(Math.random() * 10, Math.random() * 10, Math.random() * 10);
  };

  let color = '#3b82f6';
  let label = 'Docker';
  let isYaml = false;

  if (type === 'aws') { color = '#f59e0b'; label = 'AWS'; }
  if (type === 'k8s') { color = '#326ce5'; label = 'K8s'; }
  if (type === 'yaml') { color = '#10b981'; label = 'YAML'; isYaml = true; }
  if (type === 'linux') { color = '#facc15'; label = 'Linux'; }
  if (type === 'github') { color = '#1e293b'; label = 'Git'; }

  return (
    <mesh ref={ref} castShadow receiveShadow onClick={handleClick} onPointerOver={() => document.body.style.cursor = 'pointer'} onPointerOut={() => document.body.style.cursor = 'auto'}>
      {isYaml ? (
        <boxGeometry args={[1, 1.5, 0.2]} />
      ) : (
        <boxGeometry args={[1, 1, 1]} />
      )}
      <meshStandardMaterial color={color} roughness={0.3} metalness={0.2} />
      <Text
        position={[0, 0, isYaml ? 0.11 : 0.51]}
        fontSize={isYaml ? 0.2 : 0.3}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {label}
      </Text>
    </mesh>
  );
}

// Invisible walls so elements don't fall off screen
function InvisibleWalls() {
  usePlane(() => ({ position: [0, 0, -10] }));
  usePlane(() => ({ position: [0, 0, 10], rotation: [0, Math.PI, 0] }));
  usePlane(() => ({ position: [-10, 0, 0], rotation: [0, Math.PI / 2, 0] }));
  usePlane(() => ({ position: [10, 0, 0], rotation: [0, -Math.PI / 2, 0] }));
  return null;
}

// ---------------- UI COMPONENTS ----------------

function TerminalWidget() {
  return (
    <div className="terminal-widget">
      <div className="terminal-header">
        <div className="term-dot red"></div>
        <div className="term-dot yellow"></div>
        <div className="term-dot green"></div>
      </div>
      <div className="terminal-body">
        <div className="terminal-line command">npm run deploy-ujjwal-portfolio</div>
        <div className="terminal-line">Building container image...</div>
        <div className="terminal-line">Pushing to registry...</div>
        <div className="terminal-line success">[SUCCESS] Container deployed successfully!<span className="cursor"></span></div>
      </div>
    </div>
  );
}

function BioCard() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bio-card-container">
      <button className="bio-toggle" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? 'Close Profile' : 'View Profile'}
      </button>
      
      <div className={`bio-card ${isOpen ? 'visible' : 'hidden'}`}>
        <div className="bio-section">
          <h3>Contact</h3>
          <a href="mailto:iamkashyup@gmail.com">iamkashyup@gmail.com</a>
        </div>
        
        <div className="bio-section">
          <h3>Top Skills</h3>
          <div className="tags">
            <span className="tag">Docker</span>
            <span className="tag">AWS</span>
            <span className="tag">Kubernetes</span>
            <span className="tag">CI/CD</span>
            <span className="tag">Linux</span>
          </div>
        </div>
        
        <div className="bio-section">
          <h3>Certifications</h3>
          <ul className="cert-list">
            <li>IBM Docker Essentials</li>
            <li>IBM Kubernetes & OpenShift</li>
            <li>Containers, Kubernetes & Istio</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

// ---------------- MAIN APP ----------------

function App() {
  const techTypes = ['docker', 'aws', 'k8s', 'yaml', 'linux', 'github', 'docker', 'yaml', 'k8s'];

  return (
    <>
      <div className="canvas-container">
        <Canvas shadows camera={{ position: [0, 2, 10], fov: 50 }}>
          <color attach="background" args={['#f8fafc']} />
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 15, 10]} angle={0.3} penumbra={1} intensity={2} castShadow />
          <directionalLight position={[-10, 10, -10]} intensity={1.5} />
          
          <CenterAvatar />
          
          <Physics gravity={[0, -9.81, 0]}>
            <Floor />
            <InvisibleWalls />
            {techTypes.map((type, i) => (
              <TechObject 
                key={i} 
                type={type} 
                position={[(Math.random() - 0.5) * 8, 10 + i * 2, (Math.random() - 0.5) * 5]} 
              />
            ))}
          </Physics>

          <Environment preset="city" />
          <ContactShadows position={[0, -4.9, 0]} opacity={0.4} scale={20} blur={2} far={5} />
        </Canvas>
      </div>

      <div className="ui-layer">
        <div className="header">
          <h1>Ujjwal Kumar</h1>
          <h2>DevOps Engineer</h2>
        </div>
        
        <TerminalWidget />
        <BioCard />
      </div>
    </>
  );
}

export default App;
