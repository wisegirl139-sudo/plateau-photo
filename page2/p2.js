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
let bef=false;
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
        dr.style.display="none";
        pr.style.display="block";
        picup();
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
//okay heres what were doing were gonna put the image ona canvas and yeah well see from there 
function picup(){
    if(!ready) return;
    let w=pic.naturalWidth;
    let h=pic.naturalHeight;
    let turn=((ang%360)+360)%360;
    if(bef){
        cv.width=w;
        cv.height=h;
        cx.drawImage(pic,0,0,w,h);
        return;
    }
    if(turn===90||turn===270){
        cv.width=h;
        cv.height=w;
    }else{
        cv.width=w;
        cv.height=h;
    }
    cx.save();
    cx.translate(cv.width/2,cv.height/2);
    cx.rotate(ang*Math.PI/180);
    cx.scale(fx?-1:1,fy?-1:1);
    let b=Number(document.getElementById("b").value);
    let co=Number(document.getElementById("cont").value);
    let fil=`brightness(${b}%) contrast(${co}%)`;
    if(mode==="gray") fil+="grayscale(100%)";
    if(mode==="neg") fil +="invert(100%)";
    if(mode==="vin") fil+="sepia(75%)";
    if(mode==="sun") fil+="sepia(35%) saturate(160%) contrast(110%)"
    cx.filter=fil;
    cx.drawImage(pic,-w/2,-h/2,w,h);
    cx.filter="none";
    cx.restore();
    if(mode==="sun"){
        cx.fillStyle="rgba(255,100,20,0.18)";
        cx.fillRect(0,0,cv.width,cv.height);
    }
    let warm = Number(document.getElementById("warm").value);
    let cold=Number(document.getElementById("cold").value);
    if(warm>0){
        cx.fillStyle=`rgba(255,130,20,${warm/600})`;
        cx.fillRect(0,0,cv.width,cv.height);
    }
    //its very very late and i am genuinely on autopilot , do yall think squirres could take over the world
    if(cold>0){
        cx.fillStyle=`rgba(30,100,255,${cold/600})`;
        cx.fillRect(0,0,cv.width,cv.height);
    }
    let v=Number(document.getElementById("vig").value)/200;
    if(v>0){
        let r=Math.max(cv.width,cv.height)*0.75;
        let g=cx.createRadialGradient(cv.width/2,cv.height/2,r*0.2,
            cv.width/2,cv.height/2,r
        );
        g.addColorStop(0,"rgba(0,0,0,0)");
        g.addColorStop(1,`rgba(0,0,0,${v})`);
        cx.fillStyle=g;
        cx.fillRect(0,0,cv.width,cv.height);
    }
    if(mode==="grr"){
        let data=cx.getImageData(0,0,cv.width,cv.height);
        let px=data.data;
        for(let i=0;i<px.length;i+=4){
            let n=(Math.random()-0.5)*45;
            px[i]+=n;
            px[i+1]+=n;
            px[i+2]+=n;
        }
        cx.putImageData(data,0,0);
    }
}
//bar time, i mean a slider bar get ur mind out the bachelor phase lowk
["b","cont","vig","warm","cold"].forEach(function(id){
    document.getElementById(id).addEventListener("input",picup);
});
//turn it right round baby right round
document.getElementById("rot").addEventListener("click",function(){
    if (!ready) return ;
    ang=(ang+90)%360;
    picup();
});
//just flippin and floppin
document.getElementById("flip1").addEventListener("click",function(){
    if(!ready) return;
    fx=!fx;
    picup();
});
document.getElementById("flip2").addEventListener("click",function(){
    if(!ready) return;
    fy=!fy;
    picup();
});
//is that a filter , yes
document.getElementById("og").addEventListener("click",function(){
    if(!ready) return;
    mode="original";
    ["b","cont"].forEach(id=>{
        document.getElementById(id).value=100;
    });
    ["warm","cold","vig"].forEach(id=>{
        document.getElementById(id).value=0;
    });
    picup();
});
document.getElementById("gray").addEventListener("click",function(){
    if(!ready) return;
    mode="gray";
    picup();
});
document.getElementById("vin").addEventListener("click",function(){
    if(!ready) return;
    mode="vin";
    picup();
});
document.getElementById("neg").addEventListener("click",function(){
    if(!ready) return;
    mode="neg";
    picup();
});
//da reste buton
document.getElementById("reset").addEventListener("click",function(){
    if(!ready) return;
    ang=0;
    mode="original";
    fx=false;
    fy=false;
    document.getElementById("b").value=100;
    document.getElementById("cont").value=100;
    document.getElementById("vig").value=0;
    document.getElementById("warm").value=0;
    document.getElementById("cold").value=0;
    picup();
});
//download time
down.addEventListener("click",function(){
    down.classList.remove("clicked");
    void down.offsetWidth;
    down.classList.add("clicked");
    if(!ready){
        alert("upload an image firstt");
        return;
    }
    let a= document.createElement("a");
    a.download="plateau-photo.png";
    a.href=cv.toDataURL();
    a.click();
});
document.getElementById("before").addEventListener("click",function(){
    if(!ready) return;
    bef=!bef;
    if(bef){
        this.textContent="see edits";
    }else{
        this.textContent="see og"
    }
    picup();});
document.getElementById("grr").addEventListener("click",function(){
    if(!ready) return;
    mode="grr";
    picup();
});
document.getElementById("sun").addEventListener("click",function(){
    if(!ready) return;
    mode="sun";
    picup();
});