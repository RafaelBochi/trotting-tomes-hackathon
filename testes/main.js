import * as THREE from "https://threejsfundamentals.org/threejs/resources/threejs/r127/build/three.module.js";
import { GLTFLoader } from "https://threejsfundamentals.org/threejs/resources/threejs/r127/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "https://threejsfundamentals.org/threejs/resources/threejs/r127/examples/jsm/controls/OrbitControls.js";

let scene, camera, renderer, car, podium;

function init() {
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0xdddddd);

  camera = new THREE.PerspectiveCamera(
    40,
    1000 / 1000,
    1,
    5000
  );

  camera.position.set(0, 200, 800);

  

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(1000, 1000);
  document.body.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);

  let loader = new GLTFLoader();
  loader.load('horse/horse.gltf', function(gltf){
    car = gltf.scene.children[0];
    car.scale.set(10, 12, 10);
    car.position.set(-105, 20, -40);
    car.castShadow = true;
    scene.add(gltf.scene);
    createPodium();
    animate();
  });

  const ambientLight = new THREE.AmbientLight(0xffff, 10);
  scene.add(ambientLight);

  const directionLight = new THREE.DirectionalLight(0x000, 10);
  directionLight.position.set(0, 1, 0);
  directionLight.castShadow = true;
  scene.add(directionLight);

    
  
}

function createPodium() {
  const podiumGeometry = new THREE.CylinderGeometry(100, 100, 20, 32);
  const podiumMaterial = new THREE.MeshStandardMaterial({ color: 0xfff });
  podium = new THREE.Mesh(podiumGeometry, podiumMaterial);
  podium.position.set(0, 0, 0);
  podium.castShadow = true;
  scene.add(podium);
}

function animate() {
  requestAnimationFrame(animate);


  renderer.render(scene, camera); 
}

init();
