uniform vec2 uFrequency;
uniform float uTime;

attribute float aRandom;

varying float vRandom;
varying vec2 vUv;
varying float vElevation;


void main(){
    
    vec4 modelPosition= modelMatrix * vec4(position,1.);

    float elevation = sin(modelPosition.x * uFrequency.x + uTime)*.1;
    elevation += cos(modelPosition.y*uFrequency.y+uTime)*.1;

    modelPosition.z += elevation;

    // modelPosition.z += aRandom * 0.1;
    vec4 viewPosition= viewMatrix * modelPosition;
    vec4 projectedPosition= projectionMatrix * viewPosition;
    
    gl_Position = projectedPosition;

    vRandom = aRandom;
    vUv = uv;
    vElevation = elevation;
}