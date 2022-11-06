const titleInput = document.querySelector('#titleInput');
const bodyInput = document.querySelector('#bodyInput');
const createButton = document.querySelector('#createButton');

function onCreatePressed(e){
    e.preventDefault();
    const title = titleInput.value;
    const body = bodyInput.value;

    if (!title || !body){
        alert("Must have a title and post content.")
        return;
    }

    fetch("/api/posts", {
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title:title,
            body:body
        })
    }).then(response=>{
        if (response.ok){
            document.location.replace('/dashboard');
            return null;
        }
        return response.json();
    }).then(data=>{
        if (data){
            alert(data.message);
        }

    });
}

createButton.addEventListener("click", onCreatePressed);