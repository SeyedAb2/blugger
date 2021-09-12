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
    post.forEach(post => {

        const postChild = createPost(post);
        PostDOM.appendChild(postChild)
    });
}

const createPost = (postProp) => {
    let postDiv = document.createElement("post-component");
    postDiv.setAttribute("title", postProp.title)
    postDiv.setAttribute("text", postProp.body)
    postDiv.setAttribute("postID", postProp.id)
    return postDiv;
}