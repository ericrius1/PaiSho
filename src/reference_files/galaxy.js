import * as THREE from 'three'
import {folder, clock, renderer, gui} from './world'
import galaxyVS from './shaders/galaxy/vertex.glsl'
import galaxyFS from './shaders/galaxy/fragment.glsl'


// ask about how to move galaxy to different position
class Galaxy extends THREE.Object3D {

  constructor() {
    super();
    this.init();
  }

  init() {
    this.points = null;
   this.parameters = {
     count: 100000,
     size: 0.005,
     radius: 1,
     branches: 4,
     spin: 0.1,
     randomness:  0.2,
     randomnessPower: 3,
     insideColor: '#ff6030',
     outsideColor: '#1b3984'
   }

    const folder = gui.addFolder('galaxy');
    folder.add(this.parameters, 'count').min(100).max(1000000).step(100).onFinishChange(this.generateGalaxy.bind(this));
    folder.add(this.parameters, 'radius').min(0.01).max(20).step(0.01).onFinishChange(this.generateGalaxy.bind(this))
    folder.add(this.parameters, 'branches').min(2).max(20).step(1).onFinishChange(this.generateGalaxy.bind(this))
    folder.add(this.parameters, 'randomness').min(0).max(2).step(0.001).onFinishChange(this.generateGalaxy.bind(this))
    folder.add(this.parameters, 'randomnessPower').min(1).max(10).step(0.001).onFinishChange(this.generateGalaxy.bind(this))
    folder.add(this.parameters, 'spin').min(0.01).max(1).step(0.01);
    folder.addColor(this.parameters, 'insideColor').onFinishChange(this.generateGalaxy.bind(this))
    folder.addColor(this.parameters, 'outsideColor').onFinishChange(this.generateGalaxy.bind(this))
    this.generateGalaxy();

  }

  generateGalaxy() {

    if(this.points !== null) {
      this.geometry.dispose();
      this.material.dispose();
      this.remove(this.points);
    }
    this.geometry = new THREE.BufferGeometry();

    const positions = new Float32Array(this.parameters.count * 3)
    const randomness = new Float32Array(this.parameters.count * 3);
    const colors = new Float32Array(this.parameters.count * 3);
    const scales = new Float32Array(this.parameters.count * 1);

    const insideColor = new THREE.Color(this.parameters.insideColor);
    const outsideColor = new THREE.Color(this.parameters.outsideColor);

    for(let i = 0; i < this.parameters.count; i++){
      const i3 = i * 3;

      // position
      const radius = Math.random() * this.parameters.radius;
      // calculates branch angle on unit circle
      const branchAngle = ( i % this.parameters.branches) / this.parameters.branches * Math.PI * 2;
      
      const randomX = Math.pow(Math.random(), this.parameters.randomnessPower) * ( Math.random() < 0.5 ? 1 : -1) * this.parameters.randomness * radius
      const randomY = Math.pow(Math.random(), this.parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * this.parameters.randomness * radius
      const randomZ = Math.pow(Math.random(), this.parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * this.parameters.randomness * radius


      positions[i3] = Math.cos(branchAngle) * radius;
      positions[i3 + 1 ] =  Math.sin(branchAngle) * radius;
      positions[i3 + 2] = -0.5;

      randomness[i3] = randomX;
      randomness[i3 + 1] = randomY;
      randomness[i3 + 2] = randomZ;

      // color
      const mixedColor = insideColor.clone();
      mixedColor.lerp(outsideColor, radius/this.parameters.radius);

      colors[i3] = mixedColor.r;
      colors[i3 + 1]  = mixedColor.g;
      colors[i3 + 2] = mixedColor.b;

      scales[i] = Math.random() * this.parameters.size;
    }
    
    this.geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    this.geometry.setAttribute('aRandomness', new THREE.BufferAttribute(randomness, 3));
    this.geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    this.geometry.setAttribute('aScale', new THREE.BufferAttribute(scales, 1));

    // Material 

    this.material = new THREE.RawShaderMaterial({
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: {
        uTime: { value: 0 },
        uSize: {value: 30 * renderer.getPixelRatio() },
        uSpin: {value : this.parameters.spin}
      },
      vertexShader: galaxyVS,
      fragmentShader: galaxyFS
      //
    });

    this.points = new THREE.Points(this.geometry, this.material);
    // this.position.x += 2;

    this.add(this.points);
  }

  update() {

    this.material.uniforms.uTime.value = clock.getElapsedTime();
    this.material.uniforms.uSpin.value = this.parameters.spin;


  }

  render() {

  }
}

export {Galaxy}