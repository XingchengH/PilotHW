import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispath, RootState } from "../store/store";
import { fetchUsersTodos } from "../store/userActions";
import { userActions } from "../store/userSlice";
import { motion, AnimatePresence } from "motion/react";

export default function Todos() {
  const dispatch = useDispatch<AppDispath>();
  const todos = useSelector((state: RootState) => state.users.todos);

  const [showCompleted, setShowCompleted] = useState(true);
  const [showNotCompleted, setShowNotCompleted] = useState(true);
  const [showSorted, setShowSorted] = useState(true);

  useEffect(() => {
    dispatch(fetchUsersTodos());
  }, [dispatch]);

  const sortHandler = () => {
    dispatch(userActions.sortTodo());
    setShowSorted((prev) => !prev);
  };

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
      <div className="form-check form-check-inline">
        <input
          type="checkbox"
          id="sortedCheck"
          className="form-check-input"
          checked={showSorted}
          onChange={sortHandler}
        />
        <label className="form-check-label" htmlFor="sortedCheck">
          Show Sorted Todos
        </label>
      </div>

      <ul className="list-group mt-4">
        {filteredTodos.length === 0 ? (
          <li className="list-group-item text-center text-muted">
            No todos to show
          </li>
        ) : (
          <AnimatePresence mode="popLayout">
            {filteredTodos.map((todo) => (
              <motion.li
                key={todo.id}
                whileHover={{
                  scale: 1.05,
                  zIndex: 10,
                  border: "1px solid blue",
                  boxShadow: "0 0 10px rgba(0, 123, 255, 0.7)",
                }}
                initial={{ opacity: 0, y: 10, border: "1px solid #eee" }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10, border: "1px solid #eee" }}
                transition={{ duration: 0.3 }}
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
              </motion.li>
            ))}
          </AnimatePresence>
        )}
      </ul>
    </div>
  );
}
