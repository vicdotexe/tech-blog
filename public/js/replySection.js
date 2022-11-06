const allReplyButtons = document.querySelectorAll(".replyButton");
const allCancelButtons = document.querySelectorAll(".hideReplyButton");
const allReplyContainers = document.querySelectorAll(".replyContainer")
const allSendButtons = document.querySelectorAll(".sendReplyButton");

function show(e){
    const id = e.target.getAttribute("data-id");
    const container = [].find.call(allReplyContainers, x=>x.getAttribute("data-id") == id);
    if (container){
        container.classList.remove("hidden");
    }
}

function send(e){
    alert("test");
}

function hide(e){
    const id = e.target.getAttribute("data-id");
    const container = [].find.call(allReplyContainers, x=>x.getAttribute("data-id") == id);
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