import { useState } from 'react';

export type ToDo = {
    id: string;
    description: string;
    status: string;
};

type Props = {
    todo: ToDo;
    onSave: (updatedTodo: ToDo) => void;
};

export default function ToDoEdit({ todo, onSave }: Props) {
    const [formData, setFormData] = useState<ToDo>(todo);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        onSave(formData);
    };

    const resetForm = () => {
        setFormData(todo);
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Description
                <input
                    type="text"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                />
            </label>
            <label>
                Status
                <select name="status" value={formData.status} onChange={handleChange}>
                    <option value="OPEN">open</option>
                    <option value="IN_PROGRESS">doing</option>
                    <option value="DONE">done</option>
                </select>
            </label>
            <button type="button" onClick={resetForm}>
                Reset
            </button>
            <button type="submit">Save</button>
        </form>
    );
}
