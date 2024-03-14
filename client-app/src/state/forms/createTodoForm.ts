import {atom} from "jotai/index";
import {CreateTodoRequestDto} from "../../../httpclient/Api.ts";

export const createTodoForm = atom<CreateTodoRequestDto>({
    title: '',
    description: '',
    tags: [],
    dueDate: '',
    priority: 0
});