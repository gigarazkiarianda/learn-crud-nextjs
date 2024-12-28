import "../styles/global.css"; // Mengimpor file CSS global yang berisi Tailwind
import { useEffect } from "react";

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
