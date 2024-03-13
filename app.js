const parentContainer = document.querySelector(".main");
const searchInput = document.querySelector(".input");
const movieRatings = document.querySelector("#rating-select");
const movieGenres = document.querySelector("#genre-select");

let searchValue = "";
let ratings = 0;
let genre = "";
let filteredMovies = [];

const URL = "https://movies-app.prakashsakari.repl.co/api/movies";

const getMovies = async (url) => {
  try {
    const { data } = await axios.get(url); // axios converts the data into jason on its own
    return data;
  } catch (err) {}
};

let movies = await getMovies(URL);

const createElement = (element) => document.createElement(element);

// function to create movie card

const createMoviecard = (movies) => {
  for (let movie of movies) {
    // creating parent container
    const cardContainer = createElement(div);
    cardContainer.classList.add("card", "shadow");

    //creating image container
    const imageContaier = cardContainer.appendChild(createElement(div));
    imageContaier.classList.add("card-image-container");
    const img = imageContaier.appendChild(createElement("img"));
    img.classList.add("card-image");
    img.setAttribute("src", movie.img_link);
    img.setAttribute("alt", movie.name);

    // movie details
    const movieDetails = cardContainer.appendChild(createElement("div"));
    movieDetails.classList.add("movie-details");

    // movie title
    const title = movieDetails.appendChild(createElement("p"));
    title.classList.add("title");
    title.innerText = movie.name;

    //movie genre
    const genre = movieDetails.appendChild(createElement("p"));
    genre.classList.add("genre");
    genre.innerText = `Genre: ${movie.genre}`;

    //movie ratings
    const ratingContainer = movieDetails.appendChild(createElement("div"));
    ratingContainer.classList.add("ratings");

    //ratings
    const ratings = ratingContainer.appendChild(createElement("div"));
    ratings.classList.add("star-rating");

    //star icon
    const icon = star.appendChild(createElement("span"));
    icon.classList.add("material-symbols-outlined");
    icon.innerHTML = "star";

    //ratings
    const ratingVal = star.appendChild("span");
    ratingVal.innerHTML = movie.imdb_rating;

    // movie duration
    const duration = ratingContainer.appendChild("p");
    duration.innerHTML = `${movie.duration} mins`;

    parentContainer.appendChild(cardContainer);
  }
};

createMoviecard(movies);

function getFilteredData(){
    filteredMovies =
    searchValue?.length > 0
      ? movies.filter(
          (movie) =>
            searchValue === movie.name.toLowerCase() ||
            searchValue === movie.director_name.toLowerCase() ||
            movie.writer_name.toLowerCase().split(",").includes(searchValue) ||
            movie.cast_name.toLowerCase().split(",").includes(searchValue)
        )
      : movies;
      
      if (rating>0){
        filteredMovies = searchValue?.length > 0 ? filteredMovies : movies;
        filteredMovies = filteredMovies.filter(movie => movie.imdb_rating >= ratings)
      }

      if(genre?.length>0){
        filteredMovies = searchValue?.length >0 || ratings > 7 ?filteredMovies : movies;
        filteredMovies = filteredMovies.filter((movie) => movie.genre.includes(genre));
      }
      return filteredMovies;
}

function handleSearch(event) {
  searchValue = event.target.value.toLowerCase();
  let filterBySearch = getFilteredData();
  parentContainer.innerHTML = "";
  createMoviecard(filterBySearch);
}

function debounce(callback, delay){
    let timerId;

    return(...args) => {
        clearTimeout(timerId);
        timerId = setTimeout(() => {
            callback(...args);
        }, delay);
    };
}

const debounceInput = debounce(handleSearch, 500);

searchInput.addEventListener("keyup", debounceInput);

function handleRatingSelect(event){
    ratings = event.target.value;
    let filterByRating = getFilteredData();
    parentContainer.innerHTML = "";
    createMoviecard(ratings ? filterByRating : movies);
}

movieRatings.addEventListener("change", handleRatingSelect);

const genres = movie.reduce((acc,cur) => {
    let genresArr = [];
    let tempGenresArr = cur.genre.split(",");
    acc = [...acc, ...tempGenresArr];
    for (let genre of acc){
        if(!genresArr.includes(genre)){
            genresArr = [...genresArr, genre];
        }
    }
    return genresArr;
}, []);

for (let genre of genres){
    const option = document.createElement("option");
    option.classList.add("option");
    option.setAttribute("value", genre);
    option.innerText = genre;
    movieGenres.appendChild(option);
}

function handleGenreSelect(event){
    genre = event.target.value;
    const filterByGenre = getFilteredData()
    parentContainer.innerHTML = "";
    createMoviecard(genre ? filterByGenre : genre);
}

movieGenres.addEventListener("change", handleGenreSelect){

}
// shift alt f