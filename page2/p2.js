let sky=document.getElementById("clouds");
let ctext=sky.getContext("2d");
sky.width=window.innerWidth;
sky.height=window.innerHeight;
let img=[];
let x=0;
for(let i=1;i<=3;i++){
    let im= new Image();
    im.src="cloud"+i+".png";
    img.push(im);//if im said im pushing img wheres im going(riddler ts)

}
function move(){
    ctext.clearRect(0,0,sky.width,sky.height);
    if(img.every(im=>im.complete && im.naturalWidth>0)){
        let gap=200;
        let total=Math.ceil(sky.width/gap)+3;
        for(let i=0;i<total;i++){
            let pos=(x+i*gap)%(total*gap);
            if(pos<-100){
                pos+=total*gap;
            }
            ctext.save();
            ctext.translate(pos+100,150);
            ctext.rotate(-Math.PI/2);
            ctext.drawImage(img[i%3],-50,-100,100,200);
            ctext.restore();
        }
    }
    x-=1
    requestAnimationFrame(move);
}
window.addEventListener("resize",()=>{
    sky.width=window.innerWidth;
    sky.height=window.innerHeight;
});
move();