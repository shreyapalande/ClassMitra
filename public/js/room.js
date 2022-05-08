
create_container  = document.getElementById("create_container")

// document.getElementById("wrap").addEventListener("click", function(){ alert("Hello World!"); });
document.getElementById("main_sidebar").addEventListener("click",function(){
let main = document.getElementById("main")
main.classList.toggle("main-container-effect");
})

room_name = document.getElementById("room_name")
room_name.innerHTML = "Subject - Python"

teacher_name = document.getElementById("teacher_name")
teacher_name.innerHTML = "Teacher - Suresh"

subject_name = document.getElementById("subject_name")
subject_name.innerHTML = "Description - Second year"