import React, {useState, useEffect} from "react"


function ToDoList(){
    const [inputValue, setInputValue] = useState("")
    const [toDo, setToDo] = useState([])

    function handleOnChange(event){
        setInputValue(event.target.value)
    }

function insert(){
    const trimmedValue = inputValue.trim(); 
      if (trimmedValue === "") {
        return;
      }

      setToDo([...toDo, inputValue]);
      setInputValue("");
}
    

    return <div>
        <input onChange={handleOnChange} value={inputValue} type="text" name="todo" id="todo" placeholder="What we need to do?" />
        <button onClick={insert}>Incluir toDo</button>

        <div>
            <ul>
                {toDo.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}    
            </ul>
        
        </div>
    </div>
}

export default ToDoList