import Overlay from "@/components/Overlay";
import { useRouter } from "next/router";
import classes from "@/styles/BookPage.module.css";

const BookPage = () => {
  const router = useRouter();
  const { bookId } = router.query;
  return (
    <Overlay>
      <h1>This is a book page</h1>
      <p>Book ID: {bookId}</p>
    </Overlay>
  );
};

export default BookPage;
