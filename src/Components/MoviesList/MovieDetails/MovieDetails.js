import YouTube from "react-youtube";
import classes from "./MovieDetails.module.css";
import { useEffect, useState } from "react";
import useHttp from "../../../hooks/use-http";

// Key lấy dữ liệu từ API
const API_KEY = "54a5aa1ef38597ae006c2682f2796a47";

function MovieDetail(props) {
  // state hiển thị youtube
  const [isShowYoutube, setIsShowYoutube] = useState(false);

  // đẩy data vào biến movieDetail
  const movieDetail = props.onShowDetail;

  // state lưu dữ liệu sau khi lấy đc dữ liệu video
  const [movieTrailer, setMovieTrailer] = useState([]);

  // custom hook lấy dữ liệu từ api
  const { isLoading, error, sendRequest: fetchMovieTrailer } = useHttp();

  // sử dụng useEffect để không bị lặp lại request
  // trừ khi fetchMovieTrailer bị thay đổi
  useEffect(() => {
    // hàm xử lý dữ liệu khi đã lấy dữ liệu từ API
    const transformMovies = (movieDetailObj) => {
      console.log(movieDetailObj);

      // Sử dụng vòng lặp for để tìm kiếm dữ liệu
      // nếu site = youtube và type = Trailer hoặc Teaser (Ưu tiên Trailer hơn)
      for (let movie of movieDetailObj.results)
        if (
          (movie.site == "YouTube" && movie.type == "Trailer") ||
          movie.type == "Teaser"
        ) {
          // sau khi mãn điều kiên thì lưu vào state
          setMovieTrailer(movie);
          console.log(movie);

          // và Showyoutube
          setIsShowYoutube(true);

          // sau khi tìm được đữ liệu thỏa mãn yêu cầu thì dừng vòng lặp
          break;
        } else {
          // không thỏa mãn điều kiện thì không show
          setIsShowYoutube(false);
        }
    };

    // hàm request data
    fetchMovieTrailer(
      {
        url: `https://api.themoviedb.org/3/movie/${movieDetail.id}/videos?api_key=${API_KEY}`,
      },
      transformMovies
    );
  }, [fetchMovieTrailer]);

  // obj điều chỉnh thuộc tính của youtube
  const opts = {
    height: "310",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };

  return (
    <div className={classes["detail-box"]}>
      <div className={classes.detail}>
        <h2 style={{ color: "#fff" }}>
          {movieDetail.title ? movieDetail.title : movieDetail.name}
        </h2>
        <div className={classes.line}></div>
        <p className={classes["relese-date"]}>
          Release Date: {movieDetail.first_air_date}
        </p>
        <p>Vote: {movieDetail.vote_average}/10</p>
        <p className={classes.overview}>{movieDetail.overview}</p>
      </div>
      {isShowYoutube ? (
        <YouTube
          className={classes.youtube}
          videoId={movieTrailer.key}
          opts={opts}
        />
      ) : (
        // nếu không hiển thị youtube thì hiển thị Backdrop
        <img
          className={classes["img-movie"]}
          src={`https://image.tmdb.org/t/p/original/${movieDetail.backdrop_path}`}
        ></img>
      )}
    </div>
  );
}

export default MovieDetail;
