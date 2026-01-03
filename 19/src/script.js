import * as THREE from 'three'
import GUI from 'lil-gui'
import { texture } from 'three/tsl'

/**
 * Debug
 */
const gui = new GUI()

const parameters = {
    materialColor: '#ffeded'
}

gui
    .addColor(parameters, 'materialColor')
    .onChange(() =>
    {
        toonMaterial.color.set(parameters.materialColor)
    })

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Texture
const textureLoader = new THREE.TextureLoader()
const gradientTexture = textureLoader.load('/textures/gradients/5.jpg')
gradientTexture.magFilter = THREE.NearestFilter

// Object
const objectDistance = 4
const toonMaterial = new THREE.MeshToonMaterial({ 
    color: parameters.materialColor,
    gradientMap: gradientTexture
})

const mesh1 = new THREE.Mesh(
    new THREE.TorusGeometry(0.5, 0.2, 16, 60),
    toonMaterial
)
mesh1.position.x = 2
scene.add(mesh1)

const mesh2 = new THREE.Mesh(
    new THREE.ConeGeometry(0.5, 1, 32),
    toonMaterial
)
mesh2.position.x = -2
scene.add(mesh2)

const mesh3 = new THREE.Mesh(
    new THREE.TorusKnotGeometry(0.3, 0.1, 100, 16),
    toonMaterial
)
mesh3.position.x = 2
scene.add(mesh3)
const sectionMeshes = [mesh1, mesh2, mesh3]

mesh1.position.y = objectDistance * 0
mesh2.position.y = objectDistance * -1
mesh3.position.y = objectDistance * -2
// Light
const light = new THREE.DirectionalLight(0xffffff, 2)
light.position.set(1, 1, 0)
scene.add(light)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */

const cameraGroup = new THREE.Group()
scene.add(cameraGroup)

// Base camera
const camera = new THREE.PerspectiveCamera(35, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 6
cameraGroup.add(camera)

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

// Scroll Camera
let scrollY = window.scrollY
window.addEventListener('scroll', () =>
{
    scrollY = window.scrollY
})

// Cursor
const cursor = {
    x: 0,
    y: 0
}
window.addEventListener('mousemove', (event) =>
{
    cursor.x = event.clientX / sizes.width - 0.5
    cursor.y = event.clientY / sizes.height - 0.5
})

/**
 * Animate
 */
const clock = new THREE.Clock()
let previousTime = 0
const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()
    const deltaTime = elapsedTime - previousTime
    previousTime = elapsedTime
    // Animate Cmera
    camera.position.y = - scrollY / sizes.height * objectDistance
    const parallaxX = cursor.x * 0.5
    const parallaxY = - cursor.y * 0.5
    cameraGroup.position.x += (parallaxX - cameraGroup.position.x) * 5 * deltaTime
    cameraGroup.position.y += (parallaxY - cameraGroup.position.y) * 5 * deltaTime
    // Animate meshes
    for(const mesh of sectionMeshes)
    {
        mesh.rotation.x = elapsedTime * 0.1
        mesh.rotation.y = elapsedTime * 0.12
    }

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()