import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { Timer } from 'three/addons/misc/Timer.js'
import { Sky } from 'three/examples/jsm/objects/Sky.js'
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
 * texture
 */
const textureLoader = new THREE.TextureLoader()
// Floor
// const floorAlphaTexture = textureLoader.load('./floor/alpha.jpg')
// const floorColorTexture = textureLoader.load('./floor/aerial_rocks_02/aerial_rocks_02_diff_1k.jpg')
// const floorARMTexture = textureLoader.load('./floor/aerial_rocks_02/aerial_rocks_02_arm_1k.jpg')
// const floorNormalTexture = textureLoader.load('./floor/aerial_rocks_02/aerial_rocks_02_nor_1k.jpg')
// const floorDisplacementTexture = textureLoader.load('./floor/aerial_rocks_02/aerial_rocks_02_disp_1k.jpg')
const floorAlphaTexture = textureLoader.load('./floor/alpha.webp')
const floorColorTexture = textureLoader.load('./floor/coast_sand_rocks_02_1k/coast_sand_rocks_02_diff_1k.webp')
const floorARMTexture = textureLoader.load('./floor/coast_sand_rocks_02_1k/coast_sand_rocks_02_arm_1k.webp')
const floorNormalTexture = textureLoader.load('./floor/coast_sand_rocks_02_1k/coast_sand_rocks_02_nor_gl_1k.webp')
const floorDisplacementTexture = textureLoader.load('./floor/coast_sand_rocks_02_1k/coast_sand_rocks_02_disp_1k.webp')

floorColorTexture.colorSpace = THREE.SRGBColorSpace

floorColorTexture.repeat.set(8, 8)
floorARMTexture.repeat.set(8, 8)
floorNormalTexture.repeat.set(8, 8)
floorDisplacementTexture.repeat.set(8, 8)

floorColorTexture.wrapS = THREE.RepeatWrapping
floorARMTexture.wrapS = THREE.RepeatWrapping
floorNormalTexture.wrapS = THREE.RepeatWrapping
floorDisplacementTexture.wrapS = THREE.RepeatWrapping

floorColorTexture.wrapT = THREE.RepeatWrapping
floorARMTexture.wrapT = THREE.RepeatWrapping
floorNormalTexture.wrapT = THREE.RepeatWrapping
floorDisplacementTexture.wrapT = THREE.RepeatWrapping


// wall
// const wallColorTexture = textureLoader.load('./wall/castle_brick_broken_06_1k/worn_planks_diff_1k.jpg')
// const wallARMTexture = textureLoader.load('./wall/castle_brick_broken_06_1k/worn_planks_arm_1k.jpg')
// const wallNormalTexture = textureLoader.load('./wall/castle_brick_broken_06_1k/worn_planks_nor_1k.jpg')
const wallColorTexture = textureLoader.load('./wall/castle_brick_broken_06_1k/castle_brick_broken_06_diff_1k.webp')
const wallARMTexture = textureLoader.load('./wall/castle_brick_broken_06_1k/castle_brick_broken_06_arm_1k.webp')
const wallNormalTexture = textureLoader.load('./wall/castle_brick_broken_06_1k/castle_brick_broken_06_nor_gl_1k.webp')

wallColorTexture.colorSpace = THREE.SRGBColorSpace

//roof
const roofColorTexture = textureLoader.load('./roof/roof_slates_02_1k/roof_tiles_14_diff_1k.webp')        
const roofARMTexture = textureLoader.load('./roof/roof_slates_02_1k/roof_tiles_14_arm_1k.webp')
const roofNormalTexture = textureLoader.load('./roof/roof_slates_02_1k/roof_tiles_14_nor_gl_1k.webp')
roofColorTexture.colorSpace = THREE.SRGBColorSpace

roofColorTexture.repeat.set(3,2)
roofARMTexture.repeat.set(3,2)
roofNormalTexture.repeat.set(3,2)

