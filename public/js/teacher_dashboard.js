const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjI3NGNjYzI1NzQ3MzNlZWRjOTQ1Y2YyIn0sImlhdCI6MTY1MTgyMTc2MiwiZXhwIjoxNjUyMTgxNzYyfQ.XSDYJ5H3wmYwrn9lI0JTGvGbTtoEKpgSp_k9cWC0Lkk"

init();
document.querySelector('#btn-create-class').addEventListener('click',create_class);
document.querySelector('#btn-close').addEventListener('click',close_class);
document.querySelector('#room-btn').addEventListener('click',new_class);

async function init()
{
    let teacher = document.getElementById("teacher-name");
    teacher.replaceChildren();
    let info = await fetch('https://classmitra-backend.herokuapp.com/api/auth', {
        method: 'GET',
        mode: 'cors',
        headers: {
            'x-auth-token': token
        }
    });
    let something = await info.json();
    teacher.appendChild(document.createTextNode(something.name));
    let e = document.getElementById("teacher-class");
    e.replaceChildren();
    let response = await fetch('https://classmitra-backend.herokuapp.com/api/classroom',{
        method: 'GET',
        mode: 'cors',
        headers: {
            'x-auth-token': token
        }
    });
    let data = await response.json();
    // console.log(data);
    for(let i=0 ; i<data.length ; i++)
    {
        // console.log(data[i]);
        // console.log(data[i].name);
        // console.log(data[i].description);
        // console.log(data[i].classcode);
        display_class(data[i].name,data[i].description,data[i].classcode) 
    }
}

var image_array = ["img1.jpg","img2.jpg"]

async function new_class()
{
    let name = document.querySelector("#form-name").value
    let description = document.querySelector("#form-description").value
    const details = {
        "name":name,
        "description":description
    }

    let response = await fetch('https://classmitra-backend.herokuapp.com/api/classroom',{
        method: 'POST',
        mode: 'cors',
        headers: {
            'x-auth-token': token,
            'content-type': 'application/json'
        },
        body: JSON.stringify(details)
    });
    let data = await response.json();
    console.log(data);
    init();
    close_class();
}

function close_class()
{
    let div = document.getElementById("create_container");
    div.style.display = "none";
}

function create_class() {
    console.log("HELLo")
    let div = document.getElementById("create_container")
    if (div.style.display = "none") 
    {
        div.style.display = "block";
    }
    else 
    {
        div.style.display = "none"
    }
}

function display_class(subject,description,code) 
{
    let e = document.getElementById("teacher-class");
    let ele = document.createElement("div");
    ele.classList = "col-sm-6";
    let ele1 = document.createElement("div");
    ele1.classList = "teacher-card";
    let ele2 = document.createElement('h3');
    ele2.appendChild(document.createTextNode(subject));
    ele1.appendChild(ele2);
    ele1.appendChild(document.createElement('hr'));
    let ele3 = document.createElement("p");
    ele1.appendChild(ele3);
    ele3.appendChild(document.createTextNode(description));
    let ele4 = document.createElement("p");
    ele4.appendChild(document.createTextNode("Class code : "+code));
    ele1.appendChild(ele4);
    let btn = document.createElement("btn");
    btn.classList = "btn btn-primary";
    btn.appendChild(document.createTextNode("Open Class"));
    ele1.appendChild(btn);
    ele.appendChild(ele1);
    console.log(ele);
    e.appendChild(ele);
    btn.addEventListener("click",function(){
        console.log("ppp");
        window.location.assign("../html/teacher_room.html")
    });
}

// function open_class()
// {
//     window.location.assign("../html/teacher_room.html")
// }

// let image_array = ["img1.jpg","img2.jpg"]

// function open_class(Subject) {
//     console.log("innn");
//     let div = document.getElementById("create_container")
//     div.style.display = "none"
    
//     // if (Subject == ""){
//     //     alert("Enter Subject First")
//     //     return
//     // }
//     // else{
//     //     document.getElementById("class_name").value = ""
//     // }
//     // console.log(Subject)
//     let parent = document.getElementById("class_list")
//     console.log(parent)
//     let child = document.createElement("li")
//     child.classList.add("class")
//     console.log(child)
//     let img =  image_array[Math.floor(Math.random() * image_array.length)];
//     child.innerHTML = `<div class="card">
//     <img class="card-img-top" src="./images/${img}" alt="Card image" style="width:100%">
//     <div class="card-body">
//         <h4 class="card-title">Subject : ${Subject}</h4>
//         <a href="../html/teacher_room.html" class="btn btn-primary " target="blank" >Enter</a>
//     </div>`
//     console.log(child)
//     parent.appendChild(child)
// }