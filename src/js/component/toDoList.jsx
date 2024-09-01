import React, { useState, useEffect } from "react";

function ToDoList() {
  const [inputValue, setInputValue] = useState("");
  const [toDo, setToDo] = useState([]);

  function handleOnChange(event) {
    setInputValue(event.target.value);
  }

  async function fetchAccountTodos() {
    try {
      const todos = await fetch(
        "https://playground.4geeks.com/todo/users/fidelnieto25",
        { method: "GET" }
      );
      const translatedTodos = await todos.json();
      console.log(translatedTodos);
      setToDo(translatedTodos.todos);
    } catch {}
  }

  useEffect(fetchAccountTodos, []);

  async function insertOnClick() {
    try {
      const trimmedValue = inputValue.trim();
      if (trimmedValue === "") {
        return;
      }
      await fetch("https://playground.4geeks.com/todo/todos/fidelnieto25", {
        method: "POST",
        body: JSON.stringify({
          label: inputValue,
          is_done: false,
        }),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      await fetchAccountTodos();
      setInputValue("");
    } catch (error) {}
  }

  // Remove ON CLICK BUT, prompting the ID
  //   async function removeOnClick() {
  //     try {
  //       const todo_id = prompt("Cual tarea deseas borrar?");
  //       await fetch(`https://playground.4geeks.com/todo/todos/${todo_id}`, {
  //         method: "DELETE",
  //       });
  //       await fetchAccountTodos();
  //     } catch (error) {}
  //   }

  async function removeOnClick(id) {
    try {
      await fetch(`https://playground.4geeks.com/todo/todos/${id}`, {
        method: "DELETE",
      });
      await fetchAccountTodos();
    } catch (error) {}
  }

  return (
    <div>
      <input
        onChange={handleOnChange}
        value={inputValue}
        type="text"
        name="todo"
        id="todo"
        placeholder="What we need to do?"
      />
      <button onClick={insertOnClick}>Incluir toDo</button>

      <div>
        <ul className="list-group d-flex w-100 justify-content-between">
          {toDo.map((item, index) => (
            <li className="list-group-item" key={index}>
              {item.label}
              <button onClick={() => removeOnClick(item.id)} className="btn">
                x
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ToDoList;
