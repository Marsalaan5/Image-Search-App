const accessKey = "l8KlvZ78oDQ_9PqJYkqqFYLI1iDPUDt0060Y68MMvLs";

const formEl = document.querySelector("form");
const inputEl = document.getElementById("search-input");
const searchResults = document.querySelector(".search-results");
const showMore = document.getElementById("show-more-button");

let inputData = "";
let page = 1;

async function searchImages(){
    inputData = inputEl.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;

    const response = await fetch(url);
    const data = await response.json();

    const results = data.results; 

    if(page === 1){
        searchResults.innerHTML="";
    }
    results.forEach((result)=>{
        const imgContainer=document.createElement("div");
        imgContainer.classList.add("search-result");
        const image = document.createElement("img");
        image.src = result.urls.small;
        image.alt = result.alt_description;
        const imgLink = document.createElement("a");
        imgLink.href = result.links.html;
        imgLink.target = "_blank";
        imgLink.textContent = result.alt_description;
        imgContainer.appendChild(image);
        imgContainer.appendChild(imgLink);
        searchResults.append(imgContainer);
    });
    page++;
    if(page>1){
        showMore.style.display = "block";
    }
}

formEl.addEventListener("submit",(event) =>{
    event.preventDefault();
    page= 1;
    searchImages();
});
showMore.addEventListener("click",() =>{
    searchImages();
});