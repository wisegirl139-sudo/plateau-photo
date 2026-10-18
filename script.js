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
            ang: Math.random()*Math.PI,
            p:Math.random()*100,
        });
    }
}
function make(){
    ctext.clearRect(0,0,sky.width,sky.height);
    for(let c of clouds){
        ctext.save();
        ctext.translate(c.x,c.y);
        ctext.rotate(c.ang);
        let g=ctext.createLinearGradient(-c.w,0,c.w,0);
        g.addColorStop(0,"rgba(230,240,255,0)");
        g.addColorStop(0.3,`rgba(230,240,255,${c.a})`);
        g.addColorStop(0.5,`rgba(230,240,255,${c.a*1.5})`);
        g.addColorStop(1,"rgba(230,240,255,0)");
        ctext.fillStyle=g;
        ctext.filter="blur(5px)";
        ctext.beginPath();
        ctext.ellipse(0,0,c.w,c.h,0,0,Math.PI*2);
        ctext.fill();
        ctext.filter="none";
        ctext.restore();
        c.x+=c.s;
        c.y+=Math.sin((c.x+c.p)*0.005)*0.3;
        if(c.x-c.w>sky.width){
            c.x=-c.w;
            c.y=Math.random()*sky.height;
        }
    }
    requestAnimationFrame(make);
}
window.addEventListener("resize",rsize);
rsize();
make();