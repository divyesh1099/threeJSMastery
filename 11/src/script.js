import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import GUI from 'lil-gui'
import { RGBELoader } from 'three/examples/jsm/Addons.js';
console.log(RGBELoader)
/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Debug
 */
const gui = new GUI({ width: 320, title: 'Debug Panel' })
gui.close()

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader();
const doorColorTexture = textureLoader.load('/textures/door/color.jpg');
const doorAlphaTexture = textureLoader.load('/textures/door/alpha.jpg');
const doorAmbientOcclusionTexture = textureLoader.load('/textures/door/ambientOcclusion.jpg');
const doorHeightTexture = textureLoader.load('/textures/door/height.jpg');
const doorNormalTexture = textureLoader.load('/textures/door/normal.jpg');
const doorMetalnessTexture = textureLoader.load('/textures/door/metalness.jpg');
const doorRoughnessTexture = textureLoader.load('/textures/door/roughness.jpg');
const matcapTexture1 = textureLoader.load('/textures/matcaps/1.png');
const matcapTexture2 = textureLoader.load('/textures/matcaps/2.png');
const matcapTexture3 = textureLoader.load('/textures/matcaps/3.png');
const matcapTexture4 = textureLoader.load('/textures/matcaps/4.png');
const matcapTexture5 = textureLoader.load('/textures/matcaps/5.png');
const matcapTexture6 = textureLoader.load('/textures/matcaps/6.png');
const matcapTexture7 = textureLoader.load('/textures/matcaps/7.png');
const matcapTexture8 = textureLoader.load('/textures/matcaps/8.png');
const gradientTexture = textureLoader.load('/textures/gradients/3.jpg');

doorColorTexture.colorSpace = THREE.SRGBColorSpace;
doorAlphaTexture.colorSpace = THREE.SRGBColorSpace;
doorAmbientOcclusionTexture.colorSpace = THREE.SRGBColorSpace;
doorHeightTexture.colorSpace = THREE.SRGBColorSpace;
doorNormalTexture.colorSpace = THREE.SRGBColorSpace;
doorMetalnessTexture.colorSpace = THREE.SRGBColorSpace;
doorRoughnessTexture.colorSpace = THREE.SRGBColorSpace;
matcapTexture1.colorSpace = THREE.SRGBColorSpace;
matcapTexture2.colorSpace = THREE.SRGBColorSpace;
matcapTexture3.colorSpace = THREE.SRGBColorSpace;
matcapTexture4.colorSpace = THREE.SRGBColorSpace;
matcapTexture5.colorSpace = THREE.SRGBColorSpace;
matcapTexture6.colorSpace = THREE.SRGBColorSpace;
matcapTexture7.colorSpace = THREE.SRGBColorSpace;
matcapTexture8.colorSpace = THREE.SRGBColorSpace;
gradientTexture.colorSpace = THREE.SRGBColorSpace;


gradientTexture.minFilter = THREE.NearestFilter;
gradientTexture.magFilter = THREE.NearestFilter;
gradientTexture.generateMipmaps = false;


/**
 * Mesh, Geometry, Material
 */

const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);
const planeGeometry = new THREE.PlaneGeometry(2, 2, 32, 32);
const torusGeometry = new THREE.TorusGeometry(0.65, 0.35, 16, 100);

const geometries = [sphereGeometry, planeGeometry, torusGeometry];
geometries.forEach((geometry) =>
{
    geometry.setAttribute('uv2', new THREE.BufferAttribute(geometry.attributes.uv.array, 2));
});

const material = new THREE.MeshBasicMaterial({ map: doorColorTexture });
const normalMaterial = new THREE.MeshNormalMaterial({wireframe: true});
const matCapMaterial = new THREE.MeshMatcapMaterial({ matcap: matcapTexture8 });
const meshDepthMaterial = new THREE.MeshDepthMaterial();
const meshLambertMaterial = new THREE.MeshLambertMaterial();
const meshPhongMaterial = new THREE.MeshPhongMaterial();
const meshToonMaterial = new THREE.MeshToonMaterial({ gradientMap: gradientTexture });
const meshStandardMaterial = new THREE.MeshStandardMaterial();
const meshPhysicalMaterial = new THREE.MeshPhysicalMaterial();

