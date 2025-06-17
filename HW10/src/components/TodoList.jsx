import { useSelector, useDispatch } from "react-redux";
import { todoActions } from "../store/todoSlice";
import { useState } from "react";

export default function TodoList() {
  const [text, setText] = useState("");
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos);

  const addHandler = () => {
    if (text.trim() !== "") {
      dispatch(todoActions.addTodo(text));
      setText("");
    }
  };

  const deleteHandler = (id) => {
    dispatch(todoActions.deleteTodo(id));
  };

  const toggleHandler = (id) => {
    dispatch(todoActions.toggleTodo(id));
  };

  return (
    <>
      <div className="container my-3 p-4 shadow">
        <div className="input-group p-3 shadow">
          <label htmlFor="todo"></label>
          <input
            type="text"
            className="form-control"
            id="todo"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <div className="input-group-prepend">
            <button
              className="btn btn-primary px-3"
              type="button"
              onClick={addHandler}
            >
              Add
            </button>
          </div>
        </div>

        <div className="todo-area mt-4 p-3 shadow">
          <ul className="list-group">
            {todos.map((todo) => (
              <li
                key={todo.id}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                <span
                  style={{
                    textDecoration: todo.completed ? "line-through" : "none",
                  }}
                  onClick={() => toggleHandler(todo.id)}
                >
                  {todo.text}
                </span>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteHandler(todo.id);
                  }}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
