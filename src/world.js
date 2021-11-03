
import './style.css'
import * as THREE from 'three'
//import { OrbitControls } from 'three/examples/jsm/controls/RealmControls.js'
import { RealmControls } from './libs/RealmControls'
import GUI from 'lil-gui'

import {Ground} from './ground'
import { Sculpture } from './sculpture'

const gui = new GUI();

// Canvas
const canvas = document.querySelector('canvas.webgl')
let textureLoader = new THREE.TextureLoader();

// Scene
const scene = new THREE.Scene()

const clock = new THREE.Clock();

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

let debugMode = false;
let ground, sculpture;

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.01, 10000)
camera.position.set(4.5, 5, 4.5);
 camera.rotation.x = -Math.PI/2;
scene.add(camera)


const myObj = {
  teleport: ()=>{
      camera.position.y ++;
  }
}

gui.add(myObj, "teleport");


console.log(camera.rotation.y);

// // Controls
let controls;
controls = new RealmControls(camera, canvas)
controls.listenToKeyEvents(window);
//controls.enabled = false;
controls.enableDamping = true
controls.zoomSpeed = 0.5;
controls.target = new THREE.Vector3(5, 0, 5);
controls.dampingFactor = 0.1;

console.log(camera.rotation.y)


/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.setClearColor(new THREE.Color(.01, .01, .11))

/**
 * Animate
 */

const initObjects = ()=> {
  ground = new Ground();
  scene.add(ground)

  sculpture = new Sculpture();
  scene.add(sculpture);
}
initObjects();



const onKeyDown = (evt) => {
  if(evt.key === 'r' && controls) {
    controls.enableRotate = !controls.enableRotate;
  }

  if(evt.key === 'd') {
    toggleDebug();
  }
  
}

const toggleDebug = () => {
  if(controls){

    controls.enabled = !controls.enabled;
  }
}


const tick = () =>
{
    if(controls){
      controls.update()

    }

    renderer.render(scene, camera)

    window.requestAnimationFrame(tick)


}

tick()

window.addEventListener("keydown", onKeyDown)
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


export {clock, gui, textureLoader, renderer, camera}




// Make whatever the view of, from whataver level of simplicity, look beautiful and interesting. 

// Prioritize control feel, visual feel and create from there. SO every time you enter world to test, it feels more and more beautiful

 // Make the ojects easy to create position wise / rotation wise / not as concerned as camera position, and make flexibile around that 


 // https://gist.github.com/cobyism/4730490
 // for dist subtree

 // git add dist && git commit -m "Initial dist subtree commit"
 // git subtree push --prefix dist origin gh-pages