meshPhongMaterial.shininess = 100;
meshPhongMaterial.specular = new THREE.Color(0x1188ff);

meshStandardMaterial.metalness = 0.7;
meshStandardMaterial.roughness = 0.2;
meshStandardMaterial.aoMapIntensity = 1;
meshStandardMaterial.displacementScale = 0;
meshStandardMaterial.normalScale.set(1, 1);
meshStandardMaterial.wireframe = false;

meshPhysicalMaterial.metalness = 0.7;
meshPhysicalMaterial.roughness = 0.2;
meshPhysicalMaterial.aoMapIntensity = 1;
meshPhysicalMaterial.displacementScale = 0;
meshPhysicalMaterial.normalScale.set(1, 1);
meshPhysicalMaterial.wireframe = false;
meshPhysicalMaterial.clearcoat = 0.5;
meshPhysicalMaterial.clearcoatRoughness = 0.1;
meshPhysicalMaterial.iridescence = 0.3;

const materials = {
    standard: meshStandardMaterial,
    physical: meshPhysicalMaterial,
    basic: material,
    normal: normalMaterial,
    matcap: matCapMaterial,
    depth: meshDepthMaterial,
    lambert: meshLambertMaterial,
    phong: meshPhongMaterial,
    toon: meshToonMaterial
};

const sphere = new THREE.Mesh(sphereGeometry, meshStandardMaterial);
const plane = new THREE.Mesh(planeGeometry, meshStandardMaterial);
const torus = new THREE.Mesh(torusGeometry, meshStandardMaterial);

scene.add(sphere, plane, torus);

const meshes = [sphere, plane, torus];

const ambientlight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientlight);

const pointLight = new THREE.PointLight(0xffffff, 30);
pointLight.position.x = 2;
pointLight.position.y = 3;
pointLight.position.z = 4;
scene.add(pointLight);

const rgbeLoader = new RGBELoader();
rgbeLoader.load('/textures/environmentMap/2k.hdr', (texture) =>
{
    texture.mapping = THREE.EquirectangularReflectionMapping;
    scene.background = texture;
    scene.environment = texture;
});

const axesHelper = new THREE.AxesHelper(5);
axesHelper.visible = false;
scene.add(axesHelper);

const matcaps = {
    matcap1: matcapTexture1,
    matcap2: matcapTexture2,
    matcap3: matcapTexture3,
    matcap4: matcapTexture4,
    matcap5: matcapTexture5,
    matcap6: matcapTexture6,
    matcap7: matcapTexture7,
    matcap8: matcapTexture8
};

const debugObject = {
    materialType: 'standard',
    matcap: 'matcap8',
    wireframe: false,
    useDoorTextures: false,
    rotationSpeedX: 0.15,
    rotationSpeedY: 0.1,
    showAxesHelper: false,
    ambientColor: '#ffffff',
    pointLightColor: '#ffffff',
    normalScale: 1,
    displacementScale: 0,
    aoMapIntensity: 1,
    shininess: meshPhongMaterial.shininess,
    specularColor: '#1188ff'
};

const setWireframe = (value) =>
{
    Object.values(materials).forEach((mat) =>
    {
        if ('wireframe' in mat)
        {
            mat.wireframe = value;
            mat.needsUpdate = true;
        }
    });
};

const setMatcapTexture = (key) =>
{
    matCapMaterial.matcap = matcaps[key];
    matCapMaterial.needsUpdate = true;
};

const applyMaterial = (key) =>
{
    const targetMaterial = materials[key];
    meshes.forEach((mesh) =>
    {
        mesh.material = targetMaterial;
    });
};

