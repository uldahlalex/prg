import {useAtom} from "jotai";
import {tagsAtom} from "../../../state/application.state.atoms.ts";
import React, {useState} from "react";
import {createTodoForm} from "../../../state/forms/createTodoForm.ts";

export default function AddTagsToNewTodo() {
    const [availableTags] = useAtom(tagsAtom);
    const [selectedTagIndex, setSelectedTagIndex] = useState(-1);
    const [newTodoForm, setNewTodoForm] = useAtom(createTodoForm);


    const setTags = (e) => {
        setSelectedTagIndex(e.target.value); // Update the selected tag index
        setNewTodoForm({...newTodoForm, tags: [...newTodoForm.tags!, availableTags[e.target.value]]});
    }

    return (<>
        <select
            value={selectedTagIndex}
            onChange={(e) => {
                if (e.target.value === "-1") return;
                setTags(e);
            }}>

            <option value={-1}>Select tag</option>
            {availableTags.map((tag, index) =>
                <option value={index} key={index}>{tag.name}</option>
            )}
        </select>

        <p>Added tags</p>
        {
            newTodoForm.tags!.map((tag, index) => <p key={index}>
                <button onClick={() => {
                    setNewTodoForm({...newTodoForm, tags: newTodoForm.tags!.filter((t) => t !== tag)});
                }}><>{tag.name}</>
                </button>
            </p>)
        }
    </>)
}