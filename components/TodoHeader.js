import React from "react";
import { useTheme } from "next-themes";
import IconMoon from "../public/images/icon-moon.svg";
import IconSun from "../public/images/icon-sun.svg";

const TodoHeader = () => {
  const { theme, setTheme } = useTheme();
  return (
    <header className="flex justify-between items-center mb-16">
      <div>
        <h1 className="sm:text-4xl text-3xl font-bold uppercase text-white tracking-[.50em] text-left ">
          Todo
        </h1>
      </div>
      <button
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        aria-label="Toggle Color Mode"
      >
        {theme === "light" ? <IconMoon /> : <IconSun />}
      </button>
    </header>
  );
};

export default TodoHeader;
