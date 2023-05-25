import classes from "@/styles/Player.module.css";
import Image from "next/image";
import Skeleton from "./Skeleton";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { finish } from "@/redux/booksSlice";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase";

const Player = ({ book, isLoading }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeProgress, setTimeProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef();
  const progressRef = useRef();
  const playAnimationRef = useRef();
  const dispatch = useDispatch();
  const { finished } = useSelector((state) => state.books);
  const { user } = useSelector((state) => state.auth);
  const repeat = useCallback(() => {
    if (!audioRef.current) return;
    const currentTime = audioRef.current.currentTime;
    setTimeProgress(currentTime);
    progressRef.current.value = currentTime;
    progressRef.current.style.setProperty(
      "--range-progress",
      `${(progressRef.current.value / duration) * 100}%`
    );
    playAnimationRef.current = requestAnimationFrame(repeat);
  }, [audioRef, duration, progressRef, setTimeProgress]);
  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
    playAnimationRef.current = requestAnimationFrame(repeat);
  }, [isPlaying, audioRef, repeat]);
  const formatTime = (time) => {
    if (time && !isNaN(time)) {
      const minutes = Math.floor(time / 60);
      const formatMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
      const seconds = Math.floor(time % 60);
      const formatSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
      return `${formatMinutes}:${formatSeconds}`;
    }
    return "00:00";
  };
  return (
    <div className={classes.player}>
      <div className={classes["player__track--wrapper"]}>
        <figure className={classes["player__track-image--wrapper"]}>
          {isLoading ? (
            <Skeleton width={48} height={48} />
          ) : (
            <Image
              src={book.imageLink}
              width={48}
              height={48}
              alt="Book cover"
              className={classes["player__track-image"]}
            />
          )}
        </figure>
        <div className={classes["player__details--wrapper"]}>
          <div className={classes["player__title"]}>
            {isLoading ? <Skeleton height={14} width={280} /> : book.title}
          </div>
          <div className={classes["player__author"]}>
            {isLoading ? <Skeleton height={14} width={70} /> : book.author}
          </div>
        </div>
      </div>
      <div className={classes["player__audio--controls"]}>
        <button
          className={classes["player__audio--btn"]}
          onClick={() => (audioRef.current.currentTime -= 10)}
        >
          <svg
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            viewBox="0 0 24 24"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
            className={classes["player__audio--svg"]}
          >
            <path
              fill="none"
              stroke="#000"
              strokeWidth="1.5"
              d="M3.11111111,7.55555556 C4.66955145,4.26701301 8.0700311,2 12,2 C17.5228475,2 22,6.4771525 22,12 C22,17.5228475 17.5228475,22 12,22 L12,22 C6.4771525,22 2,17.5228475 2,12 M2,4 L2,8 L6,8 M9,16 L9,9 L7,9.53333333 M17,12 C17,10 15.9999999,8.5 14.5,8.5 C13.0000001,8.5 12,10 12,12 C12,14 13,15.5000001 14.5,15.5 C16,15.4999999 17,14 17,12 Z M14.5,8.5 C16.9253741,8.5 17,11 17,12 C17,13 17,15.5 14.5,15.5 C12,15.5 12,13 12,12 C12,11 12.059,8.5 14.5,8.5 Z"
            ></path>
          </svg>
        </button>
        <button
          className={classes["player__audio--btn-play"]}
          onClick={() => setIsPlaying((prevPlaying) => !prevPlaying)}
        >
          {isPlaying ? (
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 512 512"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
              className={classes["player__audio--svg-play"]}
            >
              <path d="M224 432h-80V80h80zm144 0h-80V80h80z"></path>
            </svg>
          ) : (
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 512 512"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
              className={classes["player__audio--svg-play"]}
            >
              <path d="M96 448l320-192L96 64v384z"></path>
            </svg>
          )}
        </button>
        <button
          className={classes["player__audio--btn"]}
          onClick={() => (audioRef.current.currentTime += 10)}
        >
          <svg
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            viewBox="0 0 24 24"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
            className={classes["player__audio--svg"]}
          >
            <path
              fill="none"
              stroke="#000"
              strokeWidth="1.5"
              d="M20.8888889,7.55555556 C19.3304485,4.26701301 15.9299689,2 12,2 C6.4771525,2 2,6.4771525 2,12 C2,17.5228475 6.4771525,22 12,22 L12,22 C17.5228475,22 22,17.5228475 22,12 M22,4 L22,8 L18,8 M9,16 L9,9 L7,9.53333333 M17,12 C17,10 15.9999999,8.5 14.5,8.5 C13.0000001,8.5 12,10 12,12 C12,14 13,15.5000001 14.5,15.5 C16,15.4999999 17,14 17,12 Z M14.5,8.5 C16.9253741,8.5 17,11 17,12 C17,13 17,15.5 14.5,15.5 C12,15.5 12,13 12,12 C12,11 12.059,8.5 14.5,8.5 Z"
            ></path>
          </svg>
        </button>
      </div>
      <div className={classes["player__progress--wrapper"]}>
        <audio
          src={isLoading ? undefined : book.audioLink}
          ref={audioRef}
          onLoadedMetadata={() => {
            const seconds = audioRef.current.duration;
            setDuration(seconds);
            progressRef.current.max = seconds;
          }}
          onEnded={async () => {
            dispatch(finish(book));
            setIsPlaying(false);
            audioRef.current.currentTime = 0;
            await updateDoc(doc(db, "users", user.uid), {
              finished,
            });
          }}
        />
        <div className={classes["player__audio--time"]}>
          {formatTime(timeProgress)}
        </div>
        <input
          type="range"
          className={classes["player__audio--bar"]}
          ref={progressRef}
          defaultValue="0"
          onChange={() =>
            (audioRef.current.currentTime = progressRef.current.value)
          }
        />
        <div className={classes["player__audio--time"]}>
          {formatTime(duration)}
        </div>
      </div>
    </div>
  );
};

export default Player;
