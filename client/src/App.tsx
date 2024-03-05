import MyForm from "./components/AddToTodos";
import TodoList from "./components/List";
import { getDoneAmount } from "./store";
import {todos} from "./store";
import {useEffect} from "react";



export default function App() {

    useEffect(() => {
        fetch('http://localhost:5000/api/todos')
            .then((response) => response.json())
            .then((data) => {
                console.info("hey")
                console.log(data)
                todos.value = data;
            });
    }, []);

  return (
    <main>
      <nav>
        Todos Done Count : <span>{getDoneAmount}</span>
      </nav>
      <MyForm />
      <TodoList />
    </main>
  );
}
