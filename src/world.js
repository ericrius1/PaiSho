
import './style.css'
import * as THREE from 'three'
//import { OrbitControls } from 'three/examples/jsm/controls/RealmControls.js'
import { RealmControls } from './libs/RealmControls'
import GUI from 'lil-gui'
import Stats from 'three/examples/jsm/libs/stats.module'
import {Ground} from './ground'
import { Sculpture } from './sculpture'

import {EffectComposer} from 'three/examples/jsm/postprocessing/EffectComposer'
import {RenderPass} from 'three/examples/jsm/postprocessing/RenderPass'
import {UnrealBloomPass} from 'three/examples/jsm/postprocessing/UnrealBloomPass'

const gui = new GUI();

// Canvas
const canvas = document.querySelector('canvas.webgl_canvas')
let textureLoader = new THREE.TextureLoader();

const stats = Stats()
document.body.appendChild(stats.dom)

// Scene
const scene = new THREE.Scene()

const clock = new THREE.Clock();

const sizes = {
    width: canvas.width,
    height: canvas.height
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
    //canvas: canvas,
    antialias: true
})
renderer.setSize(sizes.width, sizes.height)
const pixelRatio = window.devicePixelRatio;
renderer.setPixelRatio(Math.min(pixelRatio, 2))
renderer.setClearColor(new THREE.Color(.01, .01, .11))


const options = {
  bloomThreshold: 0.85,
  bloomStrength: 0.2,
  bloomRadius: 0.33
}
const composer = new EffectComposer(renderer);
const renderPass = new RenderPass(scene, camera);
const bloomPass = new UnrealBloomPass(new THREE.Vector2(sizes.width, sizes.height), options.bloomStrength, options.bloomThreshold, options.bloomRadius);
composer.addPass(renderPass);
composer.addPass(bloomPass);


const postprocessingFolder = gui.addFolder("Post Processing");
postprocessingFolder.add(options, "bloomThreshold", 0, 1, 0.01).onChange((val) => {
  bloomPass.threshold = val;
});

postprocessingFolder.add(options, "bloomStrength", 0, 1, 0.01).onChange((val) => {
  bloomPass.strength = val;
});

postprocessingFolder.add(options, "bloomRadius", 0, 1, 0.01).onChange((val) => {
  bloomPass.radius = val;
});

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
    stats.update()

    //renderer.render(scene, camera)
    composer.render();

    window.requestAnimationFrame(tick)


}

tick()

window.addEventListener("keydown", onKeyDown)
window.addEventListener('resize', () =>
{
    // Update sizes
    // sizes.width = canvas.width
    // sizes.height = canvas.height

    const dpr = Math.min(pixelRatio, 2); // Cap DPR scaling to 2x

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()
    
   //canvas.width = canvas.width  *  dpr;
    //canvas.height = canvas.height * dpr;
   // canvas.style.width = canvas.width + "px";
    //canvas.style.width = canvas.height + "px";

    // Update renderer
    // renderer.setPixelRatio(dpr);
    // renderer.setSize(sizes.width, sizes.height)

    // composer.setPixelRatio(dpr);
    // composer.setSize(sizes.width, sizes.height);

})


export {clock, gui, textureLoader, renderer, camera}




// Make whatever the view of, from whataver level of simplicity, look beautiful and interesting. 

// Prioritize control feel, visual feel and create from there. SO every time you enter world to test, it feels more and more beautiful

 // Make the ojects easy to create position wise / rotation wise / not as concerned as camera position, and make flexibile around that 


 // https://gist.github.com/cobyism/4730490
 // for dist subtree

 // git add dist && git commit -m "Initial dist subtree commit"
 // git subtree push --prefix dist origin gh-pages

 // get objects rotating in lots of ways then attach the camera to that

 // make blog post, add on top of the transmission one and reference it, and just have cool shit happening, 
 // like light rays shining through the objects but stylized, and twisting like paint brushes

// ad basic control to move between realms at higher level abstraction,
// then zoom into them so its a realm into itself
// 
// start simple, spiral around, and go deeer

//tweening all kinds of params between worlds p5.BandPass