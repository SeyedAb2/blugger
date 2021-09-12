let PostDOM = document.getElementById("posts");
const getData = async() => {
    try {
        let fetchData = await fetch("https://jsonplaceholder.typicode.com/posts")
        let dataArray = await fetchData.json()
        loadPost(dataArray)
    } catch (err) {
        console.log(err)
    }
}
getData()

const loadPost = (post) => {
    const storageValue = JSON.parse(localStorage.getItem("favorites"));
    if (storageValue === null || storageValue.length === 0) {
        PostDOM.innerHTML = `
            <div class='alert alert-primary d-flex align-items-center mt-4' role='alert'>
                <div>
                    <i class='bi bi-info-square'></i> No Favorite's Post To Show , You Should Staring Posts
                </div>
            </div>
        `
        return
    }
    post.forEach(post => {
        if (storageValue.indexOf(post.id.toString()) != -1) {
            const postChild = createPost(post);
            PostDOM.appendChild(postChild)
        }
    });
}

const createPost = (postProp) => {
    let postDiv = document.createElement("post-component");
    postDiv.setAttribute("title", postProp.title)
    postDiv.setAttribute("text", postProp.body)
    postDiv.setAttribute("postID", postProp.id)
    return postDiv;
}