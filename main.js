//
let taskInput = document.getElementById("task-input");
let addButton = document.getElementById("add-button");
let tabs = document.querySelectorAll(".task-tabs div");
let taskList =[];
let mode ="all";
let filterList=[];
addButton.addEventListener("click",addTask);

for(let i = 1; i<tabs.length; i++){
    tabs[i].addEventListener("click",function(event){filter(event)})
}

function addTask(){
    let task = {
        id: randomIDGenerate(),
        taskContent: taskInput.value,
        isComplete:false,
    };
    taskList.push(task);
    console.log(taskList);
    render();
}

function render(){
    let list=[];
    if(mode == "all"){
        list = taskList;
    }else if(mode == "ongoing" || mode == "done") {
        list = filterList;
    }

    let resultHTML = "";
    for(let i=0; i<list.length;i++){
        if (list[i].isComplete == true){
            resultHTML += `<div class = "task">
            <div class= "task-done">${list[i].taskContent}</div>
                <div>
                    <button onclick="toggleComplete('${list[i].id}')">Check</button>
                    <button onclick="deleteTask('${list[i].id}')">Delete</button>
                </div>
            </div>`

        }else {
            resultHTML += `<div class = "task">
            <div>${list[i].taskContent}</div>
                <div>
                    <button onclick="toggleComplete('${list[i].id}')">Check</button>
                    <button onclick="deleteTask('${list[i].id}')">Delete</button>
                </div>
            </div>`
        }
            
    };

    document.getElementById("task-board").innerHTML = resultHTML;
}

function toggleComplete(id){
    for(let i =0; i<taskList.length;i++){
        if(taskList[i].id == id){
            taskList[i].isComplete = !taskList[i].isComplete;//!-> 아니다 on/off 토글모드사용
            break;
        }
    }
    render();
    console.log(taskList);
 }

 function deleteTask(id){
    for(let i=0; i<taskList.length; i++){
        if(taskList[i].id == id){
            taskList.splice(i,1);
            break;
        }
    }
    console.log(taskList);
 }

 function filter(event){
    mode = event.target.id;
    filterList=[];
    //언더바 만들기
    document.getElementById("under-line").style.width = event.target.offsetWidth + "px";
    document.getElementById("under-line").style.top = event.target.offsetTop + event.target.offsetHeigh + "px";
    document.getElementById("under-line").style.left = event.target.offsetLeft + "px";

    if(mode == "all"){
        render();
    }else if(mode == "ongoing"){
        for(let i = 0; i < taskList.length; i++){
            if(taskList[i].isComplete==false){
                filterList.push(taskList[i]);
            }
        }
        //taskList = filterList;
        render();
    }else if (mode == "done"){
        for(let i = 0; i < taskList.length; i++){
            if(taskList[i].isComplete==true){
                filterList.push(taskList[i]);
            }
        }
        render();
    }    
 }

 function randomIDGenerate(){
    
    return '_'+ Math.random().toString(36).substring(2, 16);
  
 }

