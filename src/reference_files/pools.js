const TWEEN = require('@tweenjs/tween.js')
import * as THREE from 'three' 
import poolVertexShader from './shaders/pool/vertex.glsl'
import poolFragmentShader from './shaders/pool/fragment.glsl'
import {mapRange} from './utils.js'
import {clock, gui, textureLoader} from './world'

class Pools extends THREE.Object3D{

  constructor() {
    super()
    this.init();
  }

  init(){
    this.pools = [];
    let gridCount = 2;


    this.settings = {
      speed: 0.2,
      strength: 1.,
      density: 1,
      frequency: 3.0,
      amplitude: 6.0,
      intensity: 7.0
    }


  const folder = gui.addFolder('pools');
  folder.add(this.settings, 'strength', 0, 2, .1);
  folder.add(this.settings, 'density', 0, 10, .1);
  folder.add(this.settings, 'speed', 0, 1, .01);
  folder.add(this.settings, "frequency", 0, 10, .1);
  folder.add(this.settings,"amplitude", 0, 100, .1);
  folder.add(this.settings, 'intensity', 0, 10, 0.1);


    //let textureLoader = new THREE.TextureLoader();
    const poolTexture = textureLoader.load('/textures/ethereum.png');
    this.poolGeo = new THREE.IcosahedronGeometry(1, 64);
    this.poolMat = new THREE.RawShaderMaterial({
      vertexShader: poolVertexShader,
      fragmentShader: poolFragmentShader,
      uniforms: {
        uTime: {value: 0.0},
        uTexture: {value: poolTexture },
        uSpeed: {value : 0.2},
        uNoiseDensity: {value: 2.5},
        uNoiseStrength: {value: 1.2},
        uFrequency: {value : 1},
        uAmplitude: {value: 1},
        uIntensity: {value: this.settings.intensity}
      },
      wireframe: true
    });

    for (let x = 0; x < gridCount; x++){
      for(let z = 0; z < gridCount; z++){
        let xPos = mapRange(x, 0, gridCount, -5, 5);
        let zPos = mapRange(z, 0, gridCount, -5, 5);
        let position = new THREE.Vector3(xPos, 0, zPos);
        this.createPool(position)
      }
    }

    window.addEventListener('keydown', (event)=>{
      if(event.key === 'm'){
        this.movePools()
      }
    })
  }

  createPool(position){

    // have texture move with tweens when portals move or rearange
   // let poolMat = new THREE.MeshBasicMaterial()
    let pool = new THREE.Mesh(this.poolGeo, this.poolMat);
    pool.position.copy(position)
    pool.scale.set(.3, .15, .3)
    this.add(pool);
    this.pools.push(pool);
  }

  movePools(){
    
    this.pools.forEach((pool)=>{
      let data = {
        x: pool.position.x,
        y: pool.position.y, 
        z: pool.position.z
      }
      let tween = new TWEEN.Tween(data)
      .to({x: pool.position.x - 0.5 + Math.random(), y: pool.position.y - 0.5 + Math.random(), z: pool.position.z- 0.5 + Math.random()}, 500)
      .easing(TWEEN.Easing.Quadratic.InOut)
      .onUpdate(()=>{
        pool.position.x = data.x;
        pool.position.y = data.y;
        pool.position.z = data.z;
      })
      tween.start();
    });
  }
  
  update(){
    this.poolMat.uniforms.uTime.value = clock.getElapsedTime();
    this.poolMat.uniforms.uNoiseStrength.value = this.settings.strength;
    this.poolMat.uniforms.uFrequency.value = this.settings.frequency;
    this.poolMat.uniforms.uNoiseDensity.value = this.settings.density;
    this.poolMat.uniforms.uSpeed.value = this.settings.speed;
    this.poolMat.uniforms.uAmplitude.value = this.settings.amplitude;
    this.poolMat.uniforms.uIntensity.value = this.settings.intensity;

    TWEEN.update();
  }

  render() {

  }
}

export {Pools}