import {createTodoForm} from "../../state/atoms/createTodoForm.ts";
import {useAtom} from "jotai/index";
import React from "react";
import {tagsAtom, todosAtom} from "../../state/atoms/application.state.atoms.ts";
import {http} from "../../functions/setupHttpClient.ts";

export default function NewTodoForm() {

    const [todoForm, setCreateTodoForm] = useAtom(createTodoForm);
    const [todos, setTodos] = useAtom(todosAtom);
    const [tags, setTags] = useAtom(tagsAtom);

    return (<>


            <label className=" flex w-full items-center">
                {AddTitle()}

                {DateInput()}
                {AddPriority()}
                {AddTags()}

                    <button onClick={createNewTodo}  className="btn btn-primary">Add!</button>



            </label>


        </>
    )


    function DateInput() {
        return <>


                <input value={todoForm.dueDate} onChange={(e) => {
                    setCreateTodoForm({...todoForm, dueDate: e.target.value})
                }} className="mx-auto w-60 bg-transparent" type="date"/>


        </>;
    }

    function createNewTodo() {
        {
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
    }

    function AddTitle() {
        return <>
            <label className="form-control w-full max-w-xs">
                <input value={todoForm.title!} onChange={e => setCreateTodoForm({
                    ...todoForm,
                    title: e.target.value
                })} className="input w-full max-w-xs" onKeyDown={(e) => {
                    if (e.key === 'Enter') createNewTodo();
                }} placeholder={"TO-DO: "+todoForm.title!}/>

            </label>
        </>
    }

    function AddPriority() {
        return <details className="dropdown dropdown-end">
            <summary className="m-1 btn">❗</summary>
            <div
                className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-auto overflow-x-hidden overflow-y-auto max-h-60">
                <div className="flex">
                    {[0,1,2,3,4].map((priority) =>
                        <label key={priority}><label
                            className="label cursor-pointer -rotate-45">{priority}</label>
                            <input className="radio"
                                    name="priority"
                                   key={priority}
                                   type="radio"
                                   onChange={(e) => {
                                           setCreateTodoForm({
                                               ...todoForm,
                                               priority: priority
                                           });
                                   }}/></label>
                    )} </div>
            </div>
        </details>;
    }

    function AddTags() {
        return <details className="dropdown dropdown-end">
            <summary className="m-1 btn">🏷️</summary>
            <div
                className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-auto overflow-x-hidden overflow-y-auto max-h-60">
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
        </details>;
    }


}