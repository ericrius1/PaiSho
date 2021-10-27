import * as THREE from 'three'
import * as colors from './libs/colors'
import {randInt, randFloat} from './libs/utils'
import {gui} from './world'

class Sculpture extends THREE.Object3D{

    constructor(){
      super()
      this.init();
    }

    init(){
      this.palette = colors.getRandom(5);

      const geometry = new THREE.IcosahedronBufferGeometry(2, 0);
      const material = new THREE.MeshPhysicalMaterial({
        color: 0xffff00,
        roughness: 0.75,
        transmission: 1,
        thickness: 0.5,
      });

      this.mesh = new THREE.Mesh(geometry, material);
      this.add(this.mesh);

      let light = new THREE.DirectionalLight(0xffffff)
      light.intensity = 100
      this.add(light)
    }

    update(){

    }

    render(){

    }

    dissolve(){

    }
}

export {Sculpture}