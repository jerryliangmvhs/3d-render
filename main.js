import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({antialias: true});

renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

/*
const geometry = new THREE.BoxGeometry();
const color = new THREE.Color('rgb(255,128,0)');
const material = new THREE.MeshBasicMaterial({color});

const cube = new THREE.Mesh(geometry, material);

scene.add(cube);
*/

const geometry = new THREE.BoxGeometry(2,1,2);

const materials = [
  new THREE.MeshBasicMaterial({ color: 0xff0000 }), // front
  new THREE.MeshBasicMaterial({ color: 0x00ff00 }), // back
  new THREE.MeshBasicMaterial({ color: 0x0000ff }), // top
  new THREE.MeshBasicMaterial({ color: 0xffff00 }), // bottom
  new THREE.MeshBasicMaterial({ color: 0xff00ff }), // right
  new THREE.MeshBasicMaterial({ color: 'rgb(255,0,255)' })  // left
];

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // smoother motion
controls.dampingFactor = 0.25;
controls.rotateSpeed = 1;

const cube = new THREE.Mesh(geometry, materials);
scene.add(cube);

camera.position.z = 5;
camera.position.y = 3;
cube.rotation.x = 0;



function animate(){
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene,camera);
}

window.addEventListener('resize', () => {
  // Update camera
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio); // optional for high-DPI screens
});

animate();
