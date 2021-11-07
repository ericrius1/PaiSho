import * as THREE from 'three'
import * as colors from './libs/colors'
import { RGBELoader} from "three/examples/jsm/loaders/RGBELoader";
import {randInt, randFloat} from './libs/utils'
import {gui, textureLoader} from './world'


class Sculpture extends THREE.Object3D{

    constructor(){
      super()

      this.myScale = 1;
      this.options = {
        transmission: 1,
        thickness: 1.5,
        roughness: 0.6,
        envMapIntensity: 1.5,
        clearcoat: 1,
        clearcoatRoughness: 0.1,
        normalScale: 1,
        clearcoatNormalScale: 0.3,
        normalRepeat: 1,
  
      }
      this.init();
    }

    init(){
      const hdrEquirect = new RGBELoader().load(
        "moonless.hdr",
        () => {
          hdrEquirect.mapping = THREE.EquirectangularReflectionMapping;
        }
      );
      const normalMapTexture = textureLoader.load('normal.jpg');
      normalMapTexture.wrapS = THREE.RepeatWrapping;
      normalMapTexture.wrapT = THREE.RepeatWrapping;
      this.material = new THREE.MeshPhysicalMaterial({
        roughness: this.options.roughness, //adds some "frosting", making light that passes through the material more diffuse
        transmission: this.options.transmission,
        thickness: this.options.thickness,
        envMap: hdrEquirect,
        envMapIntensity: this.options.envMapIntensity,
        clearcoat: this.options.clearcoat,
        clearcoatRoughness: this.options.clearcoatRoughness,
        normalMap: normalMapTexture,
        clearcoatNormalMap: normalMapTexture
      });

      const materialFolder = gui.addFolder("Material");
      materialFolder.add(this.options, 'transmission', 0, 1, 0.01).onChange((val)=>{
        this.material.transmission = this.options.transmission
      })
      materialFolder.add(this.options, 'thickness', 0, 5, 0.1).onChange((val)=>{
        this.material.thickness = this.options.thickness;
      })
      materialFolder.add(this.options, 'roughness', 0, 1, 0.01).onChange((val)=>{
        this.material.roughness = this.options.roughness;
      })
      materialFolder.add(this.options, "envMapIntensity", 0, 3, .1).onChange((val)=>{
        this.material.envMapIntensity = this.options.envMapIntensity = this.options.envMapIntensity;
      })
      materialFolder.add(this.options, 'clearcoat', 0, 1, 0.01).onChange((val)=>{
        this.material.clearcoat = val;
      });
      materialFolder.add(this.options, 'clearcoatRoughness', 0, 1, 0.01).onChange((val)=>{
        this.material.clearcoatRoughness = val;
      });
      materialFolder.add(this.options, "normalScale", 0, 5, 0.01).onChange((val) => {
        this.material.normalScale.set(val, val);
      });
    
      materialFolder.add(this.options, "clearcoatNormalScale", 0, 5, 0.01).onChange((val) => {
        this.material.clearcoatNormalScale.set(val, val);
      });
    
      materialFolder.add(this.options, "normalRepeat", 1, 4, 1).onChange((val) => {
        normalMapTexture.repeat.set(val, val);
      });


     

      const geometry = new THREE.IcosahedronBufferGeometry(0.25, 25);


      
      this.mesh = new THREE.Mesh(geometry, this.material);
      this.mesh.position.set(5, 0.3, 5);
      this.add(this.mesh);

      let light = new THREE.DirectionalLight(0xfff0dd, 1)
      light.position.set(0, 10, 5);
    //  this.add(light)

    }

    update(){
      this.mesh.scale.set(this.myScale, this.myScale, this.myScale)
      this.myScale += 0.0001;
     // this.grow()

    }

    render(){

    }

    dissolve(){

    }

    shrink() {

    }
    grow(){

    }
}

export {Sculpture}