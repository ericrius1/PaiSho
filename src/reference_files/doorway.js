import * as THREE from 'three'
import { Object3D } from 'three';
import {textureLoader} from './world'
import doorwayVS from './shaders/doorway/vertex.glsl'
import doorwayFS from './shaders/doorway/fragment.glsl'

// control stars with mouse and link to wind sound

class Doorway extends Object3D
 {
  constructor() {
    super();
    this.init();
  }

  init() {
    //const doorwayTexture = textureLoader.load('/textures/ethereum.png');
    const doorwayTexture = textureLoader.load('/textures/doorway.png');
    this.doorwayGeo = new THREE.BoxGeometry(2, 4, .1);
    this.doorwayMat = new THREE.RawShaderMaterial({
      vertexShader: doorwayVS,
      fragmentShader: doorwayFS,
      // blending: THREE.AdditiveBlending,
      uniforms: {
        uTexture: {value: doorwayTexture}
      },
      transparent: true
    })
    this.doorway = new THREE.Mesh(this.doorwayGeo, this.doorwayMat);
    this.add(this.doorway);     
    


  }

  update() {

  }

  render() {

  }
}


export {Doorway}

