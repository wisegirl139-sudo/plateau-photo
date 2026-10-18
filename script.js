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
            visible:Math.random()>0.5,
        });
    }
}
let img=[];
for(let i=1;i<=3;i++){
    let immg= new Image();
    img.src="cloud"+i+".png";
    img.push(img);
}
function make(){
    ctext.clearRect(0,0,sky.width,sky.height);
    for(let c of clouds){
        if(!c.visible){
            if(Math.random()<0.005){
                c.visible=true;
                c.x=-c.w;
                c.y=Math.random()*sky.height;
            }
            continue;
        }
        if(c.x-c.w>sky.width){
            c.visible=false;
        }
    }
    requestAnimationFrame(make);
}
window.addEventListener("resize",rsize);
rsize();
make();