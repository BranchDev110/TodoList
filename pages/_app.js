import { ThemeProvider } from "next-themes";
import { TodoContext } from "../context";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider attribute="class">
      <TodoContext>
        <Component {...pageProps} />
      </TodoContext>
    </ThemeProvider>
  );
}

export default MyApp;
