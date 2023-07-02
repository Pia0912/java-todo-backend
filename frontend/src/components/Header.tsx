import ToDoCard from "./ToDoCard.tsx";
import {Todo} from "./ToDo.ts";
import {TodoStatus} from "./TodoStatus.ts";
import NewTodoCard from "./NewTodoCard.tsx";


type Props = {
    status: TodoStatus,
    todos: Todo[],
    onTodoItemChange: () => void
}

export default function Header(props: Props) {
    return (
        <div>
            <h2>{props.status}</h2>
            {
                props.todos.map(todo =>
                    <ToDoCard todo={todo} key={todo.id} onTodoItemChange={props.onTodoItemChange}/>)
            }
            {
                (props.status === "OPEN") &&
                <NewTodoCard onNewTodoItemSave={props.onTodoItemChange}/>
            }
        </div>
    );
}
