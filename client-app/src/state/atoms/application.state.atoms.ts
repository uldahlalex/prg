import {atom} from "jotai";
import {Tag, TodoWithTags} from "../../../httpclient/Api.ts";
import {User} from "../../types/user.ts";


export const todosAtom = atom<TodoWithTags[]>([]);
export const tagsAtom = atom<Tag[]>([]);
export const userAtom = atom<User | null>(null);



