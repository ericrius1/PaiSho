precision highp float;

uniform mat4 projectionMatrix;
uniform mat4 viewMatrix;
uniform mat4 modelMatrix;

uniform float uTime;
uniform float uSize;
uniform float uSpeed;

attribute vec3 position;
attribute float aScale;
attribute vec3 color;

varying vec3 vColor;


void main() {
  vec4 modelPosition = modelMatrix * vec4(position, 1.0);
  
  float distanceToCenter = length(modelPosition.yz);
  modelPosition.x =  sin(distanceToCenter * uTime * uSpeed);


  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectedPosition = projectionMatrix * viewPosition;
  gl_Position = projectedPosition;

  // Size

  gl_PointSize = uSize * aScale;
  gl_PointSize *= (1.0 / - viewPosition.z);

  vColor = color;

  
}