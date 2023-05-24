import AuthModal from "@/components/AuthModal";
import NavBar from "@/components/NavBar";
import Search from "@/components/Search";
import { useSelector } from "react-redux";
import classes from "@/styles/Overlay.module.css";

const Overlay = (props) => {
  const { isOpen } = useSelector((state) => state.modal);
  return (
    <>
      {isOpen && <AuthModal />}
      <div className={classes.wrapper}>
        <NavBar active={props.active} />
        <div className={classes.navbar__fake}></div>
        <div className={classes.container}>
          <Search />
          {props.children}
        </div>
      </div>
    </>
  );
};

export default Overlay;
