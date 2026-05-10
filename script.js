const searchBtn = document.getElementById("searchBtn");
const movieInput = document.getElementById("movieInput");
const movieContainer = document.getElementById("movieContainer");
const errorMessage = document.getElementById("errorMessage");

const apiKey = "1f57f9e";

searchBtn.addEventListener("click", searchMovie);

async function searchMovie() {

    const movieName = movieInput.value.trim();

    if (movieName === "") {
        errorMessage.textContent = "Please enter a movie name.";
        movieContainer.innerHTML = "";
        return;
    }

    try {

        const response = await fetch(
            `https://www.omdbapi.com/?t=${encodeURIComponent(movieName)}&apikey=${apiKey}`
        );

        const data = await response.json();

        if (data.Response === "False") {
            errorMessage.textContent = "Movie not found.";
            movieContainer.innerHTML = "";
            return;
        }

        errorMessage.textContent = "";
        localStorage.setItem("lastMovie", movieName);
        movieContainer.innerHTML = `
            <h2>${data.Title}</h2>
            <img src="${data.Poster !== "N/A" ? data.Poster : ""}" alt="${data.Title}">
            <p><strong>Year:</strong> ${data.Year}</p>
            <p><strong>Genre:</strong> ${data.Genre}</p>
            <p><strong>Director:</strong> ${data.Director}</p>
        `;

    } catch (error) {

        errorMessage.textContent = "Something went wrong.";

    }
}
window.addEventListener("load", () => {
    const lastMovie = localStorage.getItem("lastMovie");

    if (lastMovie) {
        movieInput.value = lastMovie;
        searchMovie();
    }
});