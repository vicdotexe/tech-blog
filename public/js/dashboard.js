const editButtons = document.querySelectorAll(".editButton");
const deleteButtons = document.querySelectorAll(".deleteButton");

function onEditPressed(e){
    e.preventDefault();
    const id = e.target.getAttribute("data-postId");
    document.location.replace(`/edit/${id}`)
}

function onDeletePressed(e){
    e.preventDefault();
    if (confirm("Are you sure you want to delete this post?")){
        const id = e.target.getAttribute("data-postId");
        fetch(`/api/posts/${id}`,{
            method: "DELETE"
        }).then(res=>{
            document.location.reload();
        });
    }
}


editButtons.forEach(eb=>{
    eb.addEventListener("click", onEditPressed);
});
deleteButtons.forEach(eb=>{
    eb.addEventListener("click", onDeletePressed);
});