let sky= document.getElementById("clouds");
let ctext= sky.getContext("2d");
let clouds =[];
function rsize(){
    sky.width=window.innerWidth;
    sky.height=window.innerHeight;
    clouds=[];
    for(let i=0;i<3;i++){
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
    immg.src="cloud"+i+".png";
    img.push(immg);
}
let x=0;

function draw(img,x,y,w,h){
    ctext.save();
    ctext.translate(x+w/2,y+h/2);
    ctext.rotate(-Math.PI/2);
    ctext.drawImage(img,-h/2,-w/2,h,w);
    ctext.restore();
}

function make(){
    ctext.clearRect(0,0,sky.width,sky.height);
    if(img.every(im=>im.complete && im.naturalWidth>0)){
        draw(img[0],x,100,200,100);
        draw(img[1],x+200,100,200,100);
        draw(img[2],x+400,100,200,100);
    }
    x-=1;
    if(x<-600){
        x=sky.width;
    }
    requestAnimationFrame(make);
}
window.addEventListener("resize",rsize);
rsize();
make();