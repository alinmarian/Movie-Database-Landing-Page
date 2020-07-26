const key = "84f3b41b";
let api_path = `http://www.omdbapi.com/?apikey=${key}&`;

let form = document.getElementById("form");

if (form) {
    form.addEventListener("submit", function (e) {
        let inputValue = document.getElementById("search").value;
        getMovies(inputValue);
        e.preventDefault();
    });
}

const getMovies = async (inputValue) => {

    const response = await fetch(api_path + "s=" + inputValue);
    const data = await response.json();

    let movies = data.Search;
    let output = "";

    movies.forEach(function (movie) {
        output += `

        <div class="asd">
            <div>
                <img src="${movie.Poster}">
                <h5>${movie.Title}</h5>
                <a href="#" onclick="selectedMovie('${movie.imdbID}')">Movie details</a>
            </div>
        </div>

        `;
    });

    document.getElementById("movies").innerHTML = output;

};

function selectedMovie(id) {
    sessionStorage.setItem("movieId", id);
    location.replace("movie.html");
}

const getMovie = async () => {
    let movieID = sessionStorage.getItem("movieId");

    const response = await fetch(api_path + "i=" + movieID);
    const data = await response.json();

    console.log(data);

    let output = `
        <div class="movie-container">
            <div class="poster">
                <img src="${data.Poster}">
            </div>

            <div class="info">
                <h2>${data.Title}</h2>
                <h5>Actors: ${data.Actors}</h5>
                <h5>Awards: ${data.Awards}</h5>
                <h5>Director: ${data.Director}</h5>
                <h5>Genre: ${data.Genre}</h5>
                <h5>Released: ${data.Released}</h5>
                <h5>Runtime: ${data.Runtime}</h5>
                <h5>Writer: ${data.Writer}</h5>
                <h5>Imdb Rating: ${data.imdbRating}</h5>
                <h5>Plot: ${data.Plot}</h5>
                <div class="buttons">
                <a href="https://www.imdb.com/title/${movieID}" target="_blank">View on IMDB</a>
                <a href="index.html">Go back to index</a>
                </div>
            </div>
        </div>
    `;

    document.getElementById("movie").innerHTML = output;

}

$('.playing').slick({
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: 8,
    slidesToScroll: 10,
    responsive: [
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
                infinite: true,
                dots: true
            }
        },
        {
            breakpoint: 600,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2
            }
        },
        {
            breakpoint: 480,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1
            }
        }
    ]
});

