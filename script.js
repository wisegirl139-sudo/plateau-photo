let sky= document.getElementById("clouds");
let ctext =sky.getContext("2d");
sky.width=window.innerWidth;
sky.height=window.innerHeight;
let img =[];
let x=0;
for(let i=1;i<=3;i++){
    let im= new Image();
    im.src="cloud"+i+".png";
    img.push(im);
}
function make(){
    ctext.clearRect(0,0,sky.width,sky.height);
    if(img.every(im=>im.complete && im.naturalWidth>0)){
        for(let i=0;i<3;i++){
            ctext.save();
            ctext.translate(((x+i*200)%((Math.ceil(sky.width/200)+4)*200)+
            ((Math.ceil(sky.width/200)+4)*200))%((Math.ceil(sky.width/200)+4)*200),150);
            ctext.rotate(-Math.PI/2);
            ctext.drawImage(img[i],-50,-100,100,200);
            ctext.restore();
        }
    }
    x-=1;
    if(x<-200){
        x=sky.width;
    }
    requestAnimationFrame(make);
}
window.addEventListener("resize",()=>{
    sky.width=window.innerWidth;
    sky.height=window.innerHeight;

});
make();