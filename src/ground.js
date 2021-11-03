import * as THREE from 'three'
import * as colors from './libs/colors'
import {randInt, randFloat} from './libs/utils'
import {gui} from './world'


//TODO: Figure out texture deployed
class Ground extends THREE.Object3D{

    constructor(){
      super()
      this.init();
    }

    init(){
      this.palette = colors.getRandom(7);
      const bgTexture = new THREE.TextureLoader().load('shnurTexture.jpg');
      // create ground patches
      let geo = new THREE.BoxBufferGeometry(1, .1, 1);
      let mat;
      for (let x = 0; x < 10; x++) {
        for(let z = 0; z < 10; z++) {
          if( x === 5 && z === 5){
            mat = new THREE.MeshBasicMaterial({map:bgTexture})
          } else {

            mat = new THREE.MeshBasicMaterial({color: this.palette.colors[randInt(0, this.palette.colors.length-1)]});
          }
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