import * as THREE from 'three'
import * as colors from './libs/colors'
import {randInt, randFloat} from './libs/utils'
import {gui} from './world'

class Ground extends THREE.Object3D{

    constructor(){
      super()
      this.init();
    }

    init(){
      this.palette = colors.getRandom(7);
      // create ground patches
      let geo = new THREE.BoxBufferGeometry(1, .1, 1);
      for (let x = 0; x < 10; x++) {
        for(let z = 0; z < 10; z++) {
          let mat = new THREE.MeshBasicMaterial({color: this.palette.colors[randInt(0, this.palette.colors.length-1)]});
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