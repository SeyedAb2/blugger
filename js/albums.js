let AlbumDOM = document.getElementById("album");
const getData = async() => {
    try {
        let fetchData = await fetch("https://jsonplaceholder.typicode.com/albums/1/photos")
        let dataArray = await fetchData.json()
        loadAlbum(dataArray)
    } catch (err) {
        console.log(err + 'hello')
    }
}
getData()

const loadAlbum = (album) => {
    album.forEach(photo => {
        const photoChild = createPhoto(photo);
        AlbumDOM.appendChild(photoChild)
    });
}

const createPhoto = (photoProp) => {
    let photoDiv = document.createElement("div");
    photoDiv.classList.add("col")
    photoDiv.classList.add("col-md-4")
    photoDiv.classList.add("mt-4")
    photoDiv.setAttribute("id", "photo");
    photoDiv.innerHTML = `
        <div class="card">
            <img src="${photoProp.url}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${photoProp.title}</h5>
            </div>
        </div>
    `
    return photoDiv;
}