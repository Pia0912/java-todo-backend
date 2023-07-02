import { Link } from 'react-router-dom';

type Props = {
    description: string;
    status: string;
};

export default function ToDoDetails({ description, status }: Props) {
    return (
        <section>
            <h2>{description}</h2>
            <p>Status: {status}</p>
            <Link to="/api/todo">Back</Link>
        </section>
    );
}
