import React, { useState } from 'react';
import {useAtom} from "jotai/index";
import {tagsAtom} from "../../../state/atoms/application.state.atoms.ts";
import {Button} from "@mui/material";

export default function EditTags() {
    const [tags, setTags] = useAtom(tagsAtom);
    const [openDialog, setOpenDialog] = useState<number | null>(null);
    const [newTagName, setNewTagName] = useState<string>(""); //todo make atom for tag form
    const [dialogCoordinates, setDialogCoordinates] = useState<{x: number, y: number} | null>({x: 0, y: 0});
const [expanded, setExpanded] = useState(false);

//todo fix all the crud
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
                <summary //toggle expanded state
                    onClick={() => setExpanded(!expanded)}
                    style={{cursor: "pointer", fontWeight: "bold"}}>

                   &nbsp;&nbsp;{expanded ? "Hide " : "Show "} My Tags
                </summary>
                <div>
                    {
                        tags.map((tag, index) =>
                            <div key={index}>
                                <Button  onClick={(e) => {
                                    setOpenDialog(index);
                                    setDialogCoordinates({x: e.clientX, y: e.clientY})
                                }}>{tag.name}&nbsp;&nbsp;&nbsp;⚙️</Button>
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
  <span style={{position: 'absolute', top: 0, right: 0, cursor: "pointer"}}
        onClick={() => setOpenDialog(null)}>❌
                                                </span>
                                            <div style={{
                                                marginBottom: '10px',
                                                display: 'flex',
                                                justifyContent: "center"
                                            }}>
                                                <Button disabled={!newTagName || newTagName.length == 0}
                                                        style={{flex: "1"}}
                                                        onClick={() => handleRename(index)}>Rename
                                                </Button>
                                                <input style={{ flex: "1"}} type="text"
                                                       value={newTagName}
                                                       onChange={(e) => setNewTagName(e.target.value)}
                                                       placeholder="New tag name"/>




                                            </div>
                                            <div style={{display: "flex", justifyContent: "center"}}>

                                                <Button className="Button-black"
                                                        style={{marginBottom: '10px' ,width: '70%'}}
                                                        onClick={() => handleDelete(index)}>Delete Tag {tag.name}
                                                </Button>
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