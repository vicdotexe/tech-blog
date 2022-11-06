const pwInput = document.querySelector('#password');
const userInput = document.querySelector('#username');
const signInButton = document.querySelector('#signInButton');

function onSigninPressed(e){
    e.preventDefault();
    const pw = pwInput.value;
    const username = userInput.value;

    if (!pw || !username){
        return;
    }
    if (pw.length < 8){
        alert('Password must be atleast 8 characters.');
        return;
    }

    fetch("/api/users", {
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username:username,
            password:pw
        })
    }).then(response=>{
        if (response.ok){
            document.location.replace('/dashboard');
            return null;
        }
        return response.json();
    }).then(data=>{
        if (data){
            alert(data.message)
        }
    })
}

signInButton.addEventListener("click", onSigninPressed);