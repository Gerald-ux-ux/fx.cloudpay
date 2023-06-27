import "@/styles/globals.css";
import { store } from "../store";
import { Provider } from "react-redux";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function App({ Component, pageProps }) {
  const router = useRouter();

  // useEffect(() => {
  //   const isLoggedIn = localStorage.getItem("isLoggedIn");
  //   if (!isLoggedIn && router.pathname !== "/login") {
  //     router.push("/login");
  //   }
  // }, []);

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
