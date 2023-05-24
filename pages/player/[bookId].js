import Overlay from "@/components/Overlay";
import { useRouter } from "next/router";

const PlayerPage = () => {
  const router = useRouter();
  const { bookId } = router.query;
  return (
    <Overlay>
      <h1>This is Player page</h1>
      <p>Book ID: {bookId}</p>
    </Overlay>
  );
};

export default PlayerPage;
