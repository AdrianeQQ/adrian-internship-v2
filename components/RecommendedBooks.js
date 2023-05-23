import axios from "axios";
import { useEffect, useState } from "react";
import classes from "@/styles/Recommended.module.css";
// import Slider from "react-slick";
import Book from "./Book";

const RecommendedBooks = ({ link }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [books, setBooks] = useState(null);
  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const { data } = await axios.get(link);
      setBooks(data);
      setIsLoading(false);
      console.log(data);
    })();
  }, []);
  if (isLoading) return <></>;
  return (
    <div>
      {books.map((book) => (
        <Book book={book} key={book.id} />
      ))}
    </div>
  );
};

export default RecommendedBooks;
