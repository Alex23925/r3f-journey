#define PI 3.1415926535897932384626433832795
uniform float uTime;
uniform vec3 uColor;
uniform vec3 uDepthColor;
uniform float uColorOffset;
uniform float uColorMultiplier;
varying vec2 vUv;
varying float vElevation;


float random(vec2 st)
{
    return fract(sin(dot(st.xy,vec2(12.9898,78.233)))*43758.5453123);
}

vec2 rotate(vec2 uv,float angle,vec2 mid)
{
    return vec2(
        cos(angle)*(uv.x-mid.x)+sin(angle)*(uv.y-mid.y)+mid.x,
        cos(angle)*(uv.y-mid.y)-sin(angle)*(uv.x-mid.x)+mid.y
    );
}

vec3 hsb2rgb(in vec3 c){
    vec3 rgb=clamp(
        abs(mod(c.x*6.+vec3(0.,4.,2.),6.)-3.)-1.,
        0.,
        1.
    );
    rgb=rgb*rgb*(3.-2.*rgb);
    return c.z*mix(vec3(1.),rgb,c.y);
}

void main()
{
    vec2 uv=vec2(vUv);
    
    vec3 color = vec3(0.0);

    float mixStrength = (vElevation + uColorOffset) * uColorMultiplier;
    color = mix(uDepthColor,  uColor, mixStrength);

    gl_FragColor=vec4(color,1.);
}