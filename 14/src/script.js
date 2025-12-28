import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import GUI from 'lil-gui'

/**
 * Base
 */
// Debug
const gui = new GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Lights
 */
const ambientLight = new THREE.AmbientLight(0xffffff, 1)
scene.add(ambientLight)

// GUI for ambient light
const ambientLightFolder = gui.addFolder('Ambient Light')
ambientLightFolder.close()
ambientLightFolder.add(ambientLight, 'intensity').min(0).max(3).step(0.001).name('Intensity')

const directionalLight = new THREE.DirectionalLight(0x00fffc, 0)
scene.add(directionalLight)
directionalLight.castShadow = true
const directionalLightFolder = gui.addFolder('Directional Light')
directionalLightFolder.close()
directionalLightFolder.add(directionalLight, 'intensity').min(0).max(3).step(0.001).name('Intensity')
directionalLightFolder.add(directionalLight.position, 'x').min(-5).max(5).step(0.001).name('X Position')
directionalLightFolder.add(directionalLight.position, 'y').min(-5).max(5).step(0.001).name('Y Position')
directionalLightFolder.add(directionalLight.position, 'z').min(-5).max(5).step(0.001).name('Z Position')

const hemisphereLight = new THREE.HemisphereLight(0xff0000, 0x0000ff, 0)
scene.add(hemisphereLight)

const hemisphereLightFolder = gui.addFolder('Hemisphere Light')
hemisphereLightFolder.close()
hemisphereLightFolder.add(hemisphereLight, 'intensity').min(0).max(3).step(0.001).name('Intensity')
hemisphereLightFolder.add(hemisphereLight.position, 'y').min(-5).max(5).step(0.001).name('Y Position')

const pointLight = new THREE.PointLight(0xff9000, 0)
scene.add(pointLight)
pointLight.castShadow = true
const pointLightFolder = gui.addFolder('Point Light')
pointLightFolder.close()
pointLightFolder.add(pointLight, 'intensity').min(0).max(3).step(0.001).name('Intensity')
pointLightFolder.add(pointLight.position, 'x').min(-5).max(5).step(0.001).name('X Position')
pointLightFolder.add(pointLight.position, 'y').min(-5).max(5).step(0.001).name('Y Position')
pointLightFolder.add(pointLight.position, 'z').min(-5).max(5).step(0.001).name('Z Position')

const rectAreaLight = new THREE.RectAreaLight(0x4e00ff, 0, 0, 1)
scene.add(rectAreaLight)
const rectAreaLightFolder = gui.addFolder('Rect Area Light')
rectAreaLightFolder.close()
rectAreaLightFolder.add(rectAreaLight, 'intensity').min(0).max(20).step(0.001).name('Intensity')
rectAreaLightFolder.add(rectAreaLight.position, 'x').min(-5).max(5).step(0.001).name('X Position')
rectAreaLightFolder.add(rectAreaLight.position, 'y').min(-5).max(5).step(0.001).name('Y Position')
rectAreaLightFolder.add(rectAreaLight.position, 'z').min(-5).max(5).step(0.001).name('Z Position')

const spotLight = new THREE.SpotLight(0x78ff00, 1, 0, Math.PI * 0.1, 0.25, 1)
scene.add(spotLight)
scene.add(spotLight.target)
spotLight.castShadow = true
spotLight.target.position.x = -0.75
const spotLightFolder = gui.addFolder('Spot Light')
spotLightFolder.close()
spotLightFolder.add(spotLight, 'intensity').min(0).max(20).step(0.001).name('Intensity')
spotLightFolder.add(spotLight.position, 'x').min(-5).max(5).step(0.001).name('X Position')
spotLightFolder.add(spotLight.position, 'y').min(-5).max(5).step(0.001).name('Y Position')
spotLightFolder.add(spotLight.position, 'z').min(-5).max(5).step(0.001).name('Z Position')


/**
 * Objects
 */
// Material
const material = new THREE.MeshStandardMaterial()
material.roughness = 0.4

// Objects
const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 32, 32),
    material
)
sphere.position.x = - 1.5
sphere.castShadow = true
sphere.receiveShadow = true
const cube = new THREE.Mesh(
    new THREE.BoxGeometry(0.75, 0.75, 0.75),
    material
)
cube.castShadow = true
cube.receiveShadow = true
const torus = new THREE.Mesh(
    new THREE.TorusGeometry(0.3, 0.2, 32, 64),
    material
)
torus.castShadow = true
torus.receiveShadow = true
torus.position.x = 1.5

const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(5, 5),
    material
)
plane.rotation.x = - Math.PI * 0.5
plane.position.y = - 0.65
plane.receiveShadow = true
scene.add(sphere, cube, torus, plane)

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
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 1
camera.position.y = 1
camera.position.z = 2
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.shadowMap.enabled = true
/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update objects
    sphere.rotation.y = 0.1 * elapsedTime
    cube.rotation.y = 0.1 * elapsedTime
    torus.rotation.y = 0.1 * elapsedTime

    sphere.rotation.x = 0.15 * elapsedTime
    cube.rotation.x = 0.15 * elapsedTime
    torus.rotation.x = 0.15 * elapsedTime

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()