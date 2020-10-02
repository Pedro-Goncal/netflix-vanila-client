const netflixOriginals =
  "https://api.themoviedb.org/3/discover/tv?api_key=947b0f0af52c9b74afa43eed2267820d&with_networks=213";
const trending =
  "https://api.themoviedb.org/3/trending/all/week?api_key=947b0f0af52c9b74afa43eed2267820d&language=en-US";
const topRated =
  "https://api.themoviedb.org/3/movie/top_rated?api_key=947b0f0af52c9b74afa43eed2267820d&language=en-US";
const actionMovies =
  "https://api.themoviedb.org/3/discover/movie?api_key=947b0f0af52c9b74afa43eed2267820d&with_genres=28";
const comedyMovies =
  "https://api.themoviedb.org/3/discover/movie?api_key=947b0f0af52c9b74afa43eed2267820d&with_genres=35";
const horrorMovies =
  "https://api.themoviedb.org/3/discover/movie?api_key=947b0f0af52c9b74afa43eed2267820d&with_genres=27";
const romanceMovies =
  "https://api.themoviedb.org/3/discover/movie?api_key=947b0f0af52c9b74afa43eed2267820d&with_genres=10749";
const documentaries =
  "https://api.themoviedb.org/3/discover/movie?api_key=947b0f0af52c9b74afa43eed2267820d&with_genres=99";

window.onload = () => {
  fetchMovies(netflixOriginals, ".original__movies", "poster_path");
  fetchMovies(trending, ".trending__movies", "backdrop_path");
  fetchMovies(topRated, ".topRated__movies", "backdrop_path");
  fetchMovies(actionMovies, ".action__movies", "backdrop_path");
  fetchMovies(comedyMovies, ".comedy__movies", "backdrop_path");
  fetchMovies(horrorMovies, ".horror__movies", "backdrop_path");
  fetchMovies(romanceMovies, ".romance__movies", "backdrop_path");
  fetchMovies(documentaries, ".documentaries", "backdrop_path");
};

function fetchMovies(url, className, path) {
  fetch(url)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Something went wrong");
      }
    })
    .then((data) => {
      showMovies(data, className, path);
    })
    .catch((error) => {
      console.log(error);
    });
}

function showMovies(movies, className, path) {
  console.log(movies);

  const moviesEl = document.querySelector(className);

  for (let movie of movies.results) {
    let image = `<img class="poster" src="https://image.tmdb.org/t/p/original/${movie[path]}"></img>`;

    moviesEl.innerHTML += image;
  }
}
