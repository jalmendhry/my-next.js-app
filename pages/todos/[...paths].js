import { useRouter } from "next/router";
import { getQueryStringProps } from "qs-props";

import axios from "axios";

export const getStaticPaths = () => {
  const paths = [
    { params: { id: "1" } },
    { params: { id: "2" } },
    { params: { id: "3" } },
  ];

  return { paths: [], fallback: "blocking" };
};

export const getStaticProps = async (ctx) => {
  console.log(ctx.params.paths[0]);
  const id = ctx.params.paths[0];
  const props = getQueryStringProps(ctx, "paths");
  console.log(props);

  const { data: todo } = await axios.get(
    `https://jsonplaceholder.typicode.com/todos/${id}`
  );

  console.log(todo);

  return {
    props: { todo },
    revalidate: 60,
  };
};

// export async function getServerSideProps({ query }) {
//   const { id } = query;

//   const { data: todo } = await axios.get(
//     `https://jsonplaceholder.typicode.com/todos/${id}`
//   );

//   return {
//     props: { todo },
//   };
// }

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
          router.push(`/todos/${id}?query=test`, undefined);
        }}
      >
        add param
      </button>
    </>
  );
};

export default Todos;
