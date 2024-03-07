import {todosAtom} from "../state.ts";
import {useAtom} from "jotai";

export default function FeedItem({ todo }) {
    return <div>{JSON.stringify(todo)}</div>;
}