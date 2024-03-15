import {tagsAtom} from "../../../state/application.state.atoms.ts";
import {useAtom} from "jotai";
import {useState} from "react";
import {Tag} from "../../../../httpclient/Api.ts";
import {http} from "../../../communication/api.ts";

export default function CreateNewTag() {
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
                    http.api.tagsCreate(newTagForm).then(resp =>  setTags([...tags, resp.data]))
                }}>add
                </button>
                <input type="text" value={newTagForm.name!} onChange={handleFormChange}/>

            </div>

        </>)
}