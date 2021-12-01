import axios from "axios";

// export function getStaticPaths() {
//   return { paths: [], fallback: true }
// }

// export async function getStaticProps({ params }) {
//   return {
//     props: { todos },

//     // Incremental re-generation:
//     unstable_revalidate: true,
//   }
// }

export async function getServerSideProps({ query }) {
  const { id } = query;

  const { data: todo } = await axios.get(
    `https://jsonplaceholder.typicode.com/todos/${id}`
  );

  return {
    props: { todo },
  };
}

const Todos = ({ todo: { id, title } }) => {
  return (
    <p>
      {id} - {title}
    </p>
  );
};

export default Todos;
