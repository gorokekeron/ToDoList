const main_down_btn = document.getElementById("showList")
const modal_window = document.getElementById("modal");

const modal_closure = document.querySelector(".modal-close span");


main_down_btn.addEventListener("click",e=>{
    modal_window.style.display = "flex";
    modal_window.animate([
        {top:"-100%", easing:"ease-out"},
        {top:"0%"}
    ],
    {duration:350}
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
