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
//let down and hanging around ,crushed like a bug in the ground, -peak song 
let down=document.getElementById("down");
down.addEventListener("click",function(){
    down.classList.remove("clicked");
    void down.offsetWidth;
    down.classList.add("clicked");
});
let up=document.getElementById("upload");
let dr=document.getElementById("drop");
let pr=document.getElementById("prev");
let pic=new Image();
let ready=false,
ang=0,
fx=false,
fy=false,//dydx? nahhh fyfx, i ush i could use memes imagien the drake one here
mode="original";
let cv=document.createElement("canvas"); //almost got a jumpscare from cv, spooky employment
let cx=cv.getContext("2d");
cv.id="photo";
pr.appendChild(cv);
function load(f){
    if(!f||!f.type.startsWith("image/")) return;
    let url=URL.createObjectURL(f);
    pic.onload=function(){
        ready=true;
        ang=0;
        fx=false;
        fy=false;
        mode="original";
        document.getElementById("b").value=100;
        document.getElementById("cont").value=100;
        document.getElementById("vig").value=0;
        document.getElementById("warm").value=0;
        document.getElementById("cold").value=0;
        draw();
        URL.revokeObjectURL(url);
    };
    pic.onerror=function(){
        alert("wassup fam the iamge dint load");
        URL.revokeObjectURL(url);
    };
    pic.src=url;
}
//would you rahter load up or load down 
dr.addEventListener("click",function(e){
    if(e.target !==up)up.click();
});
up.addEventListener("change",function(){
    load(up.files[0]);
});
//drag queens fr
dr.addEventListener("dragover",function(e){
    e.preventDefault();
    dr.style.backgroundColor="#426db3";
});
dr.addEventListener("dragleave",function(){
    dr.style.backgroundColor="";
});
dr.addEventListener("drop",function(e){
    e.preventDefault();
    dr.style.backgroundColor="";
    let f=e.dataTransfer.files[0];
    if(f && (f.type==="image/png"||f.type==="image/jpeg")){
        load(f);
    }else{
        alert("drap a png or a jpeg my guy");
    }
});