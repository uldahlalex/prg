import { useState } from 'react';
import {useAtom} from "jotai/index";
import {tagsAtom} from "../../../state/atoms/application.state.atoms.ts";

export default function EditTags() {
    const [tags, setTags] = useAtom(tagsAtom);
    const [openDialog, setOpenDialog] = useState<number | null>(null);
    const [newTagName, setNewTagName] = useState<string>(""); //todo make atom for tag form
    const [dialogCoordinates, setDialogCoordinates] = useState<{x: number, y: number} | null>({x: 0, y: 0});

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
                                <button onClick={(e) => {
                                    setOpenDialog(index);
                                    setDialogCoordinates({x: e.clientX, y: e.clientY})
                                }}>{tag.name}</button>
                                {
                                    openDialog === index && (
                                        <div style={{
                                            position: "fixed",
                                            top: dialogCoordinates?.y + "px",
                                            left: dialogCoordinates?.x + "px",
                                            backgroundColor: '#ffffff',
                                            border: '1px solid black',
                                            padding: '10px',
                                            borderRadius: '5px',
                                        }}>

                                            <div style={{marginBottom: '10px', display: 'flex', justifyContent: "center"}}>
                                                <input style={{ height: '50%', width: '40%'}} type="text" value={newTagName}
                                                       onChange={(e) => setNewTagName(e.target.value)}
                                                       placeholder="New tag name"/>
                                                <button style={{width: "25%"}}  onClick={() => handleRename(index)}>Rename</button>
                                            </div>
                                            <div style={{display: "flex", justifyContent: "center"}}>
                                                <button className="button-outline button-black" style={{width: "25%"}} onClick={() => setOpenDialog(null)}>Close Dialog</button>

                                                <button style={{marginBottom: '10px', width: "25%"}}
                                                        onClick={() => handleDelete(index)}>Delete
                                                </button>
                                            </div>

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