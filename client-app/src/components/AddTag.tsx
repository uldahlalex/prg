import {baseUrl, tagsAtom} from "../state.ts";
import {useAtom} from "jotai";
import {useState} from "react";
import {Tag} from "../types/tag.ts";

export default function AddTag() {
    const [tags, setTags] = useAtom(tagsAtom);
    const [newTagForm, setNewTagForm] = useState<Tag>({
        id: -1,
        userId: 1,
        name: ""
    });

    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewTagForm({...newTagForm, name: e.target.value});
    }

    return(
        <>
            <input type="text" value={newTagForm.name} onChange={handleFormChange}/>
            <button onClick={async () => {
                const response = await fetch(`${baseUrl}/tags`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(newTagForm)
                });
                const data = await response.json();
                setTags([...tags, data]);
            }}>add</button>

    </>)
}