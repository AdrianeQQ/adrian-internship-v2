import Link from "next/link";
import classes from "@/styles/Recommended.module.css";
import Image from "next/image";
import Skeleton from "./Skeleton";
import { useSelector } from "react-redux";
import { useRef, useState } from "react";

const Book = ({ book, loading }) => {
  const { premium } = useSelector((state) => state.auth);
  const [duration, setDuration] = useState("00:00");
  const audioRef = useRef();
  return (
    <Link
      className={classes.book__link}
      href={loading ? "/for-you" : `/book/${book.id}`}
    >
      <audio
        src={!loading && book.audioLink}
        ref={audioRef}
        onLoadedMetadata={() =>
          setDuration(() => {
            const total = Math.floor(audioRef.current.duration);
            const minutes = `${Math.floor(total / 60)}`.padStart(2, 0);
            const seconds = `${total % 60}`.padStart(2, 0);
            return `${minutes}:${seconds}`;
          })
        }
      />
      {!loading && !premium && book.subscriptionRequired && (
        <p className={classes.book__subscription}>Premium</p>
      )}
      <figure className={classes["book__image--wrapper"]}>
        {loading ? (
          <Skeleton width={172} height={172} />
        ) : (
          <Image
            src={book.imageLink}
            width={172}
            height={172}
            alt="Book cover"
            placeholder="blur"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mN8UA8AAkUBYdOfF4cAAAAASUVORK5CYII="
          />
        )}
      </figure>
      <div className={classes.book__title}>
        {loading ? <Skeleton height={22} width="100%" /> : book.title}
      </div>
      <div className={classes.book__author}>
        {loading ? <Skeleton height={16} width="90%" /> : book.author}
      </div>
      <div className={classes["book__sub-title"]}>
        {loading ? <Skeleton height={32} width="80%" /> : book.subTitle}
      </div>
      <div className={classes["book__details--wrapper"]}>
        {loading ? (
          <Skeleton height={16} width="90%" />
        ) : (
          <>
            <div className={classes.book__details}>
              <div className={classes["book__details-icon"]}>
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  viewBox="0 0 24 24"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                  className={classes["book__details-svg"]}
                >
                  <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"></path>
                  <path d="M13 7h-2v6h6v-2h-4z"></path>
                </svg>
              </div>
              <p className={classes["book__details-text"]}>{duration}</p>
            </div>
            <div className={classes.book__details}>
              <div className={classes["book__details-icon"]}>
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  viewBox="0 0 1024 1024"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                  className={classes["book__details-svg"]}
                >
                  <path d="M908.1 353.1l-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5-15.8-7.8-35-1.3-42.9 14.5L369.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3a32.05 32.05 0 0 0 .6 45.3l183.7 179.1-43.4 252.9a31.95 31.95 0 0 0 46.4 33.7L512 754l227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2 17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9 183.7-179.1c5-4.9 8.3-11.3 9.3-18.3 2.7-17.5-9.5-33.7-27-36.3zM664.8 561.6l36.1 210.3L512 672.7 323.1 772l36.1-210.3-152.8-149L417.6 382 512 190.7 606.4 382l211.2 30.7-152.8 148.9z"></path>
                </svg>
              </div>
              <p className={classes["book__details-text"]}>
                {book.averageRating}
              </p>
            </div>
          </>
        )}
      </div>
    </Link>
  );
};

export default Book;
