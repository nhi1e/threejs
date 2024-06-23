import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import GUI from 'lil-gui'
// import CANNON from 'cannon'
import * as CANNON from 'cannon-es'
// import { radToDeg } from 'three/src/math/MathUtils.js'

/**
 * Debug
 */
const gui = new GUI()
const debugObject = {} // to store create sphere function
debugObject.createSphere = () => {
    createSphere(
        Math.random() * 0.5, 
        {
            x: (Math.random() - 0.5) * 3,
            y: 3, 
            z: (Math.random() - 0.5) * 3
        }
    )
}
gui.add(debugObject, 'createSphere')

debugObject.createBox = () => {
    createBox(
        Math.random(), 
        Math.random(), 
        Math.random(), 
        {
            x: (Math.random() - 0.5) * 3,
            y: 3, 
            z: (Math.random() - 0.5) * 3
        }
    )
}
gui.add(debugObject, 'createBox')

debugObject.reset = () => {
    for (const object of objectsToUpdate) {
        //remove body
        object.body.removeEventListener('collide', playHitSound)
        world.removeBody(object.body)
        //remove mesh
        scene.remove(object.mesh)
    }
    objectsToUpdate.splice(0, objectsToUpdate.length) //empty the array

}
gui.add(debugObject, 'reset')


// press s to use createSphere from debugObject
window.addEventListener('keypress', (e) => {
    if(e.key === 's') {
        debugObject.createSphere()
    }
    if(e.key === 'b') {
        debugObject.createBox()
    }
}
)

// press r to delete all objects
window.addEventListener('keypress', (e) => {
    if(e.key === 'r') {
        debugObject.reset()
    }
})



/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')


// Scene
const scene = new THREE.Scene()

// Audio
const hitSound = new Audio('/sounds/hit.mp3')
const playHitSound = (collision) => {
    const impactStrength = collision.contact.getImpactVelocityAlongNormal()
    if(impactStrength > 1.5) {
        hitSound.volume = Math.random()
        hitSound.currentTime = 0
        hitSound.play()
    }
}

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()
const cubeTextureLoader = new THREE.CubeTextureLoader()

const environmentMapTexture = cubeTextureLoader.load([
    '/textures/environmentMaps/0/px.png',
    '/textures/environmentMaps/0/nx.png',
    '/textures/environmentMaps/0/py.png',
    '/textures/environmentMaps/0/ny.png',
    '/textures/environmentMaps/0/pz.png',
    '/textures/environmentMaps/0/nz.png'
])

/**
 * Physics
 */

// physics world
const world = new CANNON.World() //empty space
world.broadphase = new CANNON.SAPBroadphase(world) // broadphase to improve performance, instead of checking all objects, it checks only the ones that are close to each other  
world.allowSleep = true // sleep mode for objects that are not moving
world.gravity.set(0, -9.82, 0)   // vec3 like threejs vector3, x,y,z - gravity


// Material
// const concreteMaterial = new CANNON.Material('concrete')
// const plasticMaterial = new CANNON.Material('plastic')
// //what happends when concrete and plastic collide
// const concretePlasticContactMaterial = new CANNON.ContactMaterial(
//     concreteMaterial,
//     plasticMaterial,
//     {
//         friction: 0.5, // 0-1 default 0.3
//         restitution: 0.7 // 0-1 default 0.3 bounciness
//     }
// )
const defaultMaterial = new CANNON.Material('default')
const defaultContactMaterial = new CANNON.ContactMaterial(
    defaultMaterial,
    defaultMaterial,
    {
        friction: 0.1,      // 0-1 default 0.3
        restitution: 0.7 // 0-1 default 0.3 bounciness
    }
)
world.addContactMaterial(defaultContactMaterial)
world.defaultContactMaterial = defaultContactMaterial // all world objects will use this material


// Boundary planes setup
function setupBoundaryPlanes() {
    const createPlane = (position, rotation) => {
        const planeShape = new CANNON.Plane()
        const planeBody = new CANNON.Body({ mass: 0 })
        planeBody.addShape(planeShape)
        planeBody.quaternion.setFromEuler(...rotation) 
        planeBody.position.set(...position) 
        world.addBody(planeBody)
    }

    // createPlane([-5, 0, 0], [0, Math.PI / 2, 0]) // Plane -x 
    // createPlane([5, 0, 0], [0, -Math.PI / 2, 0]) // Plane +x
    // createPlane([0, 0, -5], [0, 0, 0]) // Plane -z
    // createPlane([0, 0, 5], [0, Math.PI, 0]) // Plane +z
    createPlane([-2.5, 0, 0], [0, Math.PI / 2, 0]) // Plane -x 
    createPlane([2.5, 0, 0], [0, -Math.PI / 2, 0]) // Plane +x
    createPlane([0, 0, -2.5], [0, 0, 0]) // Plane -z
    createPlane([0, 0, 2.5], [0, Math.PI, 0]) // Plane +z
}

setupBoundaryPlanes() // shapes won't fall off the world


// Create a pile of objects in the middle of the plane
const createPile = () => {
    let i = 0;
    setInterval(() => {
        createSphere(
            Math.random() * 0.5,
            {
                x: (Math.random() - 0.5) * 2,
                y: 3,
                z: (Math.random() - 0.5) * 2
            }
        );
        i++;
        if (objectsToUpdate.length > 80) {
            const objectToRemove = objectsToUpdate.shift()
            world.removeBody(objectToRemove.body)
            scene.remove(objectToRemove.mesh)
        }
        if (i >= 20) {
            clearInterval(this);
        }
    }, 200);
}

