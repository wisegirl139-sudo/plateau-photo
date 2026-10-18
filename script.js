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
        for(let i=0;i<8;i++){
            ctext.drawImage(img[i],x+i*200,100,200,100);
        }
    }
    x-=1;
    if(x<-600){
        x=sky.width;
    }
    requestAnimationFrame(make);
}
window.addEventListener("resize",()=>{
    sky.width=window.innerWidth;
    sky.height=window.innerHeight;

});
make();