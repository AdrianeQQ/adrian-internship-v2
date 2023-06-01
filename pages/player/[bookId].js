import Overlay from "@/components/Overlay";
import { useRouter } from "next/router";
import axios from "axios";
import { useEffect, useState } from "react";
import classes from "@/styles/Player.module.css";
import Player from "@/components/Player";
import { useSelector } from "react-redux";
import Skeleton from "@/components/Skeleton";

const PlayerPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [book, setBook] = useState(null);
  const router = useRouter();
  const { bookId } = router.query;
  const { fontSize } = useSelector((state) => state.modal);
  const fontClasses = ["small", "medium", "big", "large"];
  const { premium } = useSelector((state) => state.auth);
  const { push } = router;
  if (book?.subscriptionRequired && !premium) {
    push("/choose-plan");
  }
  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const { data } = await axios.get(
        `https://us-central1-summaristt.cloudfunctions.net/getBook?id=${bookId}`
      );
      if (!data) {
        return;
      }
      setBook(data);
      setIsLoading(false);
    })();
  }, [bookId]);
  return (
    <Overlay active="player">
      <div className={classes.container}>
        <div className={classes.summary__title}>
          {isLoading ? <Skeleton height={24} width="100%" /> : book.title}
        </div>
        <div
          className={`${classes.summary} ${classes[fontClasses[fontSize - 1]]}`}
        >
          {isLoading ? (
            <div className={classes.skeleton}>
              {new Array(4).fill(0).map((_, index) => (
                <Skeleton height={120} width="100%" key={index} />
              ))}
            </div>
          ) : (
            book.summary
          )}
        </div>
      </div>
      <Player book={book} isLoading={isLoading} />
    </Overlay>
  );
};

export default PlayerPage;
