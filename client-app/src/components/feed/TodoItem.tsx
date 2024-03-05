import {useState} from "react";
import {Todo} from "../../models/todo.ts";

export default function TodoItem(item: Todo) {
    const [data, setData] = useState<Todo>(item);
    const [checked, setChecked] = useState(true);



    return (
        <>
            <input type="checkbox"
                   defaultChecked={data.isCompleted}
                   onChange={() => {
                       setData({...data, isCompleted: !data.isCompleted});
                       fetch(`http://localhost:5000/api/todos/${data.id}`, {
                            method: 'PUT',
                            headers: {
                                 'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                 ...data,
                                 isCompleted: !data.isCompleted
                            })
                       }).then(async (res) => {
                            let updated = await res.json() as Todo;
                            updated.tags = [... data.tags!];
                            setData(updated);
                            setChecked(updated.isCompleted!);
                            alert('Updated to : '+JSON.stringify(updated));
                       });
                   }}
            />

        </>
    )
}