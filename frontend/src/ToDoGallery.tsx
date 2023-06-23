
import ToDoCard, {ToDo} from "./ToDoCard";

type Props = {
    todos: ToDo[],
};

export default function ToDoGallery({ todos }: Props){

    return (
        <main>
            {todos.map((todo) => (
                <ToDoCard key={todo.id} todo={todo} />)
            )}
        </main>
    );

}