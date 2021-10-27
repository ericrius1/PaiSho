import * as THREE from 'three'
import { Pools } from './pools'
import {camera} from './world'


function randIntRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

// how many colors in the pallete? 
function getRandomPallete(n) {

}

function randomColor(colors) {
  return colors[Math.floor(Math.random() * colors.length)]
}

function distance(x1, y1, x2, y2) {
  const xDist = x2 - x1
  const yDist = y2 - y1

  return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2))
}
const mapRange = (value, x1, y1, x2, y2) => (value - x1) * (y2 - x2) / (y1 - x1) + x2;

const generatePixel = (rng = Math.random) => [rng(), rng(), rng(), rng()].map(x => ~~(x * 255))

// calculates the point under the mouse and in the plane of z = 0
function screenToWorld (mouse, depthDistance) {
  let vector = new THREE.Vector3(mouse.x, mouse.y, 0.5);
	vector.unproject( camera );
	let dir = vector.sub( camera.position ).normalize();
	
  // this code constrains the mouse pos to the z plane
  let distance = - camera.position.z / dir.z;
  //console.log(distance)

  // this just projects mouse a certain distance based on whatever dir 
	let pos = camera.position.clone().add( dir.multiplyScalar(depthDistance)) 
  return pos;
}



export  { randIntRange, randomColor, distance, mapRange, generatePixel, screenToWorld}