roofColorTexture.wrapS = THREE.RepeatWrapping
roofARMTexture.wrapS = THREE.RepeatWrapping
roofNormalTexture.wrapS = THREE.RepeatWrapping

roofColorTexture.wrapT = THREE.RepeatWrapping
roofARMTexture.wrapT = THREE.RepeatWrapping
roofNormalTexture.wrapT = THREE.RepeatWrapping


// bush
const bushColorTexture = textureLoader.load('./bush/leaves_forest_ground_1k/forest_leaves_02_diffuse_1k.webp')
const bushNormalTexture = textureLoader.load('./bush/leaves_forest_ground_1k/forest_leaves_02_nor_gl_1k.webp')
const bushARMTexture = textureLoader.load('./bush/leaves_forest_ground_1k/forest_leaves_02_arm_1k.webp')
bushColorTexture.colorSpace = THREE.SRGBColorSpace

bushColorTexture.repeat.set(2,1)
bushARMTexture.repeat.set(2,1)
bushNormalTexture.repeat.set(2,1)

bushColorTexture.wrapS = THREE.RepeatWrapping
bushARMTexture.wrapS = THREE.RepeatWrapping
bushNormalTexture.wrapS = THREE.RepeatWrapping

//grave
const graveColorTexture = textureLoader.load('./grave/plastered_stone_wall_1k/plastered_stone_wall_diff_1k.webp')
const graveARMTexture = textureLoader.load('./grave/plastered_stone_wall_1k/plastered_stone_wall_arm_1k.webp')
const graveNormalTexture = textureLoader.load('./grave/plastered_stone_wall_1k/plastered_stone_wall_nor_gl_1k.webp')

graveColorTexture.colorSpace = THREE.SRGBColorSpace

graveColorTexture.repeat.set(0.3, 0.4)
graveARMTexture.repeat.set(0.3, 0.4)
graveNormalTexture.repeat.set(0.3, 0.4)

//door
const doorColorTexture = textureLoader.load('./door/color.webp')
const doorNormalTexture = textureLoader.load('./door/normal.webp')
const doorAlphaTexture = textureLoader.load('./door/alpha.webp')
const doorMetalnessTexture = textureLoader.load('./door/metalness.webp')
const doorRoughnessTexture = textureLoader.load('./door/roughness.webp')
const doorHeightTexture = textureLoader.load('./door/height.webp')
const doorAmbientOcclusionTexture = textureLoader.load('./door/ambientOcclusion.webp')

doorColorTexture.colorSpace = THREE.SRGBColorSpace

//window
const windowColorTexture = textureLoader.load('./window/Wood_Window_Basecolor.webp')
const windowNormalTexture = textureLoader.load('./window/Wood_Window_SD.webp')
const windowRoughnessTexture = textureLoader.load('./window/Wood_Window_Roughness.webp')
const windowAmbientOcclusionTexture = textureLoader.load('./window/Wood_Window_AmbientOcclusion.webp')
const windowOpacityTexture = textureLoader.load('./window/Wood_Window_opacity.webp')
const windowHeightTexture = textureLoader.load('./window/Wood_Window__Height.webp')
const windowMetalnessTexture = textureLoader.load('./window/Wood_Window_Metalness.webp')

windowColorTexture.colorSpace = THREE.SRGBColorSpace

windowColorTexture.repeat.set(0.5, 0.5)

/** 
 * House
 */

// Floor
const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(20, 20, 100, 100),
    new THREE.MeshStandardMaterial({
        alphaMap: floorAlphaTexture,
        transparent: true,
        map: floorColorTexture,
        aoMap: floorARMTexture,
        roughnessMap: floorARMTexture,
        metalnessMap: floorARMTexture,
        normalMap: floorNormalTexture,
        displacementMap: floorDisplacementTexture,
        displacementScale: 0.3,
        displacementBias: - 0.2
    })
)
floor.rotation.x = - Math.PI/2
scene.add(floor)

