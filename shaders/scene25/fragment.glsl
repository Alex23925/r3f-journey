varying vec2 vUv;

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
    float barX=step(.7,mod(.01-(vUv.x*2.),1.));
    barX*=step(.7,mod(vUv.y*2.,1.));
    
    // float barY=step(.8,mod(vUv.x*10.,1.));
    // barY*=step(.2,mod(vUv.y*10.,1.));
    
    // float arrowPattern = barX + barY;
    
    // Pattern 12
    // float barX=step(.2,mod(vUv.x*10.,1.));
    // barX*=step(.8,mod(vUv.y*10.,1.));
    
    // float barY=step(.8,mod(vUv.x*10.,1.));
    // barY*=step(.2,mod(vUv.y*10.,1.));
    
    // float arrowPattern=barX+barY;
    
    gl_FragColor=vec4(barX,barX,barX,1.);
}