const applyDoorTextures = (enabled) =>
{
    meshStandardMaterial.map = enabled ? doorColorTexture : null;
    meshStandardMaterial.aoMap = enabled ? doorAmbientOcclusionTexture : null;
    meshStandardMaterial.displacementMap = enabled ? doorHeightTexture : null;
    meshStandardMaterial.normalMap = enabled ? doorNormalTexture : null;
    meshStandardMaterial.metalnessMap = enabled ? doorMetalnessTexture : null;
    meshStandardMaterial.roughnessMap = enabled ? doorRoughnessTexture : null;
    meshStandardMaterial.alphaMap = enabled ? doorAlphaTexture : null;
    meshStandardMaterial.transparent = enabled;
    meshStandardMaterial.displacementScale = enabled ? debugObject.displacementScale : 0;
    meshStandardMaterial.needsUpdate = true;

    meshPhysicalMaterial.needsUpdate = true;
    meshPhysicalMaterial.map = enabled ? doorColorTexture : null;
    meshPhysicalMaterial.aoMap = enabled ? doorAmbientOcclusionTexture : null;
    meshPhysicalMaterial.displacementMap = enabled ? doorHeightTexture : null;
    meshPhysicalMaterial.normalMap = enabled ? doorNormalTexture : null;
    meshPhysicalMaterial.metalnessMap = enabled ? doorMetalnessTexture : null;
    meshPhysicalMaterial.roughnessMap = enabled ? doorRoughnessTexture : null;
    meshPhysicalMaterial.alphaMap = enabled ? doorAlphaTexture : null;
    meshPhysicalMaterial.transparent = enabled;
    meshPhysicalMaterial.displacementScale = enabled ? debugObject.displacementScale : 0;
    meshPhysicalMaterial.needsUpdate = true;
    meshPhysicalMaterial.clearcoat = 0.5;
    meshPhysicalMaterial.clearcoatRoughness = 0.1;
};

const setNormalScale = (value) =>
{
    meshStandardMaterial.normalScale.set(value, value);
    meshStandardMaterial.needsUpdate = true;

    meshPhysicalMaterial.normalScale.set(value, value);
    meshPhysicalMaterial.needsUpdate = true;
};

const setPhongSpecular = (value) =>
{
    meshPhongMaterial.specular = new THREE.Color(value);
    meshPhongMaterial.needsUpdate = true;
};

const addMeshFolder = (parentFolder, mesh, name, defaults) =>
{
    const folder = parentFolder.addFolder(name);
    folder.add(mesh.position, 'x', -5, 5, 0.01).name('Pos X');
    folder.add(mesh.position, 'y', -5, 5, 0.01).name('Pos Y');
    folder.add(mesh.position, 'z', -5, 5, 0.01).name('Pos Z');
    folder.add(mesh.rotation, 'x', -Math.PI, Math.PI, 0.01).name('Rot X');
    folder.add(mesh.rotation, 'y', -Math.PI, Math.PI, 0.01).name('Rot Y');
    folder.add(mesh.rotation, 'z', -Math.PI, Math.PI, 0.01).name('Rot Z');
    folder.add(mesh.scale, 'x', 0.1, 5, 0.01).name('Scale X');
    folder.add(mesh.scale, 'y', 0.1, 5, 0.01).name('Scale Y');
    folder.add(mesh.scale, 'z', 0.1, 5, 0.01).name('Scale Z');
    folder.add(mesh, 'visible').name('Visible');
    folder.add({ reset: () =>
    {
        mesh.position.copy(defaults.position);
        mesh.rotation.copy(defaults.rotation);
        mesh.scale.copy(defaults.scale);
    } }, 'reset').name('Reset Transform');
};

setMatcapTexture(debugObject.matcap);
applyMaterial(debugObject.materialType);
setWireframe(debugObject.wireframe);
applyDoorTextures(debugObject.useDoorTextures);
setNormalScale(debugObject.normalScale);
meshStandardMaterial.aoMapIntensity = debugObject.aoMapIntensity;
setPhongSpecular(debugObject.specularColor);

