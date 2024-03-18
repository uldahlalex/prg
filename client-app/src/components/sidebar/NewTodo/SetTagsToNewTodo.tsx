import {useAtom} from "jotai";
import {tagsAtom} from "../../../state/atoms/application.state.atoms.ts";
import React from "react";
import {createTodoForm} from "../../../state/atoms/createTodoForm.ts";
import CreatableSelect from "react-select/creatable";

export default function SetTagsToNewTodo() {
    const [availableTags] = useAtom(tagsAtom);
    const [newTodoForm, setNewTodoForm] = useAtom(createTodoForm);

    const toggleTag = (tag) => {
        if (newTodoForm.tags!.includes(tag)) {
            setNewTodoForm({...newTodoForm, tags: newTodoForm.tags!.filter(t => t !== tag)});
        } else {
            setNewTodoForm({...newTodoForm, tags: [...newTodoForm.tags!, tag]});
        }
    };

    return (<>
            <label>Tags</label>
            <CreatableSelect isMulti options={availableTags.map(tag => {
                return {value: tag.name, label: tag.name}
            })} />;        </>

    );
}