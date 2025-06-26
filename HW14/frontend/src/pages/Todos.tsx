import { useState } from "react";

type Todo = {
  id: number;
  description: string;
  status: "Completed" | "In Progress";
  timestamp: string;
};

const MockTodo: Todo[] = [
  {
    id: 1,
    description: "Buy groceriges",
    status: "In Progress",
    timestamp: new Date().toISOString(),
  },
  {
    id: 2,
    description: "Buy food",
    status: "Completed",
    timestamp: new Date().toISOString(),
  },
];

function Todos() {
  const [todos, setTodos] = useState<Todo[]>(MockTodo);
  const [description, setDescription] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newTodo: Todo = {
      id: todos.length + 1,
      description,
      status: "In Progress",
      timestamp: new Date().toISOString(),
    };

    setTodos((prev) => [...prev, newTodo]);
    setDescription("");
  };

  return (
    <>
      <div className="mx-auto" style={{ maxWidth: "1000px" }}>
        <h2 className="text-center">Add Todo</h2>
        <form
          action="POST"
          onSubmit={handleSubmit}
          className="col d-flex gap-2 align-items-center mb-4"
        >
          <label htmlFor="enteredItem"></label>
          <input
            className="form-control"
            type="text"
            name="todo-item"
            id="enteredItem"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <button
            className="btn btn-primary"
            style={{ whiteSpace: "nowrap", width: "150px" }}
            type="submit"
          >
            Add Todo
          </button>
        </form>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Todo Item</th>
            <th scope="col">Status</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo) => (
            <tr key={todo.id}>
              <th scope="row">{todo.id}</th>
              <td>{todo.description}</td>
              <td>{todo.status}</td>
              <td>
                <button className="btn btn-sm btn-danger me-2">Delete</button>
                <button className="btn btn-sm btn-success me-2">
                  Finished
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default Todos;
