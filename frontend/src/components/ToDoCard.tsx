
import {Todo} from "./ToDo.ts";
import axios from "axios";
import React, {useState} from "react";
import {TodoStatus} from "./TodoStatus.ts";


type Props = {
    todo: Todo,
    onTodoItemChange: () => void //Callback Funktion

}

export default function ToDoCard(props: Props) {

    const[description, setDescription] = useState(props.todo.description)

    function changeText(event: React.ChangeEvent<HTMLInputElement>) {
        const newDescription = event.target.value;
        setDescription(newDescription)
        axios.put("api/todo/" + props.todo.id,{
            ...props.todo,
            description: newDescription,
        } as Todo)
    }


    function move(targetStatus: TodoStatus) {
        axios.put("api/todo/" + props.todo.id,{
            ...props.todo,
            status: targetStatus
        } as Todo)
            .then(props.onTodoItemChange)
    }


    function deleteThisItem() {
        axios.delete("api/todo/" + props.todo.id)
            .then(props.onTodoItemChange)
    }
    return (
        <div className="todo-card">
            <div>
                <input value={description} onInput={changeText} />
            </div>
            <div className="button-group">
                {(props.todo.status === "OPEN") ? (
                    <></>
                ) : (
                    props.todo.status === "DONE" ? (
                        <button onClick={() => move("IN_PROGRESS")}>⇦</button>
                    ) : (
                        <button onClick={() => move("OPEN")}>⇦</button>
                    )
                )}
                <button onClick={deleteThisItem}>🗑️</button>
                {props.todo.status === "DONE" ? (
                    <></>
                ) : (
                    props.todo.status === "IN_PROGRESS" ? (
                        <button onClick={() => move("DONE")}>⇨</button>
                    ) : (
                        <button onClick={() => move("IN_PROGRESS")}>⇨</button>
                    )
                )}
            </div>
        </div>

    );
}

