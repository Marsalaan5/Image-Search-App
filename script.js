const accessKey = "l8KlvZ78oDQ_9PqJYkqqFYLI1iDPUDt0060Y68MMvLs";

const formEl = document.querySelector("form");
const inputEl = document.getElementById("search-input");
const searchResults = document.querySelector(".search-results");
const showMore = document.getElementById("show-more-button");
const clearButton = document.createElement("button");

let inputData = "";
let page = 1;


async function searchImages() {
    inputData = inputEl.value.trim();

    if (inputData === "") {
        alert("Please enter a search term.");
        return;
    }

    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;

    try {
        showLoading(true);
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Failed to fetch images");
        }
        const data = await response.json();
        const results = data.results;

        if (page === 1) {
            searchResults.innerHTML = "";
        }

        if (results.length === 0) {
            searchResults.innerHTML = "<p>No images found. Try a different search term.</p>";
            showMore.style.display = "none";
            return;
        }

        results.forEach((result) => {
            const imgContainer = document.createElement("div");
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
        showMore.style.display = results.length > 0 ? "block" : "none";
        clearButton.style.display = "block";

    } catch (error) {
        alert("An error occurred while fetching images. Please try again later.");
        console.error(error);
    } finally {
        showLoading(false);
    }
}


function showLoading(isLoading) {
    if (isLoading) {
        showMore.textContent = "Loading...";
        showMore.disabled = true;
    } else {
        showMore.textContent = "Show More";
        showMore.disabled = false;
    }
}

formEl.addEventListener("submit", (event) => {
    event.preventDefault();
    page = 1;
    searchImages();
});


showMore.addEventListener("click", () => {
    searchImages();
});


function clearResults() {
    searchResults.innerHTML = "";
    inputEl.value = "";
    showMore.style.display = "none";
    clearButton.style.display = "none";
}

clearButton.textContent = "Clear Results";
clearButton.classList.add("clear-button");
clearButton.style.display = "none";
clearButton.addEventListener("click", clearResults);


formEl.appendChild(clearButton);
