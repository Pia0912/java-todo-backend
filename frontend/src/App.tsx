import Header from "./Header.tsx";
import React, {useState} from "react";
import ToDoGallery from './ToDoGallery.tsx';
import './App.css';
import {ToDo} from "./ToDoCard.tsx";





export default function App() {
    const [description, setDescription] = useState<ToDo[]>([]);
    const [newTodo, setNewTodo] = useState<string>("");

    function changeText(event: React.ChangeEvent<HTMLInputElement>) {
        const newTodo = event.target.value;
        setNewTodo(newTodo);
    }

    function addTodo() {
        if (newTodo.trim() !== "") {
            const newTodoItem: ToDo = {
                id: new Date().getTime().toString(),
                description: newTodo,
                status: "OPEN",
            };
            setDescription([...description, newTodoItem]);
            setNewTodo(""); // Clear the input field
        }
    }


return(

        <div className="container">
            <h1 className="title">☑️ToDo-List</h1>

            <div className="header">
                <Header />
            </div>

            <div className="main">
                <ToDoGallery todos={description} />
            </div>

            <div className="footer">
                <input type="text" value={newTodo} onChange={changeText} />
                <button onClick={addTodo}>Add</button>
            </div>
        </div>
        );
}