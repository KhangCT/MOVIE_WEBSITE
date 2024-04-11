import React from "react";
import classes from "./Modal.module.css";
import MovieDetail from "../MoviesList/MovieDetails/MovieDetails";

function Modal(props) {
  // func đóng modal
  const closeModalHandler = () => {
    props.setShowDetail(false);
  };
  return (
    <div className={classes.modalBackground}>
      <div className={classes.modalContainer}>
        <div className={classes.titleCloseBtn}>
          <button onClick={closeModalHandler}>x</button>
        </div>

        <MovieDetail onShowDetail={props.onShowDetail} />
      </div>
    </div>
  );
}

export default Modal;
