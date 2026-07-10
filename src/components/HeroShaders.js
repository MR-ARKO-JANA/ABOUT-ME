export const vertexShader = `
varying vec2 vUv;
uniform float uHovered;
uniform float uScale;

void main() {
  vUv = uv;
  
  // Very subtle zoom in effect on hover
  vec3 pos = position;
  float scale = 1.0 + (uHovered * uScale);
  // Scale from the center
  pos *= scale;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
`;

export const fragmentShader = `
uniform sampler2D uTexture1;
uniform sampler2D uTexture2;
uniform vec2 uMouse;
uniform float uHovered;
uniform float uRadius;
uniform float uSoftness;
uniform vec2 uResolution;
uniform vec2 uImageResolution;
uniform float uImageScale;

varying vec2 vUv;

void main() {
  vec2 ratio = vec2(
    min((uResolution.x / uResolution.y) / (uImageResolution.x / uImageResolution.y), 1.0),
    min((uResolution.y / uResolution.x) / (uImageResolution.y / uImageResolution.x), 1.0)
  );
  
  vec2 centeredUv = vUv - vec2(0.5);
  // Apply the scale factor (uImageScale > 1.0 makes the image smaller)
  vec2 uvCover = (centeredUv * ratio * uImageScale) + vec2(0.5);

  vec4 color1 = texture2D(uTexture1, uvCover);
  
  // If UVs are outside the image bounds [0, 1], we can set alpha to 0 
  // to avoid texture clamping/stretching artifacts on the edges.
  float inBounds = step(0.0, uvCover.x) * step(uvCover.x, 1.0) * 
                   step(0.0, uvCover.y) * step(uvCover.y, 1.0);
  color1 *= inBounds;

  vec2 screenRatio = vec2(uResolution.x / uResolution.y, 1.0);
  if (uResolution.y > uResolution.x) {
    screenRatio = vec2(1.0, uResolution.y / uResolution.x);
  }
  
  vec2 uvMouse = vUv * screenRatio;
  vec2 cursor = uMouse * screenRatio;
  float dist = distance(uvMouse, cursor);
  float currentRadius = uRadius * uHovered;
  float mask = 1.0 - smoothstep(currentRadius - uSoftness, currentRadius + uSoftness, dist);
  
  // Subtle edge distortion only on the mask edge
  vec2 distortedUv = uvCover + (mask * (1.0 - mask)) * 0.03 * uHovered;
  vec4 color2 = texture2D(uTexture2, distortedUv);
  color2 *= step(0.0, distortedUv.x) * step(distortedUv.x, 1.0) * 
            step(0.0, distortedUv.y) * step(distortedUv.y, 1.0);

  vec4 finalColor = mix(color1, color2, mask);

  gl_FragColor = finalColor;
}
`;
