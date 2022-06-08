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
    time_place.innerHTML=`<span>${LocalTime}</span><span>&nbsp;&nbsp;&nbsp;&nbsp;<strong class="noon">
    ${what_noon}</strong>&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;`
}


//todo입력한 것을 섹션에 저장    https://velog.io/@dnjswn123/todo를-저장하기-localStorage
/*
JSON.stringify( ) 를 사용하면 된다.
JSON.stringify() 는 자바스크립트 객체를 JSON이 읽을 수 있는 데이터로 바꾸어준다.
JSON.parse() 를 사용한다.
JSOn.parse() 는 JSON이 읽을 수 있는 데이터를 자바스크립트객체로 변환해준다.
*/

addEntries();
function addEntries(){
    const input = document.getElementById("input_Todo");
   
    input.addEventListener('keydown',function(event){
        if(event.keyCode == 13){
            event.preventDefault();            
            let existingEntries

            if(localStorage.getItem("new_Todo") == null || localStorage.getItem("new_Todo") == ""){
                existingEntries = [];   

            }else{
                existingEntries = JSON.parse(localStorage.getItem("new_Todo"));
            }
            existingEntries.push(input.value);
            localStorage.setItem("new_Todo", JSON.stringify(existingEntries));
            
            input.value=""
        }
    })
}

//리스트 출력
function write_todo(){
    const loStorage = JSON.parse(localStorage.getItem("new_Todo"));
    let count_index =0;

    if(localStorage.getItem("new_Todo") != null || localStorage.getItem("new_Todo") != '[]'){//값 존재
        console.log("yes")
        //h5 지우기
        document.getElementsByClassName("notice_h").remove;

        //array.forEach(element=>{cord})
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
        i.setAttribute("data-value",count_index++);     //없는 속성 쓰지말고 사용자 속성 사용하자

        //li에 붙이기
        li.append(input,span,i);
        //ul에 li 붙이기
        ul_list.appendChild(li);
        })
    }else{//값 없음
        ul_list.appendChild(notice_nothing());
    }
}


function notice_nothing(){
    const h5 = document.createElement("h5");
    h5.append("이런~ 지금은 할 일이 없어요 😽")
    h5.setAttribute("class","notice_h");
    return h5;
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
        const index = event.target.dataset.value;
         //https://developer-talk.tistory.com/153
        const list = JSON.parse(localStorage.getItem("new_Todo"))
        list.splice(index,1)
      
        localStorage.setItem("new_Todo",JSON.stringify(list));
     
        //html에서 삭제
        event.currentTarget.parentNode.remove();
    }
}





//https://velog.io/@torin/javascript-event.target.value

quotes();


//명언 랜덤 변경
function quotes(){
//https://api.qwer.pw/

    $.ajax({
        url:"https://api.qwer.pw/request/helpful_text",
        method:"GET",
        dataType:"json",
        data:{apikey:"guest"}
    })
    .done(function(json){
        //글자 오른쪽에서 첨 발견한 - 옆에 br붙이기
        const word = json[1].respond;

        const word2 = [word.slice(0, word.lastIndexOf(word.lastIndexOf("-")==-1?"–":"-")),"<br><br>",word.slice(word.lastIndexOf(word.lastIndexOf("-")==-1?"–":"-"))].join('');


       $("#quote").append(word2);
    });
}


//도시  https://developer.mozilla.org/ko/docs/Web/API/Geolocation_API/Using_the_Geolocation_API
function geoFindMe() {

    const status = document.querySelector('#status');
    const mapLink = document.querySelector('#map-link');
  
     mapLink.href = '';
     mapLink.textContent = '';






  
    function success(position) {
      const latitude  = position.coords.latitude;
      const longitude = position.coords.longitude;
  
      status.textContent = '';
      mapLink.href = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
      mapLink.textContent = `Latitude: ${latitude} °, Longitude: ${longitude} °`;
    }
  
    function error() {
      status.textContent = 'Unable to retrieve your location';
    }
  








    if(!navigator.geolocation) {
      status.textContent = 'Geolocation is not supported by your browser';
    } else {
      status.textContent = 'Locating…';
      navigator.geolocation.getCurrentPosition(success, error);
    }



    document.createElement("span").setAttribute("id","find-me").innerHTML(status).after(".noon");

  }
  
  search();
  function search(e){
        const searchbox = document.querySelector(".searchBox .qyery");
      


        searchbox.addEventListener("keypress",e=>{
            if(e.keyCode===13){
                e.preventDefault();
                location.href ="http://google.com/search?q="+searchbox.value;
            }
        })
  }