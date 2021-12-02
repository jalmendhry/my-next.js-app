import axios from "axios";
import { useRouter } from "next/router";

import { Button } from "@jalmendhry1/joes-components";

export async function getServerSideProps({ query }) {
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
      {/* <Joe name="joe" /> */}
      <Button
        size="lg"
        handleClick={() => {
          router.push(`/todos/${id}?query=test`, undefined, {
            shallow: true,
          });
        }}
        bgColour="orange"
      >
        Add Param
      </Button>
    </>
  );
};

export default Todos;
