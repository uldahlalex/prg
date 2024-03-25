import {createTodoForm} from "../../state/atoms/createTodoForm.ts";
import {useAtom} from "jotai/index";
import React from "react";
import {tagsAtom, todosAtom} from "../../state/atoms/application.state.atoms.ts";
import {http} from "../../functions/setupHttpClient.ts";

export default function NewTodoForm() {

    const [todoForm, setCreateTodoForm] = useAtom(createTodoForm);
    const [todos, setTodos] = useAtom(todosAtom);
    const [tags, setTags] = useAtom(tagsAtom);


    return(<>
        <div className="flex">

            <label className=" flex items-center gap-2 max-auto w-full">
                <input            onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        http.api.todosCreate(todoForm).then(resp => {
                            setTodos([...todos, resp.data]);
                            setCreateTodoForm({
                                title: '',
                                description: '',
                                tags: [],
                                dueDate: new Date().toISOString().slice(0, 10),
                                priority: 0
                            });

                        });
                    }
                }} placeholder={todoForm.title!} className="input input-bordered w-full max-w-xs"/>
                <input className="mx-auto w-1/5" type="date"/>

                <details className="dropdown dropdown-end">
                    <summary className="m-1 btn">🏷️</summary>
                    <div
                        className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52 overflow-x-hidden overflow-y-auto max-h-60">

                        <div className="flex">

                            {tags.map((tag, index) =>


                                <label key={index}><label
                                    className="label cursor-pointer -rotate-45">{tag.name}</label>
                                    <input className="checkbox"

                                           key={index}
                                           type="checkbox"
                                           checked={todoForm.tags!.map(t => t.id).includes(tag.id!)}
                                           onChange={(e) => {
                                               if (e.target.checked) {
                                                   setCreateTodoForm({
                                                       ...todoForm,
                                                       tags: [...todoForm.tags!, tag]
                                                   });
                                               } else {
                                                   setCreateTodoForm({
                                                       ...todoForm,
                                                       tags: todoForm.tags!.filter(t => t.id !== tag.id)
                                                   });
                                               }

                                           }}/></label>
                            )} </div>
                    </div>
                </details>

            </label>


        </div>

    </>
)
}