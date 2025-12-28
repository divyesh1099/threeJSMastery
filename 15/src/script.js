import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { Timer } from 'three/addons/misc/Timer.js'
import GUI from 'lil-gui'
import { Sky } from 'three/examples/jsm/objects/Sky.js'
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
 * House
 */
// Temporary sphere
// const sphere = new THREE.Mesh(
//     new THREE.SphereGeometry(1, 32, 32),
//     new THREE.MeshStandardMaterial({ roughness: 0.7 })
// )
// scene.add(sphere)

const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(20, 20, 100, 100),
    new THREE.MeshStandardMaterial({ roughness: 0.7, wireframe: false })
)
// const axesHelper = new THREE.AxesHelper(3)
// scene.add(axesHelper)
floor.rotation.x = -Math.PI * 0.5
// floor.position.y = -2
scene.add(floor)

// Texture loader
const textureLoader = new THREE.TextureLoader()

const floorAlphaTexture = textureLoader.load('/textures/floor/alpha.jpg')
const floorColorTexture = textureLoader.load('/textures/floor/textures/coast_sand_rocks_02_diff_4k.jpg')
const floorRoughnessTexture = textureLoader.load('/textures/floor/textures/coast_sand_rocks_02_arm_4k.jpg')
const floorNormalTexture = textureLoader.load('/textures/floor/textures/coast_sand_rocks_02_nor_gl_4k.jpg')
const floorDisplacementTexture = textureLoader.load('/textures/floor/textures/coast_sand_rocks_02_disp_4k.jpg')
const floorAmbientOcclusionTexture = textureLoader.load('/textures/floor/textures/coast_sand_rocks_02_arm_4k.jpg')

floorColorTexture.colorSpace = THREE.SRGBColorSpace

floorColorTexture.repeat.set(8, 8)
floorNormalTexture.repeat.set(8, 8)
floorRoughnessTexture.repeat.set(8, 8)
floorDisplacementTexture.repeat.set(8, 8)
floorAmbientOcclusionTexture.repeat.set(8, 8)

floorColorTexture.wrapS = THREE.RepeatWrapping
floorNormalTexture.wrapS = THREE.RepeatWrapping
floorRoughnessTexture.wrapS = THREE.RepeatWrapping
floorDisplacementTexture.wrapS = THREE.RepeatWrapping
floorAmbientOcclusionTexture.wrapS = THREE.RepeatWrapping
floorColorTexture.wrapT = THREE.RepeatWrapping
floorNormalTexture.wrapT = THREE.RepeatWrapping
floorRoughnessTexture.wrapT = THREE.RepeatWrapping
floorDisplacementTexture.wrapT = THREE.RepeatWrapping
floorAmbientOcclusionTexture.wrapT = THREE.RepeatWrapping

floor.material.displacementMap = floorDisplacementTexture
floor.material.displacementScale = 0.3
floor.material.displacementBias = -0.2
floor.material.map = floorColorTexture
floor.material.normalMap = floorNormalTexture
floor.material.roughnessMap = floorRoughnessTexture
floor.material.transparent = true
floor.material.alphaMap = floorAlphaTexture
floor.material.displacementMap = floorDisplacementTexture
floor.material.aoMap = floorAmbientOcclusionTexture


gui.add(floor.material, 'displacementScale').min(0).max(1).step(0.001).name('Floor Displacement Scale')
gui.add(floor.material, 'displacementBias').min(-1).max(1).step(0.001).name('Floor Displacement Bias')

// Wall Textures
const wallColorTexture = textureLoader.load('/textures/wall/textures/castle_brick_broken_06_diff_4k.jpg')
const wallNormalTexture = textureLoader.load('/textures/wall/textures/castle_brick_broken_06_nor_gl_4k.jpg')
const wallARMTexture = textureLoader.load('/textures/wall/textures/castle_brick_broken_06_arm_4k.jpg')

wallColorTexture.colorSpace = THREE.SRGBColorSpace



