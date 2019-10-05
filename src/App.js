import React from "react";
import "./App.css";
import Todos from "./components/Todos";
import "./assets/fontello/css/fontello.css";

function App() {
  return (
    <div className="App container">
      <header className="App-header">
        <h1 className="text-center my-3">JDev Todo App</h1>
      </header>
      <Todos />
    </div>
  );
}

export default App;
