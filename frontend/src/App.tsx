import Header from "./Header";
import React, { useState, useEffect } from "react";
import ToDoGallery from './ToDoGallery';
import './App.css';
import { ToDo } from "./ToDoCard";
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';


export default function App() {
    const [description, setDescription] = useState<ToDo[]>([]);
    const [newTodo, setNewTodo] = useState<string>("");

    useEffect(() => {
        getTodos();
    }, []);

    function getTodos() {
        axios.get("/api/todo")
            .then((response) => {
                const todosData = response.data;
                setDescription(todosData);
            })
            .catch((error) => {
                console.error("Error fetching todos:", error);
            });
    }


    function changeText(event: React.ChangeEvent<HTMLInputElement>) {
        const newTodo = event.target.value;
        setNewTodo(newTodo);
    }

    function addTodo() {
        if (newTodo.trim() !== "") {
            const newTodoItem: ToDo = {
                id: uuidv4(),
                description: newTodo,
                status: "OPEN",
            };

            axios.post("/api/todo", newTodoItem)
                .then((response) => {
                    const createdTodo = response.data;
                    setDescription([...description, createdTodo]);
                    setNewTodo(""); // Clear the input field
                })
                .catch((error) => {
                    console.error("Error creating todo:", error);
                });
        }
    }

    return (
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
