import {tagsAtom} from "../../../state/atoms/application.state.atoms.ts";
import {useAtom} from "jotai";
import {useState} from "react";
import {Tag} from "../../../../httpclient/Api.ts";
import {http} from "../../../functions/setupHttpClient.ts";

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
            <div>
                <h3>Create a new tag!</h3>
                <div style={{display: "flex"}}>       <input placeholder="New tag title" type="text" value={newTagForm.name!}
                                    onChange={handleFormChange}/>
                <button  onClick={async () => {
                    http.api.tagsCreate(newTagForm).then(resp => setTags([...tags, resp.data]))
                }}>add
                </button>
                </div>

            </div>

        </>)
}