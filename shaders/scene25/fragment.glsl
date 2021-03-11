#define PI 3.1415926535897932384626433832795

varying vec2 vUv;

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

//  Classic Perlin 2D Noise
//  by Stefan Gustavson
//
vec2 fade(vec2 t)
{
    return t*t*t*(t*(t*6.-15.)+10.);
}

vec4 permute(vec4 x)
{
    return mod(((x*34.)+1.)*x,289.);
}

float cnoise(vec2 P)
{
    vec4 Pi=floor(P.xyxy)+vec4(0.,0.,1.,1.);
    vec4 Pf=fract(P.xyxy)-vec4(0.,0.,1.,1.);
    Pi=mod(Pi,289.);// To avoid truncation effects in permutation
    vec4 ix=Pi.xzxz;
    vec4 iy=Pi.yyww;
    vec4 fx=Pf.xzxz;
    vec4 fy=Pf.yyww;
    vec4 i=permute(permute(ix)+iy);
    vec4 gx=2.*fract(i*.0243902439)-1.;// 1/41 = 0.024...
    vec4 gy=abs(gx)-.5;
    vec4 tx=floor(gx+.5);
    gx=gx-tx;
    vec2 g00=vec2(gx.x,gy.x);
    vec2 g10=vec2(gx.y,gy.y);
    vec2 g01=vec2(gx.z,gy.z);
    vec2 g11=vec2(gx.w,gy.w);
    vec4 norm=1.79284291400159-.85373472095314*vec4(dot(g00,g00),dot(g01,g01),dot(g10,g10),dot(g11,g11));
    g00*=norm.x;
    g01*=norm.y;
    g10*=norm.z;
    g11*=norm.w;
    float n00=dot(g00,vec2(fx.x,fy.x));
    float n10=dot(g10,vec2(fx.y,fy.y));
    float n01=dot(g01,vec2(fx.z,fy.z));
    float n11=dot(g11,vec2(fx.w,fy.w));
    vec2 fade_xy=fade(Pf.xy);
    vec2 n_x=mix(vec2(n00,n01),vec2(n10,n11),fade_xy.x);
    float n_xy=mix(n_x.x,n_x.y,fade_xy.y);
    return 2.3*n_xy;
}