gui.add(floor.material, 'displacementScale').min(0).max(1).step(0.001).name('floorDisplacementScale')
gui.add(floor.material, 'displacementBias').min(-1).max(1).step(0.001).name('floorDisplacementBias')

//House group
const house = new THREE.Group()
scene.add(house)

// Walls
const walls = new THREE.Mesh(
    new THREE.BoxGeometry(4, 2.5, 4), //width, height, depth
    new THREE.MeshStandardMaterial({
        map: wallColorTexture,
        aoMap: wallARMTexture,
        roughnessMap: wallARMTexture,
        metalnessMap: wallARMTexture,
        normalMap: wallNormalTexture
    })
)
walls.position.y += (2.5/2)
house.add(walls)

// second floor
const walls2 = new THREE.Mesh(
    new THREE.BoxGeometry(4, 2.5, 4),
    new THREE.MeshStandardMaterial({
        map: wallColorTexture,
        aoMap: wallARMTexture,
        roughnessMap: wallARMTexture,
        metalnessMap: wallARMTexture,
        normalMap: wallNormalTexture
    })
)
walls2.position.y += (2.5/2) + 2.5
walls2.rotation.y = Math.PI/12
house.add(walls2)


// Roof
const roof = new THREE.Mesh(
    new THREE.ConeGeometry(3.5, 1.5, 4),
    new THREE.MeshStandardMaterial({
        map: roofColorTexture,
        aoMap: roofARMTexture,
        roughnessMap: roofARMTexture,
        metalnessMap: roofARMTexture,
        normalMap: roofNormalTexture
    })
)

roof.position.y += + 2.5 + 2.5 + 0.75
roof.rotation.y = Math.PI/4 + Math.PI/12   
house.add(roof)



// Door
const door = new THREE.Mesh(
    new THREE.PlaneGeometry(2.2, 2.2, 100, 100),
    new THREE.MeshStandardMaterial(
    {
        map: doorColorTexture,
        alphaMap: doorAlphaTexture,
        transparent: true,
        normalMap: doorNormalTexture,
        aoMap: doorAmbientOcclusionTexture,
        metalnessMap: doorMetalnessTexture,
        roughnessMap: doorRoughnessTexture,
        displacementMap: doorHeightTexture,  
        displacementScale: 0.15,
        displacementBias: -0.04,  
    })
)
gui.add(door.material, 'displacementScale').min(0).max(1).step(0.001).name('doorDisplacementScale')
gui.add(door.material, 'displacementBias').min(-1).max(1).step(0.001).name('doorDisplacementBias')
door.position.y += 1
door.position.z += 2 + 0.001

house.add(door)


//windows
const windowMesh = new THREE.Mesh(
    new THREE.PlaneGeometry(1, 1.2, 100, 100), //width, height, widthSegments, heightSegments
    new THREE.MeshStandardMaterial({
        map: windowColorTexture,
        normalMap: windowNormalTexture,
        roughnessMap: windowRoughnessTexture,
        aoMap: windowAmbientOcclusionTexture,
        alphaMap: windowOpacityTexture,
        displacementMap: windowHeightTexture,
        metalnessMap: windowMetalnessTexture,
        displacementScale: 0.0001,
        displacementBias: 0.646
    })
);
gui.add(windowMesh.material, 'displacementScale').min(0).max(1).step(0.001).name('windowDisplacementScale')
gui.add(windowMesh.material, 'displacementBias').min(-1).max(1).step(0.001).name('windowDisplacementBias')
windowMesh.position.y += 3.8
// move window closer to camera
windowMesh.position.z += 1
windowMesh.rotation.y = Math.PI/12
windowMesh.position.x += 1.5

