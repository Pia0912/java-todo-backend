import './ToDoCard.css';
import axios from "axios";
import { useState } from "react";

type ToDo = {
    id: string;
    description: string;
    status: string;
};

type Props = {
    todo: ToDo;
};

export default function ToDoCard({ todo }: Props) {
    const [todos, setTodos] = useState<ToDo[]>([]);
    async function updateStatus(id: string) {
        try {
            const response = await axios.put(`/api/todo/${id}`);
            const updatedTodo = response.data;
            setTodos((prevTodos) =>
                prevTodos.map((todo) => {
                    if (todo.id === updatedTodo.id) {
                        return updatedTodo;
                    } else {
                        return todo;
                    }
                })
            );
        } catch (error) {
            console.error('Error updating todo:', error);
        }
    }

    return (
        <section>
            <h3>{todo.description}</h3>
            <h3>Status: {todo.status}</h3>

            <button>Edit</button>
            <button>Details</button>
            <button onClick={() => updateStatus(todo.id)}>Advance</button>

            {todos.map(() => (
                <div key={todo.id}>{todo.description}</div>
            ))}
        </section>
    );
}
