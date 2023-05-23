import AuthModal from "@/components/AuthModal";
import NavBar from "@/components/NavBar";
import Search from "@/components/Search";
import { useSelector } from "react-redux";

const Overlay = (props) => {
  const { isOpen } = useSelector((state) => state.modal);
  return (
    <>
      {isOpen && <AuthModal />}
      <div style={{ display: "flex" }}>
        <NavBar active={props.active} />
        <div style={{ flexGrow: 1 }}>
          <Search />
          {props.children}
        </div>
      </div>
    </>
  );
};

export default Overlay;
