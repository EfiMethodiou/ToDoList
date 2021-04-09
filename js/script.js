
//Loader Function
setTimeout(function () {
  $(".loader_bg").fadeToggle();
}, 3500);


//Start carousel according to today's day
var d = new Date();
var t =  d.getDay(); //find todays day as a digit
//console.log(t);
var pos = document.getElementsByName("position");

for (var i = 0; i < pos.length; i++) {  //checks if the value number is equal to the day's number
  if (pos[i].value == t) {
    pos[i].checked = true;    
  } 
}


//welcome tittle 
var daylist = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
//console.log(daylist[t]); 
if(t >= 1 && t <= 5){   
  document.getElementById("day").innerHTML ="Welcome! Have an amazing " + daylist[t];
}

//default checked todo list MONDAY
if(t >=6 || t==0){
  pos[0].checked = true; 
  document.getElementById("day").innerHTML ="Welcome! Enjoy your weekend and get some rest!!";
}

//Popup Message for congratulations functions
function closeMes(){
  document.getElementById("messageBackg").style.display ="none";
  document.getElementById("message").style.display ="none";
}

//POPUP infomation paragraph
function openinfo(){
  document.getElementById("info_paragBackg").style.display = "block";
  document.getElementById("info_parag").style.display = "block";
}
function closeinfo(){
  document.getElementById("info_paragBackg").style.display = "none";
  document.getElementById("info_parag").style.display = "none";
}