// add another window, but shift it to the left
const windowMesh2 = new THREE.Mesh(
    new THREE.PlaneGeometry(1, 1.2, 100, 100), 
    new THREE.MeshStandardMaterial({
        map: windowColorTexture,
        normalMap: windowNormalTexture,
        roughnessMap: windowRoughnessTexture,
        aoMap: windowAmbientOcclusionTexture,
        alphaMap: windowOpacityTexture,
        displacementMap: windowHeightTexture,
        metalnessMap: windowMetalnessTexture,
        displacementScale: 0.0001,
        displacementBias: 0.528
    })
);
gui.add(windowMesh2.material, 'displacementScale').min(0).max(1).step(0.001).name('windowDisplacementScale')
gui.add(windowMesh2.material, 'displacementBias').min(-1).max(1).step(0.001).name('windowDisplacementBias')
windowMesh2.position.y += 3.8
// move window closer to camera
windowMesh2.position.z += 1.8
windowMesh2.rotation.y = Math.PI/12
windowMesh2.position.x -= 0.7

house.add(windowMesh2)

house.add(windowMesh)
// Bushes
const bushGeometry = new THREE.SphereGeometry(1, 16, 16)
const bushMaterial = new THREE.MeshStandardMaterial({
    color: '#89c854',
    map: bushColorTexture,
    aoMap: bushARMTexture,
    roughnessMap: bushARMTexture,
    metalnessMap: bushARMTexture,
    normalMap: bushNormalTexture
})

const bush1 = new THREE.Mesh(bushGeometry, bushMaterial)
bush1.scale.set(0.5, 0.5, 0.5)
bush1.position.set(0.8, 0.2, 2.2)
bush1.rotation.x = -0.75

const bush2 = new THREE.Mesh(bushGeometry, bushMaterial)
bush2.scale.set(0.25, 0.25, 0.25)
bush2.position.set(1.4, 0.1, 2.1)
bush2.rotation.x = -0.75

const bush3 = new THREE.Mesh(bushGeometry, bushMaterial)
bush3.scale.set(0.4, 0.4, 0.4)
bush3.position.set(-0.8, 0.1, 2.2)
bush3.rotation.x = -0.75

const bush4 = new THREE.Mesh(bushGeometry, bushMaterial)
bush4.scale.set(0.15, 0.15, 0.15)
bush4.position.set(-1, 0.05, 2.6)
bush4.rotation.x = -0.75

house.add(bush1, bush2, bush3, bush4)

// Graves
const graveGeometry = new THREE.BoxGeometry(0.6, 0.8, 0.2)
const graveMaterial = new THREE.MeshStandardMaterial({
    map: graveColorTexture,
    aoMap: graveARMTexture,
    roughnessMap: graveARMTexture,
    metalnessMap: graveARMTexture,
    normalMap: graveNormalTexture

})

const graves = new THREE.Group()
scene.add(graves)

for(let i = 0; i < 30; i++){
    //place graves all around the house
    const angle = Math.random() * Math.PI * 2 //random angle between 0 and full circle
    const radius = 3 + Math.random() * 4 //random radius between 4 and 10

    const x = Math.sin(angle) * radius
    const z = Math.cos(angle) * radius
    // this gets a position on circle
    //mesh
    const grave = new THREE.Mesh(graveGeometry, graveMaterial)
    grave.position.x = x
    grave.position.y = Math.random() * 0.4
    grave.position.z = z

    grave.rotation.x = (Math.random() - 0.5) *0.4
    grave.rotation.y = (Math.random() - 0.5) *0.4
    grave.rotation.z = (Math.random() - 0.5) *0.4

    
    // add grave to group
    graves.add(grave)
}

/**
 * Lights
 */
// Ambient light
const ambientLight = new THREE.AmbientLight('#86cdff', 0.275)
scene.add(ambientLight)
gui.addColor(ambientLight, 'color').name('ambientLightColor')

// Directional light
const directionalLight = new THREE.DirectionalLight('#86cdff', 1.5)
directionalLight.position.set(3, 2, -8)
scene.add(directionalLight)
gui.addColor(directionalLight, 'color').name('directionalLightColor')

// Door light
const doorLight = new THREE.PointLight('#ff7d46', 5)
doorLight.position.set(0, 2.2, 2.5)
house.add(doorLight)
gui.addColor(doorLight, 'color').name('doorLightColor')