void main()
{
    // Pattern 3
    //float strength = vUv.x;
    
    // Pattern 4
    //float strength = vUv.y;
    
    //Pattern 5
    //float strength = 1.0 - vUv.y;
    
    //Pattern 6
    //float strength = vUv.y * 10.0;
    
    // Pattern 7
    //float strength = mod(vUv.y * 10.0, 1.0);
    
    // Pattern 8
    // float strength=mod(vUv.y*10.,1.);
    // strength = step(.5, strength);
    
    // Pattern 9
    // float strength=mod(vUv.y*10.,1.);
    // strength=step(.8,strength);
    
    // Pattern 10
    // float strength=mod(vUv.x*10.,1.);
    // strength=step(.8,strength);
    
    // Pattern 11
    //float strength=step(.5,mod(vUv.x*2.,1.));
    //strength-=step(.8,mod(vUv.y*10.,1.));
    
    // Pattern 12
    // float barX=step(.7,mod(.01-(vUv.x*2.),1.));
    // barX*=step(.7,mod(vUv.y*2.,1.));
    
    // float barY=step(.8,mod(vUv.x*10.,1.));
    // barY*=step(.2,mod(vUv.y*10.,1.));
    
    // float arrowPattern = barX + barY;
    
    // Pattern 13
    // float barX=step(.2,mod(vUv.x*10.,1.));
    // barX*=step(.8,mod(vUv.y*10.,1.));
    
    // float barY=step(.8,mod(.5-(vUv.x*10.),1.));
    // barY*=step(.2,mod(.5-(vUv.y*10.),1.));
    
    // float arrowPattern=barX+barY;
    
    // Pattern 14
    //float pattern = abs(.5-vUv.x);
    
    // Pattern 15
    // float patternX = abs(.5-vUv.x);
    // float patternY = abs(.5-vUv.y);
    // float pattern = min(patternX, patternY);
    
    // Pattern 16
    // float patternX = abs(.5-vUv.x);
    // float patternY = abs(.5-vUv.y);
    // float pattern = step(.45, max(patternX, patternY));
    
    // Pattern 17
    //float pattern = floor(vUv.x * 10.0) / 10.0;
    
    // Pattern 18
    // float patternX=floor(vUv.x*10.)/10.;
    // float patternY = floor(vUv.y*10.0) /10.;
    // float pattern = patternX * patternY;
    
    // Pattern 19
    // float patternX=floor(vUv.x*10.)/10.;
    // float patternY = floor(vUv.y*10.0) /10.;
    // vec2 patternUV = vec2(patternX, patternY);
    // float pattern = random(patternUV);
    
    // Pattern 20
    // float patternX=floor(vUv.x*10.)/10.;
    // float patternY=floor((vUv.y+vUv.x*.5)*10.)/10.;
    // vec2 patternUV=vec2(patternX,patternY);
    // float pattern=random(patternUV);
    
    // Pattern 21
    //float pattern=distance(vUv,vec2(.5,.5));
    
    // Pattern 22
    //float pattern=distance(vUv,vec2(.5,.5));
    
    // Pattern 23
    //float pattern=1.-distance(vUv,vec2(.5,.5));
    
    // Pattern 23
    //float pattern=.02/ distance(vUv,vec2(.5,.5));
    
    // Pattern 24
    // vec2 lightUV = vec2(
        //     vUv.x * .1 + .45,
        //     vUv.y * .5 + .25
    // );
    // float pattern=.02/distance(lightUV,vec2(.5,.5));
    
    // Pattern 25
    // vec2 lightUvX = vec2(
        //     vUv.x * .1 + .45,
        //     vUv.y * .5 + .25
    // );
    // float lightX = .02/distance(lightUvX,vec2(.5,.5));
    // vec2 lightUvY = vec2(
        //     vUv.y * .1 + .45,
        //     vUv.x * .5 + .25
    // );
    // float lightY = .02/distance(lightUvY,vec2(.5,.5));
    // float pattern=lightX * lightY;
    
    // Pattern 26
    // vec2 rotateUv = rotate(vUv, PI/4.0, vec2(.5));
    // vec2 lightUvX = vec2(
        //     rotateUv.x * .1 + .45,
        //     rotateUv.y * .5 + .25
    // );
    // float lightX = .02/distance(lightUvX,vec2(.5,.5));
    // vec2 lightUvY = vec2(
        //     rotateUv.y * .1 + .45,
        //     rotateUv.x * .5 + .25
    // );
    // float lightY = .02/distance(lightUvY,vec2(.5,.5));
    // float pattern=lightX * lightY;
    
    // Pattern 27
    // float pattern =  step(.02,abs(distance(vUv, vec2(.5))  - .25));
    
    // Pattern 28
    //float pattern=1.-step(.02,abs(distance(vUv,vec2(.5))-.25));
    
    // Pattern 29
    // vec2 waveUv = vec2(
        //     vUv.x + sin(vUv.y*30.)*.1,
        //     vUv.y + sin(vUv.x * 30.0) * .1
    // );
    
    // float pattern=1.-step(.02,abs(distance(waveUv,vec2(.5))-.25));
    
    // Pattern 30
    // vec2 waveUv = vec2(
        //     vUv.x + sin(vUv.y*80.)*.1,
        //     vUv.y + sin(vUv.x * 80.0) * .1
    // );
    
    // float pattern=1.-step(.02,abs(distance(waveUv,vec2(.5))-.25));
    
    // Pattern 31
    // float angle = atan(vUv.y - .5, vUv.x - .5);
    // float pattern = angle;
    
    // Pattern 32
    // float angle=atan(vUv.y-.5,vUv.x-.5);
    // angle /= 2.0 * PI;
    // angle += .5;
    // float pattern=angle;
    
    // Pattern 33
    // float angle=atan(vUv.y-.5,vUv.x-.5);
    // angle /= 2.0 * PI;
    // angle += .5;
    // angle *= 10.0;
    // angle = mod(angle, 1.0);
    // float pattern=angle;
    
    // Pattern 34
    // float angle=atan(vUv.y-.5,vUv.x-.5);
    // angle /= 2.0 * PI;
    // angle += .5;
    // float sinusoid = sin(angle * 100.0);
    // float radius = .25 + sinusoid * .02;
    // float pattern=1.-step(.02,abs(distance(vUv,vec2(.5))-radius));
    
    // Pattern 35
    //float pattern=step(.0,cnoise(vUv * 10.0));
    
    // Pattern 36
    //float pattern=1.-abs(cnoise(vUv*10.));
    
    // Pattern 37
    //float pattern=sin(cnoise(vUv*10.)*20.);
    
    // Pattern 38
    //float pattern=step(.9,sin(cnoise(vUv*10.)*20.));

    // Pattern 39
    float pattern=step(.9,sin(cnoise(vUv*10.)*20.));
    
    // clamp the strength
    float clampedPattern = clamp(pattern, 0.0, 1.0);
    vec3 blackColor = vec3(0.0);
    vec3 uvColor = vec3(vUv, 1.0);

    vec3 mixedColor = mix(blackColor, uvColor, clampedPattern);

    // Pattern ??
    // float pi = 3.14;
    // float angle = pi/4.0;
    // float radius = 0.5;
    // float x = cos(angle) * radius;
    // float y = sin(angle) * radius;
    // float pattern = x + y;
    
    gl_FragColor=vec4(mixedColor,1.);
}