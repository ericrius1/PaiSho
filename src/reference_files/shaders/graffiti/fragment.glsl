  precision mediump float;

  uniform sampler2D uTexture;
  uniform float uTime; 

  varying vec2 vUv;

  void main()
  {
    vec4 textureColor = texture2D(uTexture, vUv);
    float strength = mod(vUv.y * 10.0 , 1.0);

    vec3 blackColor = vec3(0.0);
    vec3 uvColor = vec3(vUv, 2.0);
    vec3 mixedColor = mix(blackColor, uvColor, strength);
    gl_FragColor = textureColor * vec4(mixedColor, 1.0);
  }
