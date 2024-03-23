import {useAtom} from "jotai";
import {tagsAtom, userAtom} from "../../../state/atoms/application.state.atoms.ts";
import React from "react";
import {createTodoForm} from "../../../state/atoms/createTodoForm.ts";
import {Tag} from "../../../../httpclient/Api.ts";
import {http} from "../../../functions/setupHttpClient.ts";

export default function SetTagsToNewTodo() {
    const [availableTags, setAvailableTags] = useAtom(tagsAtom);
    const [newTodoForm, setNewTodoForm] = useAtom(createTodoForm);
    const [user] = useAtom(userAtom);

    const toggleTag = (tag) => {
        if (newTodoForm.tags!.includes(tag)) {
            setNewTodoForm({...newTodoForm, tags: newTodoForm.tags!.filter(t => t !== tag)});
        } else {
            setNewTodoForm({...newTodoForm, tags: [...newTodoForm.tags!, tag]});
        }
    };

    return (<>
            <label>Tags</label>

        {/*    <CreatableSelect isMulti*/}
        {/*                     onCreateOption={e => {*/}
        {/*                         http.api.tagsCreate({*/}
        {/*                             name: e,*/}
        {/*                         }).then(resp => {*/}
        {/*                             setAvailableTags([...availableTags, resp.data]);*/}
        {/*                             setNewTodoForm({...newTodoForm, tags: [...newTodoForm.tags!, resp.data]});*/}
        {/*                         })*/}
        {/*                     }}*/}
        {/*                     options={availableTags.map(tag => {*/}
        {/*                         return {value: tag, label: tag.name}*/}
        {/*                     })}*/}

        {/*                     onChange={(e) => {*/}
        {/*                         setNewTodoForm({...newTodoForm, tags: [...e.map(e => e.value as Tag)]});*/}
        {/*                     }*/}
        {/*                     }*/}
        {/*    />*/}
        </>

    );
}