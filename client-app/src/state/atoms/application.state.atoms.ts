import {atom} from "jotai";
import {Tag, TodoWithTags} from "../../../httpclient/Api.ts";


export const todosAtom = atom<TodoWithTags[]>([]);
export const tagsAtom = atom<Tag[]>([]);

export const courseIdAtom = atom<number | null>(null);

export const fullstackId = 3780;
export const sys = 3332;