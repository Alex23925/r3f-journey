#define PI 3.1415926535897932384626433832795
uniform float uTime;

varying vec2 vUv;
varying vec3 vColor;


void main()
{
    vec2 uv=vec2(vUv);
    
    vec3 color = vec3(1.0);

    // Diffused point
    // float strength = distance(gl_PointCoord, vec2(.5));
    // strength *= 2.0;
    // strength  = 1.0 - strength;

    // Light Point
    float strength = distance(gl_PointCoord, vec2(.5));
    strength  = 1.0 - strength;
    strength = pow(strength, 10.0);

    // Final Color 
    color = mix(vec3(0.0), vColor, strength);

    gl_FragColor=vec4(color,1.);
}