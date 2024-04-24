import { gql, useMutation } from '@apollo/client';

const CREATE_TODO_MUTATION = gql`
  mutation CreateTodo($createTodoInput: CreateTodoInput!) {
    createTodo(createTodoInput: $createTodoInput) {
      id
      description
      done
    }
  }
`;

const App3 = () => {
    const [createTodo] = useMutation(CREATE_TODO_MUTATION);

    const handleCreateTodo = async () => {
        const variables = {
            createTodoInput: {
                description: "hola mundo 2802"
            }
        };

        try {
            const { data } = await createTodo({
                variables,
            });

            console.log("Created todo:", data.createTodo);
            // Perform any additional actions with the response data here
        } catch (error) {
            console.error("Error creating todo:", error);
            // Handle the error appropriately (e.g., show a notification)
        }
    };

    return (
        <div>
            <button onClick={handleCreateTodo}>Create Todo</button>
        </div>
    );
};

export default App3;
