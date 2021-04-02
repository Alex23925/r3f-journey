#define PI 3.1415926535897932384626433832795
uniform float uTime;

varying vec2 vUv;
varying vec3 vColor;


void main()
{
    vec2 uv=vec2(vUv);
    
    vec3 color = vec3(0.0);

    gl_FragColor=vec4(color,1.);
}