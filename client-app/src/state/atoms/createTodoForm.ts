import {atom} from "jotai/index";
import {CreateTodoRequestDto} from "../../../httpclient/Api.ts";
import {tagsAtom} from "./application.state.atoms.ts";
import { faker } from '@faker-js/faker';


export const createTodoForm = atom<CreateTodoRequestDto>({
    title: faker.hacker.phrase(),
    description: faker.lorem.paragraph(),
    tags: [],
    dueDate: new Date().toISOString().slice(0,10),
    priority: 0
});