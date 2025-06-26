import { useEffect, useState } from "react";

type Todo = {
  id: number;
  description: string;
  status: "Completed" | "In Progress";
  priority: "Low" | "Medium" | "High";
  timestamp: string;
};

function Todos() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<Todo["priority"]>("Medium");

  useEffect(() => {
    fetch("http://localhost:3000/todo")
      .then((res) => res.json())
      .then((data) => setTodos(data));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:3000/todo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ description, priority }),
      });

      const newTodo = await res.json();
      setTodos((prev) => [...prev, newTodo]);
      setDescription("");
    } catch (err) {
      console.log("Failed to add todo", err);
    }
  };

  const handleDelete = async (id: number) => {
    await fetch(`http://localhost:3000/todo/${id}`, { method: "DELETE" });
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const handleComplete = async (id: number) => {
    const res = await fetch(`http://localhost:3000/todo/${id}`, {
      method: "PUT",
    });
    const updated = await res.json();
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, status: updated.status } : todo
      )
    );
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
          <select
            className="form-select w-25"
            value={priority}
            onChange={(e) => setPriority(e.target.value as Todo["priority"])}
            required
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
          <button
            className="btn btn-primary"
            style={{ whiteSpace: "nowrap", width: "150px" }}
            type="submit"
          >
            Add Todo
          </button>
        </form>
      </div>
      <table className="table text-center">
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
              <td
                className={` 
                  ${
                    todo.status === "Completed"
                      ? "text-decoration-line-through text-muted opacity-50"
                      : ""
                  }
                `}
              >
                <div className="px-3 py-2 position-relative d-inline-block">
                  {todo.description}
                  <span
                    className={`badge position-absolute top-0 end-0 opacity-75 ${
                      todo.priority === "High"
                        ? "bg-danger"
                        : todo.priority === "Medium"
                        ? "bg-warning text-dark"
                        : "bg-success"
                    }`}
                    style={{
                      transform: "translate(40%, -20%)",
                      fontSize: "0.6rem",
                    }}
                  >
                    {todo.priority}
                  </span>
                </div>
              </td>
              <td>{todo.status}</td>
              <td>
                <button
                  onClick={() => handleDelete(todo.id)}
                  className="btn btn-sm btn-danger me-2"
                >
                  Delete
                </button>
                <button
                  onClick={() => handleComplete(todo.id)}
                  className="btn btn-sm btn-success me-2"
                >
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
