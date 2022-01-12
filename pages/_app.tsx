import "../styles/globals.css";
import "../styles/scss/main.scss";
import type { AppProps } from "next/app";
import { storeWrapper } from "../redux/store";

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default storeWrapper.withRedux(MyApp);
