const allReplyButtons = document.querySelectorAll(".replyButton");
const allCancelButtons = document.querySelectorAll(".hideReplyButton");
const allReplyContainers = document.querySelectorAll(".replyContainer")
const allSendButtons = document.querySelectorAll(".sendReplyButton");

function show(e){
    const id = e.target.getAttribute("data-id");
    const container = document.querySelector(`.replyContainer[data-id="${id}"]`);
    if (container){
        container.classList.remove("hidden");
    }
}

function send(e){

    const id = e.target.getAttribute("data-id");
    const textArea = document.querySelector(`.replyInput[data-id="${id}"]`)
    const reply = textArea.value;
    if (!reply){
        alert("Must have content.")
        return;
    }

    fetch(`/api/comments/${id}`, {
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            body:reply
        })
    }).then(response=>{
        if (response.ok){
            document.location.replace('/home');
            return null;
        }
        return response.json();
    }).then(data=>{
        if (data){
            alert(data.message);
            document.location.replace('/login')
        }
    });
}

function hide(e){
    const id = e.target.getAttribute("data-id");
    const container = document.querySelector(`.replyContainer[data-id="${id}"]`);//[].find.call(allReplyContainers, x=>x.getAttribute("data-id") == id);
    if (container){
        container.classList.add("hidden");
    }
}

allReplyButtons.forEach(btn=>{
    btn.addEventListener("click", show)
    console.log("reply pressed");
})

allSendButtons.forEach(btn=>{
    btn.addEventListener("click", send)
})

allCancelButtons.forEach(btn=>{
    btn.addEventListener("click", hide)
    console.log("cancel pressed");
})