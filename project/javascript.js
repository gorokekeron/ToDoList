const main_down_btn = document.getElementById("showList")
const modal_window = document.getElementById("modal");

const modal_closure = document.querySelector(".modal-close span");


main_down_btn.addEventListener("click",e=>{
    modal_window.style.display = "flex";
    modal_window.animate([
        {top:"-100%", easing:"ease-out"},
        {top:"0%"},
        {top:"-10%"},
        {top:"0%"}
    ],
    {duration:500}
    )
});

modal_closure.addEventListener("click",e=>{
    modal_window.animate([
        {top:"0%", easing:"ease-out"},
        {top:"-100%"}
        ],
        {duration:350}
    )
    setTimeout(()=>{modal_window.style.display="none"}, 340);
});



//시간 Date 객체
const time_place = document.querySelector(".main_middle #time");
settime();
setInterval(settime,5000)
function settime() {
    const date = new Date();
    let what_noon="";
    let LocalTime="";
    if(date.getHours()<12){
        what_noon="AM";
        LocalTime = date.getHours()+" : "+date.getMinutes().toString().padStart(2,0);
    }else{
        what_noon="PM";
        LocalTime = (date.getHours()-12)+" : "+date.getMinutes().toString().padStart(2,0);
    }
    time_place.innerHTML=`<span>${LocalTime}</span><span>&nbsp;&nbsp;&nbsp;&nbsp;<strong>${what_noon}</strong>&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;GMT(어쩌구)`
}


//배경화면 랜덤 변경


//명언 랜덤 변경


