import Overlay from "@/components/Overlay";
import { useSelector } from "react-redux";

const Library = () => {
  const { saved } = useSelector((state) => state.books);
  return (
    <Overlay active="library">
      <h1>This is library page</h1>
      <p>Saved Books: {saved.map((book) => book.title).join(", ")}</p>
    </Overlay>
  );
};

export default Library;
