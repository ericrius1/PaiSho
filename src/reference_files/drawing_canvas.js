import * as THREE from 'three'

class DrawingCanvas{
  constructor(){
    this.canvas = document.createElement('canvas')
    this.canvas.width = 100;
    this.canvas.height = 100;
    this.canvas.id = "drawing-canvas";
    this.ctx = this.canvas.getContext("2d");

    this.ctx.fillStyle = '#FFFFFF';
    this.ctx.fillRect( 0, 0, 400  , 400 );
    let body = document.getElementsByTagName("body")[0];
    body.appendChild(this.canvas)

    this.drawStartPos = new THREE.Vector2();

    let paint = false;
    this.canvas.addEventListener('pointerdown', (e)=>{
      paint = true;
      this.drawStartPos.set(e.offsetX, e.offsetY);
    })

    this.canvas.addEventListener('pointermove',(e)=>{
      if(paint){
        this.draw(e.offsetX, e.offsetY)
      }
    })

    this.canvas.addEventListener('pointerup', (e)=>{
      paint = false;
    })

  }

  draw(x, y){
    this.ctx.moveTo(this.drawStartPos.x, this.drawStartPos.y);
    this.ctx.strokeStyle = 'black';
    this.ctx.lineTo(x, y);
    this.ctx.stroke();
    this.drawStartPos.set(x, y);
  }

}

export {DrawingCanvas}