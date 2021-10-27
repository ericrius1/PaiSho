precision highp float;

varying vec3 vColor;

void main() {
  float strength = distance(gl_PointCoord, vec2(0.5));
  strength = step(0.5, strength);
  strength = 1.0 - strength;

  vec4 color = mix(vec4(0.0), vec4(vColor, 1.0), strength);
  gl_FragColor = color;
}