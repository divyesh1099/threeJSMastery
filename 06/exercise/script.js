import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
console.log(OrbitControls);
// import gsap from 'gsap';
// console.log(gsap);
// Canvas
const canvas = document.querySelector("canvas.webgl");

const cursor = {
    x:0,
    y:0
}

window.addEventListener('mousemove', (event)=>{
    cursor.x = event.clientX/sizes.width -0.5
    cursor.y = - (event.clientY/sizes.height -0.5);
    // console.log(event.clientX);
});
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

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})

renderer.setSize(sizes.width, sizes.height);

let t1=new THREE.Clock();

// gsap.to(mesh.position, {duration:1, delay:1, x: 2});
// gsap.to(mesh.position, {duration:1, delay:2, x: 0});
// Animation
const tick = () =>{
    let elapsedTime=t1.getElapsedTime();
    

    // Update objects

    // mesh.position.x += 0.009;
    // mesh.rotation.y = elapsedTime;
    // Render 

    // camera.position.x = cursor.x * 10;
    // camera.position.y = cursor.y * 10;
    // camera.lookAt(mesh.position);

    controls.update();

    renderer.render(scene, camera);
    window.requestAnimationFrame(tick);
    // setTimeout(()=>{
    // }, 100);
}

tick();