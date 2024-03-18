import { useState } from 'react';
import {useAtom} from "jotai/index";
import {tagsAtom} from "../../../state/atoms/application.state.atoms.ts";

export default function EditTags() {
    const [tags, setTags] = useAtom(tagsAtom);
    const [openDialog, setOpenDialog] = useState<number | null>(null);
    const [newTagName, setNewTagName] = useState<string>("");

    const handleDelete = (index: number) => {
        setTags(tags.filter((_, i) => i !== index));
        setOpenDialog(null);
    }

    const handleRename = (index: number) => {
        if (newTagName.trim() === "") {
            alert("Tag name cannot be empty");
            return;
        }
        const newTags = [...tags];
        newTags[index].name = newTagName;
        setTags(newTags);
        setOpenDialog(null);
    }

    return(
        <>
            <details style={{cursor: "pointer"}}>
                <summary>All My Tags</summary>
                <div>
                    {
                        tags.map((tag, index) =>
                            <div key={index}>
                                <button onClick={() => setOpenDialog(index)}>{tag.name}</button>
                                {
                                    openDialog === index && (
                                        <div style={{position: "fixed", top: "50%", left: "50%", backgroundColor: '#ffffff', border: '1px solid black', transform: "translate(-50%, -50%)"}}>
                                            <button onClick={() => handleDelete(index)}>Delete</button>
                                            <div>
                                                <input type="text" value={newTagName} onChange={(e) => setNewTagName(e.target.value)} placeholder="New tag name" />
                                                <button onClick={() => handleRename(index)}>Rename</button>
                                            </div>
                                            <button onClick={() => setOpenDialog(null)}>Close</button>
                                        </div>
                                    )}
                            </div>
                        )
                    }
                </div>
            </details>
        </>
    )
}