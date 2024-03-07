import {todosAtom} from "../state.ts";
import {useAtom} from "jotai";

export default function FeedItem({ todo }) {
    return <div title={JSON.stringify(todo)}>{todo.title}</div>;
}