import {createTodoForm} from "../../state/atoms/createTodoForm.ts";
import {useAtom} from "jotai/index";
import React from "react";
import {tagsAtom, todosAtom} from "../../state/atoms/application.state.atoms.ts";
import {http} from "../../functions/setupHttpClient.ts";
import {faker} from "@faker-js/faker";
import {Tag} from "../../../httpclient/Api.ts";
import toast from "react-hot-toast";

export default function NewTodoForm() {

    const [todoForm, setCreateTodoForm] = useAtom(createTodoForm);
    const [createTagForm, setCreateTagForm] = React.useState('');

    const [todos, setTodos] = useAtom(todosAtom);
    const [tags, setTags] = useAtom(tagsAtom);

    return (<>


            <label className=" flex w-full items-center">
                {AddTitle()}

                {DateInput()}
                {AddPriority()}
                {AddTags()}

                <button onClick={createNewTodo} className="btn btn-primary">Add!</button>


            </label>


        </>
    )


    function DateInput() {
        return <>

        <details className="dropdown dropdown-end">
            <summary className="m-1 btn">🗓️</summary>
            <div
                className="p-2 shadow-2xl menu dropdown-content z-[1] bg-base-100 rounded-box w-auto overflow-x-hidden overflow-y-auto max-h-60">

            <input value={todoForm.dueDate} onChange={(e) => {
                setCreateTodoForm({...todoForm, dueDate: e.target.value})
            }} className="mx-auto w-60 bg-transparent" type="date"/>

            </div>
        </details>
        </>;
    }

    function createNewTodo() {
        {
            http.api.todosCreate(todoForm).then(resp => {
                setTodos([...todos, resp.data]);
                setCreateTodoForm({
                    title: faker.hacker.phrase(),
                    description: faker.lorem.paragraph(),
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
                }} placeholder={"TO-DO: " + todoForm.title!}/>

            </label>
        </>
    }

    function AddPriority() {
        return <details className="dropdown dropdown-end">
            <summary className="m-1 btn">❗</summary>
            <div
                className="p-2 shadow-2xl menu dropdown-content z-[1] bg-base-100 rounded-box w-auto overflow-x-hidden overflow-y-auto max-h-60">
                <div className="flex">
                    {[0, 1, 2, 3, 4].map((priority) =>
                        <div key={priority}>
                            <label className="label cursor-pointer -rotate-45">{priority}</label>
                            <input className="radio"
                                   name="priority"
                                   key={priority}
                                   type="radio"
                                   onChange={(e) => {
                                       setCreateTodoForm({
                                           ...todoForm,
                                           priority: priority
                                       });
                                   }}/></div>
                    )} </div>
            </div>
        </details>;
    }

    function createTag(value: any) {
        http.api.tagsCreate({name: value}).then(resp => {
            setTags([...tags, resp.data]);
            toast.success('Tag "' + value + '" created!')
        });
    }

    function AddTagToCreationForm(e: React.ChangeEvent<HTMLInputElement>, tag: Tag) {
        setCreateTodoForm({
            ...todoForm,
            tags: e.target.checked ? [...todoForm.tags!, tag] : todoForm.tags!.filter(t => t.id !== tag.id)
        })
    }

    function AddTags() {
        return <details className="dropdown dropdown-end">
            <summary className="m-1 btn">🏷️</summary>
            <div className=" shadow-2xl menu dropdown-content z-[1] bg-base-100 rounded-box w-auto h-auto">
                <div className="grid grid-cols-5 gap-4 gap-x-20 p-10">
                    {tags.map((tag, index) => (
                        <div key={index} className="flex flex-col items-center rotate-45">
                            <label className="btn m-3 cursor-pointer flex-nowrap">
                                {tag.name}
                                <input
                                    className="checkbox"
                                    type="checkbox"
                                    checked={todoForm.tags!.map(t => t.id).includes(tag.id)}
                                    onChange={(e) => AddTagToCreationForm(e, tag)}
                                />
                            </label>

                        </div>
                    ))}
                </div>
                <div className="flex mt-4">
                    <input
                        value={createTagForm}
                        onChange={(e) => setCreateTagForm(e.target.value)}
                        className="input input-bordered w-full mr-2"
                        placeholder="Create new tag"
                        onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                            if (e.key === 'Enter') {
                                e.preventDefault();
                                createTag(createTagForm);
                            }
                        }}
                    />
                    <button
                        onClick={() => createTag(createTagForm)}
                        className="btn btn-primary">
                        Add
                    </button>
                </div>
            </div>

        </details>;
    }


}