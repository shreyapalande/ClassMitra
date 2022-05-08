// const { temp } = require("express");

init();

function init()
{
    document.getElementById("signup-form").reset();
}

document.querySelector('.btn-signup').addEventListener('click',btn_signup);

function btn_signup()
{
    var validate = true;
    var name = document.querySelector("#form-name");
    if (name.value.length == 0) 
    {
        validate = false;
        console.log(name);
        name.style.borderColor = 'red';
        name.classList.add('form-placeholder');
        name.placeholder = 'Please enter your name';
    }
    else
    {
        name.style.borderColor = '#ccc';
    }
    var email = document.querySelector("#form-email");
    if(email.value.length == 0)
    {
        validate = false;
        email.style.borderColor = 'red';
        email.classList.add('form-placeholder');
        email.placeholder = 'Please enter your Email';
    }
    else
    {
        email.style.borderColor = '#ccc';
    }
    var role = document.querySelector('input[name="form-role"]:checked'); 
    // console.log(role);
    var temp = document.getElementById('role-name');
    // console.log(temp);
    if(role)
    {
        console.log(role.value);
    }
    else
    {
        validate = false;
        var warning = document.createElement('p');
        warning.style.color = 'red';
        warning.appendChild(document.createTextNode('Please select your Role'));
        temp.appendChild(warning);
    }
    var contact = document.querySelector("#form-contact");
    // if(contact.value.length == 0)
    // {
    //     validate = false;
    //     contact.style.borderColor = 'red';
    //     contact.classList.add('form-placeholder');
    //     contact.placeholder = 'Please enter your Contact';
    // }
    // else if(contact.value.length != 10)
    // {
    //     contact.value = null;
    //     validate = false;
    //     contact.style.borderColor = 'red';
    //     contact.classList.add('form-placeholder');
    //     contact.placeholder = 'Please enter valid details';
    // }
    // else
    // {
    //     contact.style.borderColor = '#ccc';
    // }
    var password = document.querySelector("#form-password");
    if(password.value.length == 0)
    {
        validate = false;
        password.style.borderColor = 'red';
        password.classList.add('form-placeholder');
        password.placeholder = 'Please enter Password';
    }
    else if(password.value.length < 7)
    {
        password.value = null;
        validate = false;
        password.style.borderColor = 'red';
        password.classList.add('form-placeholder');
        password.placeholder = 'Password must be of atleast 7 characters';
    }
    else
    {
        password.style.borderColor = '#ccc';
    }
    if(validate)
    {
        console.log('done');
        const details = {
            "name":name.value,
            "email":email.value,
            "password":password.value,
            "role":role.value
        };
        // console.log(JSON.stringify(details));
        register(details);
    }
}

async function register(details)
{
    console.log(JSON.stringify(details));
    let response = await fetch('https://classmitra-backend.herokuapp.com/api/users',{
        method: 'POST',
        body: JSON.stringify(details),
        mode: 'cors',
        headers: {
            'content-type': 'application/json'
        }
    });
    let data = await response.json();
    console.log(details.role);
    console.log(data.token);
    if(data.token)
    {
        // if(details.role.localeCompare("student") == 0)
        // {
        //     window.location.assign("../html/dashboard2.html")
        // }
        // else
        // {
        //     window.location.assign("../html/teacher_dashboard.html")
        // }
        // exports.token = data.token;
    }
}
