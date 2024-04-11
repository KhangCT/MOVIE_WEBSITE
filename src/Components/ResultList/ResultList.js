import { Fragment, useEffect, useState } from "react";
import classes from "./ResultList.module.css";
import useHttp from "../../hooks/use-http";
import Modal from "../Modal/Modal";
function ResultList(props) {
  // state lưu movies
  const [resultMovies, setResultMovies] = useState([]);
  const { isLoading, error, sendRequest: fetchSearchMovies } = useHttp();

  useEffect(() => {
    // func xử lý dữ liệu khi lấy về từ API
    const transformMovies = (moviesObj) => {
      // set vào state
      console.log(moviesObj);
      setResultMovies(moviesObj.results);
    };
    fetchSearchMovies(
      {
        url: `${props.fetchLink}&query=${props.inputSearch}`,
      },
      transformMovies
    );
  }, [props.inputSearch]);

  // state lưu chi tiết film được click
  const [movieDetail, setMovieDetail] = useState([]);

  // state hiển thị chi tiết của movie
  const [showDetail, setShowDetail] = useState(false);

  // func khi người dùng click vào list movies
  function showDetailHandler(idMovie) {
    // sử dụng toán tử 3 ngôi để toggle true false
    showDetail ? setShowDetail(false) : setShowDetail(true);

    // vòng lặp for để lặp lại list movie
    for (let i = 0; i < resultMovies.length; i++) {
      // tìm kiếm id movie
      if (resultMovies[i].id == idMovie) {
        setMovieDetail(resultMovies[i]);
        console.log(resultMovies[i]);

        // nếu tìm đc id movie thì dừng vòng lặp
        break;
      }
    }
  }
  return (
    <div className={classes.container}>
      <h3 className={classes.titleMovies}>Search Result</h3>
      {showDetail && (
        <Modal setShowDetail={setShowDetail} onShowDetail={movieDetail} />
      )}
      <div className={classes["category-movies"]}>
        {resultMovies.map((movie) =>
          movie.poster_path ? (
            <Fragment>
              <img
                key={movie.id}
                className={classes["img-movie"]}
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                onClick={showDetailHandler.bind(null, movie.id)}
              ></img>
            </Fragment>
          ) : (
            ""
          )
        )}
      </div>
    </div>
  );
}

export default ResultList;
