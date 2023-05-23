import RecommendedBooks from "@/components/RecommendedBooks";
import Overlay from "@/components/Overlay";
import SelectedBook from "@/components/SelectedBook";
import classes from "@/styles/ForYou.module.css";

const ForYouPage = () => {
  return (
    <Overlay active="for-you">
      <div className={classes.container}>
        <h2 className={classes.title}>Selected just for you</h2>
        <SelectedBook />
        <h2 className={classes.title}>Recommended For You</h2>
        <p className={classes["sub--title"]}>We think you'll like these</p>
        <RecommendedBooks link="https://us-central1-summaristt.cloudfunctions.net/getBooks?status=recommended" />
        <h2 className={classes.title}>Suggested Books</h2>
        <p className={classes["sub--title"]}>Browse those books</p>
        <RecommendedBooks link="https://us-central1-summaristt.cloudfunctions.net/getBooks?status=suggested" />
      </div>
    </Overlay>
  );
};

export default ForYouPage;
