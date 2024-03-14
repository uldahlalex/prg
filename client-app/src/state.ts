import {atom} from "jotai";
import {Todo} from "./types/todo.ts";
import {Tag} from "./types/tag.ts";
import {User} from "./types/user.ts";
import {} from "./types/gettodos.params.dto.ts";
import {Api} from "../httpclient/Api.ts";



export const baseUrl = "http://localhost:5000/api";

export const todosAtom = atom<Todo[]>([]);
export const tagsAtom = atom<Tag[]>([]);
export const userAtom = atom<User>({});

export const queryPreferencesAtom = atom<QueryPreferences>({
    orderBy: {
        field: "dueDate",
        direction: "asc"
    },
    filters: {
        limit: 50,
        selectedTags: []
    }
});

const api = new Api({
    baseUrl: 'http://localhost:5000/api',

});

export const createTodoForm = atom<>({
    title: '',
    description: '',
    tags: [],
    dueDate: new Date(),
    priority: 0
});
//todo better with axois?


api.api.tagsCreate({name: 'test'}).then((res) => {
    console.log(res);
});
api.api.todosList({
    lol: ''
})


