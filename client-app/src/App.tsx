import {useEffect} from "react";
import {tagsAtom, todosAtom} from "./state.ts";
import {useAtom} from "jotai";
import Sidebar from "./Sidebar.tsx";
import AddTag from "./AddTag.tsx";

export default function App() {
  const [todos, setTodos] = useAtom(todosAtom);
  const [tags, setTags] = useAtom(tagsAtom);

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
    <>
      <Sidebar/>
      <AddTag/>
    </>
  )
}

