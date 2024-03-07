import {todosAtom} from "../state.ts";
import {useAtom} from "jotai";

export default function FeedItem({ todo }) {
    // Correctly accessing todo properties
    return <div>{JSON.stringify(todo)}</div>;
}