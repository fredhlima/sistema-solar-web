import * as T from 'three';

// A compact procedural sea for the mission hangar. Coordinates and wave phases
// are world-space, so the surface has no UV-aligned bands or visible tiling.
const vertexShader = /* glsl */`
uniform float time;
varying vec3 vWorldPosition;
varying vec3 vViewPosition;

vec3 seaWave(vec2 p, vec2 direction, float frequency, float amplitude, float speed, float phase) {
  float angle = dot(direction, p) * frequency + time * speed + phase;
  float s = sin(angle);
  float c = cos(angle);
  return vec3(amplitude * s,
    amplitude * frequency * direction.x * c,
    amplitude * frequency * direction.y * c);
}

vec3 seaShape(vec2 p) {
  return seaWave(p, normalize(vec2(0.82, 0.57)), 0.38, 0.010, 0.42, 0.4)
       + seaWave(p, normalize(vec2(-0.31, 0.95)), 0.57, 0.006, -0.31, 2.1)
       + seaWave(p, normalize(vec2(0.98, -0.20)), 0.82, 0.0035, 0.24, 4.0);
}

void main() {
  vec4 world = modelMatrix * vec4(position, 1.0);
  vec3 shape = seaShape(world.xz);
  world.y += shape.x;
  vec4 view = viewMatrix * world;
  vWorldPosition = world.xyz;
  vViewPosition = -view.xyz;
  gl_Position = projectionMatrix * view;
}`;

const fragmentShader = /* glsl */`
uniform float time;
uniform float extent;
varying vec3 vWorldPosition;
varying vec3 vViewPosition;

vec3 seaWave(vec2 p, vec2 direction, float frequency, float amplitude, float speed, float phase) {
  float angle = dot(direction, p) * frequency + time * speed + phase;
  float s = sin(angle);
  float c = cos(angle);
  return vec3(amplitude * s,
    amplitude * frequency * direction.x * c,
    amplitude * frequency * direction.y * c);
}

vec3 seaShape(vec2 p) {
  // Crossing wavelengths and oblique directions keep the highlights irregular.
  return seaWave(p, normalize(vec2(0.82, 0.57)), 0.38, 0.010, 0.42, 0.4)
       + seaWave(p, normalize(vec2(-0.31, 0.95)), 0.57, 0.006, -0.31, 2.1)
       + seaWave(p, normalize(vec2(0.98, -0.20)), 0.82, 0.0035, 0.24, 4.0)
       + seaWave(p, normalize(vec2(-0.76, -0.65)), 1.35, 0.0018, -0.53, 1.3);
}

void main() {
  vec3 shape = seaShape(vWorldPosition.xz);
  vec2 p = vWorldPosition.xz;
  // Optical capillary ripples do not move the capsule or the coarse water mesh.
  float r1 = sin(p.x * 5.7 + sin(p.y * 2.9) * 1.3 + time * .65);
  float r2 = sin(p.y * 7.3 + sin(p.x * 3.1) * 1.8 - time * .47);
  float r3 = sin(p.x * 2.7 - p.y * 4.1 + time * .32);
  vec3 normal = normalize(vec3(-shape.y + r1 * .065 + r3 * .04, 1.0, -shape.z + r2 * .065));
  vec3 viewDirection = normalize(cameraPosition - vWorldPosition);
  vec3 sunDirection = normalize(vec3(-0.48, 0.73, 0.49));

  float ndotl = max(dot(normal, sunDirection), 0.0);
  float fresnel = 0.025 + 0.975 * pow(1.0 - max(dot(normal, viewDirection), 0.0), 5.0);
  vec3 reflected = reflect(-viewDirection, normal);

  vec3 deepWater = vec3(0.008, 0.052, 0.075);
  vec3 bodyWater = vec3(0.014, 0.135, 0.16);
  vec3 water = mix(deepWater, bodyWater, 0.30 + 0.24 * ndotl);
  water += vec3(0.004, 0.018, 0.019) * (0.5 + 0.5 * sin(vWorldPosition.x * 0.19 + vWorldPosition.z * 0.13 + time * 0.11));

  // A restrained sky reflection, strongest at grazing angles.
  vec3 skyLow = vec3(0.12, 0.25, 0.29);
  vec3 skyHigh = vec3(0.23, 0.39, 0.47);
  vec3 skyReflection = mix(skyLow, skyHigh, smoothstep(-0.05, 0.72, reflected.y));
  water = mix(water, skyReflection, fresnel * 0.62);

  // Tight, dim specular catches add a little sun without drawing bright stripes.
  float spec = pow(max(dot(reflect(-sunDirection, normal), viewDirection), 0.0), 72.0);
  float broken = 0.55 + 0.45 * sin(vWorldPosition.x * 0.31 + sin(vWorldPosition.z * 0.23) * 2.0 + time * 0.16);
  water += vec3(0.34, 0.43, 0.43) * spec * broken * 0.17;
  float rippleLight = smoothstep(.25, .95, r1 * r2 * .5 + .5);
  water += vec3(.016, .035, .040) * rippleLight * (1.0 - smoothstep(extent * .18, extent * .65, length(vViewPosition)));

  // Fade the finite plane into the distant sea color instead of a hard edge.
  float distanceToCamera = length(vViewPosition);
  float horizon = smoothstep(extent * 0.30, extent * 0.90, distanceToCamera);
  vec3 horizonColor = mix(vec3(0.10, 0.22, 0.25), vec3(0.19, 0.33, 0.36), fresnel * 0.3);
  water = mix(water, horizonColor, horizon * 0.82);

  gl_FragColor = vec4(water, 1.0);
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}`;

/** Create the ocean ShaderMaterial. Pass either an extent number or { extent }. */
export function criarMaterialOceano(options = {}) {
  const requestedExtent = Number.isFinite(options) ? options : options?.extent;
  const extent = Number.isFinite(requestedExtent) && requestedExtent > 0 ? requestedExtent : 120;
  return new T.ShaderMaterial({
    uniforms: {
      time: { value: 0 },
      extent: { value: extent },
    },
    vertexShader,
    fragmentShader,
    toneMapped: true,
  });
}
