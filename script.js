import * as THREE from 'three';

// Global variables
let scene, camera, renderer;
let particlesMesh, linesMesh;
let mouseX = 0;
let mouseY = 0;
let targetX = 0;
let targetY = 0;
const windowHalfX = window.innerWidth / 2;
const windowHalfY = window.innerHeight / 2;

// Colors
const colorPrimary = new THREE.Color(0x915eff); // surface-raised (purple)
const colorSecondary = new THREE.Color(0x55adff); // text-secondary (blue)

init();
animate();

function init() {
  const canvas = document.getElementById('canvas3d');
  
  // Create scene
  scene = new THREE.Scene();
  // We can add a very faint background color or keep it transparent
  scene.background = new THREE.Color(0x000000);

  // Create camera
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 300;

  // Create renderer
  renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // optimize performance

  // Particles / Nodes
  const particlesGeometry = new THREE.BufferGeometry();
  const particlesCount = 200; // Number of DevOps nodes
  const posArray = new Float32Array(particlesCount * 3);
  const colorArray = new Float32Array(particlesCount * 3);

  for (let i = 0; i < particlesCount * 3; i+=3) {
    // Spread particles across the screen
    posArray[i] = (Math.random() - 0.5) * 800; // x
    posArray[i+1] = (Math.random() - 0.5) * 800; // y
    posArray[i+2] = (Math.random() - 0.5) * 400 - 100; // z

    // Mix colors between purple and blue
    const mixColor = Math.random() > 0.5 ? colorPrimary : colorSecondary;
    colorArray[i] = mixColor.r;
    colorArray[i+1] = mixColor.g;
    colorArray[i+2] = mixColor.b;
  }

  particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
  particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colorArray, 3));

  // Particle Material
  const particlesMaterial = new THREE.PointsMaterial({
    size: 4,
    vertexColors: true,
    transparent: true,
    opacity: 0.8,
    blending: THREE.AdditiveBlending
  });

  particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
  scene.add(particlesMesh);

  // Network Lines
  const lineMaterial = new THREE.LineBasicMaterial({
    color: 0x55adff,
    transparent: true,
    opacity: 0.1,
    blending: THREE.AdditiveBlending
  });

  // Connect close particles to form a network
  const lineGeometry = new THREE.BufferGeometry();
  const linePositions = [];
  
  for (let i = 0; i < particlesCount; i++) {
    for (let j = i + 1; j < particlesCount; j++) {
      const dist = Math.sqrt(
        Math.pow(posArray[i*3] - posArray[j*3], 2) +
        Math.pow(posArray[i*3+1] - posArray[j*3+1], 2) +
        Math.pow(posArray[i*3+2] - posArray[j*3+2], 2)
      );

      if (dist < 80) { // Connect nodes that are close
        linePositions.push(
          posArray[i*3], posArray[i*3+1], posArray[i*3+2],
          posArray[j*3], posArray[j*3+1], posArray[j*3+2]
        );
      }
    }
  }

  lineGeometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
  linesMesh = new THREE.LineSegments(lineGeometry, lineMaterial);
  scene.add(linesMesh);

  // Add floating 3D shapes (Docker containers, DB icons, etc.)
  createFloatingShapes();

  // Event Listeners
  document.addEventListener('mousemove', onDocumentMouseMove);
  window.addEventListener('resize', onWindowResize);
  
  // Accessibility check for reduced motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (prefersReducedMotion.matches) {
    document.removeEventListener('mousemove', onDocumentMouseMove);
  }
}

function createFloatingShapes() {
  const shapesGroup = new THREE.Group();
  scene.add(shapesGroup);

  // A wireframe cube representing a container
  const boxGeo = new THREE.BoxGeometry(40, 40, 40);
  const boxMat = new THREE.MeshBasicMaterial({ color: 0x915eff, wireframe: true, transparent: true, opacity: 0.3 });
  const box = new THREE.Mesh(boxGeo, boxMat);
  box.position.set(200, 100, -100);
  shapesGroup.add(box);

  // A wireframe sphere representing global cloud
  const sphereGeo = new THREE.SphereGeometry(30, 16, 16);
  const sphereMat = new THREE.MeshBasicMaterial({ color: 0x55adff, wireframe: true, transparent: true, opacity: 0.2 });
  const sphere = new THREE.Mesh(sphereGeo, sphereMat);
  sphere.position.set(-250, -150, -50);
  shapesGroup.add(sphere);

  // A cylinder representing a database/server
  const cylGeo = new THREE.CylinderGeometry(20, 20, 50, 16);
  const cylMat = new THREE.MeshBasicMaterial({ color: 0x915eff, wireframe: true, transparent: true, opacity: 0.2 });
  const cyl = new THREE.Mesh(cylGeo, cylMat);
  cyl.position.set(150, -200, -150);
  shapesGroup.add(cyl);

  // Animation for shapes
  scene.userData.shapesGroup = shapesGroup;
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function onDocumentMouseMove(event) {
  mouseX = (event.clientX - windowHalfX);
  mouseY = (event.clientY - windowHalfY);
}

function animate() {
  requestAnimationFrame(animate);

  const time = Date.now() * 0.0005;

  // Gentle idle rotation for particles
  particlesMesh.rotation.y = time * 0.1;
  particlesMesh.rotation.x = time * 0.05;
  
  linesMesh.rotation.y = time * 0.1;
  linesMesh.rotation.x = time * 0.05;

  // Animate floating shapes
  if (scene.userData.shapesGroup) {
    const shapes = scene.userData.shapesGroup.children;
    shapes.forEach((shape, index) => {
      shape.rotation.x += 0.005;
      shape.rotation.y += 0.01;
      // Slight floating motion
      shape.position.y += Math.sin(time + index) * 0.5;
    });
  }

  // Cursor reactivity (Parallax) with spring/dampening effect
  targetX = mouseX * 0.1;
  targetY = mouseY * 0.1;

  camera.position.x += (targetX - camera.position.x) * 0.05;
  camera.position.y += (-targetY - camera.position.y) * 0.05;
  camera.lookAt(scene.position);

  renderer.render(scene, camera);
}
