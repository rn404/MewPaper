import * as THREE from 'three'
import OrbitControls from './helpers/OrbitControls'

const renderer = new THREE.WebGLRenderer({ antialias: true })
renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setClearColor(0x000000, 1)
document.body.appendChild(renderer.domElement)

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 )

camera.position.set(0, 100, 600)
scene.add(camera)

const orbit = new OrbitControls(camera, renderer.domElement)
//orbit.target.set(0, 0, 0)
orbit.enableZoom = false
console.log(orbit)

const addPaper = () => {
  // Planebuffergeometry(width, height, widthSegments, heightSegments)
  const geometry = new THREE.PlaneBufferGeometry(210, 297, 1)
  const material = new THREE.MeshBasicMaterial({ color: 0xffff00, side: THREE.DoubleSide })
  const plane = new THREE.Mesh(geometry, material)
  scene.add(plane)
}

addPaper()

const render = () => {
  orbit.update()
  renderer.render(scene, camera)
}

render()

/*
const animate = (obj) => {
  if (!obj) return
  requestAnimationFrame(animate)
  obj.rotation.x += 0.1
  obj.rotation.y += 0.1

  renderer.render(scene, camera)
}
animate()
*/





