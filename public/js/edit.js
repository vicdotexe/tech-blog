const titleInput = document.querySelector('#titleInput');
const bodyInput = document.querySelector('#bodyInput');
const confirmButton = document.querySelector('#confirmButton');
const cancelButton = document.querySelector('#cancelButton');
const postId = document.currentScript.getAttribute("postId");

async function setup(){
    
    try{
        const res = await fetch(`/api/posts/${postId}`);
        const post = await res.json();
        titleInput.value=post.title;
        bodyInput.value=post.body;
    }catch(err){
        console.log(err);
    }
}

cancelButton.addEventListener("click", (e)=>{
    document.location.replace('/dashboard')
})

confirmButton.addEventListener("click", (e)=>{
    fetch(`/api/posts/${postId}`, {
        method: 'PUT',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title:titleInput.value,
            body:bodyInput.value
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
})
setup();