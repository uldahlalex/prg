import {atom} from "jotai";
import {Todo} from "./types/todo.ts";
import {Tag} from "./types/tag.ts";
import {User} from "./types/user.ts";
import {QueryPreferences} from "./types/gettodos.params.dto.ts";
import {Api} from "../httpclient/Api.ts";
import {CreateTodoDto} from "./types/dtos.ts";


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


export const createTodoForm = atom<CreateTodoDto>({
    title: '',
    description: '',
    tags: [],
    dueDate: new Date(),
    priority: 0
});
//todo better with axois?
const api = new Api({
    baseUrl: 'http://localhost:5000/api',

});

api.api.tagsCreate({name: 'test'}).then((res) => {
    console.log(res);
});
api.api.todosList({
    lol: ''
})


