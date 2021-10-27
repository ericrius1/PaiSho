precision mediump float;
uniform mat4 projectionMatrix;
uniform mat4 viewMatrix;
uniform mat4 modelMatrix;

uniform float uTime;
uniform float uSpeed;
uniform float uNoiseDensity;
uniform float uNoiseStrength;
uniform float uFrequency;
uniform float uAmplitude;

attribute vec3 position;
attribute vec3 normal;

attribute vec2 uv;

varying vec2 vUv;
//varying vec3 vNormal;
varying float vDistort;


#pragma glslify: pnoise = require(glsl-noise/periodic/3d)
#pragma glslify: rotateY = require(glsl-rotate/rotateY)


void main()
{
  float t = uTime * uSpeed;
  float distortion = pnoise((normal + t) * uNoiseDensity, vec3(10.0)) * uNoiseStrength;
  vDistort = distortion;
  // disturb each vertex along the direction of its normal
  vec3 pos = position + (normal * distortion);

  // Create a sine wave from the top to bottom of the sphere
  // To increase the amount of waves we'll use uFrequency
  // To make the waves bigger we'll use uAmplitude

  float angle  = sin(uv.y * uFrequency + t) * uAmplitude;
  pos = rotateY(pos, angle);


  //vNormal = normal;
  vUv = uv;
  gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(pos, 1.0);
}