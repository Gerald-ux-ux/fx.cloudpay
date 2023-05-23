import "@/styles/globals.css";
import { store } from "../store";
import { Provider } from "react-redux";
import "@fortawesome/fontawesome-svg-core/styles.css";



export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <style jsx global>{`
        body {
          font-family: "Poppins", sans-serif;
        }
      `}</style>
      <Component {...pageProps} />
    </Provider>
  );
}
