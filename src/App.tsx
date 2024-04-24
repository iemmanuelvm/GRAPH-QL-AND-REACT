import { gql, useQuery } from "@apollo/client";

const TODO_QUERY = gql`
  query TodoQuery($todoId: Int!) {
    hello
    pendingTodos
    todo(id: $todoId) {
      id
      description
    }
    totalTodos
    todos {
      id
      description
    }
  }
`;

const variables = {
  todoId: 1,
};

export default function App() {
  const { data, loading, error } = useQuery(TODO_QUERY, { variables });

  interface Todo {
    id: number;
    description: string;
  }

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>Todo Details</h1>
      <p>Hello: {data.hello}</p>
      <p>Pending Todos: {data.pendingTodos}</p>
      <p>Total Todos: {data.totalTodos}</p>
      <h2>Todo</h2>
      {data.todo ? (
        <div>
          <p>ID: {data.todo.id}</p>
          <p>Description: {data.todo.description}</p>
        </div>
      ) : (
        <p>No todo found with the specified ID</p>
      )}
      <h2>All Todos</h2>
      <ul>
  {data.todos.map((todo: Todo, index: number) => (
    <li key={index}>{todo.id}-{todo.description}</li>
  ))}
</ul>
    </div>
  );
}
