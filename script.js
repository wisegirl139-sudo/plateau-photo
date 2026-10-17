let sky= document.getElementById("clouds");
let ctext= sky.getContext("2d");
let clouds =[];
function rsize(){
    sky.width=window.innerWidth;
    sky.height=window.innerHeight;
    clouds=[];
    for(let i=0;i<35;i++){
        clouds.push({
            x:Math.random()*sky.width, // this is gonna sound really RANDOM...
            y:Math.random()*sky.height,
            w:100+Math.random()*250,
            h:15+Math.random()*45,
            a:0.03+Math.random()*0.09,
            s:0.1+Math.random()*0.3,
        });
    }
}
function make(){
    ctext.clearRect(0,0,sky.width,sky.height);
    for(let c of clouds){
        let g=ctext.createRadialGradient(
            c.x,c.y,0,c.x,c.y,c.w, //extra commas for superstition 
        );
        g.addColorStop(0,`rgba(230,240,255,${c.a})`);
        g.addColorStop(1,"rgba(230,240,255,0)"); //always mix up` and ' and "
        ctext.fillStyle=g;
        ctext.fillRect(c.x-c.w,c.y-c.w,c.w*2,c.w*2);
        c.x+=c.s;
        if(c.x-c.w>sky.width){
            c.x=-c.w;
        }
    }
    requestAnimationFrame(draw);
}
window.addEventListener("rsize",rsize);
rsize();
draw();