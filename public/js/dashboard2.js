const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjI3NGNkMzg1NzQ3MzNlZWRjOTQ1Y2Y1In0sImlhdCI6MTY1MTgyMTg4MCwiZXhwIjoxNjUyMTgxODgwfQ._z4YN__D-zr4HgFxgJSRfr7_ym21v8QZEEw2ke-XfaA"
init();
document.querySelector("#join-class").addEventListener('click',join_class);
document.querySelector('#btn-close').addEventListener('click',close_class);
document.querySelector('#room-btn').addEventListener('click',room_btn);

async function room_btn()
{
    let code = document.querySelector("#form-code").value
    const details = {
        "classcode":code
    }
    console.log(details)
    let response = await fetch('https://classmitra-backend.herokuapp.com/api/classroom/join',{
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

async function init()
{
    let student = document.getElementById("student-name");
    student.replaceChildren();
    let info = await fetch('https://classmitra-backend.herokuapp.com/api/auth', {
        method: 'GET',
        mode: 'cors',
        headers: {
            'x-auth-token': token
        }
    });
    let something = await info.json();
    student.appendChild(document.createTextNode(something.name));
    let e = document.getElementById("student-class");
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

image_array = ["img1.jpg","img2.jpg"]

document.getElementById("main_sidebar").addEventListener("click", function () {
    let main = document.getElementById("main")
    main.classList.toggle("main-container-effect");
})
var myNodelist = document.getElementsByClassName("myLi");
var i;
for (i = 0; i < myNodelist.length; i++) {
    var span = document.createElement("SPAN");
    var txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    myNodelist[i].appendChild(span);
}

var close = document.getElementsByClassName("close");
var i;
for (i = 0; i < close.length; i++) {
    close[i].onclick = function () {
        var div = this.parentElement;
        div.style.display = "none";
    }
}

var list = document.querySelector('ul');
list.addEventListener('click', function (ev) {
    if (ev.target.tagName === 'LI') {
        ev.target.classList.toggle('checked');
    }
}, false);

function newElement() {
    var li = document.createElement("li");
    var inputValue = document.getElementById("myInput").value;
    var t = document.createTextNode(inputValue);
    li.appendChild(t);
    if (inputValue === '') {
        alert("You must write something!");
    } else {
        document.getElementById("myUL").appendChild(li);
    }
    document.getElementById("myInput").value = "";

    var span = document.createElement("SPAN");
    var txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    li.appendChild(span);

    for (i = 0; i < close.length; i++) {
        close[i].onclick = function () {
            var div = this.parentElement;
            div.style.display = "none";
        }
    }
}


function join_class() {
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
    let e = document.getElementById("student-class");
    let ele = document.createElement("div");
    ele.classList = "col-sm-6";
    let ele1 = document.createElement("div");
    ele1.classList = "student-card";
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
    let btn = document.createElement("button");
    btn.classList = "btn btn-primary"
    btn.appendChild(document.createTextNode("Leave Class"));
    ele1.appendChild(btn);
    let btn2 = document.createElement("button");
    btn2.classList = "btn btn-primary";
    btn2.style.float = "right"
    btn2.appendChild(document.createTextNode("Open class"));
    ele1.appendChild(btn2);
    ele.appendChild(ele1);
    btn.addEventListener("click",function(){
        console.log("inn ",code);
        leave_class(code);
        init();
    });
    console.log(ele);
    e.appendChild(ele);
    btn2.addEventListener("click",function(){
        window.location.assign("../html/room.html")
    });
}

async function leave_class(code)
{
    var details = {
        "classcode":code
    };
    let response = await fetch('https://classmitra-backend.herokuapp.com/api/classroom/leave',{
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
}
