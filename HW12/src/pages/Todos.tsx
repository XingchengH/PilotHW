import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispath, RootState } from "../store/store";
import { fetchUsersTodos } from "../store/userActions";

export default function Todos() {
  const dispatch = useDispatch<AppDispath>();
  const todos = useSelector((state: RootState) => state.users.todos);

  const [showCompleted, setShowCompleted] = useState(true);
  const [showNotCompleted, setShowNotCompleted] = useState(true);

  useEffect(() => {
    dispatch(fetchUsersTodos());
  }, [dispatch]);

  const filteredTodos = todos.filter((todo) => {
    if (todo.completed && showCompleted) return true;
    if (!todo.completed && showNotCompleted) return true;
    return false;
  });

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-3">Todos</h1>

      <div className="form-check form-check-inline">
        <input
          type="checkbox"
          id="completedCheck"
          className="form-check-input"
          checked={showCompleted}
          onChange={() => setShowCompleted((prev) => !prev)}
        />
        <label className="form-check-label" htmlFor="completedCheck">
          Show Completed
        </label>
      </div>

      <div className="form-check form-check-inline">
        <input
          type="checkbox"
          id="notCompletedCheck"
          className="form-check-input"
          checked={showNotCompleted}
          onChange={() => setShowNotCompleted((prev) => !prev)}
        />
        <label className="form-check-label" htmlFor="notCompletedCheck">
          Show Not Completed
        </label>
      </div>

      <ul className="list-group mt-4">
        {filteredTodos.length === 0 ? (
          <li className="list-group-item text-center text-muted">
            No todos to show
          </li>
        ) : (
          filteredTodos.map((todo) => (
            <li
              key={todo.id}
              className={`list-group-item d-flex justify-content-between align-items-center ${
                todo.completed ? "list-group-item-success" : ""
              }`}
            >
              {todo.title}
              <span
                className={`badge rounded-pill ${
                  todo.completed ? "bg-success" : "bg-secondary"
                }`}
              >
                {todo.completed ? "Done" : "Pending"}
              </span>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
