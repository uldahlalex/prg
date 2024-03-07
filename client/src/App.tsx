import NewTodo from "./components/NewTodo.tsx";
import FeedItems from "./components/Feed/FeedItems.tsx";
import {tagsAtom, todosAtom} from "./state/global.state.ts";
import {useEffect} from "react";
import Sidebar from "./components/Sidebar.tsx";
import NewTag from "./components/NewTag.tsx";
import {useAtom, useAtomValue} from "jotai";



export default function App() {

    const [tags, setTags] = useAtom(tagsAtom);
    const [todos, setTodos] = useAtom(todosAtom);

    useEffect(() => {
        fetch('http://localhost:5000/api/todos')
            .then((response) => response.json())
            .then((data) => {
                setTodos(data);
            });
        fetch('http://localhost:5000/api/tags')
            .then((response) => response.json())
            .then((data) => {
                setTags(data);
            });
    }, []);

  return (
    <main>
      <nav>
      </nav>
        <Sidebar />
        <NewTag />
        <FeedItems/>
    </main>
  );
}
