import axios from "axios";
import { useEffect, useRef, useState } from "react";
import Skeleton from "./Skeleton";
import classes from "@/styles/SelectedBook.module.css";
import Link from "next/link";
import Image from "next/image";

const SelectedBook = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [book, setBook] = useState(null);
  const [duration, setDuration] = useState("0 mins 0 secs");
  const audioRef = useRef();
  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const { data } = await axios.get(
        "https://us-central1-summaristt.cloudfunctions.net/getBooks?status=selected"
      );
      setBook(data[0]);
      setIsLoading(false);
    })();
  }, []);
  return (
    <Link
      href={isLoading ? "/for-you" : `/book/${book.id}`}
      className={classes.book}
    >
      <audio
        src={!isLoading && book.audioLink}
        ref={audioRef}
        onLoadedMetadata={() =>
          setDuration(() => {
            const total = Math.floor(audioRef.current.duration);
            const minutes = Math.floor(total / 60);
            const seconds = total % 60;
            return `${minutes} mins ${seconds} secs`;
          })
        }
      />
      <div className={classes["book__sub-title"]}>
        {isLoading ? <Skeleton height={16} width="100%" /> : book.subTitle}
      </div>
      <div className={classes.book__line}></div>
      <div className={classes.book__content}>
        <figure className={classes["book__image--wrapper"]}>
          {isLoading ? (
            <Skeleton width={140} height={140} borderRadius={8} />
          ) : (
            <Image
              src={book.imageLink}
              alt="Book cover"
              width={140}
              height={140}
            />
          )}
        </figure>
        <div className={classes.book__text}>
          <div className={classes.book__title}>
            {isLoading ? <Skeleton height={22} width="50%" /> : book.title}
          </div>
          <div className={classes.book__author}>
            {isLoading ? <Skeleton height={16} width="25%" /> : book.author}
          </div>
          <div className={classes["book__duration--wrapper"]}>
            <div className={classes.book__icon}>
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 16 16"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
                className={classes.book__svg}
              >
                <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"></path>
              </svg>
            </div>
            <p className={classes.book__duration}>{duration}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default SelectedBook;