// House group
const house = new THREE.Group()
scene.add(house)

// Walls
const walls = new THREE.BoxGeometry(4, 2.5, 4)
const wallsMaterial = new THREE.MeshStandardMaterial({ color: '#ac8e82' })
const wallsMesh = new THREE.Mesh(walls, wallsMaterial)
wallsMesh.position.y = 2.5 / 2
house.add(wallsMesh)

wallsMesh.material.map = wallColorTexture
wallsMesh.material.normalMap = wallNormalTexture
wallsMesh.material.aoMap = wallARMTexture
wallsMesh.material.roughnessMap = wallARMTexture
wallsMesh.material.metalnessMap = wallARMTexture

// Roof
const roof = new THREE.ConeGeometry(3.5, 1.5, 4)
const roofMaterial = new THREE.MeshStandardMaterial({ color: '#b35d5d' })
const roofMesh = new THREE.Mesh(roof, roofMaterial)
roofMesh.position.y = 2.5 + 0.5
roofMesh.rotation.y = Math.PI / 4
house.add(roofMesh)

const roofMaterialColorTexture = textureLoader.load('/textures/roof/roof_slates_02_1k/roof_slates_02_diff_1k.jpg')
const roofMaterialNormalTexture = textureLoader.load('/textures/roof/roof_slates_02_1k/roof_slates_02_nor_gl_1k.jpg')
const roofMaterialARMTexture = textureLoader.load('/textures/roof/roof_slates_02_1k/roof_slates_02_arm_1k.jpg')
const roofMaterialAmbientOcclusionTexture = textureLoader.load('/textures/roof/roof_slates_02_1k/roof_slates_02_arm_1k.jpg')

roofMaterialColorTexture.colorSpace = THREE.SRGBColorSpace

roofMaterialColorTexture.repeat.set(3, 1)
roofMaterialNormalTexture.repeat.set(3, 1)
roofMaterialARMTexture.repeat.set(3, 1)
roofMaterialAmbientOcclusionTexture.repeat.set(3, 1)

roofMaterialColorTexture.wrapS = THREE.RepeatWrapping
roofMaterialNormalTexture.wrapS = THREE.RepeatWrapping
roofMaterialARMTexture.wrapS = THREE.RepeatWrapping
roofMaterialAmbientOcclusionTexture.wrapS = THREE.RepeatWrapping
roofMaterialColorTexture.wrapT = THREE.RepeatWrapping
roofMaterialNormalTexture.wrapT = THREE.RepeatWrapping
roofMaterialARMTexture.wrapT = THREE.RepeatWrapping
roofMaterialAmbientOcclusionTexture.wrapT = THREE.RepeatWrapping

roofMesh.material.map = roofMaterialColorTexture
roofMesh.material.normalMap = roofMaterialNormalTexture
roofMesh.material.aoMap = roofMaterialARMTexture
roofMesh.material.roughnessMap = roofMaterialARMTexture
roofMesh.material.metalnessMap = roofMaterialARMTexture
roofMesh.material.aoMap = roofMaterialAmbientOcclusionTexture

// Door
const door = new THREE.PlaneGeometry(2, 2)
const doorMaterial = new THREE.MeshStandardMaterial({ color: '#aa7b7b' })
const doorMesh = new THREE.Mesh(door, doorMaterial)
doorMesh.position.y = 1
doorMesh.position.z = 2 + 0.01
house.add(doorMesh)

const doorMaterialColorTexture = textureLoader.load('/textures/door/color.jpg')
const doorMaterialAlphaTexture = textureLoader.load('/textures/door/alpha.jpg')
const doorMaterialNormalTexture = textureLoader.load('/textures/door/normal.jpg')
const doorMaterialARMTexture = textureLoader.load('/textures/door/roughness.jpg')
const doorMaterialAmbientOcclusionTexture = textureLoader.load('/textures/door/ambientOcclusion.jpg')

doorMaterialColorTexture.colorSpace = THREE.SRGBColorSpace

