const { Int8Attribute } = require("three");

class PoseNet {
  constructor() {
    this.init()
  }

  init(){
    fetch('http://localhost:8000/data')
    .then(response => response.json())
    .then(outputs => {
        const { poses, scores } = outputs;
        console.log(poses[0])
    // use the outputs in your project
    });

    
  }
}

export {PoseNet}