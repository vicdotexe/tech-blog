const allViewButtons = document.querySelectorAll(".viewComment");
const allHideButtons = document.querySelectorAll(".hideComment");
const allContainers = document.querySelectorAll(".commentContainer")

function show(e){
    const id = e.target.getAttribute("data-id");
    const container = [].find.call(allContainers, x=>x.getAttribute("data-id") == id);
    if (container){
        if (container.classList.contains("hidden")){
            container.classList.remove("hidden");
        }else{
            container.classList.add("hidden");
        }
        
    }
}

function hide(e){
    const id = e.target.getAttribute("data-id");
    const container = [].find.call(allContainers, x=>x.getAttribute("data-id") == id);
    if (container){
        container.classList.add("hidden");
    }
}

allViewButtons.forEach(btn=>{
    btn.addEventListener("click", show)
})

allHideButtons.forEach(btn=>{
    btn.addEventListener("click", hide)
})