doorMesh.material.map = doorMaterialColorTexture
doorMesh.material.alphaMap = doorMaterialAlphaTexture
doorMesh.material.normalMap = doorMaterialNormalTexture
doorMesh.material.aoMap = doorMaterialARMTexture
doorMesh.material.roughnessMap = doorMaterialARMTexture
doorMesh.material.metalnessMap = doorMaterialARMTexture
doorMesh.material.transparent = true

doorMaterialColorTexture.repeat.set(1, 1)
doorMaterialNormalTexture.repeat.set(1, 1)
doorMaterialARMTexture.repeat.set(1, 1)

doorMaterialColorTexture.wrapS = THREE.RepeatWrapping
doorMaterialNormalTexture.wrapS = THREE.RepeatWrapping
doorMaterialARMTexture.wrapS = THREE.RepeatWrapping
doorMaterialColorTexture.wrapT = THREE.RepeatWrapping
doorMaterialNormalTexture.wrapT = THREE.RepeatWrapping
doorMaterialARMTexture.wrapT = THREE.RepeatWrapping

// Bushes
const bushGeometry = new THREE.SphereGeometry(1, 16, 16)
const bushMaterial = new THREE.MeshStandardMaterial({ color: '#89c854' })

const bush1 = new THREE.Mesh(bushGeometry, bushMaterial)
bush1.scale.set(0.5, 0.5, 0.5)
bush1.position.set(1.2, 0.2, 2.2)
bush1.rotation.x = -0.75
const bush2 = new THREE.Mesh(bushGeometry, bushMaterial)
bush2.scale.set(0.25, 0.25, 0.25)
bush2.position.set(1.8, 0.1, 2.7)
bush2.rotation.x = -0.75
const bush3 = new THREE.Mesh(bushGeometry, bushMaterial)
bush3.scale.set(0.4, 0.4, 0.4)
bush3.position.set(-1.2, 0.1, 2.4)
bush3.rotation.x = -0.75
const bush4 = new THREE.Mesh(bushGeometry, bushMaterial)
bush4.scale.set(0.15, 0.15, 0.15)
bush4.position.set(-1.8, 0.05, 2.6)
bush4.rotation.x = -0.75
house.add(bush1, bush2, bush3, bush4)

const bushMaterialColorTexture = textureLoader.load('/textures/bush/leaves_forest_ground_1k/leaves_forest_ground_diff_1k.jpg')
const bushMaterialNormalTexture = textureLoader.load('/textures/bush/leaves_forest_ground_1k/leaves_forest_ground_nor_gl_1k.jpg')
const bushMaterialARMTexture = textureLoader.load('/textures/bush/leaves_forest_ground_1k/leaves_forest_ground_arm_1k.jpg')

bushMaterialColorTexture.colorSpace = THREE.SRGBColorSpace

bushMaterial.map = bushMaterialColorTexture
bushMaterial.normalMap = bushMaterialNormalTexture
bushMaterial.aoMap = bushMaterialARMTexture
bushMaterial.roughnessMap = bushMaterialARMTexture
bushMaterial.metalnessMap = bushMaterialARMTexture

bushMaterialColorTexture.repeat.set(2, 1)
bushMaterialNormalTexture.repeat.set(2, 1)
bushMaterialARMTexture.repeat.set(2, 1)

bushMaterialColorTexture.wrapS = THREE.RepeatWrapping
bushMaterialNormalTexture.wrapS = THREE.RepeatWrapping
bushMaterialARMTexture.wrapS = THREE.RepeatWrapping
bushMaterialColorTexture.wrapT = THREE.RepeatWrapping
bushMaterialNormalTexture.wrapT = THREE.RepeatWrapping
bushMaterialARMTexture.wrapT = THREE.RepeatWrapping


