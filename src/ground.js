import * as THREE from 'three'
import * as colors from './libs/colors'
import {randInt, randFloat} from './libs/utils'
import {gui, textureLoader} from './world'


//TODO: Figure out texture deployed
class Ground extends THREE.Object3D{

    constructor(){
      super()
      this.init();
    }

    init(){
      this.palette = colors.getRandom(7);
      const bgTexture = textureLoader.load('shnurTexture.jpg');
      // create ground patches
      let counter = 0;
      let geo = new THREE.BoxBufferGeometry(1, .1, 1);
      let mat;
      for (let x = 0; x < 20; x+=2) {
        for(let z = 0; z < 20; z+=2) {
          if( x === 5 && z === 5){
            mat = new THREE.MeshBasicMaterial({map:bgTexture})
          } else {
            let index = counter % 7;
            mat = new THREE.MeshBasicMaterial({color: this.palette.colors[index]});
          }
          counter++
          let mesh = new THREE.Mesh(geo, mat)
          mesh.position.x = x;
          mesh.position.z = z;
          this.add(mesh);
        }

      }
    }

    update(){

    }

    render(){

    }

    dissolve(){

    }
}

export {Ground}