import classes from "@/styles/Search.module.css";
import Image from "next/image";
import Link from "next/link";
import Skeleton from "./Skeleton";
import { useRef, useState } from "react";

const BookMini = ({ book, loading }) => {
  const audioRef = useRef();
  const [duration, setDuration] = useState("00:00");
  return (
    <Link
      href={loading ? "/for-you" : `/book/${book.id}`}
      className={classes.book__container}
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
      <figure className={classes["book__image--wrapper"]}>
        {loading ? (
          <Skeleton width={80} height={80} />
        ) : (
          <Image
            src={book.imageLink}
            className={classes.book__image}
            width={80}
            height={80}
            alt="Book cover"
          />
        )}
      </figure>
      <div className={classes.book__info}>
        <div className={classes.book__title}>
          {loading ? <Skeleton height={16} width="100%" /> : book.title}
        </div>
        <div className={classes.book__author}>
          {loading ? <Skeleton height={14} width="50%" /> : book.author}
        </div>
        <div className={classes["book__duration--wrapper"]}>
          <svg
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            viewBox="0 0 24 24"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
            className={classes.book__svg}
          >
            <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"></path>
            <path d="M13 7h-2v6h6v-2h-4z"></path>
          </svg>
          <div className={classes.book__duration}>{duration}</div>
        </div>
      </div>
    </Link>
  );
};

export default BookMini;
