precision mediump float;
uniform sampler2D uTexture;
uniform float uTime;
uniform float uFrequency;
uniform float uAmplitude;
uniform float uIntensity;


varying vec2 vUv;
//varying vec3 vNormal;
varying float vDistort;


vec3 cosPalette(float t, vec3 a, vec3 b, vec3 c, vec3 d) {
  return a + b * cos(6.28318 * (c * t + d));
}   


void main() {
  //vec4 textureColor = texture2D(uTexture, vUv);
  //gl_FragColor = textureColor * vec4(1.);

   float distort = vDistort * uIntensity;

  // These values are my fav combination, 
  // they remind me of Zach Lieberman's work.
  // You can find more combos in the examples from IQ:
  // https://iquilezles.org/www/articles/palettes/palettes.htm
  // Experiment with these!
  vec3 brightness = vec3(0.5, 0.5, 0.5);
  vec3 contrast = vec3(0.5, 0.5, 0.5);
  vec3 oscilation = vec3(1.0, 1.0, 1.0);
  vec3 phase = vec3(0.3, 0.2, 0.1);

  // Pass the distortion as input of cospalette

  vec3 color = cosPalette(distort, brightness, contrast, oscilation, phase);
  gl_FragColor = vec4(color, 1.0);


}