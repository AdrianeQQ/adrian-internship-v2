import Overlay from "@/components/Overlay";
import { useDispatch, useSelector } from "react-redux";
import classes from "@/styles/Library.module.css";
import RecommendedBooks from "@/components/RecommendedBooks";
import loginImage from "@/public/login.png";
import Image from "next/image";
import { open } from "@/redux/modalSlice";

const Library = () => {
  const { saved, finished } = useSelector((state) => state.books);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  return (
    <Overlay active="library">
      {!user.email ? (
        <div className={classes.not__container}>
          <figure className={classes["image--wrapper"]}>
            <Image src={loginImage} className={classes.image} />
          </figure>
          <h2 className={classes.sectitle}>
            Log in to your account to see your library.
          </h2>
          <button className={classes.btn} onClick={() => dispatch(open())}>
            Login
          </button>
        </div>
      ) : (
        <div className={classes.container}>
          <h2 className={classes.title}>Saved Books</h2>
          <p className={classes["sub-title"]}>
            {saved.length} item{saved.length > 1 && "s"}
          </p>
          {saved.length > 0 ? (
            <RecommendedBooks booksData={saved} />
          ) : (
            <div className={classes.books__wrapper}>
              <h3 className={classes.books__title}>
                Save your favorite books!
              </h3>
              <p className={classes["books__sub-title"]}>
                When you save a book, it will appear here.
              </p>
            </div>
          )}
          <h2 className={classes.title}>Finished</h2>
          <p className={classes["sub-title"]}>
            {finished.length} item{finished.length > 1 && "s"}
          </p>
          {finished.length > 0 ? (
            <RecommendedBooks booksData={finished} />
          ) : (
            <div className={classes.books__wrapper}>
              <h3 className={classes.books__title}>Done and dusted!</h3>
              <p className={classes["books__sub-title"]}>
                When you finish a book, you can find it here later.
              </p>
            </div>
          )}
        </div>
      )}
    </Overlay>
  );
};

export default Library;
