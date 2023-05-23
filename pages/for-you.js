import AuthModal from "@/components/AuthModal";
import NavBar from "@/components/NavBar";
import Search from "@/components/Search";
import { useSelector } from "react-redux";

const ForYouPage = () => {
  const { isOpen } = useSelector((state) => state.modal);
  return (
    <>
      {isOpen && <AuthModal />}
      <div style={{ display: "flex" }}>
        <NavBar active="for-you" />
        <div>
          <Search />
        </div>
      </div>
    </>
  );
};

export default ForYouPage;
