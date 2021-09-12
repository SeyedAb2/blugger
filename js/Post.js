let Template = document.createElement('template');
let Style = document.createElement("style");
Style.innerHTML = ` <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-+0n0xVW2eSR5OomGNYDnhzAbDsOXxcvSN1TPprVMTNDbiYZCxYbOOl7+AMvyTG2x" crossorigin="anonymous">
                    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.5.0/font/bootstrap-icons.css"> `;
Template.innerHTML =
    `
        <div class="card">
            <div class="card-body">
                <h5 class="card-title">sunt aut facere repellat provident occaecati excepturi optio reprehenderit</h5>
                <p class="card-text">quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto</p>
                <div class="text-end">
                    <i class="bi bi-star" id="star"></i> <i class="bi bi-trash" id="trash"></i>
                </div>
            </div>
        </div>`;
Template.innerHTML += Style.innerHTML
class Post extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' })
        this.shadowRoot.appendChild(Template.content.cloneNode(true))
        this.star = this.star.bind(this)
        this.trash = this.trash.bind(this)
    }
    star() {
        //console.log(this.getAttribute('postID'));
        let favorites = [];
        const storageValue = JSON.parse(localStorage.getItem("favorites"));
        //console.log(this.getAttribute('postID'));
        const star = this.shadowRoot.querySelector("#star");

        const id = this.getAttribute("postID");
        if (storageValue === null || storageValue.length === 0) {
            favorites[0] = id
            star.className = "bi bi-star-fill"
        } else if (storageValue.indexOf(id) != -1) {
            favorites = storageValue.filter(postId => postId != id)
            star.className = "bi bi-star"
        } else {
            favorites = [...storageValue, id]
            star.className = "bi bi-star-fill"
        }
        //console.log(favorites)
        localStorage.setItem("favorites", JSON.stringify(favorites))

    }
    trash() {
        //Send Request To Server For Deleteing Post 
        // const deleteData = async() => {
        //     try {
        //         let id = this.getAttribute("postID");
        //         let fetchData = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, { method: 'DELETE' })
        //         let dataArray = await fetchData.json()
        //         console.log(dataArray)
        //     } catch (err) {
        //         console.log(err)
        //     }
        // }
        const id = this.getAttribute("postID");
        const storageValue = JSON.parse(localStorage.getItem("favorites"));
        if (storageValue.indexOf(id) != -1) {
            let favorites = storageValue.filter(postId => postId != id)
            console.log(favorites)
            localStorage.setItem("favorites", JSON.stringify(favorites))
        }


        //deleteData()
        this.remove()
    }
    connectedCallback() {


        this.className = "col col-md-4 mt-4 "
        this.shadowRoot.querySelector(".card-title").innerHTML = this.getAttribute("title");
        this.shadowRoot.querySelector(".card-text").innerHTML = this.getAttribute("text");
        const star = this.shadowRoot.querySelector("#star");
        const trash = this.shadowRoot.querySelector("#trash");

        const storageValue = JSON.parse(localStorage.getItem("favorites"));
        const id = this.getAttribute("postID");
        if (storageValue.indexOf(id) != -1) {
            star.className = "bi bi-star-fill"
        }


        star.addEventListener('click', this.star);
        trash.addEventListener('click', this.trash);
    }
    disconnectedCallback() {
        const star = this.shadowRoot.querySelector("#star");
        const trash = this.shadowRoot.querySelector("#trash");

        star.removeEventListener('click', this.star);
        trash.removeEventListener('click', this.trash);
    }
}
window.customElements.define("post-component", Post);