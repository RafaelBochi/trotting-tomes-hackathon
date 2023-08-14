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

  const loader = new THREE.TextureLoader();

  const urls = [
    
  `/books3d/book${props.bookNum}/edge.png`,
    `/books3d/book${props.bookNum}/spine.png`,
    `/books3d/book${props.bookNum}/top.png`,
    `/books3d/book${props.bookNum}/bottom.png`,
    `/books3d/book${props.bookNum}/front.png`,
    `/books3d/book${props.bookNum}/back.png`,
  ];

  const geometry = new THREE.BoxGeometry(3.5, 5, 0.5);
  const materials = urls.map((url) => {
    return new THREE.MeshStandardMaterial({ map: loader.load(url) });
  });

  const cube = new THREE.Mesh(geometry, materials);
  scene.add(cube);

  const light = new THREE.DirectionalLight(0xff00ff, 1); // Cor roxa
  light.position.set(10, 10, 10);
  light.castShadow = true;

  // Configuração das propriedades de sombra
  light.shadow.mapSize.width = 1024;
  light.shadow.mapSize.height = 1024;
  light.shadow.camera.near = 0.5;
  light.shadow.camera.far = 50;

  scene.add(light);

  cube.castShadow = true;
  cube.receiveShadow = true;

  // Adicionando um solo (plano) para as sombras
  const groundGeometry = new THREE.PlaneGeometry(30, 30);
  const groundMaterial = new THREE.MeshStandardMaterial({ color: 0x808080 }); // Cor do plano
  const ground = new THREE.Mesh(groundGeometry, groundMaterial);
  ground.rotation.x = -Math.PI / 2;
  ground.receiveShadow = true;
  scene.add(ground);

  // Luz ambiente para preencher áreas não iluminadas
  const ambientLight = new THREE.AmbientLight(0xffffff); // Cor da luz ambiente
  scene.add(ambientLight);

  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;


  camera.position.z = 8;

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
