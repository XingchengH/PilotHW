import { useState, useContext } from "react";
import Question3Child from "./Question3Child";
import "bootstrap/dist/css/bootstrap.min.css";
import { LanguageContext } from "../context/Context";

export default function Question3() {
  const languages = ["JavaScript", "Java"];
  const [currentLanguageIdx, setCurrentLanguageIdx] = useState(0);

    function handleClick() {
        setCurrentLanguageIdx((prev) => (prev === 0) ? 1 : 0);        
    }


  return (
    <LanguageContext.Provider value={{handleClick}}>
      <div className="container mt-4 text-center">
        <h2>Current Language: {languages[currentLanguageIdx]}</h2>
        <Question3Child onClick={handleClick}/>
      </div>
    </LanguageContext.Provider>
  );
}
