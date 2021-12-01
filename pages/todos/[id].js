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

export function getServerSideProps(ctx) {
  return {
    props: {},
  };
}

const Todos = () => {
  return <p>hello</p>;
};

export default Todos;