sphere.position.x = -3;
torus.position.x = 3;
const defaultTransforms = {
    sphere: {
        position: sphere.position.clone(),
        rotation: sphere.rotation.clone(),
        scale: sphere.scale.clone()
    },
    plane: {
        position: plane.position.clone(),
        rotation: plane.rotation.clone(),
        scale: plane.scale.clone()
    },
    torus: {
        position: torus.position.clone(),
        rotation: torus.rotation.clone(),
        scale: torus.scale.clone()
    }
};
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
controls.minDistance = 0.1
controls.maxDistance = 30

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Debug UI
 */
const sceneFolder = gui.addFolder('Scene');
sceneFolder.close();
sceneFolder.add(debugObject, 'showAxesHelper').name('Axes Helper').onChange((value) =>
{
    axesHelper.visible = value;
});
sceneFolder.addColor({ background: '#000000' }, 'background').name('Background').onChange((value) =>
{
    scene.background = new THREE.Color(value);
});

const cameraFolder = gui.addFolder('Camera');
cameraFolder.close();
cameraFolder.add(camera.position, 'x', -10, 10, 0.01).name('Pos X');
cameraFolder.add(camera.position, 'y', -10, 10, 0.01).name('Pos Y');
cameraFolder.add(camera.position, 'z', -10, 10, 0.01).name('Pos Z');
cameraFolder.add(camera, 'fov', 20, 120, 1).name('FOV').onChange(() =>
{
    camera.updateProjectionMatrix();
});
cameraFolder.add(camera, 'near', 0.01, 10, 0.01).name('Near').onChange(() =>
{
    camera.updateProjectionMatrix();
});
cameraFolder.add(camera, 'far', 1, 200, 1).name('Far').onChange(() =>
{
    camera.updateProjectionMatrix();
});
cameraFolder.add({
    reset: () =>
    {
        camera.position.set(1, 1, 2);
        camera.lookAt(new THREE.Vector3());
        controls.target.set(0, 0, 0);
        controls.update();
        camera.updateProjectionMatrix();
    }
}, 'reset').name('Reset Camera');

const controlsFolder = gui.addFolder('Orbit Controls');
controlsFolder.close();
controlsFolder.add(controls, 'enableDamping').name('Damping');
controlsFolder.add(controls, 'autoRotate').name('Auto Rotate');
controlsFolder.add(controls, 'autoRotateSpeed', -5, 5, 0.01).name('Rotate Speed');
controlsFolder.add(controls, 'enableZoom').name('Zoom Enabled');
controlsFolder.add(controls, 'enablePan').name('Pan Enabled');
controlsFolder.add(controls, 'minDistance', 0.1, 10, 0.1).name('Min Distance');
controlsFolder.add(controls, 'maxDistance', 1, 30, 0.1).name('Max Distance');

const lightsFolder = gui.addFolder('Lights');
lightsFolder.close();
const ambientFolder = lightsFolder.addFolder('Ambient');
ambientFolder.close();
ambientFolder.add(ambientlight, 'intensity', 0, 5, 0.01).name('Intensity');
ambientFolder.addColor(debugObject, 'ambientColor').name('Color').onChange((value) =>
{
    ambientlight.color = new THREE.Color(value);
});

const pointLightFolder = lightsFolder.addFolder('Point Light');
pointLightFolder.close();
pointLightFolder.add(pointLight, 'intensity', 0, 50, 0.1).name('Intensity');
pointLightFolder.add(pointLight, 'distance', 0, 50, 0.1).name('Distance');
pointLightFolder.add(pointLight, 'decay', 0, 5, 0.01).name('Decay');
pointLightFolder.add(pointLight.position, 'x', -10, 10, 0.01).name('Pos X');
pointLightFolder.add(pointLight.position, 'y', -10, 10, 0.01).name('Pos Y');
pointLightFolder.add(pointLight.position, 'z', -10, 10, 0.01).name('Pos Z');
pointLightFolder.addColor(debugObject, 'pointLightColor').name('Color').onChange((value) =>
{
    pointLight.color = new THREE.Color(value);
});

