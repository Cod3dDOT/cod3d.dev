uniform sampler2D tDiffuse;
uniform vec2 u_prevMouse;
uniform vec2 u_mouse;
uniform vec2 u_resolution;
uniform float u_intensity;
uniform float u_radius;
uniform float u_chromaticAberration;
uniform float u_gridSize;
varying vec2 vUv;

vec2 getDistortionUv(vec2 uv) {
    vec2 gridUv = floor(uv * vec2(u_gridSize)) / vec2(u_gridSize);
    vec2 centerOfPixel = gridUv + vec2(1.0 / (u_gridSize));
    vec2 mouseDirection = u_mouse - u_prevMouse;
    vec2 pixelToMouse = centerOfPixel - u_mouse;
    float distanceToMouse = length(pixelToMouse);
    float strength = smoothstep(u_radius, 0.0, sqrt(distanceToMouse)*2.0) * u_intensity;
    vec2 direction = normalize(pixelToMouse);
    vec2 uvOffset = strength * mouseDirection;
    return uvOffset;
}

void main() {
    vec2 uvOffset = getDistortionUv(vUv);
    vec2 uv = vUv - uvOffset;
    vec4 cr = texture2D(tDiffuse, uv + uvOffset * u_chromaticAberration);
    vec4 cg = texture2D(tDiffuse, uv);
    vec4 cb = texture2D(tDiffuse, uv - uvOffset * u_chromaticAberration);
    gl_FragColor = vec4(cr.r, cg.g, cb.b, cg.a);
}
