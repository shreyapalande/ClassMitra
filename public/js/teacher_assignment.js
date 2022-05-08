console.log("WORLD")


function upload_assignment() {
    console.log("HELLo")
    let div = document.getElementById("create_container")

    if (div.style.display = "none") {
        div.style.display = "block";
    }
    else {
        div.style.display = "none"
    }
}

function display_notes(){
    
    let div = document.getElementById("create_container")
    div.style.display = "none"
 
    const title = document.getElementById("notes_title").value
    if (title == ""){
        alert("Enter Title First")
        return
    }
    else{
        document.getElementById("notes_title").value = ""
    }
    let link = "www.google.com"
    let ul = document.getElementById("notes-section")
    li = document.createElement("li")
    li.classList.add("notes_list")
    li.innerHTML = `<a href=""><span>${title}</span>
   
    </a>`

    ul.appendChild(li)
    


}