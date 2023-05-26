import { openHam } from "@/redux/modalSlice";
import classes from "@/styles/Search.module.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import BookMini from "./BookMini";

const Search = () => {
  const dispatch = useDispatch();
  const [timer, setTimer] = useState(null);
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const debounce = (fn) => () => {
    clearTimeout(timer);
    setTimer(
      setTimeout(() => {
        fn();
      }, 300)
    );
  };
  return (
    <div className={classes.container}>
      <div className={classes.search}>
        <div className={classes.search__wrapper}>
          <div className={classes["search__input--wrapper"]}>
            {searchValue && (
              <div className={classes["books--wrapper"]}>
                {!isLoading
                  ? books.length > 0
                    ? books.map((book) => (
                        <BookMini book={book} key={book.id} />
                      ))
                    : "No books found"
                  : new Array(5)
                      .fill(0)
                      .map((_, index) => <BookMini key={index} loading />)}
              </div>
            )}
            <input
              type="text"
              className={classes.search__input}
              placeholder="Search for books"
              onChange={(event) => {
                setIsLoading(true);
                setSearchValue(event.target.value);
                debounce(async () => {
                  try {
                    const { data } = await axios.get(
                      `https://us-central1-summaristt.cloudfunctions.net/getBooksByAuthorOrTitle?search=${event.target.value}`
                    );
                    setBooks(data);
                    setIsLoading(false);
                  } catch (error) {
                    console.log(error);
                  }
                })();
              }}
            />
            <div className={classes.search__icon}>
              {searchValue ? (
                <svg
                  stroke="currentColor"
                  fill="none"
                  strokeWidth="0"
                  viewBox="0 0 24 24"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                  className={classes.search__svg}
                >
                  <path
                    d="M6.2253 4.81108C5.83477 4.42056 5.20161 4.42056 4.81108 4.81108C4.42056 5.20161 4.42056 5.83477 4.81108 6.2253L10.5858 12L4.81114 17.7747C4.42062 18.1652 4.42062 18.7984 4.81114 19.1889C5.20167 19.5794 5.83483 19.5794 6.22535 19.1889L12 13.4142L17.7747 19.1889C18.1652 19.5794 18.7984 19.5794 19.1889 19.1889C19.5794 18.7984 19.5794 18.1652 19.1889 17.7747L13.4142 12L19.189 6.2253C19.5795 5.83477 19.5795 5.20161 19.189 4.81108C18.7985 4.42056 18.1653 4.42056 17.7748 4.81108L12 10.5858L6.2253 4.81108Z"
                    fill="currentColor"
                  ></path>
                </svg>
              ) : (
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  viewBox="0 0 1024 1024"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                  className={classes.search__svg}
                >
                  <path d="M909.6 854.5L649.9 594.8C690.2 542.7 712 479 712 412c0-80.2-31.3-155.4-87.9-212.1-56.6-56.7-132-87.9-212.1-87.9s-155.5 31.3-212.1 87.9C143.2 256.5 112 331.8 112 412c0 80.1 31.3 155.5 87.9 212.1C256.5 680.8 331.8 712 412 712c67 0 130.6-21.8 182.7-62l259.7 259.6a8.2 8.2 0 0 0 11.6 0l43.6-43.5a8.2 8.2 0 0 0 0-11.6zM570.4 570.4C528 612.7 471.8 636 412 636s-116-23.3-158.4-65.6C211.3 528 188 471.8 188 412s23.3-116.1 65.6-158.4C296 211.3 352.2 188 412 188s116.1 23.2 158.4 65.6S636 352.2 636 412s-23.3 116.1-65.6 158.4z"></path>
                </svg>
              )}
            </div>
          </div>
          <div
            className={classes.search__hamburger}
            onClick={() => dispatch(openHam())}
          >
            <svg
              stroke="currentColor"
              fill="none"
              strokeWidth="0"
              viewBox="0 0 15 15"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
              className={classes["search__hamburger-svg"]}
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M1.5 3C1.22386 3 1 3.22386 1 3.5C1 3.77614 1.22386 4 1.5 4H13.5C13.7761 4 14 3.77614 14 3.5C14 3.22386 13.7761 3 13.5 3H1.5ZM1 7.5C1 7.22386 1.22386 7 1.5 7H13.5C13.7761 7 14 7.22386 14 7.5C14 7.77614 13.7761 8 13.5 8H1.5C1.22386 8 1 7.77614 1 7.5ZM1 11.5C1 11.2239 1.22386 11 1.5 11H13.5C13.7761 11 14 11.2239 14 11.5C14 11.7761 13.7761 12 13.5 12H1.5C1.22386 12 1 11.7761 1 11.5Z"
                fill="currentColor"
              ></path>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
