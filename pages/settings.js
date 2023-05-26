import Overlay from "@/components/Overlay";
import classes from "@/styles/Settings.module.css";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import loginImage from "@/public/login.png";
import { open } from "@/redux/modalSlice";
import { useRouter } from "next/router";

const Settings = () => {
  const { user, premium } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const router = useRouter();
  const { push } = router;
  return (
    <Overlay active="settings">
      <div className={classes.container}>
        <h1 className={classes.title}>Settings</h1>
        {user.email ? (
          <>
            <div className={classes.subscription__box}>
              <h2 className={classes["sub-title"]}>Your Subscription plan</h2>
              <p className={classes.premium}>{premium ? premium : "Basic"}</p>
              {!premium && (
                <button
                  className={classes.btn}
                  onClick={() => push("/choose-plan")}
                >
                  Upgrade to Premium
                </button>
              )}
            </div>
            <h2 className={classes["sub-title"]}>Email</h2>
            <p className={classes.premium}>{user.email}</p>
          </>
        ) : (
          <div className={classes.not__container}>
            <figure className={classes["image--wrapper"]}>
              <Image src={loginImage} className={classes.image} />
            </figure>
            <h2 className={classes.sectitle}>
              Log in to your account to see your details.
            </h2>
            <button className={classes.btn} onClick={() => dispatch(open())}>
              Login
            </button>
          </div>
        )}
      </div>
    </Overlay>
  );
};

export default Settings;