// Graves
const graveGeometry = new THREE.BoxGeometry(0.6, 0.8, 0.2)
const graveMaterial = new THREE.MeshStandardMaterial({ color: '#b2b6b1' })
const graves = new THREE.Group()
scene.add(graves)
for(let i = 0; i<30; i++){
    const grave = new THREE.Mesh(graveGeometry, graveMaterial)
    const angle = Math.random() * Math.PI * 2
    const radius = 3 + Math.random() * 6
    grave.position.set(
        Math.cos(angle) * radius,
        0.4,
        Math.sin(angle) * radius
    )
    grave.rotation.y = (Math.random() - 0.5) * 0.4
    grave.rotation.z = (Math.random() - 0.5) * 0.4  
    graves.add(grave)
}
const graveMaterialColorTexture = textureLoader.load('/textures/grave/plastered_stone_wall_1k/plastered_stone_wall_diff_1k.jpg')
const graveMaterialNormalTexture = textureLoader.load('/textures/grave/plastered_stone_wall_1k/plastered_stone_wall_nor_gl_1k.jpg')
const graveMaterialARMTexture = textureLoader.load('/textures/grave/plastered_stone_wall_1k/plastered_stone_wall_arm_1k.jpg')

graveMaterialColorTexture.colorSpace = THREE.SRGBColorSpace

graveMaterial.map = graveMaterialColorTexture
graveMaterial.normalMap = graveMaterialNormalTexture
graveMaterial.aoMap = graveMaterialARMTexture
graveMaterial.roughnessMap = graveMaterialARMTexture
graveMaterial.metalnessMap = graveMaterialARMTexture

graveMaterialColorTexture.repeat.set(1, 1)
graveMaterialNormalTexture.repeat.set(1, 1)
graveMaterialARMTexture.repeat.set(1, 1)

graveMaterialColorTexture.wrapS = THREE.RepeatWrapping
graveMaterialNormalTexture.wrapS = THREE.RepeatWrapping
graveMaterialARMTexture.wrapS = THREE.RepeatWrapping
graveMaterialColorTexture.wrapT = THREE.RepeatWrapping
graveMaterialNormalTexture.wrapT = THREE.RepeatWrapping
graveMaterialARMTexture.wrapT = THREE.RepeatWrapping

/**
 * Lights
 */
// Ambient light
const ambientLight = new THREE.AmbientLight('#86cdff', 0.275)
scene.add(ambientLight)

// Directional light
const directionalLight = new THREE.DirectionalLight('#86cdff', 1)
directionalLight.position.set(3, 2, -8)
scene.add(directionalLight)

// Door light
const doorLight = new THREE.PointLight('#ff7d46', 1, 17)
doorLight.position.set(0, 1.8, 2.9)
house.add(doorLight)

// Ghost lights
const ghost1 = new THREE.PointLight('#ff00ff', 2, 3)
scene.add(ghost1)

const ghost2 = new THREE.PointLight('#00ffff', 2, 3)
scene.add(ghost2)

const ghost3 = new THREE.PointLight('#ffff00', 2, 3)
scene.add(ghost3)

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
camera.position.x = 4
camera.position.y = 2
camera.position.z = 5
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
renderer.shadowMap.type = THREE.PCFSoftShadowMap


// Cast and receive shadows
floor.receiveShadow = true
wallsMesh.castShadow = true
bush1.castShadow = true
bush2.castShadow = true
bush3.castShadow = true
bush4.castShadow = true

directionalLight.castShadow = true
doorLight.castShadow = true
ghost1.castShadow = true
ghost2.castShadow = true
ghost3.castShadow = true

directionalLight.shadow.mapSize.width = 256
directionalLight.shadow.mapSize.height = 256
directionalLight.shadow.camera.far = 15

doorLight.shadow.mapSize.width = 256
doorLight.shadow.mapSize.height = 256
doorLight.shadow.camera.far = 7

ghost1.shadow.mapSize.width = 256
ghost1.shadow.mapSize.height = 256
ghost1.shadow.camera.far = 7

ghost2.shadow.mapSize.width = 256
ghost2.shadow.mapSize.height = 256
ghost2.shadow.camera.far = 7

