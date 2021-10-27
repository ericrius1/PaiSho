import * as THREE from 'three'
import {screenToWorld} from './utils'
import { MeshLine, MeshLineMaterial, MeshLineRaycast } from 'three.meshline';


class MagicBrush extends THREE.Object3D {

  constructor() {
    super()
    this.init();

  }

  init() {
    // only add points to the stroke if we move this much from last point
    this.paintingEnabled = true;
    this.strokeMovementThreshold = .1;
    this.brushPosition = new THREE.Vector3();
    window.addEventListener('pointerdown', this.onPointerDown.bind(this));
    window.addEventListener('pointermove', this.onPointerMove.bind(this)); 
    window.addEventListener('pointerup', this.onPointerUp.bind(this));
    window.addEventListener("keydown", this.onKeyDown.bind(this));

    const onKeyDown = (evt) => {
      if(evt.key === 'r') {
        controls.enableRotate = !controls.enableRotate;
      }
      
    }

    this.mouse = new THREE.Vector2();

    let plane = new THREE.Mesh( new THREE.PlaneBufferGeometry( 1000, 1000 ), new THREE.MeshBasicMaterial( {  } ) );
    plane.rotation.x = -Math.PI/2;
    plane.material.visible = true;
    plane.position.y -=1;
    this.add( plane );

  }

  onKeyDown(evt) {
    if(evt.key === 'p') {
      this.paintingEnabled = !this.paintingEnabled;
    }
  }
// fix hardcoded resolution
  createTrail() {
     // Create the line geometry used for storing 
     let resolution = new THREE.Vector2(window.innerWidth, window.innerHeight);


    this.line = new MeshLine();
    this.points = [];
    this.points.push(this.brushPosition.clone());
    this.line.setPoints(this.points);

    this.trailMaterial = new MeshLineMaterial({
      color: new THREE.Color(Math.random(), .3, .1),
      opacity: 1, 
      resolution: resolution,
      sizeAttenuation: 1, 
      lineWidth: .1,
      side: THREE.DoubleSide
    });

    this.lineMesh = new THREE.Mesh(this.line, this.trailMaterial);
    this.add(this.lineMesh);
  }

  extendTrail(){
    if(!this.paintingEnabled) return;
    let prevPos = this.points[this.points.length-1];
    if(this.brushPosition.distanceTo(prevPos) < this.strokeMovementThreshold) return;
    this.points.push(this.brushPosition.clone())
    this.line.setPoints(this.points, (p) => {
      return this.trailMaterial.lineWidth
     // return Math.sin(p * 50) * Math.cos(20)
    });
  }

  onPointerDown(evt) {
    this.dragging = true;
    this.mouse.x = (evt.clientX / window.innerWidth) * 2 - 1;
    this.mouse.y = - (evt.clientY / window.innerHeight) * 2 + 1;
    this.brushPosition.copy(screenToWorld(this.mouse, 5))
    this.createTrail()
  }

  onPointerUp(evt) {
    this.dragging = false;
  }


 
  // https://jsfiddle.net/w67tzfhx/40/
  // hhttps://stackoverflow.com/questions/11036106/three-js-projector-and-ray-objects
  // to move on arbitrary plane
  onPointerMove(evt){
    if(!this.dragging) {
      return;
    }

    this.mouse.x = (evt.clientX / window.innerWidth) * 2 - 1;
    this.mouse.y = - (evt.clientY / window.innerHeight) * 2 + 1;
    this.brushPosition.copy(screenToWorld(this.mouse, 5));
    this.extendTrail()
  }


  update() {

  }

}

export {MagicBrush}