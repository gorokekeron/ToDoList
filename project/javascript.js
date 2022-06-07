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


//todo입력한 것을 섹션에 저장    https://velog.io/@dnjswn123/todo를-저장하기-localStorage
/*
JSON.stringify( ) 를 사용하면 된다.
JSON.stringify() 는 자바스크립트 객체를 JSON이 읽을 수 있는 데이터로 바꾸어준다.
JSON.parse() 를 사용한다.
JSOn.parse() 는 JSON이 읽을 수 있는 데이터를 자바스크립트객체로 변환해준다.

*/
// const input = document.querySelector("#input_Todo");
// let todo_list =[]
// input.addEventListener('keypress',e=>{
//     if(e.keyCode === 13){
//         e.preventDefault();
//         todo_list.push(input.value)
//         localStorage.setItem("new_Todo",todo_list)
//         input.value="";
//     }
// })

addEntries();
function addEntries(){
    const input = document.getElementById("input_Todo");

   
    input.addEventListener('keydown',function(event){
        if(event.keyCode == 13){
            event.preventDefault();            
            let existingEntries = JSON.parse(localStorage.getItem("new_Todo"));
            if(existingEntries == null) existingEntries = [];
        
            existingEntries.push(input.value);
            localStorage.setItem("new_Todo", JSON.stringify(existingEntries));
            
            input.value=""
        }
    })
}

//리스트 출력
function write_todo(){


//array.forEach(element=>{cord})

const loStorage = JSON.parse(localStorage.getItem("new_Todo"));
let count_index =0;
loStorage.forEach(element=>{
    
    //li 생성
    const li = document.createElement("li");
    //input 생성,
    const input = document.createElement("input")
    input.setAttribute("type","checkbox");
    input.setAttribute("onclick","clickCheck(event)")
    //span 생성, 클래스 붙이기 
    const span =document.createElement('span');
    span.setAttribute("class","todo_context");
    //createText
    span.append(element);
    //i 생성 클래스 붙이기
    const i = document.createElement("i");
    i.setAttribute("class","fa-solid fa-trash-can");
    i.setAttribute("onclick","delete_todo(event)")
    i.setAttribute("value",count_index++);

    //li에 붙이기
    li.append(input,span,i);
    //ul에 li 붙이기
    ul_list.appendChild(li);
})
}










function clickCheck(e){ //https://velog.io/@qeiqiem/JS-onclick-...-Uncaught-TypeError-Cannot-read-properties-of-undefined-reading-target
    const theone = e.target;
    const thesister = theone.nextSibling
    if(theone.checked == true){
        thesister.style.textDecorationLine="line-through"
    }else{
        thesister.style.textDecorationLine="none"
    }
}







// //체크박스 취소선 긋기
// const checkbox = document.querySelectorAll("#ul_list li input");
// checkbox[0].addEventListener("change",e=>{
//     if(checkbox[0].checked){
//         document.getElementsByClassName("todo_context")[0].style.textDecorationLine="line-through";
//     }else{
//         document.getElementsByClassName("todo_context")[0].style.textDecorationLine="none"
//     }
// })


//휴지통으로 todo 지우기 (삭제전 확인)      https://hogni.tistory.com/122
function delete_todo(event){
    if(confirm("정말 삭제하겠습니까?")){
        const index = event.target.value;
        const array1 = localStorage.getItem("new_Todo")   //json 에서 요소 삭제 하고 다시 등록????????

        console.log(array.remove(index))
        //그 인덱스를 가지고 new_Todo의 요소 삭제
    
        //html에서 삭제
        // event.currentTarget.parentNode.remove();
    }
}










//1. 세션의 내용을 뿌린다
//2. 휴지통을 적용시킨다. (진짜 세션에서도 사라짐)
//3. 취소선 핯당















//명언 랜덤 변경
//https://www.quotes.net/api.php 로 api 요청함
//https://rapidapi.com/andruxnet/api/random-famous-quotes?endpoint=53aa60e4e4b0596140341ca4 참고해볼 것