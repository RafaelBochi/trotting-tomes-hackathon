<template>
  <div id="horse3d"></div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import * as THREE from "three";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

function initHorse3d() {
  const scene = new THREE.Scene();
  let camera;
  const renderer = new THREE.WebGLRenderer({ alpha: true });
  if(window.innerWidth >= 1100) {
    camera = new THREE.PerspectiveCamera(75, 600 / (window.innerHeight/2), 0.1, 1000);
  renderer.setSize(600, window.innerHeight/2);
  }
  else {
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / (window.innerHeight/2), 0.1, 1000);
    renderer.setSize(window.innerWidth, window.innerHeight/2);
  }
  renderer.setClearColor(0x000000, 0); // Limpa o fundo, tornando-o transparente
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.BasicShadowMap;
  const horse3d = document.querySelector("#horse3d");
  horse3d.appendChild(renderer.domElement);


  camera.position.set(0, 10, 30);


  const loader = new GLTFLoader();
  let model;
  loader.load('/horse.gltf', (gltf) => {
    model = gltf.scene;
    const material = new THREE.MeshBasicMaterial({ color: 0x33495d });
    model.traverse(function (node) {
      if (node.isMesh) {
        node.material = material;
      }
    });
    model.scale.set(0.5, 0.5, 0.5);
    model.position.set(0, 0, 0);
    model.castShadow = true;
    scene.add(model);
  });

  function animate() {
    requestAnimationFrame(animate);
    model.rotation.y += 0.01;
    renderer.render(scene, camera);
  }
  animate();
}

onMounted(() => {
  console.log("Book3d")
  initHorse3d();
});
</script>

<style scoped>
#horse3d {
  position: relative;
  z-index: 9;
}
</style>
