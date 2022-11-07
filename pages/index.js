import Head from "next/head";
import { resetServerContext } from "react-beautiful-dnd";
import TodoContainer from "../components/TodoContainer";

export async function getServerSideProps({ query }) {
  resetServerContext();

  return { props: { data: [] } };
}

export default function Home() {
  return (
    <div className="w-screen h-screen overflow-x-hidden">
      <Head>
        <title>Todo List 110</title>
        <meta
          name="desc"
          content="Todo List app by using Next.js, Django and Postgres"
        />
      </Head>
      <div className="absolute top-0 right-0 left-0 w-full sm:h-[300px] h-[200px] bg-light-img-mobile bg-cover sm:bg-light-img-desktop dark:bg-dark-img-mobile dark:sm:bg-dark-img-desktop z-[-1]" />
      <div className="flex justify-center">
        <TodoContainer />
      </div>
    </div>
  );
}
