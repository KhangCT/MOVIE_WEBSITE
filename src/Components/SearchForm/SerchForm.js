import React, { useEffect, useState } from "react";
import classes from "./SearchForm.module.css";
import useHttp from "../../hooks/use-http";

function SearchForm(props) {
  // state lưu input khi user nhập
  const [inputSearch, setInputSearch] = useState("");
  // sử dụng useEffect mỗi khi người dùng nhập
  // thì thay đổi state ở Search.js
  useEffect(() => {
    props.inputSearch(inputSearch);
  }, [inputSearch]);
  // func lưu value vào state
  const searchInputHandler = (e) => {
    setInputSearch(e.target.value);
  };
  return (
    <div className={classes.container}>
      <div className={classes.searchBox}>
        <input
          className={classes.inputSearch}
          onChange={searchInputHandler}
          value={inputSearch}
          placeholder="Search..."
        ></input>
        <button className={classes.btnSearch}>
          <i
            className={`fa-solid fa-magnifying-glass ${classes["icon-search"]}`}
          ></i>
        </button>
        <button className={classes.btnReset}>
          <i
            className={`fa-solid fa-rotate-right ${classes["icon-reset"]}`}
          ></i>
        </button>
      </div>
    </div>
  );
}
export default SearchForm;
