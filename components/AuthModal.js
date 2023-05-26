import classes from "@/styles/AuthModal.module.css";
import Image from "next/image";
import googleLogo from "@/public/google.webp";
import { useState } from "react";
import { auth, db } from "@/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
} from "firebase/auth";
import Spinner from "./Spinner";
import { useDispatch } from "react-redux";
import { login, subscription } from "@/redux/authSlice";
import { close } from "@/redux/modalSlice";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { loadFinished, loadSaved } from "@/redux/booksSlice";

const AuthModal = () => {
  const [signupModal, setSignupModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [clickedButton, setClickedButton] = useState(null);
  const [forgotModal, setForgotModal] = useState(false);
  const [success, setSuccess] = useState(false);
  const dispatch = useDispatch();
  const provider = new GoogleAuthProvider();
  const submitForm = async (event, email, password) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);
    if (signupModal) {
      try {
        const { user } = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        await setDoc(doc(db, "users", user.uid), {
          uid: user.uid,
          email: user.email,
          premium: "",
          finished: [],
          saved: [],
        });
        dispatch(subscription(false));
        dispatch(login(user));
        dispatch(close());
      } catch (error) {
        setError(error.message);
      }
    } else {
      try {
        const { user } = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        const userSnap = await getDoc(doc(db, "users", user.uid));
        dispatch(subscription(userSnap.data().premium));
        dispatch(loadSaved(userSnap.data().saved));
        dispatch(loadFinished(userSnap.data().finished));
        dispatch(login(user));
        dispatch(close());
      } catch (error) {
        setError(error.message);
      }
    }
    setIsLoading(false);
  };
  const submitReset = async (event, email) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(false);
    try {
      await sendPasswordResetEmail(auth, email);
      setSuccess(true);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  };
  return (
    <>
      <div
        className={classes.auth__wrapper}
        onClick={() => dispatch(close())}
      ></div>
      <div className={classes["auth__wrapper--info"]}>
        {forgotModal ? (
          <div className={classes.auth}>
            <div className={classes.auth__content}>
              <div className={classes.auth__title}>Reset your password</div>
              {error && <div className={classes.auth__error}>{error}</div>}
              {success && (
                <div className={classes.auth__success}>
                  Your reset email has been sent!
                </div>
              )}
              <form
                className={classes["auth__main--form"]}
                onSubmit={(event) => submitReset(event, email)}
              >
                <input
                  className={classes["auth__main--input"]}
                  type="email"
                  placeholder="Email Address"
                  onChange={(event) => setEmail(event.target.value)}
                />
                <button
                  className={classes.btn}
                  onClick={(event) => submitReset(event, email)}
                >
                  <span>
                    {isLoading ? <Spinner /> : "Send reset password link"}
                  </span>
                </button>
              </form>
            </div>
            <button
              className={classes["auth__switch--btn"]}
              onClick={() => setForgotModal(false)}
            >
              Go to login
            </button>
            <div
              className={classes["auth__close--btn"]}
              onClick={() => dispatch(close())}
            >
              <svg
                stroke="currentColor"
                fill="none"
                strokeWidth="0"
                viewBox="0 0 24 24"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
                className={classes["auth__close--svg"]}
              >
                <path
                  d="M6.2253 4.81108C5.83477 4.42056 5.20161 4.42056 4.81108 4.81108C4.42056 5.20161 4.42056 5.83477 4.81108 6.2253L10.5858 12L4.81114 17.7747C4.42062 18.1652 4.42062 18.7984 4.81114 19.1889C5.20167 19.5794 5.83483 19.5794 6.22535 19.1889L12 13.4142L17.7747 19.1889C18.1652 19.5794 18.7984 19.5794 19.1889 19.1889C19.5794 18.7984 19.5794 18.1652 19.1889 17.7747L13.4142 12L19.189 6.2253C19.5795 5.83477 19.5795 5.20161 19.189 4.81108C18.7985 4.42056 18.1653 4.42056 17.7748 4.81108L12 10.5858L6.2253 4.81108Z"
                  fill="currentColor"
                ></path>
              </svg>
            </div>
          </div>
        ) : (
          <div className={classes.auth}>
            <div className={classes.auth__content}>
              <div className={classes.auth__title}>
                {signupModal ? "Sign up" : "Login"} to Summarist
              </div>
              {error && <div className={classes.auth__error}>{error}</div>}
              {!signupModal && (
                <>
                  <button
                    className={`${classes.btn} ${classes["guest__btn--wrapper"]}`}
                    onClick={(event) => {
                      submitForm(event, "guest@gmail.com", "guest123");
                      setClickedButton(1);
                    }}
                  >
                    <figure
                      className={`${classes["google__icon--mask"]} ${classes["guest__icon--mask"]}`}
                    >
                      <svg
                        stroke="currentColor"
                        fill="currentColor"
                        strokeWidth="0"
                        viewBox="0 0 448 512"
                        height="1em"
                        width="1em"
                        xmlns="http://www.w3.org/2000/svg"
                        className={classes["google__icon--svg"]}
                      >
                        <path d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z"></path>
                      </svg>
                    </figure>
                    <div>
                      {isLoading && clickedButton === 1 ? (
                        <Spinner />
                      ) : (
                        "Login as a Guest"
                      )}
                    </div>
                  </button>
                  <div className={classes.auth__separator}>
                    <span className={classes["auth__separator--text"]}>or</span>
                  </div>
                </>
              )}

              <button
                className={`${classes.btn} ${classes["google__btn--wrapper"]}`}
                onClick={async () => {
                  try {
                    const result = await signInWithPopup(auth, provider);
                    const user = result.user;
                    dispatch(login(user));
                    const userSnap = await getDoc(doc(db, "users", user.uid));
                    if (!userSnap.data()) {
                      await setDoc(doc(db, "users", user.uid), {
                        uid: user.uid,
                        email: user.email,
                        premium: "",
                        finished: [],
                        saved: [],
                      });
                    } else {
                      dispatch(subscription(userSnap.data().premium));
                      dispatch(loadSaved(userSnap.data().saved));
                      dispatch(loadFinished(userSnap.data().finished));
                    }
                    dispatch(close());
                  } catch (error) {
                    setError(error.message);
                  }
                }}
              >
                <figure className={classes["google__icon--mask-2"]}>
                  <Image
                    alt="google"
                    src={googleLogo}
                    width={100}
                    height={100}
                    className={classes["google__icon--logo"]}
                    style={{ color: "transparent" }}
                  />
                </figure>
                <div>{signupModal ? "Sign up" : "Login"} with Google</div>
              </button>
              <div className={classes.auth__separator}>
                <span className={classes["auth__separator--text"]}>or</span>
              </div>
              <form
                className={classes["auth__main--form"]}
                onSubmit={(event) => submitForm(event, email, password)}
              >
                <input
                  className={classes["auth__main--input"]}
                  type="email"
                  placeholder="Email Address"
                  onChange={(event) => setEmail(event.target.value)}
                />
                <input
                  className={classes["auth__main--input"]}
                  type="password"
                  placeholder="Password"
                  onChange={(event) => setPassword(event.target.value)}
                />
                <button
                  className={classes.btn}
                  onClick={() => setClickedButton("2")}
                >
                  <span>
                    {isLoading && clickedButton === "2" ? (
                      <Spinner />
                    ) : signupModal ? (
                      "Sign up"
                    ) : (
                      "Login"
                    )}
                  </span>
                </button>
              </form>
            </div>
            {!signupModal && (
              <div
                className={classes["auth__forgot--password"]}
                onClick={() => setForgotModal(true)}
              >
                Forgot your password?
              </div>
            )}
            <button
              className={classes["auth__switch--btn"]}
              onClick={() => setSignupModal((prev) => !prev)}
            >
              {signupModal ? "Already" : "Don't"} have an account?
            </button>
            <div
              className={classes["auth__close--btn"]}
              onClick={() => dispatch(close())}
            >
              <svg
                stroke="currentColor"
                fill="none"
                strokeWidth="0"
                viewBox="0 0 24 24"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
                className={classes["auth__close--svg"]}
              >
                <path
                  d="M6.2253 4.81108C5.83477 4.42056 5.20161 4.42056 4.81108 4.81108C4.42056 5.20161 4.42056 5.83477 4.81108 6.2253L10.5858 12L4.81114 17.7747C4.42062 18.1652 4.42062 18.7984 4.81114 19.1889C5.20167 19.5794 5.83483 19.5794 6.22535 19.1889L12 13.4142L17.7747 19.1889C18.1652 19.5794 18.7984 19.5794 19.1889 19.1889C19.5794 18.7984 19.5794 18.1652 19.1889 17.7747L13.4142 12L19.189 6.2253C19.5795 5.83477 19.5795 5.20161 19.189 4.81108C18.7985 4.42056 18.1653 4.42056 17.7748 4.81108L12 10.5858L6.2253 4.81108Z"
                  fill="currentColor"
                ></path>
              </svg>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default AuthModal;
