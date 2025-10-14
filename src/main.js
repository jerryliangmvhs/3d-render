import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';

const scene = new THREE.Scene();
scene.background = new THREE.Color('rgba(56, 57, 62, 1)');

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(17, 8, 40);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.25;
controls.rotateSpeed = 1;

const directionalLight = new THREE.DirectionalLight('rgba(255, 255, 255, 1)', 2.5); // color, intensity
directionalLight.position.set(3, 6, 18); // x, y, z
scene.add(directionalLight);

directionalLight.castShadow = true;
directionalLight.shadow.mapSize.width = 1024; // shadow quality
directionalLight.shadow.mapSize.height = 1024;
directionalLight.shadow.camera.near = 0.5;
directionalLight.shadow.camera.far = 50;

const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath(import.meta.env.BASE_URL + 'draco/');

/*
const loader = new GLTFLoader();
loader.setDRACOLoader(dracoLoader);
loader.load(
  import.meta.env.BASE_URL + 'models/car3.glb',
  (gltf) => {
    scene.add(gltf.scene);
  },
  undefined,
  (error) => {
    console.error('Error loading model:', error);
  }
);
*/


const mtlLoader = new MTLLoader();
mtlLoader.setPath('models/'); // folder where your files are
mtlLoader.load('car4.mtl', (materials) => {
  materials.preload();

  // Then load the OBJ, passing in materials
  const objLoader = new OBJLoader();
  objLoader.setMaterials(materials);
  objLoader.setPath('models/');
  objLoader.load(
    'car4.obj',
    (object) => {
      scene.add(object);
    },
    (xhr) => console.log((xhr.loaded / xhr.total * 100) + '% loaded'),
    (error) => console.error('Error loading OBJ:', error)
  );
});





function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);

  
  console.log(
    //`Camera position: x=${camera.position.x.toFixed(2)}, y=${camera.position.y.toFixed(2)}, z=${camera.position.z.toFixed(2)}`
  );
  
}

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
});

animate();
