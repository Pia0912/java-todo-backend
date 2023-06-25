import Header from "./Header";
import { useState, useEffect } from "react";
import './App.css';
import axios from "axios";
import {allPossibleTodos} from "./TodoStatus.ts";
import {Todo} from "./ToDo.ts";




export default function App() {

    const [todos, setTodos] = useState<Todo[]>()

    function fetchTodos() {
        axios.get("api/todo")
            .then(response => {
                setTodos(response.data)
            })
    }

    useEffect(fetchTodos, [])

    if (!todos) {
        return "Loading..."
    }


    return (
      <>
      <div className="container">

            <h1 className="title">☑️ToDo-List</h1>


          {
              allPossibleTodos.map(status => {
                  const filteredTodos = todos.filter(todo => todo.status === status)
                 return <Header status={status}
                                todos={filteredTodos}
                                onTodoItemChange={fetchTodos}
                                key={status}/>

              })
          }

      </div>
      </>


    )
}
