import * as THREE from 'three'
import OrbitControls from './helpers/OrbitControls'

// see also
// https://stackoverflow.com/questions/11709760/how-can-i-put-two-different-textures-on-the-front-and-back-of-a-plane

const renderer = new THREE.WebGLRenderer({ antialias: true })
renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setClearColor(0x000000, 1)
document.body.appendChild(renderer.domElement)

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 )

camera.position.set(0, 100, 300)
scene.add(camera)

const orbit = new OrbitControls(camera, renderer.domElement)
orbit.target.set(0, 0, 0)
orbit.enableZoom = false

const createPaper = (images) => {
  const paper = new THREE.Group()
  images.map((img, idx) => {
    const geometry = new THREE.PlaneBufferGeometry(210, 297, 1)
    const face = new THREE.Mesh(geometry, img)
    if (idx == 1) {
      face.rotation.set(0, Math.PI, 0)
    }
    paper.add(face)
  })
  return paper
}

const update = () => {
  render()
  requestAnimationFrame(update)
}

const render = () => {
  orbit.update()
  renderer.render(scene, camera)
}

const loader = new THREE.ImageLoader()
const images = []
const resources = [
  '/img/front.jpg',
  '/img/back.jpg'
]

let count = 0

const loadImages = () => {
  loader.load(
    resources[count],
    (image) => {
      const texture = new THREE.CanvasTexture(image)
      const params = {
        map: texture,
        side: THREE.FrontSide
      }

      images.push(new THREE.MeshBasicMaterial(params))

      if (images.length != resources.length) {
        count++
        loadImages()
      } else {
        const paper = createPaper(images)
        scene.add(paper)
      }
    }
  )
}

loadImages()
update()