// Window light
const windowLight = new THREE.PointLight('#ff7d46', 5)
windowLight.position.set(1.8, 5, 2.5) //x, y, z
house.add(windowLight)

// Window light 2
const windowLight2 = new THREE.PointLight('#ff7d46', 5)
windowLight2.position.set(-0.5, 5, 2.3) //x, y, z
house.add(windowLight2)


// Ghost light
const ghost1 = new THREE.PointLight('#8800ff', 6)
const ghost2 = new THREE.PointLight('#00ff88', 6)
const ghost3 = new THREE.PointLight('#ff0088', 6)
scene.add(ghost1, ghost2, ghost3)

// gui.addColor(ghost1, 'color').name('ghost1Color')
// gui.addColor(ghost2, 'color').name('ghost2Color')
// gui.addColor(ghost3, 'color').name('ghost3Color')




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

// Shadows
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap
//cast and receive shadows
directionalLight.castShadow = true
ghost1.castShadow = true
ghost2.castShadow = true
ghost3.castShadow = true

walls.castShadow = true
walls.receiveShadow = true
roof.castShadow = true
floor.receiveShadow = true
walls2.castShadow = true
walls2.receiveShadow = true

for(const grave of graves.children){
    grave.castShadow = true
    grave.receiveShadow = true
}

//mapping
//use helper to tweak values
directionalLight.shadow.mapSize.width = 256
directionalLight.shadow.mapSize.height = 256
directionalLight.shadow.camera.top = 8
directionalLight.shadow.camera.right = 8
directionalLight.shadow.camera.bottom = -8
directionalLight.shadow.camera.left = -8
directionalLight.shadow.camera.near = 1
directionalLight.shadow.camera.far = 20

ghost1.shadow.mapSize.width = 256
ghost1.shadow.mapSize.height = 256
ghost1.shadow.camera.far = 10

ghost2.shadow.mapSize.width = 256
ghost2.shadow.mapSize.height = 256
ghost2.shadow.camera.far = 10

ghost3.shadow.mapSize.width = 256
ghost3.shadow.mapSize.height = 256
ghost3.shadow.camera.far = 10

/**Sky
 * 
 */

const sky = new Sky()
sky.scale.setScalar(100, 100, 100)
scene.add(sky)

sky.material.uniforms['turbidity'].value = 10
sky.material.uniforms['rayleigh'].value = 3
sky.material.uniforms['mieCoefficient'].value = 0.1
sky.material.uniforms['mieDirectionalG'].value = 0.95
sky.material.uniforms['sunPosition'].value.set(0.3, -0.038, -0.95)

// fog
scene.fog = new THREE.FogExp2('#11343f', 0.1) //color, near, far

/**
 * Animate
 */
const timer = new Timer()

const tick = () =>
{
    // Timer
    timer.update()
    const elapsedTime = timer.getElapsed()

    // Update ghost
    const ghost1Angle = elapsedTime * 0.5
    ghost1.position.x = Math.cos(ghost1Angle) * 4
    ghost1.position.z = Math.sin(ghost1Angle) * 4
    ghost1.position.y = Math.sin(ghost1Angle * 2.3) * Math.sin(ghost1Angle*1.2) * Math.sin(ghost1Angle*0.8)

    const ghost2Angle = - elapsedTime * 0.37
    ghost2.position.x = Math.cos(ghost2Angle) * 5
    ghost2.position.z = Math.sin(ghost2Angle) * 5
    ghost2.position.y = Math.sin(ghost2Angle * 3.2) * Math.sin(ghost2Angle*2.1) * Math.sin(ghost2Angle*0.2)

    const ghost3Angle = elapsedTime * 0.2
    ghost3.position.x = Math.cos(ghost3Angle) * 6
    ghost3.position.z = Math.sin(ghost3Angle) * 6
    ghost3.position.y = Math.sin(ghost3Angle * 1.2) * Math.sin(ghost3Angle*0.8) * Math.sin(ghost3Angle*2.1)
    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()