import React, { useEffect, useState } from "react";
import classes from "./Search.module.css";
import Navbar from "../../Components/Navbar/Navbar";
import SearchForm from "../../Components/SearchForm/SerchForm";
import ResultList from "../../Components/ResultList/ResultList";

const Search = () => {
  // danh sách movie sau khi tìm kiếm sẽ lưu vào state
  const [results, setResults] = useState([]);
  return (
    <div className={classes["bg_dark"]}>
      <Navbar />
      <SearchForm inputSearch={setResults} />
      {/* Hiển thị list movie đã tìm kiếm */}
      <ResultList
        inputSearch={results}
        fetchLink={`${linkAPI}${requests.fetchSearch}`}
      />
    </div>
  );
};

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

export default Search;
