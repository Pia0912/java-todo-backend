import React, {useState} from "react";
import axios from "axios";
import {Todo} from "./ToDo.ts";


type Props = {
    onNewTodoItemSave: () => void //Callback Funktion
}

export default function NewTodoCard(props: Props) {

    const[text, setText] = useState("")
    function changeText(event: React.ChangeEvent<HTMLInputElement>){
        setText(event.target.value)
    }

    function saveTodo(){
        setText("")
        axios.post("/api/todo", {
            description: text,
            status: "OPEN",
        } as Todo)
            .then(props.onNewTodoItemSave)

    }

    return (
        <div className="todo-new-card">
            <input type="text" value={text} onInput={changeText}/>
            <button onClick={saveTodo}>Save</button>
        </div>
    );
}

