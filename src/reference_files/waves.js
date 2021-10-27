import * as THREE from 'three'
import {clock, gui, renderer, camera} from './world'
import {screenToWorld} from './utils'
import wavesVS from './shaders/waves/vertex.glsl'
import wavesFS from './shaders/waves/fragment.glsl'


// build niagara

// yo yo just make cool shit that combines in fun modular ways together 
class Waves extends THREE.Object3D {
  constructor() {
    super()
    this.init()
  }

  init(){
    this.points = null;
    // near color and far color will lerp with their rise and fall
    this.parameters = {
      count: 1000000,
      size: 0.1,
      depth: 1,
      speed: 1,
      nearColor: "#3465f7",
      farColor: "#159029"
    }

    const folder = gui.addFolder('waves');
    folder.add(this.parameters, 'count').min(100).max(2000000).step(100).onFinishChange(this.generateWaves.bind(this));
    folder.add(this.parameters, 'size').min(.05).max(.5).step(.02).onFinishChange(this.generateWaves.bind(this));
    folder.add(this.parameters, 'depth').min(0.1).max(5).step(0.1);
    folder.add(this.parameters, 'speed').min(0.1).max(2).step(0.1);
    folder.addColor(this.parameters, 'nearColor').onFinishChange(this.generateWaves.bind(this));
    folder.addColor(this.parameters, 'farColor').onFinishChange(this.generateWaves.bind(this));
    this.generateWaves();

   window.addEventListener('pointerdown', this.stream.bind(this));
   window.addEventListener('keydown', this.onKeyDown.bind(this));
   window.addEventListener('keyup', this.onKeyUp.bind(this));
  }

  onKeyDown(evt) {
    if(evt.key === 'f') {
      this.canMove = true;
    }
  }

  onKeyUp(evt) {
    if(evt.key === 'f') {
      this.canMove = false;
    }
  }

  stream(evt) {
    if(!this.canMove) {
      return;
    }
    console.log(evt.clientY);
    let pos = screenToWorld(new THREE.Vector2(evt.clientX, evt.clientY), camera)
    console.log(pos);
    this.position.copy(pos);
    //this.points.position.copy(pos);
  }

  generateWaves() {
    if(this.points !==null) {
      this.geometry.dispose();
      this.material.dispose();
      this.remove(this.points);
    }
    this.geometry = new THREE.BufferGeometry();

    const positions = new Float32Array(this.parameters.count * 3);
    const randomness = new Float32Array(this.parameters.count * 3);
    const colors = new Float32Array(this.parameters.count * 3);
    const scales = new Float32Array(this.parameters.count * 1);

    const nearColor = new THREE.Color(this.parameters.nearColor);
    const farColor = new THREE.Color(this.parameters.farColor);

    for(let i = 0; i < this.parameters.count; i++) {
      const i3 = i * 3;

      const depth = Math.random() * this.parameters.depth;
      
      positions[i3] = Math.random();
      positions[i3 + 1] = Math.random();
      positions[i3 + 2] = Math.random();
    
      const mixedColor = nearColor.clone();
      mixedColor.lerp(farColor, depth/this.parameters.depth);
      colors[i3] = mixedColor.r;
      colors[i3 + 1] = mixedColor.g;
      colors[i3 + 2] = mixedColor.b;

      scales[i] = Math.random() * this.parameters.size;;
    }

    this.geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    this.geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    this.geometry.setAttribute('aScale', new THREE.BufferAttribute(scales, 1));
    
    this.material = new THREE.RawShaderMaterial({
      depthWrite: false,
      depthTest: true,
      blending: THREE.AdditiveBlending,
      uniforms: {
        uTime: {value: 0},
        uSize: {value: 30 * renderer.getPixelRatio()},
        uSpeed: {value: this.parameters.speed}
      },
      vertexShader: wavesVS,
      fragmentShader: wavesFS,
      //transparent: true
    });``

    this.points = new THREE.Points(this.geometry, this.material);
    this.points.frustumCulled = false;
    this.add(this.points);
    
  }

  update(){
    this.material.uniforms.uTime.value = clock.getElapsedTime();
    this.material.uniforms.uSpeed.value = this.parameters.speed;

  }

  render() {

  }

}

export {Waves}