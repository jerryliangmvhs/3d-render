import * as THREE from './node_modules/three/build/three.module.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

/*
const geometry = new THREE.BoxGeometry();
const color = new THREE.Color('rgb(255,128,0)');
const material = new THREE.MeshBasicMaterial({color});

const cube = new THREE.Mesh(geometry, material);

scene.add(cube);
*/

const geometry = new THREE.BoxGeometry();

const materials = [
  new THREE.MeshBasicMaterial({ color: 0xff0000 }), // front
  new THREE.MeshBasicMaterial({ color: 0x00ff00 }), // back
  new THREE.MeshBasicMaterial({ color: 0x0000ff }), // top
  new THREE.MeshBasicMaterial({ color: 0xffff00 }), // bottom
  new THREE.MeshBasicMaterial({ color: 0xff00ff }), // right
  new THREE.MeshBasicMaterial({ color: 'rgb(255,0,255)' })  // left
];

const cube = new THREE.Mesh(geometry, materials);
scene.add(cube);

camera.position.z = 5;
camera.position.y = 3;
camera.rotation.x = -0.5;


function animate(){
    requestAnimationFrame(animate);
    cube.rotation.y += 0.01;
    renderer.render(scene,camera);

}

 animate();