createPile()

// body - objects
const sphereShape = new CANNON.Sphere(0.5) // radius same as threejs sphere
const sphereBody = new CANNON.Body({
    mass: 1, // 1kg
    position: new CANNON.Vec3(0, 3, 0), // above the ground so it falls
    shape: sphereShape,
    // material: defaultMaterial
})
sphereBody.applyLocalForce(new CANNON.Vec3(50,0,0), new CANNON.Vec3(0,0,0)) //parameters: force, push location (this case, apply force 150 to  x-axis, pushing at center)

world.addBody(sphereBody)


// floor
const floorShape = new CANNON.Plane()
// const floorBody = new CANNON.Body({
//     mass: 0,
//     shape: floorShape
// })
const floorBody = new CANNON.Body()
floorBody.mass = 0
floorBody.addShape(floorShape) //plane is infinite
// floorBody.material = defaultMaterial

floorBody.quaternion.setFromAxisAngle(
    new CANNON.Vec3(-1, 0, 0), // axis going through the plane 
    Math.PI * 0.5
) // rotate the plane to be horizontal, cannonjs uses quaternions
world.addBody(floorBody)

/**
 * Test sphere
 */
// const sphere = new THREE.Mesh(
//     new THREE.SphereGeometry(0.5, 32, 32),
//     new THREE.MeshStandardMaterial({
//         metalness: 0.3,
//         roughness: 0.4,
//         envMap: environmentMapTexture,
//         envMapIntensity: 0.5
//     })
// )
// sphere.castShadow = true
// sphere.position.y = 0.5
// scene.add(sphere)

/**
 * Floor
 */
const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(7, 7),
    new THREE.MeshStandardMaterial({
        color: '#777777',
        metalness: 0.1,
        roughness: 0.9,
        envMap: environmentMapTexture,
        envMapIntensity: 0.5,
        wireframe: true
    })
)
floor.receiveShadow = true
floor.rotation.x = - Math.PI * 0.5
scene.add(floor)

/**
 * Lights
 */
const ambientLight = new THREE.AmbientLight(0xffffff, 1.5)
scene.add(ambientLight)

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6)
directionalLight.castShadow = true
directionalLight.shadow.mapSize.set(1024, 1024)
directionalLight.shadow.camera.far = 15
directionalLight.shadow.camera.left = - 7
directionalLight.shadow.camera.top = 7
directionalLight.shadow.camera.right = 7
directionalLight.shadow.camera.bottom = - 7
directionalLight.position.set(5, 5, 5)
scene.add(directionalLight)

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
 * Utils
 */
const objectsToUpdate = []
const sphereGeometry = new THREE.SphereGeometry(1, 20, 20)
const sphereMaterial = new THREE.MeshToonMaterial({
    metalness: 0.3,
    roughness: 0.4,
    envMap: environmentMapTexture,
})

const createSphere = (radius, position) => {
    //threejs mesh
    const mesh = new THREE.Mesh(sphereGeometry,sphereMaterial)
    mesh.scale.set(radius, radius, radius)
    mesh.castShadow = true
    mesh.position.copy(position)
    scene.add(mesh)

    //cannonjs body
    const shape = new CANNON.Sphere(radius)
    const body = new CANNON.Body({
        mass: 1,
        position: new CANNON.Vec3(0, 3, 0),
        shape,
        material: defaultMaterial
    })
    body.position.copy(position)
    body.addEventListener('collide', playHitSound)
    world.addBody(body) 

    //save in objectsToUpdate array for later use
    objectsToUpdate.push({
        mesh,
        body
    })
}

createSphere(0.5, {x: 1, y:3, z:0})
// createSphere(0.5, {x: 1, y:3, z:0})

//Box
const boxGeometry = new THREE.BoxGeometry(1, 1, 1)
const boxMaterial = new THREE.MeshNormalMaterial({
    // metalness: 0.6,
    // roughness: 0.4,
    envMap: environmentMapTexture,
})

const createBox = (width, height, depth, position) => {
    //threejs mesh
    const mesh = new THREE.Mesh(boxGeometry,boxMaterial)
    mesh.scale.set(width, height, depth)
    mesh.castShadow = true
    mesh.position.copy(position)
    scene.add(mesh)

    //cannonjs body
    const shape = new CANNON.Box(new CANNON.Vec3(width/2, height/2, depth/2))// for cannon, provide w,h,d as dist from center to edge
    const body = new CANNON.Body({
        mass: 1,
        position: new CANNON.Vec3(0, 3, 0),
        shape,
        material: defaultMaterial
    })
    body.position.copy(position)
    body.addEventListener('collide', playHitSound)

    world.addBody(body)

    //save in objectsToUpdate array for later use
    objectsToUpdate.push({
        mesh,
        body
    })
}

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.set(- 3, 3, 3)
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
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

let oldElapsedTime = 0

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()
    const deltaTime = elapsedTime - oldElapsedTime     // time passed since last frame
    oldElapsedTime = elapsedTime

    // Update physics world
    world.step(1/60, deltaTime, 3) // 3 parameteers, fixed time step (frame rate), time passed since last step, iterations the world can apply to catch up with posisble delay

    for (const object of objectsToUpdate) {
        //update mesh according to body
        object.mesh.position.copy(object.body.position)
        //copy body quaternion to mesh quaternion  
        object.mesh.quaternion.copy(object.body.quaternion)
    }
    

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()