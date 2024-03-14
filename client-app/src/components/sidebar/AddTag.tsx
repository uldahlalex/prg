import { tagsAtom} from "../../state.ts";
import {useAtom} from "jotai";
import {useState} from "react";
import {api} from "../../api.ts";
import {Tag} from "../../../httpclient/Api.ts";

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

    return (
        <>
            <div style={{border: '1px solid green'}}>"Add tag"
                <button onClick={async () => {
                    api.api.tagsCreate(newTagForm).then(resp => resp.json())
                        .then(resp => {
                            setTags([...tags, resp]);
                        });
                }}>add
                </button>
                <input type="text" value={newTagForm.name} onChange={handleFormChange}/>

            </div>

        </>)
}