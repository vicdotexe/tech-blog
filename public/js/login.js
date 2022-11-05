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

    fetch("/api/users/login", {
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username:username,
            password:pw
        })
    }).then(response=>{
        if (!response.ok){
            alert("invalid credentials");
            return;
        }
        
        document.location.replace('/dashboard');
    })
}

signInButton.addEventListener("click", onSigninPressed);