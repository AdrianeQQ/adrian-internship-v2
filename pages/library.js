import Overlay from "@/components/Overlay";
import { useSelector } from "react-redux";
import classes from "@/styles/Library.module.css";
import RecommendedBooks from "@/components/RecommendedBooks";

const Library = () => {
  const { saved, finished } = useSelector((state) => state.books);
  console.log(saved, finished);
  return (
    <Overlay active="library">
      <div className={classes.container}>
        <h2 className={classes.title}>Saved Books</h2>
        <p className={classes["sub-title"]}>
          {saved.length} item{saved.length > 1 && "s"}
        </p>
        <RecommendedBooks booksData={saved} />
        <h2 className={classes.title}>Finished</h2>
        <p className={classes["sub-title"]}>
          {finished.length} item{finished.length > 1 && "s"}
        </p>
        <RecommendedBooks booksData={finished} />
      </div>
    </Overlay>
  );
};

export default Library;
