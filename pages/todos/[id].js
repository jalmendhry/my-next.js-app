import axios from "axios";
import { useRouter } from "next/router";

export async function getServerSideProps({ query, res }) {
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=10, stale-while-revalidate=59"
  );

  const { id } = query;

  const { data: todo } = await axios.get(
    `https://jsonplaceholder.typicode.com/todos/${id}`
  );

  return {
    props: { todo },
  };
}

const Todos = ({ todo }) => {
  const router = useRouter();

  if (router.isFallback) {
    return <p>Loading...</p>;
  }

  const { id, title } = todo;

  return (
    <>
      <p>
        {id} - {title}
      </p>
      <button
        onClick={() => {
          router.push(`/todos/${id}?query=test`, undefined, {
            shallow: true,
          });
        }}
      >
        add param
      </button>
    </>
  );
};

export default Todos;
