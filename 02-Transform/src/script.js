import * as THREE from 'three'

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Objects
 */
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true})
const mesh = new THREE.Mesh(geometry, material)
// mesh.position.y = -0.6
// mesh.position.x = 0.7
// mesh.position.z = 1
mesh.position.set(0.7, -0.6, 1)
scene.add(mesh)

// mesh.position.normalize() // normalize the position of the mesh to 1


const group = new THREE.Group()
group.position.y = 0

const cube1 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true})
)
group.add(cube1)

const cube2 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color: 0x00ff00 })
)
cube2.position.x = -2
group.add(cube2)

const cube3 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color: 0x0000ff })
)   
cube3.position.x = 2
group.add(cube3)

scene.add(group)

// axes helper
const axesHelper = new THREE.AxesHelper(1)
scene.add(axesHelper)

//scale
mesh.scale.set(2, 0.5, 0.5)

//rotatione
mesh.rotation.reorder('YXZ')    
mesh.rotation.x = Math.PI * 0.5
mesh.rotation.y = Math.PI * 0.25


/**
 * Sizes
 */
const sizes = {
    width: 800,
    height: 600
}

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 4
camera.position.y = 1
camera.position.x = 1

scene.add(camera)

camera.lookAt(mesh.position)


/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)