import { Fragment, useEffect, useState } from "react";
import useHttp from "../../hooks/use-http";
import classes from "./Banner.module.css";

function Banner(props) {
  // state lưu phim đã random
  const [randomMovieTrending, setRandomMovieTrending] = useState([]);
  // hook lấy dữ liệu
  const { isLoading, error, sendRequest: fetchTrendingMovies } = useHttp();

  useEffect(() => {
    // func random phim ngẫu nhiên

    const randomMovieHandler = (moviesObj) => {
      randomMovie =
        moviesObj.results[
          Math.floor(Math.random() * moviesObj.results.length - 1)
        ];
    };
    let randomMovie = [];
    const transformMovies = (moviesObj) => {
      randomMovieHandler(moviesObj);
      // set phim ngẫu nhiên vào state
      setRandomMovieTrending(randomMovie);
    };
    // đẩy link lấy dữ vào vào custom hook
    fetchTrendingMovies(
      {
        url: props.onTrendingMovies,
      },
      transformMovies
    );
    //khi fetchTrendingMovies có thay đổi thì mới lấy lại dữ liệu
  }, [fetchTrendingMovies]);

  return (
    <Fragment>
      <div
        className={classes["bg-banner"]}
        // set hình ảnh banner bằng link liên kết của hình ảnh
        style={{
          backgroundImage: `url('https://image.tmdb.org/t/p/original/${randomMovieTrending.backdrop_path}')`,
        }}
      >
        <div className={classes.container}>
          <div className={classes.banner}>
            <h1 className={classes.title}>
              {randomMovieTrending.title
                ? randomMovieTrending.title
                : randomMovieTrending.name}
            </h1>
            <div className={classes["action-box"]}>
              <button className={classes["btn-action"]}>Play</button>
              <button className={classes["btn-action"]}>My List</button>
            </div>
            <p className={classes.overview}>
              {randomMovieTrending.overview}...
            </p>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
export default Banner;
