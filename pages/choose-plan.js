import classes from "@/styles/ChoosePlan.module.css";
import Image from "next/image";
import pricingImage from "@/public/pricing-top.png";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

const ChoosePlan = () => {
  const [selectedPlan, setSelectedPlan] = useState(1);
  const [openedInfo, setOpenedInfo] = useState(null);
  const { user, premium } = useSelector((state) => state.auth);
  const router = useRouter();
  const { push } = router;
  useEffect(() => {
    if (premium || !user.email) {
      push("/for-you");
    }
  }, [premium, user.email]);
  return (
    <>
      <header className={classes.header}>
        <div className={classes["header--wrapper"]}>
          <h1 className={classes.header__title}>
            Get unlimited access to many amazing books to read
          </h1>
          <p className={classes["header__sub-title"]}>
            Turn ordinary moments into amazing learning opportunities
          </p>
          <figure className={classes["header__image--wrapper"]}>
            <Image src={pricingImage} className={classes.header__image} />
          </figure>
        </div>
      </header>
      <main className={classes.main}>
        <div className={classes["main__features--wrapper"]}>
          <div className={classes.main__feature}>
            <figure className={classes["main__feature-image--wrapper"]}>
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 1024 1024"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
                className={classes["main__feature-svg"]}
              >
                <path d="M854.6 288.7c6 6 9.4 14.1 9.4 22.6V928c0 17.7-14.3 32-32 32H192c-17.7 0-32-14.3-32-32V96c0-17.7 14.3-32 32-32h424.7c8.5 0 16.7 3.4 22.7 9.4l215.2 215.3zM790.2 326L602 137.8V326h188.2zM320 482a8 8 0 0 0-8 8v48a8 8 0 0 0 8 8h384a8 8 0 0 0 8-8v-48a8 8 0 0 0-8-8H320zm0 136a8 8 0 0 0-8 8v48a8 8 0 0 0 8 8h184a8 8 0 0 0 8-8v-48a8 8 0 0 0-8-8H320z"></path>
              </svg>
            </figure>
            <p className={classes["main__feature-text"]}>
              <span>Key ideas in few min</span> with many books to read
            </p>
          </div>
          <div className={classes.main__feature}>
            <figure className={classes["main__feature-image--wrapper"]}>
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 24 24"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
                className={classes["main__feature-svg"]}
              >
                <g>
                  <path fill="none" d="M0 0H24V24H0z"></path>
                  <path d="M21 3v2c0 3.866-3.134 7-7 7h-1v1h5v7c0 1.105-.895 2-2 2H8c-1.105 0-2-.895-2-2v-7h5v-3c0-3.866 3.134-7 7-7h3zM5.5 2c2.529 0 4.765 1.251 6.124 3.169C10.604 6.51 10 8.185 10 10v1h-.5C5.358 11 2 7.642 2 3.5V2h3.5z"></path>
                </g>
              </svg>
            </figure>
            <p className={classes["main__feature-text"]}>
              <span>3 million</span> people growing with Summarist everyday
            </p>
          </div>
          <div className={classes.main__feature}>
            <figure className={classes["main__feature-image--wrapper"]}>
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 640 512"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
                className={classes["main__feature-svg"]}
              >
                <path d="M434.7 64h-85.9c-8 0-15.7 3-21.6 8.4l-98.3 90c-.1.1-.2.3-.3.4-16.6 15.6-16.3 40.5-2.1 56 12.7 13.9 39.4 17.6 56.1 2.7.1-.1.3-.1.4-.2l79.9-73.2c6.5-5.9 16.7-5.5 22.6 1 6 6.5 5.5 16.6-1 22.6l-26.1 23.9L504 313.8c2.9 2.4 5.5 5 7.9 7.7V128l-54.6-54.6c-5.9-6-14.1-9.4-22.6-9.4zM544 128.2v223.9c0 17.7 14.3 32 32 32h64V128.2h-96zm48 223.9c-8.8 0-16-7.2-16-16s7.2-16 16-16 16 7.2 16 16-7.2 16-16 16zM0 384h64c17.7 0 32-14.3 32-32V128.2H0V384zm48-63.9c8.8 0 16 7.2 16 16s-7.2 16-16 16-16-7.2-16-16c0-8.9 7.2-16 16-16zm435.9 18.6L334.6 217.5l-30 27.5c-29.7 27.1-75.2 24.5-101.7-4.4-26.9-29.4-24.8-74.9 4.4-101.7L289.1 64h-83.8c-8.5 0-16.6 3.4-22.6 9.4L128 128v223.9h18.3l90.5 81.9c27.4 22.3 67.7 18.1 90-9.3l.2-.2 17.9 15.5c15.9 13 39.4 10.5 52.3-5.4l31.4-38.6 5.4 4.4c13.7 11.1 33.9 9.1 45-4.7l9.5-11.7c11.2-13.8 9.1-33.9-4.6-45.1z"></path>
              </svg>
            </figure>
            <p className={classes["main__feature-text"]}>
              <span>Precise recommendations</span> collections curated by
              experts
            </p>
          </div>
        </div>
        <h2 className={classes.plan__title}>Choose the plan that fits you</h2>
        <div
          className={`${classes.plan} ${
            selectedPlan === 1 && classes["plan--active"]
          }`}
          onClick={() => setSelectedPlan(1)}
        >
          <div className={classes.plan__circle}>
            {selectedPlan === 1 && <div className={classes.plan__dot}></div>}
          </div>
          <div className={classes.plan__content}>
            <h4 className={classes["plan__card-title"]}>Premium Plus Yearly</h4>
            <h3 className={classes["plan__card-price"]}>$99.99/year</h3>
            <p className={classes["plan__card-text"]}>
              7-day free trial included
            </p>
          </div>
        </div>
        <div className={classes.plan__separator}>
          <div className={classes["plan__card-separator"]}>or</div>
        </div>
        <div
          className={`${classes.plan} ${
            selectedPlan === 2 && classes["plan--active"]
          }`}
          onClick={() => setSelectedPlan(2)}
        >
          <div className={classes.plan__circle}>
            {selectedPlan === 2 && <div className={classes.plan__dot}></div>}
          </div>
          <div className={classes.plan__content}>
            <h4 className={classes["plan__card-title"]}>Premium Monthly</h4>
            <h3 className={classes["plan__card-price"]}>$9.99/month</h3>
            <p className={classes["plan__card-text"]}>No trial included</p>
          </div>
        </div>
        <div className={classes.sticky}>
          <button className={classes.btn}>
            {selectedPlan === 1
              ? "Start your free 7-day trial"
              : "Start your first month"}
          </button>
          <p className={classes.disclaimer}>
            {selectedPlan === 1
              ? "Cancel your trial at any time before it ends, and you won’t be charged."
              : "30-day money back guarantee, no questions asked."}
          </p>
        </div>
        <div
          className={classes.accordion__header}
          onClick={() =>
            setOpenedInfo((prevInfo) => (prevInfo === 1 ? null : 1))
          }
        >
          <h2 className={classes.accordion__title}>
            How does the free 7-day trial work?
          </h2>
          <svg
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            viewBox="0 0 16 16"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
            className={`${classes.accordion__icon} ${
              openedInfo === 1 && classes["accordion__icon-open"]
            }`}
          >
            <path
              fillRule="evenodd"
              d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
            ></path>
          </svg>
        </div>
        <div
          className={`${classes.accordion__info} ${
            openedInfo !== 1 && classes.accordion__closed
          }`}
        >
          <div className={classes.accordion__body}>
            Begin your complimentary 7-day trial with a Summarist annual
            membership. You are under no obligation to continue your
            subscription, and you will only be billed when the trial period
            expires. With Premium access, you can learn at your own pace and as
            frequently as you desire, and you may terminate your subscription
            prior to the conclusion of the 7-day free trial.
          </div>
        </div>
        <div
          className={classes.accordion__header}
          onClick={() =>
            setOpenedInfo((prevInfo) => (prevInfo === 2 ? null : 2))
          }
        >
          <h2 className={classes.accordion__title}>
            Can I switch subscriptions from monthly to yearly, or yearly to
            monthly?
          </h2>
          <svg
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            viewBox="0 0 16 16"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
            className={`${classes.accordion__icon} ${
              openedInfo === 2 && classes["accordion__icon-open"]
            }`}
          >
            <path
              fillRule="evenodd"
              d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
            ></path>
          </svg>
        </div>
        <div
          className={`${classes.accordion__info} ${
            openedInfo !== 2 && classes.accordion__closed
          }`}
        >
          <div className={classes.accordion__body}>
            While an annual plan is active, it is not feasible to switch to a
            monthly plan. However, once the current month ends, transitioning
            from a monthly plan to an annual plan is an option.
          </div>
        </div>
        <div
          className={classes.accordion__header}
          onClick={() =>
            setOpenedInfo((prevInfo) => (prevInfo === 3 ? null : 3))
          }
        >
          <h2 className={classes.accordion__title}>
            What's included in the Premium plan?
          </h2>
          <svg
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            viewBox="0 0 16 16"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
            className={`${classes.accordion__icon} ${
              openedInfo === 3 && classes["accordion__icon-open"]
            }`}
          >
            <path
              fillRule="evenodd"
              d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
            ></path>
          </svg>
        </div>
        <div
          className={`${classes.accordion__info} ${
            openedInfo !== 3 && classes.accordion__closed
          }`}
        >
          <div className={classes.accordion__body}>
            Premium membership provides you with the ultimate Summarist
            experience, including unrestricted entry to many best-selling books
            high-quality audio, the ability to download titles for offline
            reading, and the option to send your reads to your Kindle.
          </div>
        </div>
        <div
          className={classes.accordion__header}
          onClick={() =>
            setOpenedInfo((prevInfo) => (prevInfo === 4 ? null : 4))
          }
        >
          <h2 className={classes.accordion__title}>
            Can I cancel during my trial or subscription?
          </h2>
          <svg
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            viewBox="0 0 16 16"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
            className={`${classes.accordion__icon} ${
              openedInfo === 4 && classes["accordion__icon-open"]
            }`}
          >
            <path
              fillRule="evenodd"
              d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
            ></path>
          </svg>
        </div>
        <div
          className={`${classes.accordion__info} ${
            openedInfo !== 4 && classes.accordion__closed
          }`}
        >
          <div className={classes.accordion__body}>
            You will not be charged if you cancel your trial before its
            conclusion. While you will not have complete access to the entire
            Summarist library, you can still expand your knowledge with one
            curated book per day.
          </div>
        </div>
      </main>
      <footer className={classes.footer}>
        <div className={classes.footer__lists}>
          <ul className={classes.footer__list}>
            <li className={classes.footer__title}>Actions</li>
            <li className={classes.footer__item}>
              <div className={classes.footer__link}>Summarist Magazine</div>
            </li>
            <li className={classes.footer__item}>
              <div className={classes.footer__link}>Cancel Subscirption</div>
            </li>
            <li className={classes.footer__item}>
              <div className={classes.footer__link}>Help</div>
            </li>
            <li className={classes.footer__item}>
              <div className={classes.footer__link}>Contact us</div>
            </li>
          </ul>
          <ul className={classes.footer__list}>
            <li className={classes.footer__title}>Useful Links</li>
            <li className={classes.footer__item}>
              <div className={classes.footer__link}>Pricing</div>
            </li>
            <li className={classes.footer__item}>
              <div className={classes.footer__link}>Summarist Business</div>
            </li>
            <li className={classes.footer__item}>
              <div className={classes.footer__link}>Gift Cards</div>
            </li>
            <li className={classes.footer__item}>
              <div className={classes.footer__link}>Authors & Publishers</div>
            </li>
          </ul>
          <ul className={classes.footer__list}>
            <li className={classes.footer__title}>Company</li>
            <li className={classes.footer__item}>
              <div className={classes.footer__link}>About</div>
            </li>
            <li className={classes.footer__item}>
              <div className={classes.footer__link}>Careers</div>
            </li>
            <li className={classes.footer__item}>
              <div className={classes.footer__link}>Partners</div>
            </li>
            <li className={classes.footer__item}>
              <div className={classes.footer__link}>Code of Conduct</div>
            </li>
          </ul>
          <ul className={classes.footer__list}>
            <li className={classes.footer__title}>Other</li>
            <li className={classes.footer__item}>
              <div className={classes.footer__link}>Sitemap</div>
            </li>
            <li className={classes.footer__item}>
              <div className={classes.footer__link}>Legal Notice</div>
            </li>
            <li className={classes.footer__item}>
              <div className={classes.footer__link}>Terms of Service</div>
            </li>
            <li className={classes.footer__item}>
              <div className={classes.footer__link}>Privacy Policies</div>
            </li>
          </ul>
        </div>
        <div className={classes.footer__copyright}>
          Copyright &copy; 2023 Summarist.
        </div>
      </footer>
    </>
  );
};

export default ChoosePlan;
