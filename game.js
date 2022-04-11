// import * as THREE from "./js/three.js";
// import { OrbitControls } from "./js/orbitcontrols.js";

import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.118/build/three.module.js';
import { GLTFLoader } from 'https://cdn.jsdelivr.net/npm/three@0.118.1/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.118/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);


const geometry = new THREE.BoxGeometry(10, 0.1, 10);
const material = new THREE.MeshBasicMaterial({ color: 0x42ecf5 });
const cube = new THREE.Mesh(geometry, material);
cube.position.z = 0;
scene.add(cube);

let mixer;

let robot;

const gloader = new GLTFLoader();
gloader.load('./models/mech_drone/scene.gltf', (gltf) => {
    console.log(gltf);
    robot = gltf.scene;
    mixer = new THREE.AnimationMixer(gltf.scene);
    gltf.animations.forEach((clip) => {
        mixer.clipAction(clip).play();
    });

    scene.add(gltf.scene);
});

const light = new THREE.AmbientLight(0x404040);
scene.add(light);

const controls = new OrbitControls(camera, renderer.domElement);



const loader = new THREE.CubeTextureLoader();
const texture = loader.load([
    './penguins/arid_ft.jpg',
    './penguins/arid_bk.jpg',
    './penguins/arid_up.jpg',
    './penguins/arid_dn.jpg',
    './penguins/arid_rt.jpg',
    './penguins/arid_lf.jpg',
]);
scene.background = texture;

camera.position.z = 5;


let clock = new THREE.Clock();

function animate() {
    requestAnimationFrame(animate);
    // cube.rotation.x += 0.01;
    // cube.rotation.y += 0.01;
    var delta = clock.getDelta();
    if (mixer) mixer.update(delta);

    renderer.render(scene, camera);
}
animate();


var xSpeed = 0.0001;
var ySpeed = 0.0001;

document.addEventListener("keydown", onDocumentKeyDown, false);

function onDocumentKeyDown(event) {
    var keyCode = event.which;
    if (keyCode == 87) {
        robot.position.y += ySpeed;
    } else if (keyCode == 83) {
        robot.position.y -= ySpeed;
    } else if (keyCode == 65) {
        robot.position.x -= xSpeed;
    } else if (keyCode == 68) {
        robot.position.x += xSpeed;
    } else if (keyCode == 32) {
        robot.position.set(0, 0, 0);
    }
};