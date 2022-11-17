export const VS_CODE = `
attribute vec3 position;
attribute vec2 uv;
varying vec2 vUv;

void main()	{
  vUv = uv;
  gl_Position = vec4(position, 1.0);
}`;

// Fragment Shader
export const FS_CODE = `
precision mediump float;
uniform float time;
varying vec2 vUv;
void main() {
  vec2 p = vUv * 1.0 - 0.5;
  float r = 1.0 + 0.5 * (sin(5.0 * p.x + time));
  float g = 1.0 + 0.5 * (sin(5.0 * p.y) + sin(time + 2.0 * p.x));  
  float b = 1.0 + 0.5 * (sin(5.0 + p.x * p.y * 17.0) + sin(time * 0.4  + 4.0 * p.y));
  gl_FragColor = vec4(r, g, b, 1.0);
}
`;