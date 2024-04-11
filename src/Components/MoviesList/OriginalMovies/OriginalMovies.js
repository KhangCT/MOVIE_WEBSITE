import useHttp from "../../../hooks/use-http";
import MovieDetail from "../MovieDetails/MovieDetails";
import classes from "./OriginalMovies.module.css";
import { Fragment, useEffect, useState } from "react";

function OriginalMovies(props) {
  // state lưu movies
  const [movieOriginal, setMovieOriginal] = useState([]);

  // state lưu chi tiết film được click
  const [movieDetail, setMovieDetail] = useState([]);

  // state hiển thị chi tiết của movie
  const [showDetail, setShowDetail] = useState(false);

  // custom hook để lấy dữ liệu từ API
  const { isLoading, error, sendRequest: fetchOriginalMovies } = useHttp();

  // useEffect để lấy dữ liệu khi mở ứng dụng
  // cách func trong useEffect sẽ chạy lại khi fetchOriginalMovies thay đổi
  useEffect(() => {
    // func xử lý dữ liệu khi lấy về từ API
    const transformMovies = (moviesObj) => {
      // set vào state
      setMovieOriginal(moviesObj.results);
    };
    fetchOriginalMovies(
      {
        url: props.onNetflixOriginals,
      },
      transformMovies
    );
  }, [fetchOriginalMovies]);

  // func khi người dùng click vào list movies
  function showDetailHandler(idMovie) {
    // sử dụng hàm 3 ngôi để toggle true false
    showDetail ? setShowDetail(false) : setShowDetail(true);

    // vòng lặp for để lặp lại list movie
    // tìm kiếm id movie
    for (let i = 0; i < movieOriginal.length; i++) {
      if (movieOriginal[i].id == idMovie) {
        setMovieDetail(movieOriginal[i]);
        console.log(movieOriginal[i]);

        // nếu tìm đc id movie thì dừng vòng lặp
        break;
      }
    }
  }

  return (
    <div className={classes.container}>
      <div className={classes.original}>
        {movieOriginal.map((movie) => (
          <div key={movie.id} onClick={showDetailHandler.bind(null, movie.id)}>
            <img
              className={classes["img-movie"]}
              src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
            ></img>
          </div>
        ))}
      </div>
      {showDetail && <MovieDetail onShowDetail={movieDetail} />}
    </div>
  );
}
export default OriginalMovies;
