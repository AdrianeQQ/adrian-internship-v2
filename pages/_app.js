import "@/styles/globals.css";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import Context from "@/components/Context";

const App = ({ Component, pageProps }) => {
  return (
    <Provider store={store}>
      <Context>
        <Component {...pageProps} />
      </Context>
    </Provider>
  );
};

export default App;
