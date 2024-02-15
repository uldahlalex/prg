import {useState} from "react";
import {Todo} from "./models/todo.ts";

export default function TodoItem(item: Todo) {

    // create react usestate hook but instead of square bracket syntax use curly bracket syntax
    const [data, setData] = useState<Todo>(item);
    const [checked, setChecked] = useState(true);

    return (
        <>

            <input type="checkbox"
                   defaultChecked={data.done}
                   onChange={() => setChecked((state) => !state)}
            />
        </>
    )
}