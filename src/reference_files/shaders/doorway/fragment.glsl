precision mediump float;

uniform sampler2D uTexture;
varying vec2 vUv; 

void main() {
  vec4 color = texture2D(uTexture, vUv);
  color = (color.x < 0.1 && color.w > 0.1) ? vec4(0.0, 0.0, 0.0, 0.1) : color;

  //vec4 color = vec4(1.0, 0.5, 1.0, 1.0);  

  gl_FragColor = color;


}