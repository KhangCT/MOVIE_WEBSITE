import React, { Fragment } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import classes from "./Browse.module.css";
import Banner from "../../Components/Banner/Banner";
import OriginalMovies from "../../Components/MoviesList/OriginalMovies/OriginalMovies";
import CategoryMovies from "../../Components/MoviesList/CategoryMovies/CategoryMovies";

function Browse() {
  return (
    <div className={classes["bg_dark"]}>
      <Navbar />
      <Banner onTrendingMovies={`${linkAPI}${requests.fetchTrending}`} />
      <OriginalMovies
        onNetflixOriginals={`${linkAPI}${requests.fetchNetflixOriginals}`}
      />
      <CategoryMovies
        title={"Trending"}
        fetchLink={`${linkAPI}${requests.fetchTrending}`}
      />
      <CategoryMovies
        title={"Top Rating"}
        fetchLink={`${linkAPI}${requests.fetchTopRated}`}
      />
      <CategoryMovies
        title={"Action"}
        fetchLink={`${linkAPI}${requests.fetchActionMovies}`}
      />
      <CategoryMovies
        title={"Comedy"}
        fetchLink={`${linkAPI}${requests.fetchComedyMovies}`}
      />
      <CategoryMovies
        title={"Horror"}
        fetchLink={`${linkAPI}${requests.fetchHorrorMovies}`}
      />
      <CategoryMovies
        title={"Romance"}
        fetchLink={`${linkAPI}${requests.fetchRomanceMovies}`}
      />
      <CategoryMovies
        title={"Documentaries"}
        fetchLink={`${linkAPI}${requests.fetchDocumentaries}`}
      />
    </div>
  );
}

const linkAPI = "https://api.themoviedb.org/3/";
const API_KEY = "54a5aa1ef38597ae006c2682f2796a47";
const requests = {
  fetchTrending: `/trending/all/week?api_key=${API_KEY}&language=en-US`,
  fetchNetflixOriginals: `/discover/tv?api_key=${API_KEY}&with_network=123`,
  fetchTopRated: `/movie/top_rated?api_key=${API_KEY}&language=en-US`,
  fetchActionMovies: `/discover/movie?api_key=${API_KEY}&with_genres=28`,
  fetchComedyMovies: `/discover/movie?api_key=${API_KEY}&with_genres=35`,
  fetchHorrorMovies: `/discover/movie?api_key=${API_KEY}&with_genres=27`,
  fetchRomanceMovies: `/discover/movie?api_key=${API_KEY}&with_genres=10749`,
  fetchDocumentaries: `/discover/movie?api_key=${API_KEY}&with_genres=99`,
  fetchSearch: `/search/movie?api_key=${API_KEY}&language=en-US`,
};

export default Browse;
