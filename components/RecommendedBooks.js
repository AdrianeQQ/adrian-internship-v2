import axios from "axios";
import { useEffect, useState } from "react";
import classes from "@/styles/Recommended.module.css";
import Book from "./Book";

const RecommendedBooks = ({ link, booksData }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [books, setBooks] = useState(null);
  useEffect(() => {
    (async () => {
      if (booksData && !link) return;
      setIsLoading(true);
      const { data } = await axios.get(link);
      setBooks(data);
      setIsLoading(false);
    })();
    if (booksData) {
      setBooks(booksData);
      setIsLoading(false);
    }
  }, []);
  return (
    <div className={classes.books__container}>
      {isLoading
        ? new Array(5).fill(0).map((_, index) => <Book key={index} loading />)
        : books.map((book) => <Book book={book} key={book.id} />)}
    </div>
  );
};

export default RecommendedBooks;