const materialFolder = gui.addFolder('Material');
materialFolder.add(debugObject, 'materialType', Object.keys(materials)).name('Type').onChange((value) =>
{
    applyMaterial(value);
});
materialFolder.add(debugObject, 'wireframe').name('Wireframe').onChange((value) =>
{
    setWireframe(value);
});
materialFolder.add(debugObject, 'useDoorTextures').name('Door Textures').onChange((value) =>
{
    applyDoorTextures(value);
});
materialFolder.add(meshStandardMaterial, 'metalness', 0, 1, 0.01).name('Std Metalness');
materialFolder.add(meshStandardMaterial, 'roughness', 0, 1, 0.01).name('Std Roughness');
materialFolder.add(debugObject, 'aoMapIntensity', 0, 5, 0.01).name('AO Intensity').onChange((value) =>
{
    meshStandardMaterial.aoMapIntensity = value;
    meshStandardMaterial.needsUpdate = true;
});
materialFolder.add(debugObject, 'displacementScale', 0, 0.5, 0.001).name('Displace Scale').onChange((value) =>
{
    meshStandardMaterial.displacementScale = debugObject.useDoorTextures ? value : 0;
});
materialFolder.add(debugObject, 'normalScale', 0, 5, 0.01).name('Normal Scale').onChange((value) =>
{
    setNormalScale(value);
});
materialFolder.add(debugObject, 'matcap', Object.keys(matcaps)).name('Matcap').onChange((value) =>
{
    setMatcapTexture(value);
});
materialFolder.add(meshPhysicalMaterial, 'metalness', 0, 1, 0.01).name('Phys Metalness');
materialFolder.add(meshPhysicalMaterial, 'roughness', 0, 1, 0.01).name('Phys Roughness');
materialFolder.add(debugObject, 'aoMapIntensity', 0, 5, 0.01).name('AO Intensity').onChange((value) =>
{
    meshPhysicalMaterial.aoMapIntensity = value;
    meshPhysicalMaterial.needsUpdate = true;
});
materialFolder.add(debugObject, 'displacementScale', 0, 0.5, 0.001).name('Displace Scale').onChange((value) =>
{
    meshPhysicalMaterial.displacementScale = debugObject.useDoorTextures ? value : 0;
});
materialFolder.add(debugObject, 'normalScale', 0, 5, 0.01).name('Normal Scale').onChange((value) =>
{
    setNormalScale(value);
});

const phongFolder = materialFolder.addFolder('Phong');
phongFolder.close();
phongFolder.add(debugObject, 'shininess', 0, 500, 1).name('Shininess').onChange((value) =>
{
    meshPhongMaterial.shininess = value;
    meshPhongMaterial.needsUpdate = true;
});
phongFolder.addColor(debugObject, 'specularColor').name('Specular').onChange((value) =>
{
    setPhongSpecular(value);
});

const meshesFolder = gui.addFolder('Meshes');
meshesFolder.close();
addMeshFolder(meshesFolder, sphere, 'Sphere', defaultTransforms.sphere);
addMeshFolder(meshesFolder, plane, 'Plane', defaultTransforms.plane);
addMeshFolder(meshesFolder, torus, 'Torus', defaultTransforms.torus);

const animationFolder = gui.addFolder('Animation');
animationFolder.close();
const rotXController = animationFolder.add(debugObject, 'rotationSpeedX', -2, 2, 0.01).name('Rot Speed X');
const rotYController = animationFolder.add(debugObject, 'rotationSpeedY', -2, 2, 0.01).name('Rot Speed Y');
animationFolder.add({
    stop: () =>
    {
        debugObject.rotationSpeedX = 0;
        debugObject.rotationSpeedY = 0;
        rotXController.updateDisplay();
        rotYController.updateDisplay();
    }
}, 'stop').name('Stop Rotation');

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update objects
    meshes.forEach((mesh) =>
    {
        mesh.rotation.y = debugObject.rotationSpeedY * elapsedTime
        mesh.rotation.x = debugObject.rotationSpeedX * elapsedTime
    })

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()
