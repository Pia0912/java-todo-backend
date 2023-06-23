import './ToDoCard.css';
import axios from "axios";
import { useState } from "react";
import './ToDoEdit.tsx'
import ToDoEdit from "./ToDoEdit.tsx";

export type ToDo = {
    id: string;
    description: string;
    status: string;
};

type Props = {
    todo: ToDo;
};

export default function ToDoCard({ todo }: Props) {
    const [todoStatus, setTodoStatus] = useState<string>();
    const [todoId] = useState<string>(todo.id);
    const [editMode, setEditMode] = useState<boolean>(false);

    async function updateStatus(id: string) {
        try {
            const response = await axios.put(`/api/todo/${id}/update`, { status: "IN_PROGRESS" });
            const updatedTodo = response.data;
            setTodoStatus(updatedTodo.status);
        } catch (error) {
            console.error('Error updating todo:', error);
        }
    }

    const handleEditClick = () => {
        setEditMode(true);
    };

    const handleSave = (updatedTodo: ToDo) => {
        setTodoStatus(updatedTodo.status);
        setEditMode(false);
    };

    return (
        <section>
            {editMode ? (
                <ToDoEdit todo={todo} onSave={handleSave} />
            ) : (
                <>
                    <h3>{todo.description}</h3>
                    <h3>Status: {todoStatus}</h3>

                    <button onClick={handleEditClick}>Edit</button>
                    <button>Details</button>
                    <button onClick={() => updateStatus(todoId)}>Advance</button>
                </>
            )}
        </section>
    );
}
