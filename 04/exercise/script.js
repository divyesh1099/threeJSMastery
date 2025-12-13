import * as THREE from 'three';

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

// Object
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

const axesHelper = new THREE.AxesHelper();
scene.add(axesHelper);

mesh.scale.x=3;

const group = new THREE.Group();
scene.add(group);

const cube1 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({color: 0x00ff00})
)

const cube2 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 2),
    new THREE.MeshBasicMaterial({color:0x0000ff})
);

cube2.position.set(-2, 0, 1);

group.add(cube1);
group.add(cube2);

group.position.x=3;

// Rotation
mesh.position.y = 1.5
mesh.rotation.x = Math.PI*1.5;
mesh.rotation.y=Math.PI*0.25;
// Sizes
const sizes = {
    width: 800,
    height: 600
}

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 6;
camera.position.x = 1;
camera.position.y = 1;
scene.add(camera);

camera.lookAt(mesh.position);

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})

renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);