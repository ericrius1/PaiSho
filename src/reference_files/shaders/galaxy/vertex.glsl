precision mediump float;

uniform mat4 projectionMatrix;
uniform mat4 viewMatrix;
uniform mat4 modelMatrix;

uniform float uTime;
uniform float uSize;
uniform float uSpin;

attribute vec3 position;
attribute vec3 aRandomness;
attribute float aScale;
attribute vec3 color;

varying vec3 vColor;


void main() {
  vec4 modelPosition = modelMatrix * vec4(position, 1.0);
  

  // Rotate
  // float angle = atan(modelPosition.x, modelPosition.z);
  // float distanceToCenter = length(modelPosition.xz);
  // float angleOffset = (1.0 / distanceToCenter) * uTime;
  // angle += angleOffset;
  // modelPosition.x = cos(angle) * distanceToCenter;
  // modelPosition.z = sin(angle) * distanceToCenter;

  // Rotate xy
  float angle = atan(modelPosition.x, modelPosition.y);
  float distanceToCenter = length(modelPosition.xy);
  float angleOffset = (1.0 / distanceToCenter) * uTime * uSpin;
  angle += angleOffset;
  modelPosition.x = cos(angle) * distanceToCenter;
  modelPosition.y = sin(angle) * distanceToCenter;

  // Randomness
  modelPosition.xyz += aRandomness;


  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectedPosition = projectionMatrix * viewPosition;
  gl_Position = projectedPosition;

  // Size

  gl_PointSize = uSize * aScale;
  gl_PointSize *= (1.0 / - viewPosition.z);

  vColor = color;

  
}