import { useContext } from "react";
import { LanguageContext } from "../Context/Context";

export default function Question3Child({ onClick }) {
  const { handleClick } = useContext(LanguageContext);
  return (
    <div className="btn-group">
      <button className="btn btn-primary" onClick={onClick}>
        Props Click
      </button>
      <button className="btn btn-secondary" onClick={handleClick}>useContext Click</button>
    </div>
  );
}
