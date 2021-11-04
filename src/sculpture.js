import * as THREE from 'three'
import * as colors from './libs/colors'
import { RGBELoader} from "three/examples/jsm/loaders/RGBELoader";
import {randInt, randFloat} from './libs/utils'
import {gui} from './world'

class Sculpture extends THREE.Object3D{

    constructor(){
      super()

      this.options = {
        transmission: 1,
        thickness: 1.5,
        roughness: 0.6,
        envMapIntensity: 1.5,
        clearcoat: 1,
        clearcoatRoughness: 0.1
      }

    

      this.init();
    }

    init(){
      const hdrEquirect = new RGBELoader().load(
        "warehouse.hdr",
        () => {
          hdrEquirect.mapping = THREE.EquirectangularReflectionMapping;
        }
      );
      this.material = new THREE.MeshPhysicalMaterial({
        roughness: this.options.roughness, //adds some "frosting", making light that passes through the material more diffuse
        transmission: this.options.transmission,
        thickness: this.options.thickness,
        envMap: hdrEquirect,
        envMapIntensity: this.options.envMapIntensity,
        clearCoat: this.options.clearCoat,
        clearCoatRoughness: this.options.clearCoatRoughness
      });
      gui.add(this.options, 'transmission', 0, 1, 0.01).onChange((val)=>{
        this.material.transmission = this.options.transmission
      })
      gui.add(this.options, 'thickness', 0, 5, 0.1).onChange((val)=>{
        this.material.thickness = this.options.thickness;
      })
      gui.add(this.options, 'roughness', 0, 1, 0.01).onChange((val)=>{
        this.material.roughness = this.options.roughness;
      })
      gui.add(this.options, "envMapIntensity", 0, 3, .1).onChange((val)=>{
        this.material.envMapIntensity = this.options.envMapIntensity = this.options.envMapIntensity;
      })
      gui.add(this.options, 'clearcoat', 0, 1, 0.01).onChange((val)=>{
        this.material.clearcoat = val;
      });
      gui.add(this.options, 'clearcoatRoughness', 0, 1, 0.01).onChange((val)=>{
        this.material.clearcoatRoughness = val;
      });
      this.palette = colors.getRandom(5);
     

      const geometry = new THREE.IcosahedronBufferGeometry(0.25, 25);


      this.mesh = new THREE.Mesh(geometry, this.material);
      this.mesh.position.set(5, 0.3, 5);
      this.add(this.mesh);

      let light = new THREE.DirectionalLight(0xfff0dd, 10)
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