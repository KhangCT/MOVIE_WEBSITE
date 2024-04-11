import { useEffect, useState } from "react";
import useHttp from "../../../hooks/use-http";
import classes from "./CategoryMovies.module.css";
import MovieDetail from "../MovieDetails/MovieDetails";

function CategoryMovies(props) {
  // state lưu movies
  const [movies, setMovies] = useState([]);

  // state lưu chi tiết film được click
  const [movieDetail, setMovieDetail] = useState([]);

  // state hiển thị chi tiết của movie
  const [showDetail, setShowDetail] = useState(false);

  // custom hook để lấy dữ liệu từ API
  const { isLoading, error, sendRequest: fetchMovies } = useHttp();

  // useEffect để lấy dữ liệu khi mở ứng dụng
  // cách func trong useEffect sẽ chạy lại khi fetchTrendingMovies thay đổi
  useEffect(() => {
    // func xử lý dữ liệu khi lấy về từ API
    const transformMovies = (moviesObj) => {
      console.log(moviesObj);

      // set vào state
      setMovies(moviesObj.results);
    };
    fetchMovies(
      {
        url: props.fetchLink,
      },
      transformMovies
    );
  }, [fetchMovies]);

  // func khi người dùng click vào list movies
  function showDetailHandler(idMovie) {
    // sử dụng toán tử 3 ngôi để toggle true false
    showDetail ? setShowDetail(false) : setShowDetail(true);

    // vòng lặp for để lặp lại list movie
    for (let i = 0; i < movies.length; i++) {
      // tìm kiếm id movie
      if (movies[i].id == idMovie) {
        setMovieDetail(movies[i]);
        console.log(movies[i]);

        // nếu tìm đc id movie thì dừng vòng lặp
        break;
      }
    }
  }
  return (
    <div className={classes.container}>
      <h3 className={classes.titleMovies}>{props.title}</h3>
      <div className={classes["category-movies"]}>
        {movies.map((movie) => (
          <img
            key={movie.id}
            className={classes["img-movie"]}
            src={`https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`}
            onClick={showDetailHandler.bind(null, movie.id)}
          ></img>
        ))}
      </div>
      {showDetail && <MovieDetail onShowDetail={movieDetail} />}
    </div>
  );
}
export default CategoryMovies;
