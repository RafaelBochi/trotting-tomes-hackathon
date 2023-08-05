<template>
  <div :class="`book3d${props.bookNum}`"></div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import * as THREE from "three";

const props = defineProps({
  bookNum: {
    type: Number,
    required: true,
  },
    active: {
        type: Boolean,
        required: false,
        default: false,
    },
});

const initBook3d = () => {
  const scene = new THREE.Scene();
  scene.background = null;

  const camera = new THREE.PerspectiveCamera(75, 400 / 500, 0.1, 1000);

  const renderer = new THREE.WebGLRenderer({ alpha: true });
  renderer.setSize(400, 500);
  renderer.setClearColor(0x000000, 0); // Fundo preto transparente

  const div = document.querySelector(`.book3d${props.bookNum}`);
  div.appendChild(renderer.domElement);

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
  scene.add(cube);

  cube.castShadow = true;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFShadowMap; // Tipo de sombra (opcional)

  camera.position.z = 5.5;

  const animate = () => {
    requestAnimationFrame(animate);

    if(props.active) {
        cube.rotation.y += 0.01;
    }
    

    renderer.render(scene, camera);
  };

  animate();
};

onMounted(() => {
    console.log("Book3d")
  initBook3d();
});
</script>

<style scoped>
.book3d {
  width: 300px;
  height: 500px;
  z-index: 9;
}
</style>
