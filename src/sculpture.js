import * as THREE from 'three'
import * as colors from './libs/colors'
import { RGBELoader} from "three/examples/jsm/loaders/RGBELoader";
import {randInt, randFloat} from './libs/utils'
import {gui} from './world'

class Sculpture extends THREE.Object3D{

    constructor(){
      super()
      this.init();
    }

    init(){
      this.palette = colors.getRandom(5);
      const hdrEquirect = new RGBELoader().load(
        "/moonless.hdr",
        () => {
          hdrEquirect.mapping = THREE.EquirectangularReflectionMapping;
        }
      );

      const geometry = new THREE.IcosahedronBufferGeometry(0.25, 15);
      const material = new THREE.MeshPhysicalMaterial({
        roughness: 0.7, //adds some "frosting", making light that passes through the material more diffuse
        transmission: 1,
        thickness: 0.5,
        envMap: hdrEquirect,
        envMapIntensity: 20
      });

      this.mesh = new THREE.Mesh(geometry, material);
      this.mesh.position.set(5, 0.3, 5);
      this.add(this.mesh);

      let light = new THREE.DirectionalLight(0xfff0dd, 1)
      light.position.set(0, 10, 5);
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