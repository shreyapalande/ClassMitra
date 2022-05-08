init();
var globalVariable;
function init()
{
    document.getElementById("login-form").reset();
}

document.querySelector('.btn-login').addEventListener('click',btn_login);

function btn_login()
{
    var validate = true;
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
        console.log(role.value);
        console.log('email : '+email.value);
        console.log('password : '+password.value);
    }

    console.log('done');
    const details = {
        "email":email.value,
        "password":password.value
    };
    console.log(JSON.stringify(details));
    login(details,role.value);
}

async function login(details,role)
{
    console.log(JSON.stringify(details));
    let response = await fetch('https://classmitra-backend.herokuapp.com/api/auth',{
        method: 'POST',
        body: JSON.stringify(details),
        mode: 'cors',
        headers: {
            'content-type': 'application/json'
        }
    });
    let data = await response.json();
    console.log(role);
    console.log(data.token);
    if(data.token)
    {
        globalVariable={
            token: data.token
        };
        if(role.localeCompare("Student") == 0)
        {
            window.location.assign("../html/dashboard2.html")
        }
        else
        {
            window.location.assign("../html/teacher_dashboard.html")
        }
    }
}
// console.log(globalVariable.token);
// module.exports = globalVariable;
// export default globalVariable;