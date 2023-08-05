<template>
  <div class="book3d"></div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import * as THREE from "three";

const initBook3d = () => {
  const scene = new THREE.Scene();
  scene.background = null;

  const camera = new THREE.PerspectiveCamera(75, 400 / 500, 0.1, 1000);

  const hemiLight = new THREE.HemisphereLight( 0xffffff, 0x8d8d8d, 3 );
				hemiLight.position.set( 0, 20, 0 );
				scene.add( hemiLight );

  const dirLight = new THREE.DirectionalLight(0x000, 3);
  dirLight.position.set(-3, 10, -10);
  dirLight.castShadow = true;
  dirLight.shadow.camera.top = 2;
  dirLight.shadow.camera.bottom = -2;
  dirLight.shadow.camera.left = -2;
  dirLight.shadow.camera.right = 2;
  dirLight.shadow.camera.near = 0.1;
  dirLight.shadow.camera.far = 40;
  scene.add(dirLight);

  const loader = new THREE.TextureLoader();

  const urls = [
    "/books3d/book1/edge.png",
    "/books3d/book1/spine.png",
    "/books3d/book1/top.png",
    "/books3d/book1/bottom.png",
    "/books3d/book1/front.png",
    "/books3d/book1/back.png",
  ];

  const geometry = new THREE.BoxGeometry(3.5, 5, 0.5);
  const materials = urls.map((url) => {
    return new THREE.MeshBasicMaterial({ map: loader.load(url) });
  });
  materials.opacity = 0.5;

  const mesh = new THREE.Mesh(
    new THREE.PlaneGeometry(100, 100),
    new THREE.MeshPhongMaterial({ color: 0xcbcbcb, depthWrite: false })
  );
  mesh.rotation.x = -Math.PI / 2;
  mesh.receiveShadow = true;
  scene.add(mesh);

  const cube = new THREE.Mesh(geometry, materials);
  cube.castShadow = true;
  scene.add(cube);

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(400, 500);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFShadowMap; // Tipo de sombra (opcional)
  renderer.setClearColor(0x000000, 0); // Fundo preto transparente
  const div = document.querySelector(".book3d");
  div.appendChild(renderer.domElement);

  camera.position.z = 5.5;

  const animate = () => {
    requestAnimationFrame(animate);

    cube.rotation.y += 0.01;

    renderer.render(scene, camera);
  };

  animate();
};

onMounted(() => {
  initBook3d();
});
</script>

<style scoped>
.book3d {
  position: relative;
  top: 30%;
    left: 25%;
  width: 300px;
  height: 500px;
  z-index: 9;
}

.book3d::before {
  content: "";
  position: absolute;
  bottom: -10px; /* Altura da sombra projetada */
  left: 100px; /* Deslocamento horizontal da sombra */
  width: 200px; /* Largura da sombra */
  height: 50px; /* Altura da sombra */
  border-radius: 50px;
  background: var(--lime-green); /* Cor da sombra */
  transform: skewX(-25deg); /* Inclinação para simular perspectiva */
}
</style>
