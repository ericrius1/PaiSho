// 1 saturn == 29 earth years
import * as THREE from 'three'
import {clock} from './world'


class SolarSystem extends THREE.Object3D {

  constructor(){
    super();
    this.init();
  }

  init(){

    let sunGeo = new THREE.SphereBufferGeometry(0.5);
    this.sunMesh = new THREE.Mesh(sunGeo);
    this.add(this.sunMesh);

    let earthGeo = new THREE.SphereBufferGeometry(.1);
    this.earthMesh = new THREE.Mesh(earthGeo);
    this.add(this.earthMesh);
    //this.earthMesh.position.x = 1;

    let saturnGeo = new THREE.SphereBufferGeometry(.3);
    this.saturnMesh = new THREE.Mesh(saturnGeo);
    this.add(this.saturnMesh);

  }

  update() {
    let t = clock.getElapsedTime();

    this.earthMesh.position.x = Math.cos(t * 5.8);
    this.earthMesh.position.y = Math.sin(t * 5.8);

    this.saturnMesh.position.x = 5 * Math.cos(t * 0.2)
    this.saturnMesh.position.y = 5 * Math.sin(t * 0.2);


    const material = new THREE.LineBasicMaterial({
      color: 0xff00ff,
      blending: THREE.CustomBlending,
      blendSrc: THREE.OneFactor,
      blendDst: THREE.OneFactor
    });
    if(Math.random() < 0.1) {
      material.color.r = 0;
    }
    const points = [];
    points.push(this.earthMesh.position);
    points.push(this.saturnMesh.position);
    const lineGeo = new THREE.BufferGeometry().setFromPoints(points);
    const line = new THREE.Line(lineGeo, material);
    this.add(line);





  }

}

export {SolarSystem}