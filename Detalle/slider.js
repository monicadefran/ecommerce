var mainImg=document.getElementById("imagen_det");
var images="quadrocopter.jpg";
var images=["quadrocopter.jpg","camara_dron.jpg", "mando_dron.jpg", "vuela_dron.jpg"];
var num=0;

function next(){
    num++;
    if(num>=images.length){
        num=0;
        mainImg.src=images[num]
    }
    else{
        mainImg.src=images[num]
    }
}

function back(){
    num--;
    if(num<0){
       num=images.length-1;
       num=1;
       mainImg.src=images[num]
    }
    else{
        mainImg.src=images[num]
    }
}

function openNav(){
    document.getElementById('sidenav').style.display = 'block';
    document.getElementById('sidenav').style.width = '50%';
 }
 function closeNav(){
    document.getElementById('sidenav').style.width = '0%';
 }


