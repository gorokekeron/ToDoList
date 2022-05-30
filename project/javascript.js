const main_down_btn = document.getElementById("showList")
const modal_window = document.getElementById("modal");

const modal_closure = document.querySelector(".modal-close span");
const ul_list = document.querySelector("#ul_list");

//모달 여는 버튼
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
    write_todo();
});

//모달 닫는 버튼
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


//todo입력한 것을 섹션에 저장
const input = document.querySelector("#input_Todo");
let input_value=''
input.addEventListener('keypress',e=>{
    if(e.keyCode === 13){
        localStorage.setItem("new_Todo",input.value)
        input_value=input.value;
        input.value="";
        e.preventDefault();
    }
})


//리스트 출력
function write_todo(){
    //li 생성
    const li = document.createElement("li");
    //input 생성, li에 붙이기
    const input = document.createElement("input")
    input.setAttribute("type","checkbox");
    //span 생성, 클래스 붙이기 , li에 붙이기
    const span =document.createElement('span');
    span.setAttribute("class","todo_context");
    //createText
    span.append("테스트 테스트");
    //i 생성 클래스 붙이기 li에 붙이기
    const i = document.createElement("i");
    i.setAttribute("class","fa-solid fa-trash-can");
    i.setAttribute("onclick","delete_todo(event)")

    li.append(input,span,i);
    //ul에 li 붙이기
    ul_list.appendChild(li);
}

//리스트 localSession 만큼 만들기


//체크박스 취소선 긋기
const checkbox = document.querySelectorAll("li input");
//":checked"


//휴지통으로 todo 지우기 (삭제전 확인)
function delete_todo(event){
    if(confirm("정말 삭제하겠습니까?")){
        event.currentTarget.parentNode.remove();
        alert("삭제되었습니다.")
    }
}

























//명언 랜덤 변경
//https://www.quotes.net/api.php 로 api 요청함
//https://rapidapi.com/andruxnet/api/random-famous-quotes?endpoint=53aa60e4e4b0596140341ca4 참고해볼 것