ghost3.shadow.mapSize.width = 256
ghost3.shadow.mapSize.height = 256
ghost3.shadow.camera.far = 7 

graves.children.forEach((grave) => {
    grave.castShadow = true
})

// Mapping
directionalLight.shadow.mapSize.width = 256
directionalLight.shadow.mapSize.height = 256
directionalLight.shadow.camera.near = 1
directionalLight.shadow.camera.far = 20
directionalLight.shadow.camera.left = -7
directionalLight.shadow.camera.top = 7
directionalLight.shadow.camera.right = 7
directionalLight.shadow.camera.bottom = -7

ghost1.shadow.mapSize.width = 256
ghost1.shadow.mapSize.height = 256
ghost1.shadow.camera.far = 7
ghost1.shadow.camera.near = 0.1
ghost2.shadow.mapSize.width = 256
ghost2.shadow.mapSize.height = 256
ghost2.shadow.camera.far = 7
ghost2.shadow.camera.near = 0.1
ghost3.shadow.mapSize.width = 256
ghost3.shadow.mapSize.height = 256
ghost3.shadow.camera.far = 7
ghost3.shadow.camera.near = 0.1

// Sky
const sky = new Sky()
console.log(sky)
sky.scale.setScalar(100)
scene.add(sky)

const skyUniforms = sky.material.uniforms

skyUniforms['turbidity'].value = 10
skyUniforms['rayleigh'].value = 3
skyUniforms['mieCoefficient'].value = 0.1
skyUniforms['mieDirectionalG'].value = 0.95
skyUniforms['sunPosition'].value.set(0.3, -0.038, -0.95)

scene.fog = new THREE.FogExp2(0x2343f, 0.09)

const listener = new THREE.AudioListener();
camera.add(listener); // Attach listener to your camera

// 2. Create a global audio source
const backgroundSound = new THREE.Audio(listener);

// 3. Use AudioLoader to load the file
const audioLoader = new THREE.AudioLoader();
audioLoader.load('sound/horror.mp3', function(buffer) {
    // 4. Set buffer, loop, volume, and play
    backgroundSound.setBuffer(buffer);
    backgroundSound.setLoop(true); // For background music
    backgroundSound.setVolume(0.5); // Adjust volume (0 to 1)
    backgroundSound.play(); // Start playing
},
// Optional: progress callback
function (xhr) {
    console.log((xhr.loaded / xhr.total * 100) + '% loaded');
},
// Optional: error callback
function (err) {
    console.error('An error happened', err);
});

// IMPORTANT: User Interaction Requirement
// You must start audio after a user action (e.g., a button click).
document.addEventListener('click', () => {
    if (!backgroundSound.isPlaying) {
        backgroundSound.play(); // Or call play() on a button click
    }
}, { once: true }); // { once: true } ensures it only triggers once


/**
 * Animate
 */
const timer = new Timer()

const tick = () =>
{
    // Timer
    timer.update()
    const elapsedTime = timer.getElapsed()

    // Update ghost positions
    const ghost1Angle = elapsedTime * 0.5
    ghost1.position.x = Math.cos(ghost1Angle) * 4
    ghost1.position.z = Math.sin(ghost1Angle) * 4
    ghost1.position.y = Math.sin(elapsedTime * 3)

    const ghost2Angle = -elapsedTime * 0.32
    ghost2.position.x = Math.cos(ghost2Angle) * 5
    ghost2.position.z = Math.sin(ghost2Angle) * 5
    ghost2.position.y = Math.sin(elapsedTime * 4) + Math.sin(elapsedTime * 2.5)

    const ghost3Angle = elapsedTime * 0.18
    ghost3.position.x = Math.cos(ghost3Angle) * (7 + Math.sin(elapsedTime * 0.32))
    ghost3.position.z = Math.sin(ghost3Angle) * (7 + Math.sin(elapsedTime * 0.5))
    ghost3.position.y = Math.sin(elapsedTime * 5) + Math.sin(elapsedTime * 2)

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()