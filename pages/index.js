import styles from "@/styles/Home.module.css";
import { AiFillFileText, AiFillBulb, AiFillAudio } from "react-icons/ai";
import { BiCrown } from "react-icons/bi";
import { BsStarFill, BsStarHalf } from "react-icons/bs";
import { RiLeafLine } from "react-icons/ri";
import Image from "next/image";
import logo from "@/public/logo.png";
import landing from "@/public/landing.png";
import Statistics from "@/components/Statistics";
import AuthModal from "@/components/AuthModal";
import { open } from "@/redux/modalSlice";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebase";
import { login, logout } from "@/redux/authSlice";
import { useRouter } from "next/router";

const Home = () => {
  const { isOpen } = useSelector((state) => state.modal);
  const dispatch = useDispatch();
  const { push } = useRouter();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(login(user));
        push("/for-you");
      } else {
        dispatch(logout());
      }
    });
  }, []);
  return (
    <>
      {isOpen && <AuthModal />}
      <nav className={styles.nav}>
        <div className={styles.nav__wrapper}>
          <figure className={styles["nav__img--mask"]}>
            <Image className={styles.nav__img} src={logo} alt="logo" />
          </figure>
          <ul className={styles["nav__list--wrapper"]}>
            <li
              className={`${styles.nav__list} ${styles["nav__list--login"]}`}
              onClick={() => dispatch(open())}
            >
              Login
            </li>
            <li
              className={`${styles.nav__list} ${styles["nav__list--mobile"]}`}
            >
              About
            </li>
            <li
              className={`${styles.nav__list} ${styles["nav__list--mobile"]}`}
            >
              Contact
            </li>
            <li
              className={`${styles.nav__list} ${styles["nav__list--mobile"]}`}
            >
              Help
            </li>
          </ul>
        </div>
      </nav>
      <section id="landing">
        <div className={styles.container}>
          <div className={styles.row}>
            <div className={styles.landing__wrapper}>
              <div className={styles.landing__content}>
                <div className={styles.landing__content__title}>
                  Gain more knowledge
                  <br className={styles["remove--tablet"]} />
                  in less time
                </div>
                <div className={styles.landing__content__subtitle}>
                  Great summaries for busy people,
                  <br className={styles["remove--tablet"]} />
                  individuals who barely have time to read,
                  <br className={styles["remove--tablet"]} />
                  and even people who don’t like to read.
                </div>
                <button
                  className={`${styles.btn} ${styles["home__cta--btn"]}`}
                  onClick={() => dispatch(open())}
                >
                  Login
                </button>
              </div>
              <figure className={styles["landing__image--mask"]}>
                <Image src={landing} alt="landing" />
              </figure>
            </div>
          </div>
        </div>
      </section>
      <section id="features">
        <div className={styles.container}>
          <div className={styles.row}>
            <div className={styles.section__title}>
              Understand books in few minutes
            </div>
            <div className={styles.features__wrapper}>
              <div className={styles.features}>
                <div className={styles.features__icon}>
                  <AiFillFileText />
                </div>
                <div className={styles.features__title}>Read or listen</div>
                <div className={styles["features__sub--title"]}>
                  Save time by getting the core ideas from the best books.
                </div>
              </div>
              <div className={styles.features}>
                <div className={styles.features__icon}>
                  <AiFillBulb />
                </div>
                <div className={styles.features__title}>
                  Find your next read
                </div>
                <div className={styles["features__sub--title"]}>
                  Explore book lists and personalized recommendations.
                </div>
              </div>
              <div className={styles.features}>
                <div className={styles.features__icon}>
                  <AiFillAudio />
                </div>
                <div className={styles.features__title}>Briefcasts</div>
                <div className={styles["features__sub--title"]}>
                  Gain valuable insights from briefcasts
                </div>
              </div>
            </div>
            <Statistics />
          </div>
        </div>
      </section>
      <section id="reviews">
        <div className={styles.row}>
          <div className={styles.container}>
            <div className={styles.section__title}>What our members say</div>
            <div className={styles.reviews__wrapper}>
              <div className={styles.review}>
                <div className={styles.review__header}>
                  <div className={styles.review__name}>Hanna M.</div>
                  <div className={styles.review__stars}>
                    <BsStarFill />
                  </div>
                </div>
                <div className={styles.review__body}>
                  This app has been a <b>game-changer</b> for me! It's saved me
                  so much time and effort in reading and comprehending books.
                  Highly recommend it to all book lovers.
                </div>
              </div>
              <div className={styles.review}>
                <div className={styles.review__header}>
                  <div className={styles.review__name}>David B.</div>
                  <div className={styles.review__stars}>
                    <BsStarFill />
                  </div>
                </div>
                <div className={styles.review__body}>
                  I love this app! It provides
                  <b>concise and accurate summaries</b> of books in a way that
                  is easy to understand. It's also very user-friendly and
                  intuitive.
                </div>
              </div>
              <div className={styles.review}>
                <div className={styles.review__header}>
                  <div className={styles.review__name}>Nathan S.</div>
                  <div className={styles.review__stars}>
                    <BsStarFill />
                  </div>
                </div>
                <div className={styles.review__body}>
                  This app is a great way to get the main takeaways from a book
                  without having to read the entire thing.
                  <b>The summaries are well-written and informative.</b>
                  Definitely worth downloading.
                </div>
              </div>
              <div className={styles.review}>
                <div className={styles.review__header}>
                  <div className={styles.review__name}>Ryan R.</div>
                  <div className={styles.review__stars}>
                    <BsStarFill />
                  </div>
                </div>
                <div className={styles.review__body}>
                  If you're a busy person who
                  <b>loves reading but doesn't have the time</b> to read every
                  book in full, this app is for you! The summaries are thorough
                  and provide a great overview of the book's content.
                </div>
              </div>
            </div>
            <div className={styles["reviews__btn--wrapper"]}>
              <button
                className={`${styles.btn} ${styles["home__cta--btn"]}`}
                onClick={() => dispatch(open())}
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </section>
      <section id="numbers">
        <div className={styles.container}>
          <div className={styles.row}>
            <div className={styles.section__title}>
              Start growing with Summarist now
            </div>
            <div className={styles.numbers__wrapper}>
              <div className={styles.numbers}>
                <div className={styles.numbers__icon}>
                  <BiCrown />
                </div>
                <div className={styles.numbers__title}>3 Million</div>
                <div className={styles["numbers__sub--title"]}>
                  Downloads on all platforms
                </div>
              </div>
              <div className={styles.numbers}>
                <div
                  className={`${styles.numbers__icon} ${styles["numbers__star--icon"]}`}
                >
                  <BsStarFill />
                  <BsStarHalf />
                </div>
                <div className={styles.numbers__title}>4.5 Stars</div>
                <div className={styles["numbers__sub--title"]}>
                  Average ratings on iOS and Google Play
                </div>
              </div>
              <div className={styles.numbers}>
                <div className={styles.numbers__icon}>
                  <RiLeafLine />
                </div>
                <div className={styles.numbers__title}>97%</div>
                <div className={styles["numbers__sub--title"]}>
                  Of Summarist members create a better reading habit
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="footer">
        <div className={styles.container}>
          <div className={styles.row}>
            <div className={styles["footer__top--wrapper"]}>
              <div className={styles.footer__block}>
                <div className={styles["footer__link--title"]}>Actions</div>
                <div>
                  <div className={styles["footer__link--wrapper"]}>
                    <a className={styles.footer__link}>Summarist Magazine</a>
                  </div>
                  <div className={styles["footer__link--wrapper"]}>
                    <a className={styles.footer__link}>Cancel Subscription</a>
                  </div>
                  <div className={styles["footer__link--wrapper"]}>
                    <a className={styles.footer__link}>Help</a>
                  </div>
                  <div className={styles["footer__link--wrapper"]}>
                    <a className={styles.footer__link}>Contact us</a>
                  </div>
                </div>
              </div>
              <div className={styles.footer__block}>
                <div className={styles["footer__link--title"]}>
                  Useful Links
                </div>
                <div>
                  <div className={styles["footer__link--wrapper"]}>
                    <a className={styles.footer__link}>Pricing</a>
                  </div>
                  <div className={styles["footer__link--wrapper"]}>
                    <a className={styles.footer__link}>Summarist Business</a>
                  </div>
                  <div className={styles["footer__link--wrapper"]}>
                    <a className={styles.footer__link}>Gift Cards</a>
                  </div>
                  <div className={styles["footer__link--wrapper"]}>
                    <a className={styles.footer__link}>Authors & Publishers</a>
                  </div>
                </div>
              </div>
              <div className={styles.footer__block}>
                <div className={styles["footer__link--title"]}>Company</div>
                <div>
                  <div className={styles["footer__link--wrapper"]}>
                    <a className={styles.footer__link}>About</a>
                  </div>
                  <div className={styles["footer__link--wrapper"]}>
                    <a className={styles.footer__link}>Careers</a>
                  </div>
                  <div className={styles["footer__link--wrapper"]}>
                    <a className={styles.footer__link}>Partners</a>
                  </div>
                  <div className={styles["footer__link--wrapper"]}>
                    <a className={styles.footer__link}>Code of Conduct</a>
                  </div>
                </div>
              </div>
              <div className={styles.footer__block}>
                <div className={styles["footer__link--title"]}>Other</div>
                <div>
                  <div className={styles["footer__link--wrapper"]}>
                    <a className={styles.footer__link}>Sitemap</a>
                  </div>
                  <div className={styles["footer__link--wrapper"]}>
                    <a className={styles.footer__link}>Legal Notice</a>
                  </div>
                  <div className={styles["footer__link--wrapper"]}>
                    <a className={styles.footer__link}>Terms of Service</a>
                  </div>
                  <div className={styles["footer__link--wrapper"]}>
                    <a className={styles.footer__link}>Privacy Policies</a>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles["footer__copyright--wrapper"]}>
              <div className={styles.footer__copyright}>
                Copyright &copy; 2023 Summarist.
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
