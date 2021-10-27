import * as THREE from 'three'
import {screenToWorld} from './utils'
import {camera} from './world'
class Octopus extends THREE.Object3D{
  constructor(){
  super();
  this.init();

  }

  init() {
    this.mouse = new THREE.Vector2();
    this.speed = 0.1;
    this.velocity = new THREE.Vector3()
    this.acceleration = new THREE.Vector3();

    let bodyGeo = new THREE.SphereBufferGeometry(.5);
    let bodyMaterial = new THREE.MeshBasicMaterial({color: 0xff00ff});

    this.bodyMesh = new THREE.Mesh(bodyGeo, bodyMaterial);

    this.add(this.bodyMesh);

    window.addEventListener('pointerdown', this.onPointerDown.bind(this));
    window.addEventListener('pointermove', this.onPointerMove.bind(this)); 
    //window.addEventListener('pointerup', this.onPointerUp.bind(this));

  }

  onPointerDown(evt) {
    this.velocity.set(0, 0, 0);

   
    this.mouse.x = (evt.clientX / window.innerWidth) * 2 - 1;
    this.mouse.y = - (evt.clientY / window.innerHeight) * 2 + 1;
    let depthDistance = camera.position.distanceTo(this.position);
    this.newPos = screenToWorld(this.mouse, depthDistance);
    
    let dir = this.newPos.sub(this.position).normalize();
    this.velocity = dir.multiplyScalar(this.speed);
    //this.position.copy(pos);
  } 

  onPointerMove(evt){
    this.velocity.set(0, 0, 0);

    this.mouse.x = (evt.clientX / window.innerWidth) * 2 - 1;
    this.mouse.y = - (evt.clientY / window.innerHeight) * 2 + 1;
    let depthDistance = camera.position.distanceTo(this.position);
    this.newPos = screenToWorld(this.mouse, depthDistance);
    
    let dir = this.newPos.sub(this.position).normalize();
    this.velocity = dir.multiplyScalar(this.speed);

  }
  
  update(){

    // this.velocity = 
    //debugger
    this.position.add(this.velocity);
    this.velocity.multiplyScalar(0.99)

    //if 
    
   // this.velocity.subScalar(.01);
    //this.velocity.add(this.acceleration);
  }

}

export {Octopus}