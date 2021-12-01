import axios from "axios";
import { useRouter } from "next/router";

export async function getStaticPaths() {
  const paths = [
    { params: { id: "1" } },
    { params: { id: "2" } },
    { params: { id: "3" } },
  ];

  return { paths, fallback: true };
}

export async function getStaticProps({ params }) {
  const { id } = params;

  const { data: todo } = await axios.get(
    `https://jsonplaceholder.typicode.com/todos/${id}`
  );

  return {
    props: { todo },
    revalidate: 60,
  };
}

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
  const { isFallback } = useRouter();

  if (isFallback) {
    return <p>Loading...</p>;
  }

  const { id, title } = todo;

  return (
    <p>
      {id} - {title}
    </p>
  );
};

export default Todos;
