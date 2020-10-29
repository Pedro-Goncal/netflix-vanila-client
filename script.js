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
  const moviesEl = document.querySelector(className);

  for (let movie of movies.results) {
    let imageElement = document.createElement("img");
    imageElement.src = `https://image.tmdb.org/t/p/original/${movie[path]}`;
    imageElement.addEventListener("click", (e) => {
      handleMovieSelection(e, movie);
    });

    moviesEl.appendChild(imageElement);
  }
}

/*
===============Movie Trailer===============
*/

const handleMovieSelection = (e, movie) => {
  console.log(movie);

  document.getElementById("rating").innerHTML = `Rating: ${movie.vote_average}`;
  document.getElementById("overview").innerHTML = movie.overview;
  document.getElementById("title").innerHTML = movie.original_title;

  getMovieTrailer(movie.id).then((data) => {
    const results = data.results;
    const youtubeTrailer = results.filter((results) => {
      if (results.site == "YouTube" && results.type == "Trailer") {
        return true;
      } else {
        return false;
      }
    });

    setTrailer(youtubeTrailer);
    // console.log(data);
    // console.log(youtubeTrailer);
  });
  $(`#trailerModal`).modal("show");
};

async function getMovieTrailer(id) {
  let url = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=947b0f0af52c9b74afa43eed2267820d&language=en-US`;
  return await fetch(url).then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error("Something went wrong");
    }
  });
}

const setTrailer = (trailers) => {
  const iframe = document.getElementById("movieTrailer");
  const movieNotFound = document.querySelector(".movie-notFound");
  const rating = document.getElementById("rating");
  const overview = document.getElementById("overview");
  const title = document.getElementById("title");

  if (trailers.length > 0) {
    iframe.classList.remove("d-none");
    movieNotFound.classList.add("d-none");
    rating.classList.remove("d-none");
    overview.classList.remove("d-none");
    title.classList.remove("d-none");

    iframe.src = `https://www.youtube.com/embed/${trailers[0].key}`;
  } else {
    iframe.classList.add("d-none");
    movieNotFound.classList.remove("d-none");
    rating.classList.add("d-none");
    overview.classList.add("d-none");
    title.classList.add("d-none");
  }
};
