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
        let gap =200;
        let total=Math.ceil(sky.width/gap)+3;
        for(let i=0;i<total;i++){
            let pos=(x+i*gap)%(total*gap);
            if(pos<-gap){
                pos+=total*gap;
            }
            ctext.save();
            ctext.translate(pos+100,150);
            ctext.rotate(-Math.PI/2);
            ctext.drawImage(img[i%3],-50,-100,100,200);
            ctext.restore();

        }            

    }
    x-=1;
    if(x<-130){
        x+=130;
    }
    requestAnimationFrame(make);
}
window.addEventListener("resize",()=>{
    sky.width=window.innerWidth;
    sky.height=window.innerHeight;

});
make();