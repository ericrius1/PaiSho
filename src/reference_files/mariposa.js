
import * as THREE from 'three'
import {screenToWorld} from './utils'

class Mariposa extends THREE.Object3D {

  constructor() {
    super();
    this.init();
  }
  init() {
    this.geometry = new THREE.BoxGeometry(.1, .1, .3)
    this.material = new THREE.MeshBasicMaterial({color: 0xff00ff});
    this.mesh = new THREE.Mesh(this.geometry, this.material)
    //this.mesh.position.copy(new THREE.Vector3());
    this.add(this.mesh);

    window.addEventListener('pointerdown', this.onPointerDown.bind(this));
    window.addEventListener('pointermove', this.onPointerMove.bind(this)); 
    window.addEventListener('pointerup', this.onPointerUp.bind(this));
  } 

  onPointerDown(evt) {
    this.canMove = true;
  }

  onPointerUp(evt) {
    this.canMove = false;
  }

  
  onPointerMove(evt){
    if(!this.canMove) {
      return;
    }
    let mouse = new THREE.Vector2();
    mouse.x = (evt.clientX / window.innerWidth) * 2 - 1;
    mouse.y = - (evt.clientY / window.innerHeight) * 2 + 1;
    let pos = screenToWorld(mouse, 5)
    this.position.copy(pos);

  }
}

export {Mariposa}