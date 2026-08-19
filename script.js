const inp=document.querySelector(".top input");
const add=document.querySelector(".top button");
const count=document.querySelector(".taskcount");
const last=document.querySelector(".last");
const check=document.querySelector("checkbox");
const emptytext=document.querySelector(".empty-state");
const deletall=document.querySelector(".deletall");



function updateCount() {
    let len = last.querySelectorAll(".todos").length;
    
    if (len === 0) {
        
        emptytext.classList.remove("hideemptystate");
        count.classList.add("hideemptystate");
        deletall.classList.add("hideemptystate");
    } else {
        
        emptytext.classList.add("hideemptystate");
        count.classList.remove("hideemptystate");
        count.innerText = `${len} tasks left`;
        deletall.classList.remove("hideemptystate");
    }
    save(); 
    
}

add.addEventListener("click",()=>{
    let div=document.createElement("div");
    if(inp.value!=""){
        div.className="todos";
        div.innerHTML=`
                        <div class="sa">
                            <input class="checkBox" type="checkbox">
                            <p>${inp.value}</p>
                        </div>
                        <div class="sb">
                            <span id="green" class="up">⬆</span>
                            <span>
                                <img class="del" src="./image3.png" alt="">
                            </span>
                            <span id="red" class="down">⬇</span>
                        </div>`;
                    
        last.appendChild(div);
        
        
    }
    else{
        alert("Invalid Data");
    }
    inp.value="";
    updateCount();
    save();

});

inp.addEventListener("keypress",(e)=>{
    if (e.key==="Enter") {
        add.click(); 
    }
});

last.addEventListener("click",(e)=>{
    // console.log(e.target.parentElement.parentElement.parentElement);
    console.log(e.target.closest(".todos"));
    if(e.target.classList.contains("checkBox")){
        e.target.nextElementSibling.classList.toggle("done");
        if(e.target.checked){
            e.target.setAttribute("checked", "checked");
        } else {
            e.target.removeAttribute("checked");
        }
        save();
    }
    else if(e.target.classList.contains("up")){
        let crrtasks = e.target.closest(".todos");;
        let prevtask = crrtasks.previousElementSibling;
    
        if(prevtask){
            prevtask.before(crrtasks);
        }
        save();
    }
    else if(e.target.classList.contains("down")){
        let crrtasks = e.target.closest(".todos");
        let nexttask = crrtasks.nextElementSibling;
    
        if(nexttask){
            nexttask.after(crrtasks);
        }
        save();
    }
    else if(e.target.classList.contains("del")){
        e.target.closest(".todos").remove();
        let len = last.querySelectorAll(".todos").length;
        updateCount();

    }
});

function save(){
    localStorage.setItem("data",last.innerHTML);
}
function reupdate(){
    last.innerHTML=localStorage.getItem("data");
    updateCount()
}
reupdate();


deletall.addEventListener("click",(e)=>{
    last.innerHTML = "";
    updateCount();
});

