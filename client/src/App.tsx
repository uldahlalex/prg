import NewTodo from "./components/NewTodo.tsx";
import FeedItems from "./components/Feed/FeedItems.tsx";
import {getDoneAmount, tags} from "./state/global.state.ts";
import {todos} from "./state/global.state.ts";
import {useEffect} from "react";
import Sidebar from "./components/Sidebar.tsx";



export default function App() {

    useEffect(() => {
        fetch('http://localhost:5000/api/todos')
            .then((response) => response.json())
            .then((data) => {
                todos.value = data;
            });
        fetch('http://localhost:5000/api/tags')
            .then((response) => response.json())
            .then((data) => {
               tags.value = data;
            });
    }, []);

  return (
    <main>
      <nav>
        Todos Done Count : <span>{getDoneAmount}</span>
      </nav>
        <Sidebar />
      <NewTodo />
      <FeedItems />
    </main>
  );
}
