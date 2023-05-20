import styles from "@/styles/Home.module.css";
import { useEffect, useState } from "react";

const Statistics = () => {
  const [active, setActive] = useState(0);
  useEffect(() => {
    setInterval(
      () =>
        setActive((prevActive) => {
          const newActive = prevActive + 1;
          if (newActive === 6) return 0;
          return newActive;
        }),
      2000
    );
  }, []);
  return (
    <>
      <div className={styles.statistics__wrapper}>
        <div className={styles["statistics__content--header"]}>
          <div
            className={`${styles.statistics__heading} ${
              active === 0 && styles["statistics__heading--active"]
            }`}
          >
            Enhance your knowledge
          </div>
          <div
            className={`${styles.statistics__heading} ${
              active === 1 && styles["statistics__heading--active"]
            }`}
          >
            Achieve greater success
          </div>
          <div
            className={`${styles.statistics__heading} ${
              active === 2 && styles["statistics__heading--active"]
            }`}
          >
            Improve your health
          </div>
          <div
            className={`${styles.statistics__heading} ${
              active === 3 && styles["statistics__heading--active"]
            }`}
          >
            Develop better parenting skills
          </div>
          <div
            className={`${styles.statistics__heading} ${
              active === 4 && styles["statistics__heading--active"]
            }`}
          >
            Increase happiness
          </div>
          <div
            className={`${styles.statistics__heading} ${
              active === 5 && styles["statistics__heading--active"]
            }`}
          >
            Be the best version of yourself!
          </div>
        </div>
        <div className={styles["statistics__content--details"]}>
          <div className={styles.statistics__data}>
            <div className={styles["statistics__data--number"]}>93%</div>
            <div className={styles["statistics__data--title"]}>
              of Summarist members <b>significantly increase</b> reading
              frequency.
            </div>
          </div>
          <div className={styles.statistics__data}>
            <div className={styles["statistics__data--number"]}>96%</div>
            <div className={styles["statistics__data--title"]}>
              of Summarist members <b>establish better</b> habits.
            </div>
          </div>
          <div className={styles.statistics__data}>
            <div className={styles["statistics__data--number"]}>90%</div>
            <div className={styles["statistics__data--title"]}>
              have made <b>significant positive</b> change to their lives.
            </div>
          </div>
        </div>
      </div>
      <div className={styles.statistics__wrapper}>
        <div
          className={`${styles["statistics__content--details"]} ${styles["statistics__content--details-second"]}`}
        >
          <div className={styles.statistics__data}>
            <div className={styles["statistics__data--number"]}>91%</div>
            <div className={styles["statistics__data--title"]}>
              of Summarist members <b>report feeling more productive</b>
              after incorporating the service into their daily routine.
            </div>
          </div>
          <div className={styles.statistics__data}>
            <div className={styles["statistics__data--number"]}>94%</div>
            <div className={styles["statistics__data--title"]}>
              of Summarist members have <b>noticed an improvement</b> in their
              overall comprehension and retention of information.
            </div>
          </div>
          <div className={styles.statistics__data}>
            <div className={styles["statistics__data--number"]}>88%</div>
            <div className={styles["statistics__data--title"]}>
              of Summarist members <b>feel more informed</b> about current
              events and industry trends since using the platform.
            </div>
          </div>
        </div>
        <div
          className={`${styles["statistics__content--header"]} ${styles["statistics__content--header-second"]}`}
        >
          <div
            className={`${styles.statistics__heading} ${
              active === 0 && styles["statistics__heading--active"]
            }`}
          >
            Expand your learning
          </div>
          <div
            className={`${styles.statistics__heading} ${
              active === 1 && styles["statistics__heading--active"]
            }`}
          >
            Accomplish your goals
          </div>
          <div
            className={`${styles.statistics__heading} ${
              active === 2 && styles["statistics__heading--active"]
            }`}
          >
            Strengthen your vitality
          </div>
          <div
            className={`${styles.statistics__heading} ${
              active === 3 && styles["statistics__heading--active"]
            }`}
          >
            Become a better caregiver
          </div>
          <div
            className={`${styles.statistics__heading} ${
              active === 4 && styles["statistics__heading--active"]
            }`}
          >
            Improve your mood
          </div>
          <div
            className={`${styles.statistics__heading} ${
              active === 5 && styles["statistics__heading--active"]
            }`}
          >
            Maximize your abilities
          </div>
        </div>
      </div>
    </>
  );
};

export default Statistics;
