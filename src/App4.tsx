import { gql, useQuery } from '@apollo/client';

const TODOS_QUERY = gql`
  query Todos($status: Boolean) {
    todos(status: $status) {
      ...fields
    }
  }

  fragment fields on Todo {
    description
    done
    id
  }
`;

const App4 = () => {
  const variables = {
    status: false,
  };

  interface Todo {
    id: number;
    description: string;
    done: boolean;
  }

  const { data, loading, error } = useQuery<{ todos: Todo[] }, { status: boolean }>(TODOS_QUERY, { variables });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <ul>
      {data?.todos.map((todo: Todo) => (
        <li key={todo.id}>
          <p>{todo.description}</p>
          <p>{todo.done ? true : false}</p>
        </li>
      ))}
    </ul>
  );
};

export default App4;
